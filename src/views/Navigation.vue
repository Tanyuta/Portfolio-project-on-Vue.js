<template>
  <div class="menu">
    <div class="container h-100">
      <!-- костыль для стилей под articles -->
      <nav :class="['navbar navbar-expand-lg navbar-light h-100', modificator]">
        <div class="group-btns-mobile d-flex d-lg-none">
          <button
            class="navbar-toggler p-0"
            type="button"
            data-target="#nav"
            @click="showMobileMenu = !showMobileMenu"
          >
            <span class="navbar-toggler-icon"/>
          </button>
          <div class="d-flex d-lg-none">
            <a
              class="socials mr-2"
              href="https://www.facebook.com/Vegancity.family">
              <img src="../assets/img/facebook.svg">
            </a>
            <a
              class="socials"
              href="https://www.instagram.com/vegan.city.family">
              <img src="../assets/img/instagram.svg">
            </a>
          </div>
        </div>
        <div class="logo d-block d-lg-none">
          <img src="../assets/img/LogoVeganCity.svg">
        </div>
        <div class="d-none w-100 d-lg-flex justify-content-between align-items-center">
          <div class="logo">
            <img src="../assets/img/LogoVeganCity.svg">
          </div>
          <div class="navbar-nav">
            <router-link
              :to="'/'"
              :class="{'router-link-active': $route.fullPath ==='/'}"
            >Мапа ресторанів</router-link>
            <router-link
              :to="'/establishments'"
              :class="{'router-link-active': $route.fullPath === '/establishments'}"
            >Заклади-учасники</router-link>
            <router-link
              :to="'/about'"
              :class="{'router-link-active': $route.fullPath === '/about'}"
            >Про проект</router-link>
            <router-link
              :to="'/articles'"
              :class="{'router-link-active': $route.fullPath === '/articles'}"
            >Почитати</router-link>
            <router-link
              :to="'/contacts'"
              :class="{'router-link-active': $route.fullPath === '/contacts'}"
            >Контакти</router-link>
            <a
              class="socials"
              href="https://www.facebook.com/Vegancity.family">
              <img src="../assets/img/facebook.svg">
            </a>
            <a
              class="socials"
              href="https://www.instagram.com/vegan.city.family">
              <img src="../assets/img/instagram.svg">
            </a>
          </div>
        </div>
      </nav>
    </div>
    <!-- menu mobile -->
    <transition name="slide-fade">
      <div
        v-if="showMobileMenu"
        id="nav"
        class="navbar-collapse w-100 mobile-menu d-lg-none">
        <div class="container">
          <div
            class="navbar-nav"
            @click="showMobileMenu = !showMobileMenu">
            <router-link
              :to="'/'"
              :class="{'router-link-active': $route.fullPath === '/'}"
            >Мапа ресторанів</router-link>
            <router-link
              :to="'/establishments'"
              :class="{'router-link-active': $route.fullPath === '/establishments'}"
            >Заклади-учасники</router-link>
            <router-link
              :to="'/about'"
              :class="{'router-link-active': $route.fullPath === '/about'}"
            >Про проект</router-link>
            <router-link
              :to="'/articles'"
              :class="{'router-link-active': $route.fullPath === '/articles'}"
            >Почитати</router-link>
            <router-link
              :to="'/contacts'"
              :class="{'router-link-active': $route.fullPath === '/contacts'}"
            >Контакти</router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  name: 'Navigation',
  props: {
    modificator: String
  },
  data(){
    return {
      showMobileMenu: false,
    }
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.menu {
  width: 100%;
  height: 100%;
  margin: auto 0;
}

.navbar {
  font-size: 0.9rem;
  padding: 0;
}

.modify {
  background-color: white !important;
}

a {
  font-family: MuseoSansCyrl !important;
  text-decoration: none !important;
  color: $text-color !important;
  &:hover {
    text-decoration: none !important;
    color: $main-color !important;
  }
  &.router-link-exact-active {
    color: $main-color !important;
    font-family: MuseoSansCyrl_500 !important;
  }
}

.logo > img {
  width: 50px;
}

.socials > img {
  width: 20px;
}

.navbar-nav > a:not(:last-child) {
  margin-right: 15px;
}

.navbar-toggler {
  border: none;
}

.group-btns-mobile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
}

@media (min-width: 992px) {
  .navbar-expand-lg .navbar-collapse {
    justify-content: flex-end;
  }
}

@media (max-width: 991px) {
  .navbar-collapse {
    z-index: 100;
    background-color: #ffffff;
    .navbar-nav {
      & > a {
        padding: 10px 0;
      }
      a:first-child {
        padding-top: 20px;
      }
      a:nth-child(5) {
        padding-bottom: 20px;
      }
    }
  }
}
</style>

