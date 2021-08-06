<template>
  <div id="admin" class="flex-column">
    <h1 class="admin__heading">管理システム</h1>
    <div class="admin__search flex-column">
      <table class="admin__search-table">
        <tr class="admin__search-tr admin__search-tr1">
          <th class="admin__search-cell admin__search-cell1">お名前</th>
          <td class="admin__search-cell admin__search-cell2"><input v-model="sortData.name" class="admin__search-form" type="text"></td>
          <th class="admin__search-cell admin__search-cell3">性別</th>
          <td class="admin__search-cell admin__search-cell4">
            <input v-model="sortData.gender" type="radio" id="all"  value="2" name="gender">
            <label class="radio__label admin__label" for="all">全て</label>
            <input v-model="sortData.gender" type="radio" id="male" value="0" name="gender">
            <label class="radio__label admin__label" for="male">男性</label>
            <input v-model="sortData.gender" type="radio" id="female"  value="1" name="gender">
            <label class="radio__label admin__label" for="female">女性</label>
          </td>
        </tr>
        <tr class="admin__search-tr admin__search-tr2">
          <th class="admin__search-cell admin__search-cell1">登録日</th>
          <td class="admin__search-cell admin__search-cell2">
            <input v-model="sortData.dateS" class="admin__search-form" type="date">
          </td>
          <td class="admin__search-cell admin__search-cell3" colspan="2">
            <span>~</span>
            <input v-model="sortData.dateE" class="admin__search-cell admin__search-form" type="date">
          </td>
        </tr>
        <tr class="admin__search-tr admin__search-tr3">
          <th class="admin__search-cell admin__search-cell1">メールアドレス</th>
          <td class="admin__search-cell admin__search-cell2">
            <input v-model="sortData.email" class="admin__search-form" type="text">
          </td>
          <td class="admin__search-cell admin__search-cell3"></td>
          <td class="admin__search-cell admin__search-cell4"></td>
        </tr>
      </table>
      <button
        @click="sortList()"
        class="button button-admin hover"
      >
        検索
      </button>
      <button
        @click="sortReset()"
        class="admin__search-reset hover"
      >
        リセット
      </button>
    </div>
    <div class="pagination__area flex">
      <div class="pagination__area-left flex">
        <p class="pagination__count pagination__countLeft">全{{cloneLists.length}}件中</p>
        <p class="pagination__count pagination__countRight">{{dataCountStart}}~{{dataCountEnd}}件</p>
      </div>
      <vuejs-paginate
        :page-count="getPaginateCount"
        :prev-text="'＜'"
        :next-text="'＞'"
        :click-handler="paginateClickCallback"
        :container-class="'pagination justify-content-center flex'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'page-item'"
        :prev-link-class="'page-link'"
        :next-class="'page-item'"
        :next-link-class="'page-link'"
      ></vuejs-paginate>
    </div>
    <div class="admin__data flex-column">
      <table class="admin__data-table">
        <tr class="admin__data-tr admin__data-tr1">
          <th class="admin__data-cell admin__data-th1 admin__data-cell1">ID</th>
          <th class="admin__data-cell admin__data-th2 admin__data-cell2">お名前</th>
          <th class="admin__data-cell admin__data-th3 admin__data-cell3">性別</th>
          <th class="admin__data-cell admin__data-th4 admin__data-cell4">メールアドレス</th>
          <th class="admin__data-cell admin__data-th5 admin__data-cell5">ご意見</th>
          <th class="admin__data-cell admin__data-th6 admin__data-cell6"></th>
        </tr>
        <tr class="admin__data-tr admin__data-tr2"
          v-for="contact in getPaginateLists" :key="contact.id"
        >
          <td class="admin__data-cell admin__data-td1 admin__data-cell1">{{contact.id}}</td>
          <td class="admin__data-cell admin__data-td2 admin__data-cell2">{{contact.fullname}}</td>
          <td v-if="contact.gender == 0" class="admin__data-cell admin__data-td3 admin__data-cell3">男性</td>
          <td v-if="contact.gender == 1" class="admin__data-cell admin__data-td3 admin__data-cell3">女性</td>
          <td class="admin__data-cell admin__data-td4 admin__data-cell4">{{contact.email}}</td>
          <td class="admin__data-cell admin__data-td5 admin__data-cell5">
            <p>{{contact.opinion | omittedText}}</p>
            <div class="admin__data-mouseOver">
              <b>ID:{{contact.id}},  お名前:{{contact.fullname}},  メールアドレス:{{contact.email}}</b>
              <br>
              <b v-if="contact.gender == 0">性別:男性,</b>
              <b v-if="contact.gender == 1">性別:女性,</b>
              <b>登録日:{{contact.created_at | formatDateJap}}</b>
              <p>{{contact.opinion}}</p>
            </div>
          </td>
          <td class="admin__data-cell admin__data-td6 admin__data-cell6">
            <button
              @click="deleteData(contact)"
              class="button button__admin-delete hover"
            >
              削除
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import { format } from 'date-fns'
import { addDays } from 'date-fns'
import VueJsPaginate from "vuejs-paginate";
export default {
  components: {
    "vuejs-paginate": VueJsPaginate,
  },
  data() {
    return {
      contactLists: [],
      cloneLists:[],
      sortData:{
        name: "",
        gender: 2,
        dateS: "",
        dateE: "",
        email: "",
      },
      currentPage: 1,
      perPage: 10,
    }
  },

  computed: {
    dateEndAddDay(){
      let date = this.sortData.dateE;
      if(date){
        date = addDays(new Date(date), 1);
        date = format(new Date(date), 'yyyy-MM-dd');
      }
      return date;
    },
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ページネーション↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    getPaginateLists(){
      let start = (this.currentPage - 1) * this.perPage;
      let end = this.currentPage * this.perPage;
      return this.cloneLists.slice(start, end);
    },
    getPaginateCount: function () {
      return Math.ceil(this.cloneLists.length / this.perPage);
    },
    dataCountStart(){
      return ((this.currentPage - 1) * this.perPage) + 1;
    },
    dataCountEnd(){
      let dataLength = this.cloneLists.length;
      let pageMaxLength = this.currentPage * this.perPage;
      if(dataLength < pageMaxLength){
        return dataLength;
      }else{
        return pageMaxLength;
      }
    },
  },

  methods: {
    async getContact(){
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/contact/"
      );
      this.contactLists = resData.data.data;
      this.makecloneContact();
    },
    makecloneContact(){
      this.cloneLists = this.contactLists;
    },
    async deleteData(contact) {
      this.cloneLists.splice(this.cloneLists.indexOf(contact), 1);
      await this.$axios.delete("http://127.0.0.1:8000/api/contact/" + contact.id)
      .then(() => this.getContact());
    },
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓検索↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    nameSort(lists){
      if(this.sortData.name !== ""){
        var data = [];
        for(let list of lists){
          if(list.fullname.includes(this.sortData.name)){
            data.push(list);
          }
        }
        this.cloneLists = data;
      }
    },
    genderSort(lists){
      if(this.sortData.gender == 2){
        var data = lists.filter((lists) => {
          return (lists.gender == 0 || lists.gender == 1);
        });
        this.cloneLists = data;
      }else{
        var data = lists.filter((lists) => {
          return (lists.gender == this.sortData.gender);
        });
        this.cloneLists = data;
      }
    },
    dateSort(lists){
      // 早い<遅い
      var data = [];
      if(this.sortData.dateS !== "" && this.sortData.dateE !== ""){
        // どっちも入力されていた場合
        var date = new Date(this.sortData.dateE);
        for(var list of lists){
          if(this.sortData.dateS <= list.created_at && list.created_at <= this.dateEndAddDay){
            data.push(list);
          }
        }
      }else if(this.sortData.dateS !== "" && this.sortData.dateE == ""){
        // Sだけ入力されていた場合
        for(var list of lists){
          if(this.sortData.dateS <= list.created_at){
            data.push(list);
          }
        }
      }else if(this.sortData.dateS == "" && this.sortData.dateE !== ""){
        // Eだけ入力されていた場合
        for(var list of lists){
          if(list.created_at <= this.dateEndAddDay){
            data.push(list);
          }
        }
      }else{
        data = lists;
      }
      this.cloneLists = data;
    },
    emailSort(lists){
      if(this.sortData.email !== ""){
        var data = [];
        for(let list of lists){
          if(list.email.includes(this.sortData.email)){
            data.push(list);
          }
        }
        this.cloneLists = data;
      }
    },
    sortList(){
      if(this.sortData.dateS > this.sortData.dateE){
        alert('日付の入力に誤りがあります');
      }else{
        this.makecloneContact();
        this.nameSort(this.cloneLists);
        this.genderSort(this.cloneLists);
        this.dateSort(this.cloneLists);
        this.emailSort(this.cloneLists);
        if(this.cloneLists.length == 0){
          alert('条件に一致するものが見つかりませんでした');
          this.sortReset();
        }
      }
    },
    sortReset(){
      this.sortData.name="";
      this.sortData.gender= 2;
      this.sortData.dateS= "";
      this.sortData.dateE= "";
      this.sortData.email= "";
      this.makecloneContact();
    },
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ページネーション↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    paginateClickCallback(pageNum) {
      this.currentPage = Number(pageNum);
    },
  },
  created() {
    this.getContact();
  },
}
</script>