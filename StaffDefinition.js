function defNoteY(midi_note) {
  let staffNum = 0;
  let notePosY = 0;
  switch (midi_note) {
    case 55:
      staffNum = 0;
      notePosY = staffHeight / 2;
      break;
    case 56:
      staffNum = 0;
      notePosY = staffHeight / 2;
      break;
    case 57:
      staffNum = 0;
      notePosY = 0;
      break;
    case 58:
      staffNum = 0;
      notePosY = 0;
      break;
    case 59:
      staffNum = 0;
      notePosY = -staffHeight / 2;
      break;
    case 60:
      staffNum = 1;
      notePosY = 0;
      break;
    case 61:
      staffNum = 1;
      notePosY = 0;
      break;
    case 62:
      staffNum = 1;
      notePosY = -staffHeight / 2;
      break;
    case 63:
      staffNum = 1;
      notePosY = -staffHeight / 2;
      break;
    case 64:
      staffNum = 2;
      notePosY = 0;
      break;
    case 65:
      staffNum = 2;
      notePosY = -staffHeight / 2;
      break;
    case 66:
      staffNum = 2;
      notePosY = -staffHeight / 2;
      break;
    case 67:
      staffNum = 3;
      notePosY = 0;
      break;
    case 68:
      staffNum = 3;
      notePosY = 0;
      break;
    case 69:
      staffNum = 3;
      notePosY = -staffHeight / 2;
      break;
    case 70:
      staffNum = 3;
      notePosY = -staffHeight / 2;
      break;
    case 71:
      staffNum = 4;
      notePosY = 0;
      break;
    case 72:
      staffNum = 4;
      notePosY = -staffHeight / 2;
      break;
    case 73:
      staffNum = 4;
      notePosY = -staffHeight / 2;
      break;
    case 74:
      staffNum = 5;
      notePosY = 0;
      break;
    case 75:
      staffNum = 5;
      notePosY = 0;
      break;
    case 76:
      staffNum = 5;
      notePosY = -staffHeight / 2;
      break;
    case 77:
      staffNum = 6;
      notePosY = 0;
      break;
    case 78:
      staffNum = 6;
      notePosY = 0;
      break;
    case 79:
      staffNum = 6;
      notePosY = -staffHeight / 2;
      break;
    case 80:
      staffNum = 6;
      notePosY = -staffHeight / 2;
      break;
    case 81:
      staffNum = 7;
      notePosY = 0;
      break;
    case 82:
      staffNum = 7;
      notePosY = 0;
      break;
    case 83:
      staffNum = 7;
      notePosY = -staffHeight / 2;
      break;
    case 84:
      staffNum = 8;
      notePosY = 0;
      break;
    case 85:
      staffNum = 8;
      notePosY = 0;
      break;
    case 86:
      staffNum = 8;
      notePosY = -staffHeight / 2;
      break;
    case 87:
      staffNum = 8;
      notePosY = -staffHeight / 2;
      break;
    case 88:
      staffNum = 9;
      notePosY = 0;
      break;
    case 89:
      staffNum = 9;
      notePosY = -staffHeight / 2;
      break;
    case 90:
      staffNum = 9;
      notePosY = -staffHeight / 2;
      break;
    case 91:
      staffNum = 10;
      notePosY = 0;
      break;
    case 92:
      staffNum = 10;
      notePosY = 0;
      break;
    case 93:
      staffNum = 10;
      notePosY = -staffHeight / 2;
      break;
  }
  return [staffNum, notePosY];
}
