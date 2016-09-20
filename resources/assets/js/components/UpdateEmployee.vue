<template>
    <form method="POST" class="form-inline employee-form" role="form" v-on:submit.prevent="update">
        <div class="form-group" v-bind:class="{'has-error': errors.firstName}">
            <input v-model="instance.firstName" type="text" class="form-control" placeholder="First Name">
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.lastName}">
            <input v-model="instance.lastName" type="text" class="form-control" placeholder="Last Name">
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.email}">
            <input v-model="instance.email" type="email" class="form-control" placeholder="E-mail">
        </div>     
        <div class="pull-right">
            <a class="btn btn-default" v-on:click="cancel">Cancel</a>
            <button type="submit" class="btn btn-primary">Update</button>
        </div>                  
    </form>   
</template>
<script>
    export default {
        props: ['employee'],
        data() {
            return {
                instance: {},
                errors: {}
            };
        },
        methods: {    
            setInstance: function() {
                this.$set('instance', _.clone(this.employee));
            },
            update: function(e) {
                var employee = this.instance;
                this.$http.patch('/api/employee/' + employee.id, employee)
                    .then(function() {
                        this.$set('errors', {});
                        this.employee  = Object.assign(this.employee, this.instance);
                        this.$dispatch('updateEmployeeDone');
                    }, function(resp, status, request) {
                        // trigger error state
                        var data = resp.data;
                        $.each(employee, function(key){
                            this.$set('errors.' + key, !!data[key]);
                        }.bind(this));
                    });                
            },
            cancel: function(e) {
                e.preventDefault();
                this.$dispatch('updateEmployeeDone');
                this.$set('errors', {});
            }            
        }
    }
</script>
