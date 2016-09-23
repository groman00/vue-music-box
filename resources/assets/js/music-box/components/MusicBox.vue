<template>
    <div class="music-box">
        <menu :state="state" :active-song="activeSong" :speed.sync="speed" :wave-type.sync="waveType" :measures.sync="measures" :gain.sync="gain"></menu>
        <div class="box">
            <div class="table notes">
                <div class="row" v-for="note in notes">
                    <node v-for="measure in measures" track-by="$index" :context="context" :speed="speed" :song-nodes="songNodes" :measure="$index" :note="note" :wave-type="waveType" :gain-node="gainNode"></node>
                </div>
            </div>
            <div class="table legend overlay">
                <div class="row" v-for="note in notes">
                    <div class="cell" v-bind:class="note.indexOf('#') > 0 ? 'sharp' : ''">{{ note }}</div>
                </div>
            </div>        
            <div class="table playhead overlay">
                <div class="row">
                    <playhead-cell v-for="measure in measures" track-by="$index" :index="$index" :active-measure="activeMeasure"></playhead-cell>
                </div>
            </div>
        </div>
        <song-loader v-if="state === 'loading'" :songs="songs"></song-loader>
    </div>
</template>
<script>
    import { nodesToPlainObject } from '../lib/helpers';
    import { http } from '../lib/http';

    const DEFAULT_NOTES = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'];

    var audioContext = new AudioContext();

    /**
     * MusicBox Application
     * @module components/MusicBox
     */
    export default {   
        ready() {
            this.loadNotes();            
            this.gainNode.connect(this.context.destination);
            this.gainNode.gain.value = this.gain;
            this.$watch('gain', (gain) => {
                this.gainNode.gain.value = this.gain;
            });
        },

        /**
         * Data
         * @return {Object}
         */
        data() {
            return {
                context: audioContext,
                gainNode: audioContext.createGain(),
                gain: .75,
                notes: [],
                octaves: [5, 4, 3],
                measures: Array(40),
                activeMeasure: -1,
                speed: .25,
                songs: [],
                activeSong: null,
                songNodes: [],
                playheadInterval: false,
                state: 'stopped',
                waveType: 'sine',
                nodeRefs: {}
            };
        },
        methods: {

            /**
             * Generate an Array of notes based on the total number of octaves
             */            
            loadNotes() {
                var newNotes = [];
                this.octaves.forEach((octave) => {
                    DEFAULT_NOTES.forEach((note) => {
                        newNotes.push(note + octave);
                    });
                });
                this.notes = newNotes;
            },

            /**
             * Make a POST or PATCH request with active song nodes and song title
             * @param  {String} method Request method, "post" or "patch"
             * @param  {Object} song   Song to patch (optional)
             */
            saveSong(method, song = {}) {
                var nodes, title;
                var path = '/api/song';
                if (!this.songNodes.length) {
                    alert('Make some music first!');
                    return false;
                }
                if (song.id){
                    path = path + '/' + song.id;
                }
                title = window.prompt('Enter a song title', (song.title || ''));
                nodes = nodesToPlainObject(this.songNodes);
                http[method](path, {
                    title: title,
                    nodes: JSON.stringify(nodes)
                });
            }            
        },
        events: {

            /**
             * Loads song nodes to music box, while deactivating all currently active nodes
             * @param {Object} song
             */
            setActiveSong(song) {
                var nodes;
                this.$set('state', 'stopped');
                if(song) {
                    // deactivate and remove previous nodes
                    while (this.songNodes.length){
                        this.songNodes[0].deactivate();
                        this.songNodes.shift();
                    }
                    nodes = JSON.parse(song.nodes);
                    //activate nodes for newly loaded song
                    nodes.forEach((node) => {
                        this.nodeRefs[node.note + '_' + node.measure].activate();
                    });
                    this.$set('activeSong', song);
                }
            },

            /**
             * Add Node to nodeRefs dictionary
             * @param {Object} node
             */            
            addNodeRef(node) {
                // v-ref doesn't work on <node> for some reason.  Doing this to keep a dictionary of nodes.
                this.nodeRefs[node.note + '_' + node.measure] = node;
            },

            /** Fetch songs from database */
            loadSongs() {
                this.$set('state', 'loading');
                http.get('/api/songs')
                    .then((songs) => {
                        this.songs = songs;
                    });    
            },            

            /** Register active nodes and trigger playback */
            playSong() {
                var length = this.measures.length;
                this.context.resume();
                this.songNodes.forEach((node, i) => {
                    node.register();
                });
                this.state = 'playing';
                this.activeMeasure = 0;
                this.playheadInterval = setInterval(() => {
                    //console.log('beat');
                    this.activeMeasure = this.activeMeasure + 1;
                    if (this.activeMeasure === (length - 1)) {
                        this.$emit('stopSong');
                    }
                }, this.speed * 1000);
            },

            /** Suspend AudioContext and stop all OscillatorNodes */
            stopSong() {  
                clearInterval(this.playheadInterval);
                this.context.suspend();
                this.songNodes.forEach((node, i) => {
                    node.stopOscillator();
                });                
                this.activeMeasure = -1;
                this.state = 'stopped';
            },

            /** Save song with post method */
            saveAsNew() {
                this.saveSong('post');
            },

            /** Save song with patch method */
            editSong() {
                this.saveSong('patch', this.$get('activeSong'));
            }            
        }
    }
</script>
