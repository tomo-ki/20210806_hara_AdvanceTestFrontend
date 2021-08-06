<template>
  <div id="confirm">
    <h1 class="confirm__heading">内容確認</h1>
    <div class="confirm__content flex-column">
      <table class="confirm__table">
        <tr>
          <th class="">お名前</th>
          <td>
            <p>{{storeContact[0].first_name}}  {{storeContact[0].last_name}}</p>
          </td>
        </tr>
        <tr>
          <th class="">性別</th>
          <td>
            <p v-if="storeContact[0].gender == 0">男性</p>
            <p v-if="storeContact[0].gender == 1">女性</p>
          </td>
        </tr>
        <tr>
          <th class="">メールアドレス</th>
          <td>
            <p>{{storeContact[0].email}}</p>
          </td>
        </tr>
        <tr>
          <th class="">郵便番号</th>
          <td>
            <p>{{storeContact[0].postcode}}</p>
          </td>
        </tr>
        <tr>
          <th class="">住所</th>
          <td>
            <p>{{storeContact[0].address}}</p>
          </td>
        </tr>
        <tr>
          <th class="">建物名</th>
          <td>
            <p>{{storeContact[0].building_name}}</p>
          </td>
        </tr>
        <tr>
          <th class="">ご意見</th>
          <td>
            <p>{{storeContact[0].opinion}}</p>
          </td>
        </tr>
      </table>
      <button @click="toThankspage()" type="button" class="button button-confirm hover">
        送信
      </button>
      <NuxtLink to="/" class="toHomeLink">修正する</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    storeContact: {
      get() {
        return this.$store.getters['contact/getContact'];
      },
    },
  },
  methods: {
    async insertContact(){
      const sendData = {
        fullname: this.storeContact[0].fullname,
        gender: this.storeContact[0].gender,
        email: this.storeContact[0].email,
        postcode: this.storeContact[0].postcode,
        address: this.storeContact[0].address,
        building_name: this.storeContact[0].building_name,
        opinion: this.storeContact[0].opinion,
      }
      await this.$axios.post("http://127.0.0.1:8000/api/contact/", sendData);
    },
    allRemoveContact() {
      this.$store.dispatch('contact/allRemove');
    },
    toThankspage(){
      this.insertContact();
      this.allRemoveContact();
      this.$router.push("/thanks");
    },
  },
  created(){
    if (this.storeContact.length == 0){
      this.$router.push("/");
    }
  }
}
</script>