<template>
    <div class="cell node" v-on:click="toggle" v-bind:class="{'active': isActive}" title="{{note}} - measure {{measure}}"></div>
</template>
<script>
    import { getFrequencyOfNote } from '../lib/helpers';

    /**
     * Song node that controls an OscillatorNode for playback
     * @module components/Node
     * @param {AudioContext}    context - AudioContext used for playback
     * @param {String}          note - Note that this node represents 
     * @param {Number}          speed - Playback speed
     * @param {Number}          measure - Measure that this node exists in
     * @param {Array}           songNodes - Array of Nodes in current song
     * @param {String}          waveType - Oscillator wave type
     * @param {GainNode}        gainNode
     */
    export default {
        props: ['context', 'note', 'measure', 'speed', 'song-nodes', 'wave-type', 'gain-node'],
        ready() {
            this.$dispatch('addNodeRef', this)
        },

        /**
         * Data
         * @return {Object}
         */        
        data() {
            return {
                isActive: false,
                oscillator: null
            };
        },
        methods: {
            /**
             * Creates a new oscillator and connects it to the AudioContext
             * @param {Object} opts
             * @param {Number} opts.start   oscillator start time
             * @param {Number} opts.end  oscillator end time
             */
            register(opts = {}) {
                var options = Object.assign({
                    start: this.measure * this.speed,
                    end: (this.measure * this.speed) + this.speed
                }, opts);
                var currentTime = this.context.currentTime;
                this.oscillator = this.context.createOscillator();
                
                //this.oscillator.connect(this.context.destination);
                this.oscillator.connect(this.gainNode);
                this.oscillator.type = this.waveType;
                this.oscillator.frequency.value = getFrequencyOfNote(this.note);
                this.oscillator.start(currentTime + options.start);
                this.oscillator.stop(currentTime + options.end);
            },

            /** Add this node to current song */
            add() {
                this.songNodes.push(this);
            },

            /** Remove this node from current song */
            remove() {
                var measure = this.measure;
                var note = this.note;
                this.songNodes.forEach((item, i) => {
                    if(item.note === note && item.measure === measure) {
                        this.songNodes.splice(i, 1);
                        return false;
                    }
                });
            },

            /** Play an audible preview of this node's note */
            playPreview() {
                var preview;
                this.context.resume();
                this.register({start: 0, end: .25});
                preview = setInterval(() => {
                    this.context.suspend();
                    clearInterval(preview);
                }, 250);                
            },

            /** Toggle "isActive" boolean and add/remove node from current song */
            toggle() {
                this.isActive = !this.isActive;
                if(this.isActive) {
                    this.add();
                    this.playPreview();
                } else {
                    this.remove();
                }
            },

            /** Reset node oscillator and set "isActive" to false */
            deactivate() {
                this.stopOscillator();
                this.isActive = false;
            },

            /** Activate node and add to current song*/
            activate() {
                this.isActive = true;
                this.add();
            },

            /** Reset oscillator position to 0 */
            stopOscillator() {
                if(this.oscillator) {
                    this.oscillator.stop(0);
                }
            }
        }
    }
</script>
