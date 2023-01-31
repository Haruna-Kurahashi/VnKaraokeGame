let pitch;
let audioContext;
let audioStream;
let note1;
let note2;
let noteQuiz;
let standardFreq = 440;
let micFreq;
let quizKey = [];
let quizNum = 3;
let quizCount = 0;
let gameState = false;
let timer = 20;
let frame = 0;
let quizState = "before";
let tonicDiff;
let dominantDiff;
let mediantDiff;
let maxDiff;
let equalTonic;
let equalDominant;
let equalMediant;
let adjustValue = 3;
let harmonyVisualsL = [];
let harmonyVisualsR = [];
let micVisualsG = [];
let micVisualsE = [];
let animations = [];
let animations2 = [];
let colors = [];
let shadows = [];
let badges = [];
let count = 0;
let rankCount = 0;
let rankCount2 = 0;
let harmonyColors;
let quizColors = [];
let finalRank = { rank:"unbadged", num: 0};

//画像関連
let rankTextGood, rankTextGreat, rankTextExc;
let rankImgGood, rankImgGreat, rankImgExc;
let highArrow, lowArrow;

const db = new Dexie("badgeDB");
db.version(1).stores({
  badges: "key,badge,num"
});

// let note3;
// let note4;
// let note5;
// const majorKey = ["C", "G", "D", "A", "E", "H", "Fsharp", "Csharp", "F", "B", "Aflat", "Dflat", "Gflat", "Cflat"];
const majorKey = ["C", "G", "D", "A", "E", "H"];
const harmonyKey = new HarmonyKey();

function preload() {
  rankTextGood = loadImage("../img/good.svg");
  rankTextGreat = loadImage("../img/great.svg");
  rankTextExc = loadImage("../img/excellent.svg");
  rankImgGood = loadImage("../img/bronze.svg");
  rankImgGreat = loadImage("../img/silver.svg");
  rankImgExc = loadImage("../img/gold.svg");
  highArrow = loadImage("../img/raisepitch.svg");
  lowArrow = loadImage("../img/lowerpitch.svg");
}

let c1, c2;
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
  rectMode(CENTER);
  imageMode(CENTER);
  createVisual();

  // for (let i = 0; i < 3; i++) {
  //   animations2.push(new AnimationSmallRects());
  // }
}

