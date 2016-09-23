<template>
    <div class="menu">
        <label>
            <button class="button" :disabled="state === 'playing'" v-on:click="play">Play</button>
        </label>
        <label>    
            <button class="button" :disabled="state === 'stopped'" v-on:click="stop">Stop</button>        
        </label>
        <label>
            <button class="button" v-on:click="save">Save</button>
        </label>
        <label>
            <button class="button" v-on:click="load">Load</button>
        </label>
        <label>
            <button class="button" :disabled="!activeSong" v-on:click="edit">Edit</button>
        </label>
        <label>
            Speed
            <input v-model="speed" number :disabled="state === 'playing'"/>
        </label>
        <label>
            Measures
            <input v-model="numMeasures" number :disabled="state === 'playing'"/>
        </label>        
        <label>
            Sound Type
            <select v-model="waveType" :disabled="state === 'playing'">
                <option selected>sine</option>
                <option>square</option>
                <option>sawtooth</option>
                <option>triangle</option>
            </select>            
        </label>            
        <label>
            Volume
            <input v-model="gain" lazy type="range" min="0" max="5" step="0.1" value="{{ gain }}">
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
        props: ['speed', 'active-song', 'state', 'wave-type', 'measures', 'gain'],

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
