<template>
    <div class="cell node" v-on:click="toggle" v-bind:class="{'active': isActive}" title="{{note}} - measure {{measure}}"></div>
</template>
<script>
    import { getFrequencyOfNote } from '../lib/helpers';
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
            register(opts = {}) {
                var options = Object.assign({
                    start: this.measure * this.speed,
                    end: (this.measure * this.speed) + this.speed
                }, opts);
                var currentTime = this.context.currentTime;
                this.oscillator = this.context.createOscillator();
                this.oscillator.connect(this.context.destination);
                this.oscillator.type = this.waveType;
                this.oscillator.frequency.value = getFrequencyOfNote(this.note);
                this.oscillator.start(currentTime + options.start);
                this.oscillator.stop(currentTime + options.end);
            },
            add() {
                this.songNodes.push(this);
            },
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
            playPreview() {
                var preview;
                this.context.resume();
                this.register({start: 0, end: .25});
                preview = setInterval(() => {
                    this.context.suspend();
                    clearInterval(preview);
                }, 250);                
            },
            toggle() {
                this.isActive = !this.isActive;
                if(this.isActive) {
                    this.add();
                    this.playPreview();
                } else {
                    this.remove();
                }
            },
            deactivate() {
                this.stopOscillator();
                this.isActive = false;
            },
            activate() {
                this.isActive = true;
                this.add();
            },
            stopOscillator() {
                if(this.oscillator) {
                    this.oscillator.stop(0);
                }
            }
        }
    }
</script>
