<template>
  <div>
    <spinner v-if="!isLoaded"/>
    <div
      v-if="isLoaded"
      class="about">
      <div class="container">
        <div class="row">
          <div class="filter-mobile w-100 d-lg-none">
            <div
              class="w-100"
              @click="rightSidebar = !rightSidebar">
              <div v-if="!rightSidebar">
                <div class="filter-name">Навігація</div>
              </div>
              <div
                v-if="rightSidebar"
                class="w-100 d-flex justify-content-between">
                <div class="filter-name">Звернути навігацію</div>
                <div>
                  <i class="fas fa-times"/>
                </div>
              </div>
            </div>
            <transition name="slide-fade">
              <div v-if="rightSidebar">

                <ul class="right-sidebar">
                  <li
                    v-for="(article, _ind_2) in content"
                    :key="_ind_2"
                    :class="{'active': _ind_2 === 0}"
                    class="rignt-sidebar-list"
                    @click="navigateTo(article.acf.id, $event)"
                  >{{ article.title.rendered }}</li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 mt-100">
            <div
              v-for="(article, _ind_1) in content"
              :key="_ind_1"
              :id="`${article.acf.id}`"
              class="row mb-5"
            >
              <div class="d-none d-lg-block col-lg-4 text-right">
                <img :src="article.acf.img">
              </div>
              <div
                class="col-lg-8 border-right-decore"
                v-html="article.content.rendered"/>
            </div>
          </div>
          <div class="d-none d-lg-block col-lg-4">
            <ul class="right-sidebar">
              <li
                v-for="(article, _ind_2) in content"
                :key="_ind_2"
                :class="{'active': _ind_2 === 0}"
                class="rignt-sidebar-list"
                @click="navigateTo(article.acf.id, $event)"
              >{{ article.title.rendered }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/services/http-common';
import Spinner from '../components/Spinner.vue';
import $ from 'jquery';

export default {
  name: 'About',
  components: {
    Spinner,
  },
  data: () => ({
    content: {},
    rightSidebar: false,
    isLoaded: false,
  }),
  beforeMount() {
    http.get('posts?categories=4').subscribe(
      (response) => {
        if (response) {
          window.scrollTo(0, 0);
          this.content = response;
          this.isLoaded = true;
        }
      },
      (error) => {
        console.log(error);
        this.$router.push('/404');
      },
    );
  },

  methods: {
    navigateTo(id, e) {
      $('li.rignt-sidebar-list').removeClass('active');
      $(e.target).addClass('active');
      const top = document.querySelector(`#${id}`).offsetTop;
      $('html,body').animate(
        {
          scrollTop: top,
        },
        500,
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.about {
  position: relative;
  .mt-100 {
    margin-top: 100px;
  }
}

.border-right-decore::before {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  height: 100%;
  width: 3px;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#f7af8c),
    to(#bb785f)
  );
  background-image: linear-gradient(#f7af8c, #bb785f);
}

.right-sidebar {
  position: sticky;
  top: 100px;
  li {
    padding: 5px 0;
    font-size: 1rem;
    cursor: pointer;
    &.active {
      color: $main-color;
      font-family: MuseoSansCyrl_700;
    }
  }
}

.filter-mobile {
  margin: 100px 10px 0;
  padding: 15px;
  width: 100%;
  padding: 15px;
  box-shadow: 0px 0px 25px -1px $box-shadow;
  cursor: pointer;
  .filter-name {
    font-size: 1.2rem;
    font-family: "MuseoSansCyrl_700";
    color: $link-color;
  }
  .right-sidebar {
    padding: 15px;
  }
}

@media (max-width: 991px) {
  .border-right-decore::before {
    background-image: none !important;
    width: 0 !important;
    background-color: white;
  }
  .mt-100 {
    margin-top: 40px !important;
  }
}
</style>
