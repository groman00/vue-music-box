<template>
    <div class="modal">
        <div class="modal-body">
            <form method="POST" role="form" v-on:submit.prevent="submit">
                <h1>Load a Song:</h1>
                <select v-model="selected">
                    <option v-for="song in songs" v-bind:value="song">
                        {{ song.title }}
                    </option>
                </select>
                <button type="submit">Load</button>
                <a v-on:click.prevent="cancel">Cancel</a>
        </div>
    </div>
</template>
<script>
    /**
     * Load previously saved song
     * @module  components/SongLoader
     * @param   {Array} songs - Array of saved songs
     */
    export default {
        props: ['songs'],
        
        /**
         * Data
         * @return {Object}
         */        
        data() {
            return {
                selected: null 
            };
        },
        methods: {
            
            /** Dispatch "setActiveSong" event to parent when song is selected */
            submit() {
                this.$dispatch('setActiveSong', this.$get('selected'));
            },

            /** Dispatch "setActiveSong" event to parent without song parameter.  This will close the SongLoader */
            cancel() {
                this.$dispatch('setActiveSong', false)
            }
        }
    }
</script>
