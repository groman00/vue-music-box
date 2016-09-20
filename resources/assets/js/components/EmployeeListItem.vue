<template>
    <div class="employee-list-item">
        <div class="employee-info clearfix" v-bind:class="{'invisible': isEditing}">
            {{ employee.firstName }} | {{ employee.lastName }} | {{ employee.email }}
            <div class="pull-right">
                <button class="btn btn-default" v-on:click="toggleEdit(true)">Edit</button>
                <button class="btn btn-danger" v-on:click="deleteEmployee(employee)">Delete</button>            
            </div>
        </div>
        <update-employee :employee="employee" v-ref:updater v-show="isEditing" transition="fade"></update-employee>
    </div>        
</template>

<script>
    export default {
        props: ['employee'],
        data: function() {
            return {
                isEditing: false
            }
        },
        methods: {
            toggleEdit: function(bool) {
                this.$refs.updater.setInstance();
                this.isEditing = bool;
            },
            deleteEmployee: function(employee) {
                //this.$dispatch('employeeDeleted', employee);
                this.$http.delete('/api/employee/' + employee.id)
                    .then(function() {
                        this.$dispatch('employeeDeleted', employee);
                        console.log('success', arguments);
                    }, function(data, status, request) {
                        console.log('delete employee error', arguments);
                    });
            }            
        },
        events: {
            updateEmployeeDone: function() {
                this.toggleEdit(false);
            }
        }        
    }
</script>
