<template>
  <div>
    <spinner v-if="!isLoaded" />
    <div
      v-if="isLoaded"
      class="establishments">
      <div class="row m-0 h-100">
        <div class="d-none d-lg-flex justify-content-end col-lg-5 left-sidebar">
          <!-- filter left side -->
          <div class="filter-wrap_box">
            <div>
              <h1>Пошук закладу</h1>
              <md-field>
                <label>Назва закладу</label>
                <md-input v-model="filter.search" />
              </md-field>
              <md-field>
                <md-select
                  v-model="filter.type"
                  placeholder="Тип закладу">
                  <md-option value="">Всі</md-option>
                  <md-option value="Кафе">Кафе</md-option>
                  <md-option value="Бар">Бар</md-option>
                  <md-option value="Ресторан">Ресторан</md-option>
                  <md-option value="Кондитерська">Кондитерська</md-option>
                  <md-option value="Фаст-фуд">Фаст-фуд</md-option>
                </md-select>
              </md-field>
              <md-field>
                <md-select
                  v-model="filter.city"
                  placeholder="Місто">
                  <md-option value="">Всі</md-option>
                  <md-option
                    v-for="(city, i) in cities"
                    :key="'A' + i"
                    :value="city.address">{{ city.address }}</md-option>
                </md-select>
              </md-field>
              <md-field>
                <md-select
                  v-model="filter.prices"
                  placeholder="Ціновий діапазон">
                  <md-option value="">Всі</md-option>
                  <md-option value="$-$$">$-$$</md-option>
                  <md-option value="$$-$$$">$$-$$$</md-option>
                  <md-option value="$$$-$$$$">$$$-$$$$</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="mt-4 w-100">
              <h2>Особливості меню</h2>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.menu_features"
                  value="vegan">vegan</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/1.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.menu_features"
                  value="vegetarian">vegetarian</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/2.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.menu_features"
                  value="vegan-friendly">vegan-friendly</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/3.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.menu_features"
                  value="charity">Благодійність через chat-bot на основі чеків</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/4.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.menu_features"
                  value="auto-charity">Благодійність автоматично</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/5.png"
                  alt>
              </div>
            </div>
            <div class="mt-4 w-100">
              <h2>Розразхунок</h2>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.payment"
                  value="card">розрахунок карткою</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/card-black.svg"
                  alt>
              </div>
            </div>
            <div class="mt-4 w-100">
              <h2>Додатково</h2>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.additionally"
                  value="kids-friendly">kids-friendly</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/6.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.additionally"
                  value="animal-friendly">animal-friendly</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/7.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.additionally"
                  value="disabled-friendly">disabled-friendly</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/8.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.additionally"
                  value="food-delivery">доставка їжі</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/9.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.additionally"
                  value="take-away-food">їжа на виніс</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/10.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.additionally"
                  value="wi-fi">wi-fi</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/11.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.additionally"
                  value="summer-playground">літній майданчик</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/12.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.additionally"
                  value="all-time">цілодобово</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/13.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.additionally"
                  value="alcogol">алкоголь</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/14.png"
                  alt>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <md-switch
                  v-model="filter.additionally"
                  value="hookah">кальян</md-switch>
                <img
                  class="icon-filter"
                  src="img/icons-filters/15.png"
                  alt>
              </div>
              <div class="mt-4 w-100">
                <h2>Підходить для</h2>
                <div class="d-flex align-items-center justify-content-between">
                  <md-switch
                    v-model="filter.suitable_for"
                    value="date">побачень</md-switch>
                  <img
                    class="icon-filter"
                    src="img/icons-filters/16.png"
                    alt>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <md-switch
                    v-model="filter.suitable_for"
                    value="companies">компанії</md-switch>
                  <img
                    class="icon-filter"
                    src="img/icons-filters/17.png"
                    alt>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <md-switch
                    v-model="filter.suitable_for"
                    value="business_meetings">бізнес-зустрічей</md-switch>
                  <img
                    class="icon-filter"
                    src="img/icons-filters/18.png"
                    alt>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <md-switch
                    v-model="filter.suitable_for"
                    value="banquets">бенкетів</md-switch>
                  <img
                    class="icon-filter"
                    src="img/icons-filters/19.png"
                    alt>
                </div>
              </div>
            </div>
            <div
              :style="{ backgroundImage: `url(${page_img})` }"
              class="left_img" />
          </div>
        </div>
        <div class="col-lg-7 content-wrap">
          <div class="container content-wrap_box">
            <div class="d-block d-lg-none w-100">
              <!-- filter for mobile -->
              <div
                class="filter-mobile w-100"
                @click="showFilterMobile = !showFilterMobile">
                <div>Фільтер закладів</div>
                <div>
                  <i class="fas fa-filter" />
                </div>
              </div>
              <transition name="slide-fade">
                <div
                  v-if="showFilterMobile"
                  class="filter-wrap_box">
                  <div>
                    <h1>Пошук закладу</h1>
                    <md-field>
                      <label>Назва закладу</label>
                      <md-input v-model="filter.search" />
                    </md-field>
                    <md-field>
                      <md-select
                        v-model="filter.type"
                        placeholder="Тип закладу">
                        <md-option
                          value
                          disabled>Всі</md-option>
                        <md-option value="Кафе">Кафе</md-option>
                        <md-option value="Бар">Бар</md-option>
                        <md-option value="Ресторан">Ресторан</md-option>
                        <md-option value="Кондитерська">Кондитерська</md-option>
                        <md-option value="Фаст-фуд">Фаст-фуд</md-option>
                      </md-select>
                    </md-field>
                    <md-field>
                      <md-select
                        v-model="filter.city"
                        placeholder="Місто">
                        <md-option
                          value
                          disabled>Всі</md-option>
                        <md-option
                          v-for="(city, i) in cities"
                          :key="'A' + i"
                          :value="city.address">{{ city.address }}</md-option>
                      </md-select>
                    </md-field>
                    <md-field>
                      <md-select
                        v-model="filter.prices"
                        placeholder="Ціновий діапазон">
                        <md-option
                          value
                          disabled>Всі</md-option>
                        <md-option value="$-$$">$-$$</md-option>
                        <md-option value="$$-$$$">$$-$$$</md-option>
                        <md-option value="$$$-$$$$">$$$-$$$$</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="mt-4 w-100">
                    <h2>Особливості меню</h2>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.menu_features"
                        value="vegan">vegan</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/1.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.menu_features"
                        value="vegetarian">vegetarian</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/2.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.menu_features"
                        value="vegan-friendly">vegan-friendly</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/3.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.menu_features"
                        value="charity">Благодійність через chat-bot на основі чеків</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/4.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.menu_features"
                        value="auto-charity">Благодійність автоматично</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/5.png"
                        alt>
                    </div>
                  </div>

                  <div class="mt-4 w-100">
                    <h2>Розразхунок</h2>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.payment"
                        value="card">розрахунок карткою</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/card-black.svg"
                        alt>
                    </div>
                  </div>

                  <div class="mt-4 w-100">
                    <h2>Додатково</h2>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.additionally"
                        value="kids-friendly">kids-friendly</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/6.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.additionally"
                        value="animal-friendly">animal-friendly</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/7.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.additionally"
                        value="disabled-friendly">disabled-friendly</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/8.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.additionally"
                        value="food-delivery">доставка їжі</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/9.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.additionally"
                        value="take-away-food">їжа на виніс</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/10.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.additionally"
                        value="wi-fi">wi-fi</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/11.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.additionally"
                        value="summer-playground">літній майданчик</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/12.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.additionally"
                        value="all-time">цілодобово</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/13.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.additionally"
                        value="alcogol">алкоголь</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/14.png"
                        alt>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <md-switch
                        v-model="filter.additionally"
                        value="hookah">кальян</md-switch>
                      <img
                        class="icon-filter"
                        src="img/icons-filters/15.png"
                        alt>
                    </div>
                    <div class="mt-4 w-100">
                      <h2>Підходить для</h2>
                      <div class="d-flex align-items-center justify-content-between">
                        <md-switch
                          v-model="filter.suitable_for"
                          value="date">побачень</md-switch>
                        <img
                          class="icon-filter"
                          src="img/icons-filters/16.png"
                          alt>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <md-switch
                          v-model="filter.suitable_for"
                          value="companies">компанії</md-switch>
                        <img
                          class="icon-filter"
                          src="img/icons-filters/17.png"
                          alt>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <md-switch
                          v-model="filter.suitable_for"
                          value="business_meetings">бізнес-зустрічей</md-switch>
                        <img
                          class="icon-filter"
                          src="img/icons-filters/18.png"
                          alt>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <md-switch
                          v-model="filter.suitable_for"
                          value="banquets">бенкетів</md-switch>
                        <img
                          class="icon-filter"
                          src="img/icons-filters/19.png"
                          alt>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <!-- establishments list -->
            <div
              v-for="(cafe, i) of filterRestaurants"
              :key="'B' + i"
              class="content-wrap_list establishment_list">
              <div class="d-flex">
                <div class="left-part_list d-none d-lg-block">
                  <img
                    :src="cafe.acf.logo"
                    class="logo-establishment"
                    alt="Logo">
                </div>
                <div class="right-part_list">
                  <div class="row m-0">
                    <div class="col-8 col-lg-12 p-0">
                      <span
                        v-for="(type, ind) of cafe.pure_taxonomies.establishments_taxonomy"
                        :key="'C' + ind"
                        class="type">{{ cafe.pure_taxonomies.establishments_taxonomy.length != ind + 1 ? type.name + ' | ' : type.name }}</span>
                      <h2 class="name">{{ cafe.acf.name }}</h2>
                    </div>
                    <div class="col-4 d-lg-none p-0">
                      <img
                        :src="cafe.acf.logo"
                        class="logo-establishment"
                        alt="Logo">
                    </div>
                  </div>
                  <div
                    v-for="(address, i) of cafe.acf.subsidiaries"
                    :key="'K' + i"
                    class="address">
                    <div>{{ address.city.address + ', ' + address.address.address }}</div>
                    <div>{{ address.work_time }}</div>
                  </div>
                  <div class="prices">
                    <span>Ціновий діапазон:</span> {{ cafe.acf.prices }}
                    <span
                      v-if="cafe.acf.payment === true"
                      class="ml-3">
                      <img
                        class="icon-filter"
                        src="img/icons-filters/card.svg"
                        alt>
                      присутній розрахунок карткою
                    </span>
                  </div>
                  <div class="mt-2 mb-3">
                    <span class="icons">
                      <img
                        v-for="(el, i) in cafe.acf.menu_features"
                        :key="'D' + i"
                        :src="el | filterSrc"
                        class="icon-filter mr-2"
                        alt
                      >
                      <!-- :key="`A + ${index}`" -> for unique key -->
                      <img
                        v-for="(el, i) in cafe.acf.additionally"
                        :key="'E' + i"
                        :src="el | filterSrc"
                        class="icon-filter mr-2"
                        alt
                      >
                      <img
                        v-for="(el, i) in cafe.acf.suitable_for"
                        :key="'F' + i"
                        :src="el | filterSrc"
                        class="icon-filter mr-2"
                        alt
                      >
                    </span>
                  </div>
                  <router-link :to="`/establishments/${cafe.id}`">Детальніше</router-link>
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
import http from '@/services/http-common';
import _ from 'lodash';
import {
  format,
  isEqual,
  lastDayOfISOYear,
} from 'date-fns';
import Spinner from '../components/Spinner.vue';

