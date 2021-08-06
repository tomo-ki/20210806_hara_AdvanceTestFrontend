<template>
  <div id="index">
    <h1 class="contact__heading">お問い合わせ</h1>
    <validation-observer ref="obs" v-slot="ObserverProps" class="contact__content flex-column">
      <table class="contact__table">
        <validation-provider v-slot="ProviderProps" rules="required" class="validation-provider">
          <tr>
            <th></th>
            <td class="name__error flex">
              <div class="error name__error-des">{{ ProviderProps.errors[0] }}</div>
              <div
                v-if="cloneContact[0].first_name !== '' && cloneContact[0].last_name == ''"
                class="error name__error-des"
              >
                お名前は必須項目です
              </div>
            </td>
          </tr>
          <tr>
            <th class="require">お名前</th>
            <td class="contact__form-namearea">
              <input v-model="cloneContact[0].first_name" name="お名前" type="text" class="contact__form contact__form-name">
              <input v-model="cloneContact[0].last_name" name="お名前" type="text" class="contact__form contact__form-name">
            </td>
          </tr>
          <tr>
            <th></th>
            <td class="example">
              <div class="flex">
                <p class="example__name">例) 山田</p>
                <p class="example__name">例) 太郎</p>
              </div>
            </td>
          </tr>
        </validation-provider>
        <tr>
          <th class="contact__form-th--gender require">性別</th>
          <td class="contact__form-genderarea">
            <input v-model="cloneContact[0].gender" type="radio" name="性別" id="male" value="0" class="contact__form contact__form-gender" checked>
            <label for="male" class="radio__label">男性</label>
            <input v-model="cloneContact[0].gender" type="radio" name="性別" id="female" class="contact__form contact__form-gender" value="1">
            <label for="female" class="radio__label">女性</label>
          </td>
        </tr>
        <validation-provider v-slot="ProviderProps" rules="required|email" class="validation-provider">
          <tr>
            <th></th>
            <td>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </td>
          </tr>
          <tr>
            <th class="require">メールアドレス</th>
            <td><input v-model="cloneContact[0].email" type="email" name="メールアドレス" class="contact__form contact__form-email"></td>
          </tr>
          <tr>
            <th></th>
            <td class="example"><p class="example__email">例) test@example.com</p></td>
          </tr>
        </validation-provider>
        <validation-provider v-slot="ProviderProps" rules="required|max:8|alpha_dash" class="validation-provider">
          <tr>
            <th></th>
            <td>
              <div class="error error-postcode">{{ ProviderProps.errors[0] }}</div>
            </td>
          </tr>
          <tr>
            <th class="require">郵便番号</th>
            <td>
              <label for="postcode" class="label-postcode">〒</label>
              <input
                v-model="cloneContact[0].postcode"
                type="text" id="postcode" name="郵便番号"
                class="contact__form contact__form-postcode"
                oninput="value = value.replace(/[０-９]/g,s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/[ー−]/g,'-').replace(/[^\-\d]/g,'')"
              >
              <button
              @click="getAddress(cloneContact[0].postcode)" class="button hover button-postcode">郵便番号から住所を入力</button>
            </td>
          </tr>
          <tr>
            <th></th>
            <td class="example"><p class="example__postcode">例) 123-4567</p></td>
          </tr>
        </validation-provider>
        <validation-provider v-slot="ProviderProps" rules="required" class="validation-provider">
          <tr>
            <th></th>
            <td>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </td>
          </tr>
          <tr>
            <th class="require">住所</th>
            <td><input v-model="cloneContact[0].address" type="text" name="住所" id="" class="contact__form contact__form-address"></td>
          </tr>
          <tr>
            <th></th>
            <td class="example"><p class="example__address">例) 東京都渋谷区千駄ヶ谷1-2-3</p></td>
          </tr>
        </validation-provider>
        <tr>
          <th></th>
          <td><div class="error"></div></td>
        </tr>
        <tr>
          <th class="">建物名</th>
          <td><input v-model="cloneContact[0].building_name" type="text" class="contact__form contact__form-buildingname"></td>
        </tr>
        <tr>
          <th></th>
          <td class="example"><p class="example__buildingname">例) 千駄ヶ谷マンション101</p></td>
        </tr>
        <validation-provider v-slot="ProviderProps" rules="required|max:120" class="validation-provider">
          <tr>
            <th></th>
            <td>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </td>
          </tr>
          <tr>
            <th class="require">ご意見</th>
            <td><textarea v-model="cloneContact[0].opinion" name="ご意見" id="" cols="30" rows="10" class="contact__form contact__form-opinion"></textarea></td>
          </tr>
        </validation-provider>
      </table>
      <button
        @click="toConfirmPage()" type="button" class="button button-contact hover"
        :disabled="( ObserverProps.invalid && !ObserverProps.validated )|| cloneContact[0].last_name ==''"
      >
        確認
      </button>
    </validation-observer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      cloneContact:[],
    }
  },
  computed: {
    storeContact: {
      get() {
        return this.$store.getters['contact/getContact'];
      },
    },
    fullName() {
      let fullName = this.cloneContact[0].first_name + this.cloneContact[0].last_name;
      if(fullName){
        return fullName;
      }else{
        fullName = "";
        return fullName;
      }
    },
  },
  methods: {
    copyStoreContact(){
      this.storeContact.forEach((n) => {
        this.cloneContact.push(Object.assign({},n))
      })
    },
    makecloneContact() {
      if(this.storeContact.length == 0) {
        this.cloneContact = [{
          first_name: "",
          last_name: "",
          fullname: "",
          gender: 0,
          email: "",
          postcode: "",
          address: "",
          building_name: "",
          opinion: "",
        }]
      }else{
        this.copyStoreContact();
      }
    },
    addContact(){
      const contactData = {
        first_name: this.cloneContact[0].first_name,
        last_name: this.cloneContact[0].last_name,
        fullname: this.cloneContact[0].first_name + this.cloneContact[0].last_name,
        gender: this.cloneContact[0].gender,
        email: this.cloneContact[0].email,
        postcode: this.cloneContact[0].postcode,
        address: this.cloneContact[0].address,
        building_name: this.cloneContact[0].building_name,
        opinion: this.cloneContact[0].opinion,
      };
      this.$store.dispatch('contact/setContact', contactData);
    },
    updateContact(){
      this.cloneContact[0].fullname = this.cloneContact[0].first_name + this.cloneContact[0].last_name;
      this.$store.dispatch('contact/updateContact', this.cloneContact);
    },
    toConfirmPage(){
      if(this.storeContact.length == 0) {
        this.addContact();
      }
      else{
        this.updateContact();
      }
      this.$router.push("/confirm");
    },
    async getAddress(postcode){
      postcode = postcode.replace(/-/g, '');
      try {
        const resData = await this.$axios.get(
          "https://apis.postcode-jp.com/api/v4/postcodes/" + postcode,
        );
        this.cloneContact[0].address = resData.data[0].allAddress;
        postcode = postcode.slice(0, 3) + '-' + postcode.slice(3, postcode.length);
        this.cloneContact[0].postcode = postcode;
      } catch (e) {
        alert('郵便番号が存在しません');
      }
    },
  },
  created() {
    this.makecloneContact();
  },
}
</script>