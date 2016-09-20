//require('./bootstrap');
// http://musicalwolfe.deviantart.com/art/MLP-FiM-Theme-Song-Music-Box-Sheet-288020259
window.Vue = require('vue');

require('vue-resource');

Vue.http.interceptors.push((request, next) => {
    request.headers['X-CSRF-TOKEN'] = Laravel.csrfToken;
    next();
});

Vue.component('song-loader', require('./components/music-box/SongLoader.vue'));
Vue.component('menu', require('./components/music-box/Menu.vue'));
Vue.component('node', require('./components/music-box/Node.vue'));
Vue.component('playhead-cell', require('./components/music-box/PlayheadCell.vue'));
Vue.component('music-box', require('./components/music-box/MusicBox.vue'));

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const app = new Vue({
    el: '#app',
    // events: {
    //     childEvent: function(msg) {
    //         console.log(msg);
    //     }
    // }
});
