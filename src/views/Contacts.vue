<template>
  <div>
    <spinner v-if="!isLoaded" />
    <div
      v-if="isLoaded"
      class="contacts">
      <div class="container">
        <div class="row mt-5">
          <div class="col-lg-5 d-none d-lg-block">
            <img
              :src="page_image"
              alt="">
          </div>
          <div class="col-lg-7 d-flex align-items-center justify-content-center justify-content-lg-start">
            <div>
              <h1>Контакти</h1>
              <div class="mb-3">
                <div>Контактний телефон</div>
                <div class="contacts_data"> {{ this.contact_number }}</div>
              </div>
              <div class="mb-3">
                <div>Telegram bot</div>
                <a
                  :href="bot_ref"
                  class="contacts_data telelegram-bot"
                  target="_blank"><b>{{ this.bot_name }}</b></a>
              </div>
              <div class="mb-3">
                <div>Для довідок</div>
                <div class="contacts_data">{{ this.email_info }}</div>
              </div>
              <div class="mb-3">
                <div>Щодо співпраці</div>
                <div class="contacts_data">{{ this.email_contact }}</div>
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
import Spinner from '../components/Spinner.vue';

export default {
  name: 'Contacts',
  components: {
    Spinner,
  },
  data: () => ({
    isLoaded: false,
    contact_number: null,
    page_image: '',
    bot_name: '',
    bot_ref: '',
    email_info: '',
    email_contact: '',
  }),
  beforeMount() {
    http.get('pages/15').subscribe(
      (response) => {
        if (response) {
          this.contact_number = response.acf.contact_number;
          this.page_image = response.acf.page_image;
          this.bot_name = response.acf.bot_name;
          this.bot_ref = response.acf.bot_reference;
          this.email_info = response.acf.email_info;
          this.email_contact = response.acf.email_contact;
          this.isLoaded = true;
        }
      },
      (error) => {
        console.log(error);
        this.$router.push('/404');
      },
    );
  },
};
</script>

<style scoped lang="scss">
  @import "../assets/scss/_variables.scss";

  h1 {
    font-family: MuseoSansCyrl_700;
  }

  .contacts_data {
    font-size: 1.1rem;
    font-family: MuseoSansCyrl_700;
  }

</style>
