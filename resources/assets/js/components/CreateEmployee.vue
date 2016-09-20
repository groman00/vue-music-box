<template>
    <form method="POST" class="form-inline" role="form" v-on:submit="createEmployee">
        <div class="form-group" v-bind:class="{'has-error': errors.firstName}">
            <input v-model="employee.firstName" type="text" class="form-control" placeholder="First Name">
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.lastName}">
            <input v-model="employee.lastName" type="text" class="form-control" placeholder="Last Name">
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.email}">
            <input v-model="employee.email" type="email" class="form-control" placeholder="E-mail">
        </div>     
        <div class="pull-right">
            <button type="submit" class="btn btn-primary">Add New</button>
        </div>                  
    </form>     
</template>
<script>
    function initialState() {
        return {
            employee: {
                firstName: '',
                lastName: '',
                email: ''
            },
            errors: {}
        }
    };
    export default {
        data() {
            return initialState();
        },
        methods: {
            createEmployee: function(e) {
                e.preventDefault();
                var employee = this.employee;
                this.$http.post('/api/employee/', employee)
                    .then(function(data) {
                        this.$dispatch('employeeAdded', data.json());
                        this.$data = initialState();
                    }, function(resp, status, request) {

                        // trigger error state
                        var data = resp.data;
                        $.each(employee, function(key){
                            this.$set('errors.' + key, !!data[key]);
                        }.bind(this));
                    });
            }           
        }
    }
</script>
