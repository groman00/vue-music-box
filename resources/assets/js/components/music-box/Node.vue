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
            register: function(opts = {}) {
                var options = Object.assign({
                    start: this.measure * this.speed,
                    end: (this.measure * this.speed) + this.speed
                }, opts);
                var currentTime = this.context.currentTime;
                this.oscillator = this.context.createOscillator();
                this.oscillator.connect(this.context.destination);
                this.oscillator.type = this.waveType;
                this.oscillator.frequency.value = helpers.getFrequencyOfNote(this.note);
                this.oscillator.start(currentTime + options.start);
                this.oscillator.stop(currentTime + options.end);
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
            playSample: function() {
                var sample;
                this.context.resume();
                this.register({start: 0, end: .25});
                sample = setInterval(function() {
                    this.context.suspend();
                    clearInterval(sample);
                }.bind(this), 250);                
            },
            toggle: function() {
                this.isActive = !this.isActive;
                if(this.isActive) {
                    this.add();
                    this.playSample();
                } else {
                    this.remove();
                }
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