var vx = 0;
function draw() {
  blendMode(BLEND);
  background("#140d36");
  drawQuiz();

  // for (let i = 0; i < micVisualsG.length; i++) {
  //   micVisualsG[i].draw();
  //   micVisualsG[i].setColor(color(232, 165, 196, 60), color(255, 0, 0));
  //   // micVisuals[i].setColor(harmonyColors[1].centerColor, harmonyColors[1].centerShadow);
  //   micVisualsG[i].setBlur(80);
  // }
  // for (let i = 0; i < harmonyVisualsL.length; i++) {
  //   harmonyVisualsL[i].draw();
  //   harmonyVisualsR[i].draw();
  //   harmonyVisualsL[i].setColor(color(219, 110, 161, 60), color(255, 0, 0));
  //   // harmonyVisualsL[i].setColor(harmonyColors[1].sideColor, harmonyColors[1].sideShadow);
  //   harmonyVisualsR[i].setColor(color(219, 110, 161, 60), color(255, 0, 0));
  //   // harmonyVisualsR[i].setColor(harmonyColors[1].sideColor, harmonyColors[1].sideShadow);
  // }
  for (let i = 0; i < animations.length; i++) {
    animations[i].draw();
  }
  for (let i = 0; i < animations2.length; i++) {
    animations2[i].draw();
  }

  // push();
  // translate(width /2, height/2 - 100);
  // rotate(radians(45));
  // noFill();
  // strokeWeight(4);
  // stroke(color(201, 8, 56));
  // square(0, 0, 260, 2);
  // strokeWeight(2);
  // square(0, 0, 220, 2);
  // square(0, 0, 200), 2;
  // pop();

  drawMicVisual();
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
  pitch = ml5.pitchDetection("../model", audioContext, mic.stream, modelLoaded);
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

const calculateScore = function (freq1, freq2) {
  let diff = 1200 * Math.log2(freq1 / freq2);
  return diff;
};

function choiceKey() {
  for (let i = 0; i < quizNum; i++) {
    while (true) {
      let keyNum = Math.floor(Math.random() * majorKey.length);
      if (!quizKey.includes(majorKey[keyNum])) {
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
  equalTonic = standardFreq * Math.pow(2, (harmonyKey.tonic_midiNum - 69) / 12);
  equalDominant =
    standardFreq * Math.pow(2, (harmonyKey.tonic_midiNum + 7 - 69) / 12);
  equalMediant =
    standardFreq * Math.pow(2, (harmonyKey.tonic_midiNum + 4 - 69) / 12);
  tonicDiff = calculateDiff(equalTonic, harmonyKey.tonic_tone);
  dominantDiff = calculateDiff(equalDominant, harmonyKey.dominant_tone);
  mediantDiff = calculateDiff(equalMediant, harmonyKey.mediant_tone);
  maxDiff = Math.max(tonicDiff, dominantDiff, mediantDiff);

  if (maxDiff == tonicDiff) {
    noteQuiz.freq(harmonyKey.tonic_tone);
    note1.freq(harmonyKey.dominant_tone);
    note2.freq(harmonyKey.midiant_tone);
    console.log("5音", harmonyKey.dominant_tone);
    console.log("3音", harmonyKey.midiant_tone);
  } else if (maxDiff == dominantDiff) {
    noteQuiz.freq(harmonyKey.dominant_tone);
    note1.freq(harmonyKey.tonic_tone);
    note2.freq(harmonyKey.mediant_tone);
    console.log("主音", harmonyKey.tonic_tone);
    console.log("3音", harmonyKey.mediant_tone);
  } else if ((maxDiff = mediantDiff)) {
    noteQuiz.freq(harmonyKey.mediant_tone);
    note1.freq(harmonyKey.tonic_tone);
    note2.freq(harmonyKey.dominant_tone);
    console.log("主音", harmonyKey.tonic_tone);
    console.log("5音", harmonyKey.dominant_tone);
    console.log("クイズ周波数", harmonyKey.mediant_tone);
  }
  console.log("差分", maxDiff);
}

function createVisual() {
  const blue = {
    mainColor: color(0, 80, 100, 80),
    subColor: color(0, 80, 100, 80),
    mainShadow: color(0, 0, 255),
    subShadow: color(0, 0, 255),
    lineColor: color(0, 0, 255),
  };

  const lightGreen = {
    mainColor: color(193, 253, 166, 50),
    subColor: color(193, 253, 166, 50),
    mainShadow: color(0, 146, 69),
    subShadow: color(0, 146, 69),
    lineColor: color(0, 104, 55),
  };

  const orange = {
    mainColor: color(232, 157, 37, 60),
    subColor: color(230, 63, 5, 60),
    mainShadow: color(230, 63, 5),
    subShadow: color(0, 146, 69),
    lineColor: color(230, 63, 5),
  };

  const pink = {
    mainColor: color(219, 110, 161, 60),
    subColor: color(232, 165, 196, 60),
    mainShadow: color(255, 0, 0),
    subShadow: color(255, 0, 0),
    lineColor: color(201, 8, 56),
  };

  harmonyColors = [blue, lightGreen, orange];
  for (let i = 0; i < quizNum; i++) {
    while (true) {
      let num = Math.floor(Math.random() * harmonyColors.length);
      if (!quizColors.includes(harmonyColors[num])) {
        quizColors[i] = harmonyColors[num];
        break;
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    if (i == 0) {
      harmonyVisualsL.push(
        new VisualHarmony(width / 4 + 50, height / 2 - 100, 360)
      );
      harmonyVisualsR.push(
        new VisualHarmony(width - width / 4 - 50, height / 2 - 100, 360)
      );
      micVisualsE.push(new VisualHarmony(width / 2, height / 2 - 100, 300));
    } else {
      let d = random(50, 360);
      harmonyVisualsL.push(
        new VisualHarmony(width / 4 + 50, height / 2 - 100, d)
      );
      harmonyVisualsR.push(
        new VisualHarmony(width - width / 4 - 50, height / 2 - 100, d)
      );
      micVisualsE.push(new VisualHarmony(width / 2, height / 2 - 100, d));
    }
  }
  for (let i = 0; i < 5; i++) {
    if (i == 0) {
      micVisualsG.push(new VisualHarmony(width / 2, height / 2 - 100, 300));
    } else {
      let d2 = random(20, 300);
      micVisualsG.push(new VisualHarmony(width / 2, height / 2 - 100, d2));
    }
  }
}

function keyPressed() {
  // Enterキー
  if (keyCode == 13) {
    if (gameState == false) {
      gameState = true;
      note1.start();
      note2.start();
      // noteQuiz.start();
      console.log(gameState);
    }
    // badges.push({ badge: finalRank, key: quizKey[quizCount] });
    if (quizState == "finish") {
      console.log("送るもの", badges);
      db.badges.bulkPut(
        badges
      )
      .catch((error)=>{
        console.log(error);
      });
      location.href = "badgeCollection.html";
    }
  }
  if (keyCode === RIGHT_ARROW && gameState == false) {
    timer = 2;
    gameState = true;
    quizCount++;
    finalRank.rank = "unbadged";
    finalRank.num = 0;
    createQuiz();
    note1.start();
    note2.start();
    // noteQuiz.start();
    console.log(gameState);
    console.log(quizCount);
  }
}

function drawQuiz() {
  blendMode(BLEND);
  if (gameState == false) {
    if (quizState == "before") {
      fill("#3d3a60");
      rect(width / 2, height - 200, 220, 70, 20);
      textSize(30);
      fill(255);
      textFont("Mochiy Pop One");
      text("S T A R T", width / 2 - 80, height - 190);
    } else if (quizState == "doing") {
      fill("#3d3a60");
      rect(width / 2, height - 200, 200, 70, 20);
      textSize(32);
      fill(255);
      textFont("Mochiy Pop One");
      text("N E X T", width / 2 - 70, height - 190);
      const imgWidth = 200;
      if (finalRank.rank == "Excellent!") {
        image(
          rankTextExc,
          width / 2,
          height / 4,
          rankTextExc.width * 0.8,
          rankTextExc.height * 0.8
        );
        image(
          rankImgExc,
          width / 2,
          height / 2 + 25,
          imgWidth,
          rankImgExc.height * (imgWidth / rankImgExc.width)
        );
      } else if (finalRank.rank == "Great!") {
        image(
          rankTextGreat,
          width / 2,
          height / 4,
          rankTextGreat.width * 0.8,
          rankTextGreat.height * 0.8
        );
        image(
          rankImgGreat,
          width / 2,
          height / 2 + 25,
          imgWidth,
          rankImgGreat.height * (imgWidth / rankImgGreat.width)
        );
      } else if (finalRank.rank == "Good!") {
        image(
          rankTextGood,
          width / 2,
          height / 4,
          rankTextGood.width * 0.8,
          rankTextGood.height * 0.8
        );
        image(
          rankImgGood,
          width / 2,
          height / 2 + 25,
          imgWidth,
          rankImgGood.height * (imgWidth / rankImgGood.width)
        );
      }
    } else if (quizState == "finish") {
      const imgWidth = 200;
      if (finalRank.rank == "Excellent!") {
        fill("#3d3a60");
        rect(width / 2, height - 200, 250, 70, 20);
        textSize(32);
        fill(255);
        textFont("Mochiy Pop One");
        textAlign(CENTER);
        text("バッジを見る", width / 2, height - 190);
        image(
          rankTextExc,
          width / 2,
          height / 4,
          rankTextExc.width * 0.8,
          rankTextExc.height * 0.8
        );
        image(
          rankImgExc,
          width / 2,
          height / 2 + 25,
          imgWidth,
          rankImgExc.height * (imgWidth / rankImgExc.width)
        );
      } else if (finalRank.rank == "Great!") {
        image(
          rankTextGreat,
          width / 2,
          height / 4,
          rankTextGreat.width * 0.8,
          rankTextGreat.height * 0.8
        );
        image(
          rankImgGreat,
          width / 2,
          height / 2 + 25,
          imgWidth,
          rankImgGreat.height * (imgWidth / rankImgGreat.width)
        );
      } else if (finalRank.rank == "Good!") {
        image(
          rankTextGood,
          width / 2,
          height / 4,
          rankTextGood.width * 0.8,
          rankTextGood.height * 0.8
        );
        image(
          rankImgGood,
          width / 2,
          height / 2 + 25,
          imgWidth,
          rankImgGood.height * (imgWidth / rankImgGood.width)
        );
      }
    }
  }
  if (gameState == true) {
    frame++;
    textSize(42);
    fill(255);
    textAlign(CENTER);
    textFont("Mochiy Pop One");
    text(harmonyKey.quizName + "を弾こう！", width / 2, 50);
    fill("#3d3a60");
    textFont("Oswald");
    textSize(32);
    text("T I M E", 100, height / 2 + 180);
    textSize(120);
    text(harmonyKey.keyName, width - 150, height - 130);
    textSize(130);
    text(timer, 100, height - 140);
    for (let i = 0; i < harmonyVisualsL.length; i++) {
      harmonyVisualsL[i].draw();
      harmonyVisualsR[i].draw();
      harmonyVisualsL[i].setColor(
        harmonyColors[quizCount].mainColor,
        harmonyColors[quizCount].mainShadow
      );
      harmonyVisualsR[i].setColor(
        harmonyColors[quizCount].mainColor,
        harmonyColors[quizCount].mainShadow
      );
    }

    if (frame > 60) {
      timer--;
      frame = 0;
    }
    if (timer <= 0) {
      timer = 0;
      gameState = false;
      note1.stop();
      note2.stop();
      // noteQuiz.stop();
      badges.push({ badge: finalRank.rank, num: finalRank.num, key: quizKey[quizCount]});
      if (quizCount >= quizNum - 1) {
        quizState = "finish";
        for (let i = 0; i < badges.length; i++) {
          db.badges.where("key")
            .equals(badges[i].key)
            .each((records) => {
              console.log("レコード", records.num);
              console.log(badges[i]);
              if (badges[i].num < records.num) {
                badges[i].num = records.num;
                console.log("after",badges[i].num);
                badges[i].badge = records.badge;
                console.log("afterN",badges[i].badge);
              }
            })
        }
      } else {
        quizState = "doing";
      }
      console.log(badges);
      console.log("問題数",quizCount);
      console.log(quizState);
    }
  }
}

function drawMicVisual() {
  if (gameState == true) {
    if (maxDiff == mediantDiff) {
      let midiantDiff = calculateScore(equalMediant, harmonyKey.mediant_tone);
      console.log("平均律", equalMediant);
      console.log("純正律", harmonyKey.mediant_tone);
      console.log("マイク", micFreq);
      let micDiff = calculateDiff(micFreq, harmonyKey.mediant_tone);
      // console.log("midDiff", mediantDiff);
      console.log("マイク差分", micDiff);
      if (midiantDiff > 0) {
        if (micDiff < 2.75) {
          for (let i = 0; i < micVisualsE.length; i++) {
            micVisualsE[i].draw();
            micVisualsG[i].setColor(harmonyColors[quizCount].mainColor);
          }
          count++;
          if (count > 60) {
            animations.push(new AnimationRectangle());
            animations2.push(new AnimationSmallRects());
            animations2.push(new AnimationSmallRects());
            animations2.push(new AnimationSmallRects());
            count = 0;
            if (rankCount2 < 2) {
              rankCount2++;
            }
          }
          if (rankCount2 >= 2) {
            finalRank.rank = "Excellent!";
            finalRank.num = 3;
          }
          console.log("Excellent!");
          // fill(0, 0, 255);
          // ellipse(width / 2, height / 2, 500, 500);
        } else if (micDiff < maxDiff) {
          console.log("Great");
          for (let i = 0; i < micVisualsG.length; i++) {
            micVisualsG[i].draw();
            micVisualsG[i].setColor(harmonyColors[quizCount].mainColor);
            micVisualsG[i].setBlur(0);
          }
          if (rankCount <= 120) {
            rankCount++;
          } else if (rankCount >= 120) {
            if (finalRank.rank != "Excellent!") {
              finalRank.rank = "Great!";
              finalRank.num = 2;
            }
          }
        } else if (micDiff > maxDiff) {
          console.log("good");
          push();
          blendMode(SCREEN);
          translate(width / 2, height / 2 - 100);
          rotate(radians(45));
          noFill();
          strokeWeight(4);
          stroke(harmonyColors[quizCount].lineColor);
          square(0, 0, 260, 2);
          strokeWeight(2);
          square(0, 0, 220, 2);
          square(0, 0, 200), 2;
          pop();
          if (micFreq > equalMediant) {
            image(lowArrow, 80, 90);
          } else if (micFreq < harmonyKey.mediant_tone) {
            image(highArrow, 80, 90);
          }
          if (finalRank.rank != "Excellent!" && finalRank.rank != "silver") {
            finalRank.rank = "Good!";
            finalRank.num = 1;
          }
        }
      }
    }
  }
}