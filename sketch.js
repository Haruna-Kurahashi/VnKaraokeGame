var sketch;
let pitch;
let audioContext;
let audioStream;
var freq;
var midiNum;
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let currentNote = "";
var musicGroup;
var music = [];
var toOnImage;
var note_Img2, note_Img4, note_Img8, note_Img8_5, note_Img16;
var note_Img2_sharp, note_Img4_sharp, note_Img8_sharp, note_Img16_sharp;
var note_Img2_flat, note_Img4_flat, note_Img8_flat, note_Img16_flat;
var timeSprite;
var startSp;
var pitchSprite;
var pitchHigh;
var pitchLow;
var currentPitchY;
var second;
var timeline;
let isStarted = false;
var arrayX = [];
var arrayY = [];
var lastPosX = 0;
var sprite;
var stoped = false;
var cent;
var score;
var pitchGroup;
let startPosX = [];
let stopPos = 0;
var pitchArray = [[]];
var allPArray = [];
let point = 0;
let points = 0;
let perfectPoint = 0;
let overlaped = [];
let musicNum = 0;
let timeoutId;

// [80, 1, ],
// [71, 0.5, 0],
// [80, 0.5, 1],
// [78, 0.5, 1],
// [75, 0.5, 0],
// [74, 0.5, 1],
// [76, 0.5, 0],
// [81, 1, 3],
// [81, 1, 0],
// [81, 1, 0],
// [70, 1, 0],
// [60, 0.5, 0],
// [62, 0.5, 0],
// [64, 1, 0],
// [66, 1, 1],
// [67, 2, 0],

const staffHeight = 35;

const melody = [
  [64, 0.75, 0],
  [67, 0.25, 0],
  [67, 1, 0],
  [64, 0.75, 0],
  [62, 0.25, 0],
  [60, 1, 0],
  [62, 0.75, 0],
  [64, 0.25, 0],
  [67, 0.75, 0],
  [64, 0.25, 0],
  [62, 2, 0],
];

function preload() {
  //toOnImage = loadImage("./imgto-on.png");
  note_Img2 = loadImage("./img/note2.svg");
  note_Img4 = loadImage("./img/note4.svg");
  note_Img8 = loadImage("./img/note8.svg");
  note_Img8_5 = loadImage("./img/notehuten8.svg");
  note_Img16 = loadImage("./img/note16.svg");
  note_Img2_sharp = loadImage("./img/note2_sharp.svg");
  note_Img4_sharp = loadImage("./img/note4_sharp.svg");
  note_Img8_sharp = loadImage("./img/note8_sharp.svg");
  note_Img16_sharp = loadImage("./img/note16_sharp.svg");
  note_Img4_flat = loadImage("./img/note4_flat.svg");
}

function setup() {
  console.log("幅", windowWidth);
  createCanvas(windowWidth, 450);
  
  // 1) マイクからオーディオ入力(AudioIn)を作成し、マイクをオンにする。
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  createStaff();
  createMusic();
  createTimeBar();
  // fullscreen();
  pitchGroup = new Group();
}

function draw() {
  update();
  background("#140d36");

  drawSprites();

  noStroke();
  fill(100);
  textSize(16);

  controlGamePlay();

  beginShape();

  // noFill();
  // stroke(255, 255, 0);
  // strokeWeight(4);
  // vertex(30, 20);
  // vertex(85, 20);
  // endShape();
  // beginShape();
  // vertex(120, 75);

  // vertex(150, 75);
  // endShape();


  // for (let j = 0; j < allPArray.length; j++) {
  //   beginShape();
  //   for (var i = 0; i < allPArray[j].length; i++) {
  //     noFill();
  //     stroke(255, 255, 0);
  //     strokeWeight(4);

  //     vertex(allPArray[j][i].x, allPArray[j][i].y);
  //   }
  //   endShape();
  // }
  beginShape();
  for (var i = 0; i < pitchArray.length; i++) {
    noFill();
    stroke(255, 255, 0);
    strokeWeight(4);
    // const pitchPosX = pitchArray.map((item) => item[0]);

    // if (pitchPosX[i] - pitchPosX[i - 1] > 10) {
    //   endShape();
    // }
    vertex(pitchArray[i].x, pitchArray[i].y);
  }
  endShape();
  


  if (isStarted) {
    timeSprite.velocity.x = 120 / 60;
    stopPos = timeSprite.position.x;
  }

}

// オーディオの自動再生をブロックするChromeへの対処
// 2) ユーザーの画面クリックでAudioContextオブジェクトを取得し、処理をスタート
// function touchStarted() {
//   // AudioContextオブジェクトを得る
//   if (getAudioContext().state !== "running") {
//     audioContext = getAudioContext();
//     // あらかじめ中断させられた音声コンテキストの時間の進行を返す。
//     audioContext.resume();
//     // ここから本格スタート
//     startPitch();
//   }
// }

