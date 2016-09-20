
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

Vue.component('employee-list-item', require('./components/EmployeeListItem.vue'));
Vue.component('employee-list', require('./components/EmployeeList.vue'));
Vue.component('create-employee', require('./components/CreateEmployee.vue'));
Vue.component('update-employee', require('./components/UpdateEmployee.vue'));

const app = new Vue({
    el: '#app',
    events: {
        childEvent: function(msg) {
            console.log(msg);
        }
    }
});
