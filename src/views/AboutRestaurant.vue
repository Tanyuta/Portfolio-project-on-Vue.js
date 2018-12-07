<template>
  <div>
    <spinner v-if="!isLoaded" />
    <div
      v-if="isLoaded"
      class="aboutRestaurant">
      <div class="row m-0 h-100">
        <div class="d-none d-lg-flex justify-content-end col-lg-5 left-side">
          <div class="left-side_wrap_box">
            <div class="gallery">
                <div
                  id="MiniPreview"
                  :style="{ 'background-image': 'url(' + gallery[index_img].photo + ')' }"
                  class="preview"
                  @click="galleryHandler($event)">
                  <i
                    v-show="gallery.length > 1"
                    id="js-prev"
                    :class="{disabled: index_img === 0}"
                    class="fa fa-arrow-circle-left"/>
                  <i
                    v-show="gallery.length > 1"
                    id="js-next"
                    :class="{disabled: index_img === gallery.length - 1}"
                    class="fa fa-arrow-circle-right"/>
                </div>
              <div class="d-flex miniature">
                <div
                  v-for="(picture, ind_curr) in gallery"
                  :key="ind_curr + 'B'"
                  :style="{ 'background-image': 'url(' + picture.photo + ')' }"
                  class="thumbnail"
                  @click="index_img = ind_curr"/>
              </div>
            </div>
            <div class="address mt-5">
              <h3 class="mb-4">Контакти закладу за адресою:</h3>
              <div
                v-for="(contacts, ind_1) in cafe.acf.subsidiaries"
                :key="ind_1 + 'C'"
                class="mb-4">
                <div class="mb-2">
                  <b>{{ contacts.city.address }}</b>, {{ contacts.address.address }}
                </div>
                <div class="mb-2">
                  <span>Графік роботи:</span>
                  <div>{{ contacts.work_time }}</div>
                </div>
                <div class="mb-2">
                  <span>Телефон:</span>
                  <div>{{ contacts.telephone }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-7 content_wrap">
          <div class="content_wrap_box">
            <div class="content_wrap_box__details">
              <div class="logo"><img
                :src="cafe.acf.logo"
                alt="Logo" ></div>
              <div class="type my-2">
                <span
                  v-for="(type, ind_2) of cafe.pure_taxonomies.establishments_taxonomy"
                  :key="ind_2 + 'D'">
                  {{ cafe.pure_taxonomies.establishments_taxonomy.length != ind_2 + 1 ? type.name + ' | ' : type.name }}
                </span>
              </div>
              <div class="mb-2">
                <a
                  :href="cafe.acf.facebook"
                  class="socials"
                  target="_blank"><img
                    class="icon"
                    src="../assets/img/facebook.svg"></a>
                <span class="name mx-2">{{ cafe.acf.name }}</span>
                <a
                  :href="cafe.acf.website"
                  target="_blank">сайт</a>
              </div>
              <div v-html="cafe.content.rendered"/>
              <div class="prices mb-3">
                <span>Ціновий діапазон: </span><b>{{ cafe.acf.prices }}</b>
                <span
                  v-if="cafe.acf.payment === true"
                  class="ml-3">
                  <img
                    class="icon-filter"
                    src="../assets/img/icons-filters/card.svg"
                    alt="">
                  присутній розрахунок карткою
                </span>
              </div>
              <div class="featuters">
                <div class="mb-2">Ocoбливості:</div>
                <div class="icons">
                  <img
                    v-for="(el, ind_3) in cafe.acf.menu_features"
                    :key="ind_3 + 'F'"
                    :src="el | filterSrc"
                    class="icon-filter mr-2"
                    alt="">
                  <img
                    v-for="(el, ind_4) in cafe.acf.additionally"
                    :key="ind_4 + 'K'"
                    :src="el | filterSrc"
                    class="icon-filter mr-2"
                    alt="">
                  <img
                    v-for="(el, ind_5) in cafe.acf.suitable_for"
                    :key="ind_5 + 'Q'"
                    :src="el | filterSrc"
                    class="icon-filter mr-2"
                    alt="">
                </div>
              </div>
              <div class="row menu mt-5">
                <div class="col-7 p-0"><img
                  src="../assets/img/menu.png"
                  alt=""></div>
                <div class="col-5 p-0">
                  <a
                    :href="cafe.acf.ref_menu"
                    target="_blank"><button class="btn-vprimary">Відкрити меню</button></a>
                  <img
                    class="plate"
                    src="../assets/img/plate.png"
                    alt="">
                </div>
              </div>
              <!-- Posts from establishment if exist-->
              <div
                v-if="posts.length > 0"
                class="posts_wrap">
                <div class="text-center my-5">
                  <h1>Інформація від ресторану</h1>
                </div>
                <div
                  v-for="(post, ind_6) in posts"
                  :key="ind_6 + 'A'">
                  <h2 v-html="post.acf.name" />
                  <div class="d-flex">
                    <div class="left-part_list w-50">
                      <div class="mb-2"><img
                        :src="post.acf.img"
                        alt=""></div>
                      <div class="date">{{ post.date | toDate }}</div>
                    </div>
                    <div class="right-part_list w-50">
                      <div class="d-flex align-items-center mb-3">
                        <div :class="[getTag(post.acf.type),'marker']" />
                        <span class="category_name ml-2">{{ post.acf.type }}</span>
                      </div>
                      <h2 v-html="post.title.rendered" />
                      <div
                        class="content_list"
                        v-html="post.excerpt.rendered" />
                      <router-link :to="`/posts/${post.id}`">Детальніше</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition name="fade">
        <gallery-preview
          v-show="showModal"
          :gallery="gallery"
          :index="index_img"
          @close="showModal = !showModal"/>
      </transition>
    </div>
  </div>
</template>

<script>
import VueGallery from 'vue-gallery';
import http from '@/services/http-common';
import _ from 'lodash';
import format from 'date-fns';
import Spinner from '../components/Spinner.vue';
import GalleryPreview from '../components/GalleryPreview.vue';

export default {
  name: 'AboutRestaurant',
  components: {
    VueGallery,
    Spinner,
    GalleryPreview,
  },
  data() {
    return {
      cafe: [],
      posts: [],
      isLoaded: false,
      gallery: [],
      index_img: 0,
      showModal: false,
    };
  },
  filters: {
    toDate(rawData) {
      return format(rawData, 'DD.MM.YY');
    },
    filterSrc(str) {
      const arr = _.split(str, ':', 2);
      switch (arr[0]) {
        // menu_features
        case 'vegan':
          return '../img/icons-filters/1.png';
        case 'vegetarian':
          return '../img/icons-filters/2.png';
        case 'vegan-friendly':
          return '../img/icons-filters/3.png';
        case 'charity':
          return '../img/icons-filters/4.png';
        case 'auto-charity':
          return '../img/icons-filters/5.png';
          //  additionally
        case 'kids-friendly':
          return '../img/icons-filters/6.png';
        case 'animal-friendly':
          return '../img/icons-filters/7.png';
        case 'disabled-friendly':
          return '../img/icons-filters/8.png';
        case 'food-delivery':
          return '../img/icons-filters/9.png';
        case 'take-away-food':
          return '../img/icons-filters/10.png';
        case 'wi-fi':
          return '../img/icons-filters/11.png';
        case 'summer-playground':
          return '../img/icons-filters/12.png';
        case 'all-time':
          return '../img/icons-filters/13.png';
        case 'alcogol':
          return '../img/icons-filters/14.png';
        case 'hookah':
          return '../img/icons-filters/15.png';
          // sutable_for
        case 'date':
          return '../img/icons-filters/16.png';
        case 'companies':
          return '../img/icons-filters/17.png';
        case 'business_meetings':
          return '../img/icons-filters/18.png';
        case 'banquets':
          return '../img/icons-filters/19.png';
        default:
          return false;
      }
    },
  },
  beforeMount() {
    http.get(`/_establishments/${this.$route.params.id}`).subscribe(
      (response) => {
        if (response) {
          this.cafe = response;
          this.gallery = response.acf.pictures;
          // ищем есть у этого ресторана посты по name establishment
          http.get('posts?categories=6').subscribe(
            (response) => {
              if (response) {
                const allPosts = response;
                this.posts = _.filter(allPosts, el => (String(el.acf.name) === String(this.cafe.acf.name)));
                this.isLoaded = true;
              }
              // if (_.isEmpty(this.posts)){
              //   this.$router.push('/404');
              // }
            },
            (error) => {
              console.log(error);
              this.$router.push('/404');
            },
          );
        }
      },
      (error) => {
        console.log(error);
        this.$router.push('/404');
      },
    );
  },
  methods: {
    galleryHandler(e) {
      const _target = e.target.getAttribute('id');
      if (String(_target) === 'js-prev') {
        if (this.index_img !== 0) {
          this.index_img = this.index_img - 1;
        }
      } else if (String(_target) === 'js-next') {
        if (this.index_img !== this.gallery.length - 1) {
          this.index_img = this.index_img + 1;
        }
      } else {
        this.showModal = !this.showModal;
      }
    },
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
  .aboutRestaurant {
      height: 100vh;
      .left-side {
          background-color: $bg-color;
          .left-side_wrap_box {
              width: 100%;
              max-width: 370px;
              height: calc(100vh - 100px);
              position: fixed;
              top: 100px;
              overflow-y: scroll;
              overflow-x: none;
          }
          .gallery {
              width: 298px;
              .preview {
                  height: 200px;
                  background-size: cover;
                  background-repeat: no-repeat;
                  transition: all 1s ease;
                  position: relative;
                  .fa-arrow-circle-right,
                  .fa-arrow-circle-left {
                      color: white;
                      position: absolute;
                      top: 50%;
                      font-size: 1.4rem;
                      cursor: pointer;
                  }
                  .fa-arrow-circle-right {
                      right: 14px;
                  }
                  .fa-arrow-circle-left {
                      left: 14px;
                  }
                  .disabled {
                      opacity: .7;
                      cursor: not-allowed;
                  }
              }
              .miniature {
                  padding-top: 6px;
                  .thumbnail {
                      background-size: cover;
                      background-repeat: no-repeat;
                      width: 70px;
                      height: 55px;
                  }
                  >div:not(:last-child) {
                      margin-right: 6px;
                  }
              }
          }
          .gallery-preview-wrapper {
              width: 100%;
              height: 100%;
              display: flex;
              flex-flow: column;
          }
          .address {
              line-height: 1.3;
              h3 {
                  font-size: 1.3rem;
              }
          }
          span {
              color: $light-text-color;
              font-size: .7rem;
          }
      }
      .content_wrap {
          padding-top: 100px;
          .content_wrap_box {
              width: 100%;
              height: 100%;
              overflow: hidden;
              overflow-y: scroll;
          }
          .content_wrap_box__details {
              margin: 40px;
              padding: 20px;
              max-width: 675px;
              .type {
                  color: $light-text-color;
                  font-size: .8rem;
              }
              .name,
              .featuters>div:first-of-type {
                  font-size: 1rem;
                  font-family: "MuseoSansCyrl_700";
              }
              .prices>span:first-child {
                  font-family: "MuseoSansCyrl_500";
                  color: #ccc8c8;
              }
              .icon-filter,
              .socials>img {
                  width: 20px;
                  height: 20px;
              }
              .menu {
                  .btn-vprimary {
                      margin-top: 30%;
                      max-width: 200px;
                  }
                  .plate {
                      margin-top: 40px;
                      width: 100%;
                      max-width: 200px;
                  }
              }
              .posts_wrap {
                  border-bottom: 1px solid #f9ebe4;
                  width: 100%;
                  padding-bottom: 30px;
                  h1 {
                      font-size: 2rem;
                      font-family: "MuseoSansCyrl_500";
                  }
                  .left-part_list {
                      width: 50%;
                      margin-right: 15px;
                  }
                  .right-part_list {
                      width: 50%;
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
                      font-size: .7rem;
                  }
              }
          }
      }
  }
</style>
