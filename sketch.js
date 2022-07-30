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
var note_Img2, note_Img4, note_Img8, note_Img16;
var note_Img2_sharp, note_Img4_sharp, note_Img8_sharp, note_Img16_sharp;
var timeSprite;
var startSp;
var pitchSprite;
var pitchHigh;
var pitchLow;
var currentPitch;
var currentPitch2;
var second;
var timeline;
var started = false;
var arrayX = [];
var arrayY = [];
var lastPosX = 0;
var sprite;
var stoped = false;
var cent;
var score;
var pitchGroup;
let startPosX = [];

// const melody = [60, 62, 64, 65, 67, 69, 71, 72];
const staffHeight = 35;
const melody = [
  [60, 2],
  [62, 2],
  [64, 2],
  [65, 2],
  [67, 2],
  // [69, 1],
  // [71, 1],
  // [72, 2],
];

function preload() {
  //toOnImage = loadImage("./imgto-on.png");
  note_Img2 = loadImage("./img/note2.svg");
  note_Img4 = loadImage("./img/note4.svg");
  note_Img8 = loadImage("./img/note8.svg");
  note_Img16 = loadImage("./img/note16.svg");
}

function setup() {
  createCanvas(windowWidth, 450);
  // 1) マイクからオーディオ入力(AudioIn)を作成し、マイクをオンにする。
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  createStaff();
  createMusic();
  createTimeBar();
  fullscreen();
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
  let low = staff[1];
  let high = staff[4] - staffHeight / 2;
  let basicFreq = midiToFreq(midiNum);
  pitchHigh = 440 * Math.pow(2, (midiNum + 1 - 69) / 12);
  pitchLow = 440 * Math.pow(2, (midiNum - 1 - 69) / 12);
  currentPitch2 = map(freq, 261.6, 523.3, low, high);
  //console.log("基本周波数", basicFreq);
}

var count = 0;
// 5) ピッチの値を得る
function getPitching() {
  pitchGroup = new Group();
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      // 与えられた周波数に最も近いMIDIノートを返す
      midiNum = freqToMidi(frequency);
      // そのMIDIノートに対応する今の音名(CからBまでの12個)
      currentNote = scale[midiNum % 12];
      freq = frequency;
      select("#freq").html(frequency);
      select("#midi").html(midiNum);
      select("#cde").html(currentNote);

      pitchSprite = createSprite();
      pitchSprite.width = 10;
      pitchSprite.height = 10;
      pitchSprite.position.x = timeSprite.position.x;
      comparisonPitch();
      pitchSprite.position.y = currentPitch2;
      pitchSprite.shapeColor = color(255, 160, 0);
      pitchSprite.pitch = freq;
      pitchGroup.add(pitchSprite);
      timeSprite.overlap(musicGroup, scoring);
    }
    getPitching();
  });
}

let point = 0;
let points = 0;
let perfectPoint = 0;
let overlaped = [];
let num = 0;
let timeoutId;
//採点
function scoring(current_Sp, overlaped_Sp) {
  if (num != overlaped_Sp.musicNum) {
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
  num = overlaped_Sp.musicNum;
  console.log("番号", num);
  overlaped.push(pitchSprite.pitch);
  console.log("周波数", pitchSprite.pitch);
  //console.log("基準周波数", overlaped_Sp.musicFreq);
  let diff = abs(pitchSprite.pitch, overlaped_Sp.musicFreq);
  console.log("差分", diff);
  if (diff > 10 && diff < 15) {
    //console.log("惜しい");
    point += 4;
  }
  if (diff > 5 && diff < 10) {
    //console.log("惜しい");
    point += 6;
  }
  if (diff > 2 && diff < 5) {
    //console.log("だいたいOK");
    point += 8;
  }
  if (diff < 2) {
    //console.log("完璧");
    point += 10;
  }
  console.log("ポイント", point);
  tf = true;
}
console.log("freq", overlaped);

const abs = function (freq1, freq2) {
  let diff = freq1 - freq2;
  return diff < 0 ? -diff : diff;
};

function average() {
  //console.log(overlaped_Sp.musicNum);
  console.log("音ごと合計", point);
  ave = point / overlaped.length;
  console.log("平均", ave);
  points += ave;
  console.log("合計", points);
  overlaped.length = 0;
  point = 0;
  const b = document.getElementById("point");
  b.textContent = parseInt(points);
}

function draw() {
  update();
  background("#140d36");

  //line(250, 0, 250, height);
  //line(1057, 0, 1057, height);

  drawSprites();

  noStroke();
  fill(100);
  textSize(16);
  // text("start", 50, 45);

  drawPitch();
  if (started == true) {
    second = millis();
  }
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
    const note = new Note(melody[i][0], melody[i][1]);
    note.frequency = melody[i][0];
    note.name = melody[i][0];
    note.defNoteY = melody[i][0];
    note.valueNoteToWidth = melody[i][1];
    score.push(note);
  }
  //console.log(score);

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
    sprite.musicNum = i;
    sprite.shapeColor = color(190, 233, 232);

    switch (score[i].valueNote) {
      case 0.25:
        sprite.addImage(note_Img16);
        break;
      case 0.5:
        sprite.addImage(note_Img8);
        break;
      case 1:
        sprite.addImage(note_Img4);
        break;
      case 1.5:
        break;
      case 2:
        sprite.addImage(note_Img2);
        break;
    }
    musicGroup.add(sprite);
  }

  perfectPoint = 10 * melody.length;
  const b = document.getElementById("perfect");
  b.textContent = parseInt(perfectPoint);
}

function update() {
  if (timeSprite.position.x > lastPosX) {
    //musicGroup.removeSprites();
  }
  if (keyIsPressed) {
    if (keyCode === ENTER) {
      stoped = true;
      timeSprite.velocity.x = 0;
    }
  }
}

function createTimeBar() {
  timeSprite = createSprite();
  timeSprite.position.x = 0;
  timeSprite.position.y = height / 2;
  timeSprite.width = 5;
  timeSprite.height = height;
  timeSprite.shapeColor = color(248, 225, 108);

  // startSp = createSprite(70, 40, 100, 30);
  // startSp.shapeColor = color(248, 225, 108);

  // startSp.onMousePressed = function () {
  //   timeSprite.velocity.x = 1.67;
  //   started = true;
  //   getPitching();
  // };
}

function onClickButton() {
  timeSprite.velocity.x = 1.67;
  started = true;
  getPitching();
}

function drawPitch() {
  if (freq > 0 && pitchHigh > 0 && pitchLow > 0) {
    // const low = staff[1];
    // const high = staff[4] - staffHeight / 2;
    // //currentPitch = map(freq, 261.6, 523.3, 400, 225);
    // currentPitch = map(freq, 261.6, 523.3, low, high);
    // //time = map(second, 0, 9000, 0, 1057);
    // timeline = timeSprite.position.x;
    // if (stoped == false) {
    //   arrayX.push(timeline);
    //   arrayY.push(currentPitch);
    // }
    // //console.log(second);
    // stroke(119, 203, 185);
    // strokeWeight(10);
    // for (let i = -1; i < 10000; i++) {
    //   fill(255, 0, 0);
    //   line(arrayX[i - 1], arrayY[i - 1], arrayX[i], arrayY[i]);
    // }
    let endPosX = width;
    if (timeSprite.position.x > endPosX) {
      timeSprite.position.x = 150;
      arrayX.length = 0;
      arrayY.length = 0;
    }
    if (keyIsPressed) {
      if (keyCode === ENTER) {
        stoped = true;
        timeSprite.velocity.x = 0;
      }
    }
  }
}

new p5(sketch, "p5sketch");
