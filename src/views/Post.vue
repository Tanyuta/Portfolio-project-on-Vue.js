<template>
  <div>
    <spinner v-if="!isLoaded" />
    <div
      v-if="isLoaded"
      class="post">
      <div class="container">
        <div
          class="row">
          <div class="col-lg-3">
            <div class="d-flex align-items-center mb-3">
              <div class="d-flex align-items-center mr-3">
                <div :class="[getTag(post.acf.type),'marker']" />
                <span class="category_name ml-2">{{ post.acf.type }}:</span>
              </div>
              <div class="date">{{ post.date | toDate }}</div>
            </div>
            <h2 v-html="post.title.rendered" />
            <div
              class="post_name mb-3"
              v-html="post.acf.name" />
          </div>
          <div class="col-lg-6 content">
            <img
              :src="post.acf.img"
              alt="">
            <div
              class="mt-4"
              v-html="post.content.rendered" />
          </div>
          <div class="col-lg-3 read-more">
            <h2>Читайте також</h2>
            <div
              v-for="(el, ind__2) in all_posts"
              :key="ind__2">
              <div class="date mb-2">{{ el.date | toDate }}</div>
              <h3 v-html="el.title.rendered" />
              <p
                class="content_list"
                v-html="el.excerpt.rendered" />
              <router-link :to="`/posts/${el.id}`">Детальніше</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/services/http-common';
import { format } from 'date-fns';
import _ from 'lodash';
import Spinner from '../components/Spinner.vue';

export default {
  name: 'Post',
  components: {
    Spinner,
  },
  data() {
    return {
      isLoaded: false,
      post: {},
      all_posts: [],
      id: this.$route.params.id,
    };
  },
  filters: {
    toDate(rawData) {
      return format(rawData, 'DD.MM.YY');
    },
  },
  // switch post right panel
  watch: {
    $route(toR) {
      this.id = toR.params.id;
      this.all_posts.forEach((el) => {
        if (Number(this.id) === Number(el.id)) {
          this.post = el;
        }
      });
    },
  },
  created() {
    http.get('posts?categories=6').subscribe(
      (response) => {
        if (response) {
          this.all_posts = response;
          this.all_posts.forEach((el) => {            
          if (Number(this.id) === Number(el.id)) {
            this.post = el;
          }
          });
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
        default:
          return 'tag-news';
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../assets/scss/_variables.scss";
  h2 {
    font-size: 1.5rem;
  }

  .date,
  .category_name {
    color: $light-text-color;
  }

  .date {
    font-size: .7rem;
  }

  h2 {
    font-size: 1.7rem;
    line-height: 2rem;
    margin-bottom: 1rem;
  }

  .post_name {
    font-family: "MuseoSansCyrl_500";
  }

  .read-more,
  .content {
    height: calc(100vh - 120px);
    overflow-y: auto;
  }

  .read-more {
    padding: 0 30px;
    h3 {
      font-size: 1rem;
      line-height: 1.2;
    }
    .content_list {
      font-size: .8rem;
      line-height: 1.2;
    }
    &>div {
      margin-bottom: 30px;
    }
  }

  .content {
    padding-right: 20px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      right: 0;
      height: 120%;
      width: 3px;
      background-image: -webkit-gradient(linear, left top, left bottom, from(#f7af8c), to(#bb785f));
      background-image: linear-gradient(#f7af8c, #bb785f);
    }
  }

  @media(max-width: 991px) {
    .content {
      height: auto !important;
      overflow: hidden;
      &::before {
        background: transparent !important;
      }
    }
    .read-more {
      margin-top: 30px;
      height: 100% !important;
      overflow: hidden;
    }
  }
</style>