export default {
  name: 'Establishments',
  components: {
    Spinner,
  },
  data() {
    return {
      filter: {
        search: '',
        type: [],
        city: [],
        prices: [],
        menu_features: [],
        payment: [],
        additionally: [],
        suitable_for: [],
      },
      showFilterMobile: false,
      cities: [],
      arrayRestaurants: {},
      page_img: '',
      isLoaded: false,
    };
  },
  filters: {
    filterSrc(str) {
      const arr = _.split(str, ':', 2);
      switch (arr[0]) {
        // menu_features
        case 'vegan':
          return 'img/icons-filters/1.png';
        case 'vegetarian':
          return 'img/icons-filters/2.png';
        case 'vegan-friendly':
          return 'img/icons-filters/3.png';
        case 'charity':
          return 'img/icons-filters/4.png';
        case 'auto-charity':
          return 'img/icons-filters/5.png';
          //  additionally
        case 'kids-friendly':
          return 'img/icons-filters/6.png';
        case 'animal-friendly':
          return 'img/icons-filters/7.png';
        case 'disabled-friendly':
          return 'img/icons-filters/8.png';
        case 'food-delivery':
          return 'img/icons-filters/9.png';
        case 'take-away-food':
          return 'img/icons-filters/10.png';
        case 'wi-fi':
          return 'img/icons-filters/11.png';
        case 'summer-playground':
          return 'img/icons-filters/12.png';
        case 'all-time':
          return 'img/icons-filters/13.png';
        case 'alcogol':
          return 'img/icons-filters/14.png';
        case 'hookah':
          return 'img/icons-filters/15.png';
          // sutable_for
        case 'date':
          return 'img/icons-filters/16.png';
        case 'companies':
          return 'img/icons-filters/17.png';
        case 'business_meetings':
          return 'img/icons-filters/18.png';
        case 'banquets':
          return 'img/icons-filters/19.png';
        default:
          return false;
      }
    },
  },
  computed: {
    filterRestaurants() {
      return _.filter(this.arrayRestaurants, (el) => {
        if (
          this.filterSearch(el.acf.name, this.filter.search) &&
            this.filter_Type_City( el.pure_taxonomies.establishments_taxonomy, this.filter.type, 'type',) &&
            this.filter_Type_City(
              el.acf.subsidiaries,
              this.filter.city,
              'city',
            ) &&
            this.filterPrices(el.acf.prices, this.filter.prices) &&
            this.filterPayment(el.acf.payment, this.filter.payment) &&
            this.filterAboutEstablishments(
              el.acf.menu_features,
              this.filter.menu_features,
            ) &&
            this.filterAboutEstablishments(
              el.acf.additionally,
              this.filter.additionally,
            ) &&
            this.filterAboutEstablishments(
              el.acf.suitable_for,
              this.filter.suitable_for,
            )
        ) {
          return true;
        }
      });
    },
  },
  beforeMount() {
    http.get('/pages/195').subscribe(
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
    http.get('/_establishments').subscribe(
      (response) => {
        if (response) {
          this.arrayRestaurants = response;
          this.getUniqueCities(this.arrayRestaurants);
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
    // splitter
    splitter(arg) {
      const newArr = [];
      let temp = [];
      arg.forEach((e) => {
        temp = _.split(e, ':');
        newArr.push(temp[0]);
      });
      return newArr;
    },
    // search
    filterSearch(el, filter) {
      const regEx = new RegExp(`(${filter})`, 'i');
      return regEx.test(el) || filter.length === 0;
    },
    // type / city
    filter_Type_City(arg, filter, str) {
      let check = false;
      if (filter === undefined || filter === "" || arg === undefined) {
        check = true;
      } else {
        // from select option come string that why we convert into array
        if (!_.isArray(filter)) {
          const filterArr = [];
          filterArr.push(filter);
          filter = filterArr;
        }
        arg.forEach((arr) => {
          if (String(str) === 'type') {
            _.includes(filter, arr.name) ? (check = true) : false;
          } else if (str === 'city') {
            _.includes(filter, arr.city.address) ? (check = true) : false;
          }
          if (check === true) {
            return check;
          }
        });
      }
      return check;
    },
    // price
    filterPrices(arg, filter) {
      return !!(filter === undefined || filter === "" || arg === filter);
    },
    // payment
    filterPayment(arg, filter) {
      return !!(filter.length === 0 ||
          (filter.length === 1 && filter[0] === 'card' && arg === true));
    },
    // filter menu
    filterAboutEstablishments(arg, filter) {
      let check = false;
      if (filter.length === 0) {
        check = true;
      } else if (filter.length > 0 && arg != '') {
        arg = this.splitter(arg);
        arg.forEach((e) => {
          if (_.includes(filter, e)) {
            check = true;
          }
          if (check === true) {
            return check;
          }
        });
      } else {
        check = false;
      }
      return check;
    },
    getUniqueCities(data) {
      data
        .map(e => e.acf.subsidiaries.map(el => el.city))
        .map(e =>
          e.forEach((el) => {
            if (!_.find(this.cities, {
              address: `${el.address}`,
            })) {
              this.cities.push(el);
            }
          }));
      this.cities = [...new Set(this.cities)];
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../assets/scss/_variables.scss";
  .establishments {
    height: 100vh;
  }

  .establishment_list {
    font-size: 0.8rem;
    h2 {
      font-size: 1.15rem;
      font-family: "MuseoSansCyrl_500";
    }
    .type {
      font-size: 0.7rem;
      color: $light-text-color;
    }
    .address {
      &>div:first-child {
        color: $light-text-color;
      }
    }
    .prices {
      &>span:first-child {
        color: $light-text-color;
      }
    }
    .icons {
      line-height: 2;
    }
  }

  .left-sidebar {
    background-color: $bg-color;
    .filter-wrap_box {
      width: 100%;
      max-width: 370px;
      padding-right: 100px;
      height: calc(100vh - 100px);
      position: fixed;
      top: 100px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

  .content-wrap {
    margin-top: 100px;
    height: calc(100vh - 100px);
    .content-wrap_box {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: scroll;
      .content-wrap_list {
        padding: 40px 20px;
        max-width: 675px;
        &:hover {
          box-shadow: 0px 17px 40px -1px $box-shadow;
        }
        .left-part_list {
          width: 170px;
          margin-right: 15px;
          &>img {
            width: 100%;
          }
        }
        .right-part_list {
          width: 87%;
        }
      }
      .logo-establishment {
        width: 100%;
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
    }
  }

  h2 {
    font-size: 1.1rem;
    font-family: "MuseoSansCyrl_500";
    line-height: 1.2rem;
  }

  h1 {
    font-family: "MuseoSansCyrl_700";
  }

  .date,
  .category_name {
    color: $light-text-color;
  }

  .date {
    font-size: 0.7rem;
  }

  .left_img {
    width: 400px;
    height: 471px;
    background-position: 62% -26%;
    background-size: 126%;
    margin-bottom: -65px;
    background-repeat: no-repeat;
  }

  .icon-filter {
    width: 20px;
    height: 20px;
  }

  .md-switch {
    width: 90%;
  }

  .md-field:last-child::after {
    height: 2px;
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
    &>div:first-child {
      font-size: 1.2rem;
      font-family: "MuseoSansCyrl_700";
      color: $link-color;
    }
  }

  @media (max-width: 991px) {
    .filter-wrap_box {
      transition: all 1s ease;
      padding: 30px;
      h1 {
        font-size: 2rem;
      }
    }
    .content-wrap_box {
      .content-wrap_list {
        padding: 30px !important;
        margin-bottom: 40px !important;
        .logo-establishment {
          width: 60px;
          float: right;
        }
        .right-part_list {
          width: 100% !important;
        }
      }
    }
  }
</style>
