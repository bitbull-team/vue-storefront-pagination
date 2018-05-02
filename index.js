import Vue from 'vue'
import EventBus from 'core/plugins/event-bus'

import extensionStore from './store'
import extensionRoutes from './router'
import Pagination from './components/Pagination.vue'

const EXTENSION_KEY = 'custom_extension'

const install = Vue => {
  Vue.component("pagination", Pagination)
};

export default function (app, router, store, config) {
  install
  return { EXTENSION_KEY, extensionRoutes, extensionStore, Pagination }
}

export { Pagination };