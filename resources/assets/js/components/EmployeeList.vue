<template>
    <div class="row">
        <div class="col-md-12">
            <div class="list-group">
                <div class="list-group-item">
                    <create-employee></create-employee>
                </div>                
                <div class="list-group-item" v-for="employee in employees" transition="slideout">
                    <employee-list-item :employee="employee"></employee-list-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        ready() {
            console.log('Component ready.')
        },
        data() {
            return {
                employees: []
            };
        },
        created() {
            this.fetchEmployees();
        },
        methods: {
            fetchEmployees: function() {
                this.$http.get('/api/employees')
                    .then(function(employees) {
                        this.$set('employees', employees.json());
                    }, function(data, status, request) {
                        //handle error
                    });
            }            
        },
        events: {
            employeeDeleted: function(employee) {
                this.employees.$remove(employee);
            },
            employeeAdded: function(employee) {
                this.employees.unshift(employee);
            }
        }
    }
</script>
