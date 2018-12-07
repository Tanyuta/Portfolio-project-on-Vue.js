<template>
  <div>
    <spinner v-if="!isLoaded" />
    <div
      v-if="isLoaded"
      class="home">
      <div class="container">
        <div class="row m-0 mt-5">
          <div class="col-lg-8">
            <div class="row">
              <div class="col">
                <h1 class="project_name">{{ project_name }}</h1>
              </div>
            </div>
            <div class="row mt-3 align-items-center">
              <div class="d-none d-lg-block col-lg-3">
                <img
                  :src="left_image"
                  class="left_image">
              </div>
              <div class="col-12 col-lg-9">
                <div v-html="description" />
                <a
                  target="_blank"
                  href="https://t.me/Vegan_City_bot"><button class="btn-vprimary">Відправити чек</button></a>
              </div>
            </div>
          </div>
          <div class="d-none d-lg-block col-lg-4">
            <img
            :src="right_image"
            class="right_image"/>
          </div>
        </div>
        <div class="search-block">
          <div class="row m-0 search-block_context">
            <div class="col-lg-3">
              <h2>Привіт!</h2>
              <p>Скористайся пошуком, щоб знайти найближчий vegan-friendly заклад</p>
            </div>
            <div class="col-lg-3 ">
              <span class="input_name">Місто</span>
              <select
                v-model="selectCity"
                class="input_type">
                <option
                  v-for="(city, key_1) in cities"
                  :value="city"
                  :key="key_1">{{ city.address }}</option>
              </select>
            </div>
            <div class="col-lg-3">
              <md-field>
                <label>Назва закладу</label>
                <md-input
                  v-model="search"
                  @keyup="liveSearch()" />
              </md-field>
            </div>
            <div class="col-lg-3 border-left">
              <div class="reserved_text mb-2">Або зарезервуй столик за допомогою нашого бота</div>
              <a
                class="telelegram-bot"
                href="https://t.me/Vegan_City_bot"
                target="_blank">
                <span class="telegram_ico" />Vegan_City_bot
              </a>
            </div>
          </div>
        </div>
      </div>
      <google-map
        :center="center"
        :markers="markers"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import http from '@/services/http-common';
import _ from 'lodash';
import GoogleMap from '../components/GoogleMap.vue';
import Spinner from '../components/Spinner.vue';

export default {
  name: 'Home',
  components: {
    GoogleMap,
    Spinner,
  },
  data() {
    return {
      arrayRestaurant: [],
      search: '',
      cities: [],
      markers: [],
      selectCity: {},
      isLoaded: false,
      project_name: '',
      description: '',
      left_image: '',
      right_image: '',
    };
  },
  computed: {
    center() {
      return {
        lat: +this.selectCity.lat || 50.45466,
        lng: +this.selectCity.lng || 30.5238,
      };
    },
  },
  beforeMount() {
    http.get('pages/8').subscribe(
      (response) => {
        if (response) {
          this.project_name = response.acf.project_name;
          this.description = response.content.rendered;
          this.left_image = response.acf.left_image;
          this.right_image = response.acf.right_image;
          this.isLoaded = true;
        }
      },
      (error) => {
        console.log(error);
        this.$router.push('/404');
      },
    );
    http.get('/_establishments').subscribe(
      (response) => {
        if (response) {
          this.arrayRestaurants = response;
          // get unique cities where are our restaurants that show it in dropdown cities for filter
          this.getUniqueCities(this.arrayRestaurants);
          this.setMarkers(this.arrayRestaurants);
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
    liveSearch() {
      let filterArray = [];
      filterArray = this.arrayRestaurants.filter(el => (el.acf.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1));
      if (filterArray.length > 0) {
        this.markers = [];
      }
      this.setMarkers(filterArray);
    },
    setMarkers(data) {
      const infoData = [];
      // position
      data.map(e => e.acf.subsidiaries).map(el => el.forEach((element) => {
        this.markers.push({
          position: {
            lat: Number(element.address.lat),
            lng: Number(element.address.lng),
          },
        });
      }));
      // infoWindow
      data.forEach(((e) => {
        const id = e.id;
        const types = [];
        const name = e.acf.name;
        e.pure_taxonomies.establishments_taxonomy.forEach((el) => {
          types.push(el.name);
        });
        e.acf.subsidiaries.forEach((elem) => {
          const address = `${elem.city.address}, ${elem.address.address}`;
          infoData.push({
            id,
            name,
            types,
            address,
          });
        });
      }));
      this.markers.forEach((el, ind) => {
        el.infoData = infoData[ind];
      });
    },
    getUniqueCities(data) {
      data.map(e => e.acf.subsidiaries.map(el => el.city))
        .map(e => e.forEach((el) => {
          if (!(_.find(this.cities, {
            address: `${el.address}`,
          }))) {
            this.cities.push(el);
          }
        }));
      this.cities = [...new Set(this.cities)];
      this.selectCity = this.cities[0];
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../assets/scss/_variables.scss";
  @import "../assets/scss/home.scss";
</style>
