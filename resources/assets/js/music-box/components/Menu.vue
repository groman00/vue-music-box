<template>
    <div class="menu">
        <button class="button" v-if="state === 'stopped'" v-on:click="play">Play</button>
        <button class="button" v-if="state === 'playing'" v-on:click="stop">Stop</button>        
        <button class="button" v-on:click="save">Save</button>
        <button class="button" v-on:click="load">Load</button>
        <button class="button" v-show="activeSong" v-on:click="edit">Edit</button>
        <label>
            Speed
            <input v-model="speed" number/>
        </label>
        <label>
            Measures
            <input v-model="numMeasures" number/>
        </label>        
        <label>
            Sound Type
            <select v-model="waveType">
                <option selected>sine</option>
                <option>square</option>
                <option>sawtooth</option>
                <option>triangle</option>
            </select>            
        </label>            
    </div>
</template>
<script>
    /**
     * Controls for playback, song loading/saving and global settings
     * @module components/Menu
     * @param {Number}  speed - Playback speed
     * @param {Object}  activeSong - Currently active song
     * @param {String}  state - Current application state
     * @param {String}  waveType - Oscillator wave type
     * @param {Array}   measures - Current number of measures
     */
    export default { 
        props: ['speed', 'active-song', 'state', 'wave-type', 'measures'],

        /**
         * Data
         * @return {Object}
         */
        data() { 
            return {
                numMeasures: this.measures.length
            }
        },
        watch: {

            /** Convert numMeasures input value to measures Array */
            numMeasures() {
                this.measures = Array(this.numMeasures);
            }
        },
        methods: {

            /** Dispatch "playSong" event to parent */
            play() {
                this.$dispatch('playSong');
            },

            /** Dispatch "stopSong" event to parent */            
            stop() {  
                this.$dispatch('stopSong');  
            },

            /** Dispatch "saveAsNew" event to parent */            
            save() {
                this.$dispatch('saveAsNew');
            },

            /** Dispatch "loadSongs" event to parent */            
            load() {
                this.$dispatch('loadSongs');                
            },

            /** Dispatch "editSong" event to parent */            
            edit() {
                this.$dispatch('editSong');                
            }
        }
    }
</script>
