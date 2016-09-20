<template>
    <div class="music-box">
        <menu :state="state" :active-song="activeSong" :speed.sync="speed" :wave-type.sync="waveType" :measures.sync="measures"></menu>
        <div class="box">
            <div class="table notes">
                <div class="row" v-for="note in notes">
                    <node v-for="measure in measures" track-by="$index" :context="context" :speed="speed" :song-nodes="songNodes" :measure="$index" :note="note" :wave-type="waveType"></node>
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
    var helpers = require('../../lib/helpers');
    var http = require('../../lib/http');
    var notes = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'];

    export default {   
        ready() {
            this.loadNotes();
        },
        data() {
            return {
                context: new AudioContext(),
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
            loadNotes() {
                var newNotes = [];
                this.octaves.forEach(function(octave){
                    notes.forEach(function(note){
                        newNotes.push(note + octave);
                    }.bind(this));
                }.bind(this));  
                this.notes = newNotes;
            }
        },
        events: {
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
                    nodes.forEach(function(node) {
                        this.nodeRefs[node.note + '_' + node.measure].activate();
                    }.bind(this));                    
                    this.$set('activeSong', song);
                }
            },
            addNodeRef(node) {
                // v-ref doesn't work on <node> for some reason.  Doing this to keep a dictionary of nodes.
                this.nodeRefs[node.note + '_' + node.measure] = node;
            },
            loadSongs() {
                this.$set('state', 'loading');
                http.get('/api/songs')
                    .then(songs => {
                        this.songs = songs;
                    });    
            },            
            playSong() {
                var length = this.measures.length;
                this.context.resume()
                this.songNodes.forEach(function(node, i){
                    node.register();
                }.bind(this));  
                this.state = 'playing';
                this.activeMeasure = 0;
                this.playheadInterval = setInterval(function() {
                    console.log('beat');
                    this.activeMeasure = this.activeMeasure + 1;
                    if (this.activeMeasure === (length - 1)) {
                        this.$emit('stopSong');
                    }
                }.bind(this), this.speed * 1000);
            },
            stopSong() {  
                clearInterval(this.playheadInterval);
                this.context.suspend();
                this.songNodes.forEach(function(node, i){
                    node.stopOscillator();
                }.bind(this));                
                this.activeMeasure = -1;
                this.state = 'stopped';
            },
            saveSong() {
                var nodes, title;
                if (!this.songNodes.length) {
                    alert('Make some music first!');
                    return false;
                }
                title = window.prompt('Enter a song title', '');
                nodes = helpers.nodesToPlainObject(this.songNodes);
                http.post('/api/song', {
                    title: title,
                    nodes: JSON.stringify(nodes)
                });
            },
            editSong() {
                var song = this.$get('activeSong');
                var nodes = helpers.nodesToPlainObject(this.songNodes);
                var title = window.prompt('Enter a song title', song.title);
                http.patch('/api/song/' + song.id, {
                    title: title,
                    nodes: JSON.stringify(nodes)
                });
            }            
        }
    }
</script>
