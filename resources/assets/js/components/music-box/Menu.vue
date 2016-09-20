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
    export default {   
        props: ['speed', 'activeSong', 'state', 'wave-type', 'measures'],
        data() { 
            return {
                numMeasures: this.measures.length
            }
        },
        watch: {
            numMeasures() {
                this.measures = Array(this.numMeasures);
            }
        },
        methods: {
            play() {
                this.$dispatch('playSong');
            },
            stop() {  
                this.$dispatch('stopSong');  
            },
            save() {
                this.$dispatch('saveSong');
            },
            load() {
                this.$dispatch('loadSongs');                
            },
            edit() {
                this.$dispatch('editSong');                
            }
        }
    }
</script>
