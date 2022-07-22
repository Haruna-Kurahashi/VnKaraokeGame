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
  [60, 1],
  [62, 1],
  [64, 1],
  [65, 1],
  [67, 1],
  [69, 1],
  [71, 1],
  [72, 1],
];

function preload() {
  toOnImage = loadImage("to-on.png");
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
      pitchSprite.shapeColor = color(119, 203, 185);
      pitchSprite.pitch = freq;
      pitchGroup.add(pitchSprite);
      timeSprite.overlap(musicGroup, scoring);
    }
    getPitching();
  });
}
var score;
let overlaped = [];
//採点
function scoring(current_Sp, overlaped_Sp) {
  //console.log(overlaped_Sp.musicNum);

  overlaped.push(pitchSprite);
  console.log("周波数", pitchSprite.pitch);
  console.log("基準周波数", overlaped_Sp.musicFreq);
  let diff = abs(pitchSprite.pitch, overlaped_Sp.musicFreq);
  console.log("差分", diff);
  if (diff > 5 && diff < 10) {
    console.log("惜しい");
    score = 0;
  }
  if (diff > 2 && diff < 5) {
    console.log("だいたいOK");
    score = 1;
  }
  if (diff < 2) {
    console.log("完璧");
    score = 2;
  }
}

const abs = function (freq1, freq2) {
  let diff = freq1 - freq2;
  return diff < 0 ? -diff : diff;
};

console.log(overlaped);

function draw() {
  update();
  background("#140d36");

  //line(250, 0, 250, height);
  //line(1057, 0, 1057, height);

  drawSprites();

  noStroke();
  fill(100);
  textSize(16);
  text("start", 50, 45);

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
      startPosX.push(startPos - score[i].noteWidth / 2 + 1);
    } else {
      sprite.position.x =
        lastPosX + (score[i - 1].noteWidth / 2 + (score[i].noteWidth / 2 + 1));
      startPosX.push(lastPosX + score[i - 1].noteWidth / 2);
    }
    lastPosX = sprite.position.x;
    sprite.musicFreq = score[i].freq;
    sprite.musicNum = i;
    sprite.shapeColor = color(190, 233, 232);
    musicGroup.add(sprite);
  }
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

  startSp = createSprite(70, 40, 100, 30);
  startSp.shapeColor = color(248, 225, 108);

  startSp.onMousePressed = function () {
    timeSprite.velocity.x = 1.67;
    started = true;
    getPitching();
  };
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
