// data保管庫
export const state = () => ({
  contact: []
});

// mutations: stateの上書き(代入)
export const mutations = {
  add(state, contactData ) {
    state.contact.push({
      first_name: contactData.first_name,
      last_name: contactData.last_name,
      fullname: contactData.fullname,
      gender: contactData.gender,
      email: contactData.email,
      postcode: contactData.postcode,
      address: contactData.address,
      building_name: contactData.building_name,
      opinion: contactData.opinion,
    });
  },
  update(state, updateContactData) {
    let contact = [];
    updateContactData.forEach((n) => {
      contact.push(Object.assign({},n))
    });
    state.contact = contact;
  },
  // remove(state, { contact }) {
  //   state.contact.splice(state.contact.indexOf(contact), 1);
  // },
  allRemove(state) {
    state.contact.splice(0, state.contact.length);
  },
}

// getters: stateの情報を取得。別gettersの呼び出しも可能
export const getters = {
  getContact(state) {
    return state.contact;
  }
}

// actions: storeの上書き以外の処理や非同期通信。別actionsの呼び出しも可能
export const actions = {
  setContact(vuexContext, contactData) {
    vuexContext.commit('add', contactData);
  },
  updateContact(vuexContext, updateContactData) {
    vuexContext.commit('update', updateContactData);
  },
  remove(vuexContext, contact) {
    vuexContext.commit('remove', contact);
  },
  allRemove(vuexContext) {
    vuexContext.commit('allRemove');
  },
}