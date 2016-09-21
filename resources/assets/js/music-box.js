window.Vue = require('vue');

require('vue-resource');

Vue.http.interceptors.push((request, next) => {
    request.headers['X-CSRF-TOKEN'] = Laravel.csrfToken;
    next();
});

Vue.component('song-loader', require('./music-box/components/SongLoader.vue'));
Vue.component('menu', require('./music-box/components/Menu.vue'));
Vue.component('node', require('./music-box/components/Node.vue'));
Vue.component('playhead-cell', require('./music-box/components/PlayheadCell.vue'));
Vue.component('music-box', require('./music-box/components/MusicBox.vue'));

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const app = new Vue({
    el: '#app'
});
