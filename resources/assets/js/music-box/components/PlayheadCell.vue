<template>
    <div class="cell" v-bind:class="{'active': isActive}"></div>
</template>
<script>
    /**
     * Visual indicator of the active measure while playing a song
     * @module components/PlayheadCell
     * @param {Number}  index - Index of this measure
     * @param {Number}  activeMeasure - Current active measure
     */
    export default {
        props: ['index', 'active-measure'],
        ready() {
            this.$watch('activeMeasure', (current, last) => {
                this.isActive = (this.index === current);
            });
        },

        /**
         * Data
         * @return {Object}
         */
        data() {
            return {
                isActive: false
            };
        }
    }
</script>
