const APP_STORAGE_KEY='contacts-app-state'

const store = (state) => localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));

const get = () => JSON.parse(localStorage.getItem(APP_STORAGE_KEY) || '{}');

const getValue = (key) => get()[key];

export default {
  set: store,
  get,
  getValue
}