// 3) ml5.pitchDetection()でAudioContext、マイク、モデルを関連付ける。
function startPitch() {
  pitch = ml5.pitchDetection("./model/", audioContext, mic.stream, modelLoaded);
}

// 4)モデルが読み込まれたらgetPitching()を呼び出す。
function modelLoaded() {
  select("#status").html("モデルが読み込まれた");
}

function comparisonPitch() {
  let staffPos = defNoteY(midiNum - 1);
  let staffNum = staffPos[0];
  let staffHPos = defNoteY(midiNum + 2);
  let staffHNum = staffHPos[0];
  let low = staff[staffNum] + staffPos[1];
  let high = staff[staffHNum] + staffHPos[1];
  pitchHigh = 440 * Math.pow(2, (midiNum + 1 - 69) / 12);
  pitchLow = 440 * Math.pow(2, (midiNum - 1 - 69) / 12);
  currentPitchY = map(freq, pitchLow, pitchHigh, low, high);
  //console.log("基本周波数", basicFreq);
}

var count = 1;
let isDetecPitch = false;
// 5) ピッチの値を得る
function getPitching() {
  pitch.getPitch(function (err, frequency) {
    // console.log("エラー",frequency);
    if (frequency) {
      isDetecPitch = true;
      // 与えられた周波数に最も近いMIDIノートを返す
      midiNum = freqToMidi(frequency);

      // そのMIDIノートに対応する今の音名(CからBまでの12個)
      currentNote = scale[midiNum % 12];
      if (midiNum >= 55) {
        freq = frequency;
        select("#freq").html(frequency);
        select("#midi").html(midiNum);
        select("#cde").html(currentNote);
        comparisonPitch();

        timeSprite.overlap(musicGroup, scoring);

        // if (pitchArray.length > 0) {

        //   if (timeSprite.position.x - pitchArray[pitchArray.length - 1].x > 10) {

        //     allPArray.push(pitchArray.slice());
        //     pitchArray.length = 0
        //     console.log("ピッチ配列", allPArray);
        //   } 
        // }
        pitchArray[0].push({ x: timeSprite.position.x, y: currentPitchY, freq: freq });

        // console.log("ピッチ配列", pitchArray);
 
      }
    } else {
      //音を認識してない状態
      if (isDetecPitch) {
        isDetecPitch = false;
        console.log("切れ目----------")
      }

    }
    getPitching();
  });
}

//採点
function scoring(current_Sp, overlaped_Sp) {
  if (musicNum != overlaped_Sp.musicNum) {
    if (timeoutId) return;

    timeoutId = setTimeout(function () {
      timeoutId = 0;
      average();
    }, 100);
  }

  if (overlaped_Sp.musicNum == melody.length - 1) {
    if (
      timeSprite.position.x >
      overlaped_Sp.position.x + overlaped_Sp.width / 2
    ) {
      if (timeoutId) return;

      timeoutId = setTimeout(function () {
        timeoutId = 0;
        average();
      }, 100);
    }
  }
  // console.log("カウント", overlaped_Sp.musicNum);
  musicNum = overlaped_Sp.musicNum;


  // overlaped.push(pitchSprite.pitch);
  // console.log("周波数", pitchSprite.pitch);
  // console.log("基準周波数", overlaped_Sp.musicFreq);
  // let diff = conversion(pitchSprite.pitch, overlaped_Sp.musicFreq);
  // //console.log("差分", diff);
  // if (diff > 30 && diff < 50) {
  //   point += 3;
  // }
  // if (diff > 20 && diff < 30) {
  //   //console.log("惜しい");
  //   point += 5;
  // }
  // if (diff > 10 && diff < 20) {
  //   //console.log("惜しい");
  //   point += 7;
  // }
  // if (diff > 5 && diff < 10) {
  //   //console.log("だいたいOK");
  //   point += 9;
  // }
  // if (diff < 5) {
  //   //console.log("完璧");
  //   point += 10;
  // }

  // console.log("ポイント", point);
}
// console.log("freq", overlaped);

const conversion = function (freq1, freq2) {
  let diff = 1200 * Math.log2(freq1 / freq2);
  return diff < 0 ? -diff : diff;
};

function average() {
  //console.log(overlaped_Sp.musicNum);
  // console.log("音ごと合計", point);
  // console.log("数", overlaped.length);
  ave = point / overlaped.length;
  // console.log("平均", ave);
  points += ave;
  // console.log("合計", points);
  overlaped.length = 0;
  point = 0;
  const b = document.getElementById("point");
  b.textContent = Math.round(points);
}

//五線譜描画
let staff = new Array();
function createStaff() {
  for (let i = 0; i < 10; i++) {
    const staffSprite = createSprite();
    staffSprite.position.x = width / 2;
    staffSprite.position.y = height - height / 8 - staffHeight * i;
    staffSprite.height = 2;
    staffSprite.width = width;
    staffSprite.shapeColor = color(117, 122, 216);
    if (i < 2 || i > 6) {
      staffSprite.shapeColor = color(117, 122, 216, 80);
    }
    staff.push(staffSprite.position.y);
  }
  //console.log("五線譜", staff[1]);
}

