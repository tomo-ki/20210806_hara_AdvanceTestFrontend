import Vue from 'vue'

Vue.filter('addComma', function (value) {
  if (value) {
    return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  } else {
    return '';
  }
})

import format from 'date-fns/format'
Vue.filter('formatDateJap', (date) => {
  if (date) {
    return format(new Date(date), 'yyyy年MM月dd日');
  } else {
    return '';
  }
})
Vue.filter('formatDateNum', (date) => {
  if (date) {
    return format(new Date(date), 'yyyy-MM-dd');
  } else {
    return '';
  }
})

import { addDays } from 'date-fns'
Vue.filter('addDate', (date) => {
  if (date) {
    return addDays(new Date(date), 1);
  } else {
    return '';
  }
})



Vue.filter('omittedText', (text) => {
  if (text) {
    return text.length > 25 ? text.slice(0, 25) + "  ..." : text;
  } else {
    return '';
  }
})