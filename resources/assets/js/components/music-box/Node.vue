<template>
    <div class="cell node" v-on:click="toggle" v-bind:class="{'active': isActive}" title="{{note}} - measure {{measure}}"></div>
</template>
<script>
    var helpers = require('../../lib/helpers');
    export default {
        props: ['context', 'note', 'measure', 'speed', 'song-nodes', 'wave-type'],
        ready() {
            this.$dispatch('addNodeRef', this)
        },
        data() {
            return {
                isActive: false,
                oscillator: null
            };
        },
        methods: {
            register: function() {
                var start = this.measure * this.speed;
                var end = start + this.speed;  
                var currentTime = this.context.currentTime;

                this.oscillator = this.context.createOscillator();
                this.oscillator.connect(this.context.destination);
                this.oscillator.type = this.waveType;
                this.oscillator.frequency.value = helpers.getFrequencyOfNote(this.note);
                this.oscillator.start(currentTime + start);
                this.oscillator.stop(currentTime + end);
            },
            add: function() {
                this.songNodes.push(this);
            },
            remove: function() {
                var measure = this.measure;
                var note = this.note;
                this.songNodes.forEach(function(item, i){
                    if(item.note === note && item.measure === measure) {
                        this.songNodes.splice(i, 1);
                        return false;
                    }
                }.bind(this));
            },
            toggle: function() {
                this.isActive = !this.isActive;
                this.isActive ? this.add() : this.remove();
            },
            deactivate: function() {
                this.stopOscillator();
                this.isActive = false;
            },
            activate: function() {
                this.isActive = true;
                this.add();
            },
            stopOscillator: function() {
                if(this.oscillator) {
                    this.oscillator.stop(0);
                }
            }
        }
    }
</script>