//曲
var score = new Array();
function createMusic() {
  //melodyToHeight();
  // const toOnSprite = createSprite(100, 250);
  // toOnSprite.addImage(toOnImage);

  //Noteクラスインスタンス生成
  for (let i = 0; i < melody.length; i++) {
    const note = new Note(melody[i][0], melody[i][1], melody[i][2]);
    note.frequency = melody[i][0];
    note.name = melody[i][0];
    note.defNoteY = melody[i][0];
    note.valueNoteToWidth = melody[i][1];
    note.symbolNote = melody[i][2];
    note.musicNum = i;
    if (melody[i][2] == undefined) {
      note.symbolNote = 0;
    }
    score.push(note);
  }

  //譜面スプライト生成
  const startPos = 300;
  musicGroup = new Group();
  for (let i = 0; i < melody.length; i++) {
    sprite = createSprite();
    sprite.width = score[i].noteWidth;
    sprite.height = staffHeight;
    sprite.position.y = staff[score[i].staffNum] + score[i].notePosY;

    if (i == 0) {
      sprite.position.x = startPos;
      startPosX.push(startPos - score[i].noteWidth / 2);
    } else {
      sprite.position.x =
        lastPosX + (score[i - 1].noteWidth / 2 + score[i].noteWidth / 2);
      startPosX.push(lastPosX + score[i - 1].noteWidth / 2);
    }
    lastPosX = sprite.position.x;
    sprite.musicFreq = score[i].freq;
    sprite.musicNum = score[i].musicNum;
    
    // sprite.shapeColor = color(190, 233, 232);

    // console.log(score[i].symbolNote);
    if (score[i].symbolNote == 0) {
      if (score[i].valueNote == 0.25) {
        sprite.addImage(note_Img16);
      }
      if (score[i].valueNote == 0.5) {
        sprite.addImage(note_Img8);
      }
      if (score[i].valueNote == 0.75) {
        sprite.addImage(note_Img8_5);
      }
      if (score[i].valueNote == 1) {
        sprite.addImage(note_Img4);
      }
      if (score[i].valueNote == 2) {
        sprite.addImage(note_Img2);
      }
    }
    if (score[i].symbolNote == 1) {
      if (score[i].valueNote == 0.25) {
        sprite.addImage(note_Img16_sharp);
      }
      if (score[i].valueNote == 0.5) {
        sprite.addImage(note_Img8_sharp);
      }
      if (score[i].valueNote == 1) {
        sprite.addImage(note_Img4_sharp);
      }
    }
    if (score[i].symbolNote == 2) {
      if (score[i].valueNote == 0.25) {
        sprite.addImage(note_Img16_flat);
      }
      if (score[i].valueNote == 0.5) {
        sprite.addImage(note_Img8_flat);
      }
      if (score[i].valueNote == 1) {
        sprite.addImage(note_Img4_flat);
      }
    }
    if (score[i].symbolNote == 3) {
      if (score[i].valueNote == 0.25) {
        sprite.shapeColor = color(255, 255, 255, 0);
      }
      if (score[i].valueNote == 0.5) {
        sprite.shapeColor = color(255, 255, 255, 0);
      }
      if (score[i].valueNote == 0.75) {
        sprite.shapeColor = color(255, 255, 255, 0);
      }
      if (score[i].valueNote == 1) {
        sprite.shapeColor = color(255, 255, 255, 0);
      }
      if (score[i].valueNote == 2) {
        sprite.shapeColor = color(255, 255, 255, 0);
      }
    }

    musicGroup.add(sprite);
  }
  perfectPoint = 10 * melody.length;
  const b = document.getElementById("perfect");
  b.textContent = parseInt(perfectPoint);
}

function createTimeBar() {
  timeSprite = createSprite();
  timeSprite.position.x = 0;
  timeSprite.position.y = height / 2;
  timeSprite.width = 5;
  timeSprite.height = height;
  timeSprite.shapeColor = color(248, 225, 108);

  // startSp.onMousePressed = function () {
  //   timeSprite.velocity.x = 1.67;
  //   started = true;
  //   getPitching();
  // };
}

function onClickButton() {
  // timeSprite.velocity.x = 1.4;
  isStarted = true;
  mic.start(startPitch);
  getPitching();
}

function controlGamePlay() {
  let endPosX = width;
  if (timeSprite.position.x > endPosX) {
    timeSprite.position.x = 150;
  }
  if (keyIsPressed) {
    if (keyCode === ENTER) {
      isStarted = false;
      timeSprite.velocity.x = 0;
    }
  }
}

function update() {
  let endPosX = width;
  if (timeSprite.position.x > endPosX) {
    musicGroup.removeSprites();
    pitchGroup.removeSprites();
  }
}

new p5(sketch, "p5sketch");
