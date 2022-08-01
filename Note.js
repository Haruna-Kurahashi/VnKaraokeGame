class Note {
  staffNum;
  notePosY;

  constructor(midi_note, value_note) {
    this.midiNote = midi_note;
    this.valueNote = value_note;
    this.freq = 440;
    this.noteName = {};
    this.staffNum = 0;
    this.notePosY = 0;
    this.noteWidth = 100;
  }

  set frequency(midi_note) {
    let freq = 440 * Math.pow(2, (midi_note - 69) / 12);
    this.freq = Math.trunc(freq);
  }

  get frequency() {
    return this.freq;
  }

  set name(midi_note) {
    const SCALE = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    this.noteName = SCALE[midi_note % 12];
  }

  get name() {
    return this.noteName;
  }

  set defNoteY(midi_note) {
    switch (midi_note) {
      case 55:
        this.staffNum = 0;
        this.notePosY = staffHeight / 2;
        break;
      case 56:
        this.staffNum = 0;
        this.notePosY = staffHeight / 2;
        break;
      case 57:
        this.staffNum = 0;
        this.notePosY = 0;
        break;
      case 58:
        this.staffNum = 0;
        this.notePosY = 0;
        break;
      case 59:
        this.staffNum = 0;
        this.notePosY = -staffHeight / 2;
        break;
      case 60:
        this.staffNum = 1;
        this.notePosY = 0;
        break;
      case 61:
        this.staffNum = 1;
        this.notePosY = -staffHeight / 4;
        break;
      case 62:
        this.staffNum = 1;
        this.notePosY = -staffHeight / 2;
        break;
      case 63:
        this.staffNum = 1;
        this.notePosY = -staffHeight / 2;
        break;
      case 64:
        this.staffNum = 2;
        this.notePosY = 0;
        break;
      case 65:
        this.staffNum = 2;
        this.notePosY = -staffHeight / 2;
        break;
      case 66:
        this.staffNum = 2;
        this.notePosY = -staffHeight / 2;
        break;
      case 67:
        this.staffNum = 3;
        this.notePosY = 0;
        break;
      case 68:
        this.staffNum = 3;
        this.notePosY = 0;
        break;
      case 69:
        this.staffNum = 3;
        this.notePosY = -staffHeight / 2;
        break;
      case 70:
        this.staffNum = 3;
        this.notePosY = -staffHeight / 2;
        break;
      case 71:
        this.staffNum = 4;
        this.notePosY = 0;
        break;
      case 72:
        this.staffNum = 4;
        this.notePosY = -staffHeight / 2;
        break;
      case 73:
        this.staffNum = 4;
        this.notePosY = -staffHeight / 2;
        break;
      case 74:
        this.staffNum = 5;
        this.notePosY = 0;
        break;
      case 75:
        this.staffNum = 5;
        this.notePosY = 0;
        break;
      case 76:
        this.staffNum = 5;
        this.notePosY = -staffHeight / 2;
        break;
      case 77:
        this.staffNum = 6;
        this.notePosY = 0;
        break;
      case 78:
        this.staffNum = 6;
        this.notePosY = 0;
        break;
      case 79:
        this.staffNum = 6;
        this.notePosY = -staffHeight / 2;
        break;
      case 80:
        this.staffNum = 6;
        this.notePosY = -staffHeight / 2;
        break;
      case 81:
        this.staffNum = 7;
        this.notePosY = 0;
        break;
      case 82:
        this.staffNum = 7;
        this.notePosY = 0;
        break;
      case 83:
        this.staffNum = 7;
        this.notePosY = -staffHeight / 2;
        break;
      case 84:
        this.staffNum = 8;
        this.notePosY = 0;
        break;
      case 85:
        this.staffNum = 8;
        this.notePosY = 0;
        break;
      case 86:
        this.staffNum = 8;
        this.notePosY = -staffHeight / 2;
        break;
      case 87:
        this.staffNum = 8;
        this.notePosY = -staffHeight / 2;
        break;
      case 88:
        this.staffNum = 9;
        this.notePosY = 0;
        break;
      case 89:
        this.staffNum = 9;
        this.notePosY = -staffHeight / 2;
        break;
      case 90:
        this.staffNum = 9;
        this.notePosY = -staffHeight / 2;
        break;
      case 91:
        this.staffNum = 10;
        this.notePosY = 0;
        break;
      case 92:
        this.staffNum = 10;
        this.notePosY = 0;
        break;
      case 93:
        this.staffNum = 10;
        this.notePosY = -staffHeight / 2;
        break;
    }
  }

  get notePosY() {
    return this.notePosY;
  }

  get staffNum() {
    return this.staffNum;
  }

  set valueNoteToWidth(value_note) {
    switch (value_note) {
      case 0.25:
        this.noteWidth = 25;
        break;
      case 0.5:
        this.noteWidth = 50;
        break;
      case 0.75:
        this.noteWidth = 75;
        break;
      case 1:
        this.noteWidth = 100;
        break;
      case 1.5:
        this.noteWidth = 150;
        break;
      case 2:
        this.noteWidth = 200;
        break;
    }
  }

  get valueNoteToWidth() {
    return this.noteWidth;
  }
}
