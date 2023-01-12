let note1;
let note2;
let noteQuiz;
let standardFreq = 440;
let micFreq;
let key = {};
let quizKey = [];
let quizNum = 3;
let quizCount = 0;
let gameState;

// let note3;
// let note4;
// let note5;
// const majorKey = ["C", "G", "D", "A", "E", "B", "Fsharp", "Csharp", "F", "Bflat", "Aflat", "Dflat", "Gflat", "Cflat"];
const majorKey = ["C", "G", "D", "A", "E", "B"];
const harmonyKey = new HarmonyKey();
  
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5sketch_harmony");
  // 1) マイクからオーディオ入力(AudioIn)を作成し、マイクをオンにする。
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  note1 = new p5.Oscillator("sine");
  note2 = new p5.Oscillator("sine");
  noteQuiz = new p5.Oscillator("sine");
  choiceKey();
}

function draw() {
  if (micFreq < 554.4 && micFreq > 552.5) {
    fill(255);
    ellipse(width / 2, height / 2, 200, 200);
  }


}


// 2) ユーザーの画面クリックでAudioContextオブジェクトを取得し、処理をスタート
function touchStarted() {
  // AudioContextオブジェクトを得る
  if (getAudioContext().state !== "running") {
    audioContext = getAudioContext();
    // あらかじめ中断させられた音声コンテキストの時間の進行を返す。
    audioContext.resume();
    // ここから本格スタート
    startPitch();
  }
}

// 3) ml5.pitchDetection()でAudioContext、マイク、モデルを関連付ける。
function startPitch() {
  pitch = ml5.pitchDetection("./model/", audioContext, mic.stream, modelLoaded);
}

// 4)モデルが読み込まれたらgetPitching()を呼び出す。
function modelLoaded() {
  select("#status").html("モデルが読み込まれた");
  getPitching();
}

function getPitching() {
  pitch.getPitch(function (err, frequency) {
    // console.log("周波数", frequency);
    if (frequency) {
      // 与えられた周波数に最も近いMIDIノートを返す
      midiNum = freqToMidi(frequency);

      // そのMIDIノートに対応する今の音名(CからBまでの12個)
      currentNote = scale[midiNum % 12];
      if (midiNum >= 55) {
        micFreq = frequency;
        select("#freq").html(frequency);
        select("#midi").html(midiNum);
        select("#cde").html(currentNote);
        // console.log(micFreq);
      }
    } else {
    }
    getPitching();
  });
}

const calculateDiff = function (freq1, freq2) {
  let diff = 1200 * Math.log2(freq1 / freq2);
  return diff < 0 ? -diff : diff;
};

function choiceKey() {
  for(let i = 0; i < quizNum; i++) {
        while(true){
          let keyNum = Math.floor(Math.random() * majorKey.length);
          if(!quizKey.includes(majorKey[keyNum])) {
          quizKey[i] = majorKey[keyNum];
          break;
          }
        }
  }
  console.log(quizKey);
  createQuiz();
}

function createQuiz() {
  harmonyKey.createHarmony(quizKey[quizCount]);
  console.log(harmonyKey.keyName);
  let equalTonic = standardFreq * Math.pow(2, (harmonyKey.tonic_midiNum - 69) / 12);
  let equalDominant = standardFreq * Math.pow(2, ((harmonyKey.tonic_midiNum + 7) - 69) / 12);
  let equalMediant = standardFreq * Math.pow(2, ((harmonyKey.tonic_midiNum + 4) - 69) / 12);
  let tonicDiff = calculateDiff(equalTonic, harmonyKey.tonic_tone);
  let dominantDiff = calculateDiff(equalDominant, harmonyKey.dominant_tone);
  let mediantDiff = calculateDiff(equalMediant, harmonyKey.mediant_tone)
  let maxDiff = Math.max(tonicDiff, dominantDiff, mediantDiff);
  if(maxDiff == tonicDiff) {
    noteQuiz.freq(harmonyKey.tonic_tone);
    note1.freq(harmonyKey.dominant_tone);
    note2.freq(harmonyKey.midiant_tone);
    console.log("5音", harmonyKey.dominant_tone);
    console.log("3音", harmonyKey.midiant_tone);
  }else if(maxDiff == dominantDiff) {
    noteQuiz.freq(harmonyKey.dominant_tone);
    note1.freq(harmonyKey.tonic_tone);
    note2.freq(harmonyKey.mediant_tone);
    console.log("主音", harmonyKey.tonic_tone);
    console.log("3音", harmonyKey.mediant_tone);
  }else if(maxDiff = mediantDiff) {
    noteQuiz.freq(harmonyKey.mediant_tone);
    note1.freq(harmonyKey.tonic_tone);
    note2.freq(harmonyKey.dominant_tone);
    console.log("主音", harmonyKey.tonic_tone);
    console.log("5音", harmonyKey.dominant_tone);
  }
  console.log("差分", maxDiff);
}


function mousePressed() {
  note1.start();
  note2.start();
  noteQuiz.start();
}
