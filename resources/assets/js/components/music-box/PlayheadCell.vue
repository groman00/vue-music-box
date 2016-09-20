<template>
    <div class="cell" v-bind:class="{'active': isActive}"></div>
</template>
<script>
    export default {
        props: ['index', 'active-measure'],
        ready() {
            this.$watch('activeMeasure', function(current, last){
                this.isActive = (this.index === current);
            });
        },
        data() {
            return {
                isActive: false
            };
        },
        created() {

        },
        methods: {
        },
        events: {

        }
    }
</script>
