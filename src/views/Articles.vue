<template>
  <div>
    <spinner v-if="!isLoaded" />
    <div
      v-if="isLoaded"
      class="articles">
      <div class="row m-0 h-100">
        <div class="d-none d-lg-flex justify-content-end col-lg-5 left-sidebar">
          <div class="filter-wrap_box">
            <div>
              <div>
                <h1>Пошук</h1>
                <md-field>
                  <label>Назва закладу</label>
                  <md-input v-model="search" />
                </md-field>
              </div>
              <div class="mt-3 w-100">
                <div class="d-flex align-items-center justify-content-between">
                  <md-switch
                    v-model="filter"
                    value="Новина">Новини</md-switch>
                  <div :class="[getTag('Новини'),'marker']" />
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <md-switch
                    v-model="filter"
                    value="Акція">Акції</md-switch>
                  <div :class="[getTag('Акції'),'marker']" />
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <md-switch
                    v-model="filter"
                    value="Стаття">Статті</md-switch>
                  <div :class="[getTag('Статті'),'marker']" />
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <md-switch
                    v-model="filter"
                    value="Про проект">Про проект</md-switch>
                  <div :class="[getTag('Про проект'),'marker']" />
                </div>
              </div>
            </div>
            <div
              :style="{ backgroundImage: `url(${page_img})` }"
              class="left_img h-50" />
          </div>
        </div>
        <div class="col-lg-7 content-wrap container">
          <div class="container content-wrap_box m-lg-3">
            <div class="d-block d-lg-none w-100 mb-5">
              <!-- filter for mobile -->
              <div
                class="filter-mobile w-100"
                @click="showFilterMobile = !showFilterMobile">
                <div class="filter-name">Фільтер новин</div>
                <div>
                  <i class="fas fa-filter"/>
                </div>
              </div>
              <transition name="slide-fade">
                <div
                  v-if="showFilterMobile"
                  class="filter-wrap_box p-3">
                  <div>
                    <h1>Пошук</h1>
                    <md-field>
                      <label>Назва закладу</label>
                      <md-input v-model="search" />
                    </md-field>
                  </div>
                  <div class="mt-3 w-100">
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter"
                        value="Новина">Новини</md-switch>
                      <div :class="[getTag('Новини'),'marker']" />
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter"
                        value="Акція">Акції</md-switch>
                      <div :class="[getTag('Акції'),'marker']" />
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter"
                        value="Стаття">Статті</md-switch>
                      <div :class="[getTag('Статті'),'marker']" />
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter"
                        value="Про проект">Про проект</md-switch>
                      <div :class="[getTag('Про проект'),'marker']" />
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <div
              v-for="(news, ind__1) in filterArticle"
              :key="ind__1"
              class="content-wrap_list">
              <h2 v-html="news.acf.name" />
              <div class="row m-0">
                <div class="col-lg-2 p-0 pr-lg-3">
                  <div class="mb-2">
                    <img
                      :src="news.acf.img"
                      alt>
                  </div>
                  <div class="date">{{ news.date | toDate }}</div>
                </div>
                <div class="col-lg-10 p-0 pt-2 pt-lg-0">
                  <div class="d-flex align-items-center mb-3">
                    <div :class="[getTag(news.acf.type),'marker']" />
                    <span class="category_name ml-2">{{ news.acf.type }}</span>
                  </div>
                  <h2 v-html="news.title.rendered" />
                  <div
                    class="content_list"
                    v-html="news.excerpt.rendered" />
                  <router-link :to="`/posts/${news.id}`">Детальніше</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue';
import http from '@/services/http-common';
import _ from 'lodash';
import { format } from 'date-fns';

export default {
  name: 'Articles',
  components: {
    Spinner,
  },
  data() {
    return {
      isLoaded: false,
      content: {},
      page_img: '',
      type: '',
      search: '',
      filter: [],
      showFilterMobile: false,
    };
  },
  filters: {
    toDate(rawData) {
      return format(rawData, 'DD.MM.YY');
    },
  },

  computed: {
    filterArticle() {
      const that = this;
      return _.filter(this.content, (el) => {
        const regEx = new RegExp(`(${that.search})`, 'i');
        return (
          (regEx.test(el.acf.name) || that.search.length === 0) &&
            (_.includes(that.filter, el.acf.type) || that.filter.length === 0)
        );
      });
    },
  },
  beforeMount() {
    http.get('/pages/136').subscribe(
      (response) => {
        if (response) {
          this.page_img = response.acf.img;
        }
      },
      (error) => {
        console.log(error);
        this.$router.push('/404');
      },
    );
    http.get('posts?categories=6').subscribe(
      (response) => {
        if (response) {
          this.content = response;
          this.isLoaded = true;
        }
        if (_.isEmpty(this.content)){
          this.$router.push('/404');
        }
      },
      (error) => {
        console.log(error);
        this.$router.push('/404');
      },
    );
  },
  methods: {
    getTag(type) {
      switch (type.slice(0, type.length - 1)) {
        case 'Новин':
          return 'tag-news';
        case 'Акці':
          return 'tag-stock';
        case 'Статт':
          return 'tag-post';
        case 'Про проек':
          return 'tag-about';
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../assets/scss/_variables.scss";
  .articles {
    height: 100vh;
    overflow: hidden;
    // left
    .left-sidebar {
      background-color: $bg-color;
      background-repeat: no-repeat;
      background-size: 400px;
      background-position-y: bottom;
      background-position-x: right;
      .filter-wrap_box {
        width: 100%;
        max-width: 370px;
        padding-top: 100px;
        padding-right: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 850px;
      }
      h1 {
        font-family: "MuseoSansCyrl_700";
      }
      .left_img {
        width: 383px;
        height: 453px;
        background-position: bottom;
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    // right
    .content-wrap {
      margin-top: 100px;
      height: calc(100vh - 100px);
      .content-wrap_box {
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
        .content-wrap_list {
          margin-bottom: 40px;
          padding-bottom: 20px;
          max-width: 675px;
          border-bottom: 1px solid #f9ebe4;
        }
        h2 {
          font-size: 1.1rem;
          font-family: "MuseoSansCyrl_500";
          line-height: 1.2rem;
        }
        .date,
        .category_name {
          color: $light-text-color;
        }
        .date {
          font-size: 0.7rem;
        }
      }
    }
    .filter-mobile {
      margin: 10px 0;
      padding: 15px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      box-shadow: 0px 0px 25px -1px $box-shadow;
      cursor: pointer;
      >.filter-name {
        font-size: 1.2rem;
        font-family: "MuseoSansCyrl_700";
        color: $link-color;
      }
    }
    @media(max-width: 991px) {
      h1 {
        font-family: "MuseoSansCyrl_700" !important;
        font-size: 2rem !important;
      }
    }
  }
</style>
