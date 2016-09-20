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
    export default {
        props: ['songs'],
        ready() {},
        data() {
            return {
                selected: null 
            };
        },
        created() {

        },
        methods: {
            submit: function() {
                this.$dispatch('setActiveSong', this.$get('selected'));
            },
            cancel: function() {
                // passing false will close the modal
                this.$dispatch('setActiveSong', false)
            }
        },
        events: {

        }
    }
</script>
