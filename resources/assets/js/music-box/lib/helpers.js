/**
 * @module lib/helpers
 */

/**
 * Convert a musical note to frequency
 * @param   {String} note
 * @return  {Number} 
 */
const getFrequencyOfNote = (note) => {
    var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    var key_number;
    var octave;
    if (note.length === 3) {
        octave = note.charAt(2);
    } else {
        octave = note.charAt(1);
    }
    key_number = notes.indexOf(note.slice(0, -1));
    if (key_number < 3) {
        key_number = key_number + 12 + ((octave - 1) * 12) + 1;
    } else {
        key_number = key_number + ((octave - 1) * 12) + 1;
    }
    return 440 * Math.pow(2, (key_number - 49) / 12);
}

/**
 * Convert an array of Vue objects to an array of plain objects
 * @param   {Array} nodes
 * @return  {Array} 
 */
const nodesToPlainObject = (nodes) => {
    return nodes.map((node) => {
        return {
            note: node.note,
            measure: node.measure     
        }
    });
}

export {getFrequencyOfNote, nodesToPlainObject};