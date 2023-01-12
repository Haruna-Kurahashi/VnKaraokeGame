let a_Achord;
let e_Achord;
let c_Achord;
let standardFreq = 442;
let micFreq;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5sketch_harmony");
  a_Achord = new p5.Oscillator("sine");
  a_Achord.freq(standardFreq);
  e_Achord = new p5.Oscillator("sine");
  e_Achord.freq(663);
  c_Achord = new p5.Oscillator("sine");
  c_Achord.freq(552.5);

  // 1) マイクからオーディオ入力(AudioIn)を作成し、マイクをオンにする。
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
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
        console.log(micFreq);
      }
    } else {
    }
    getPitching();
  });
}

function draw() {
  if (micFreq < 554.4 && micFreq > 552.5) {
    fill(255);
    ellipse(width / 2, height / 2, 200, 200);
  }
}

function mousePressed() {
  a_Achord.start();
  e_Achord.start();
  // e_Achord.start();
}
