// const videoElement = document.getElementsByClassName("input_video")[0];
// // videoElement.style.display = "none";
// const canvasElement = document.getElementsByClassName("output_canvas")[0];
// // const canvasCtx = canvasElement.getContext("2d");
// let video;
// var right_hand_landmarks = [];

// function onResults(results) {
   
    
//     right_hand_landmarks = results.rightHandLandmarks;
//     console.log(right_hand_landmarks);
// }

// const holistic = new Holistic({locateFile: (file) => {
//     return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
// }
// });

// holistic.setOptions({
//     modelComplexity: 1,
//     smoothLandmarks: true,
//     enableSegmentation: true,
//     smoothSegmentation: true,
//     refineFaceLandmarks: true,
//     minDetectionConfidence: 0.5,
//     minTrackingConfidence: 0.5
//   });
// holistic.onResults(onResults);
  
// const camera = new Camera(videoElement, {
//     onFrame: async () => {
//       await holistic.send({image: videoElement});
//     },
//     width: 1280,
//     height: 720
// });
// camera.start();

// function setup() {
//     const canvas = createCanvas(windowWidth, windowHeight);
//     canvas.parent("p5sketch_bowing");
//     let device = {
//         video: {
//           deviceId: '8884070d0d62221a193d6d8890795218807255a9a3f45f9477aa6d83fa33d532'
//         }
//     };
//     video = createCapture(device);
//     video.size(1280, 720);
//     video.hide();
  
// }

// function draw() {
//     translate(video.width, 0);
//     scale(-1, 1);
//     image(video, 0, 0);
// }

let video;
let poseNet;
// let poses = [];
let pose;
let skeleton;
var hands_landmarks = [];
let palms = [0, 1, 5, 9, 13, 17];
let isPalm;
const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

function onResults(results) {
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      hands_landmarks = landmarks;
    }
  }
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
});
camera.start();

function setup() {
  createCanvas(640, 360);
  let device = {
    video: {
      deviceId: '5b3cf338de20802af45797e13e6b50be9861f30570f1d20729af3ae0e67b86b0'
    }
  };
  video = createCapture(device);
  video.size(width, height);
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  video.hide();
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  // poseNet.on('pose', function(results) {
  //   poses = results;
  //   console.log(poses);
  // });
  function gotPoses(poses) {
    // console.log(poses);
    if(poses.length > 0) {
      pose = poses[0].pose;
      console.log(pose)
      skeleton = poses[0].skeleton;
    }
  }
  
  // Hide the video element, and just show the canvas
  video.hide();
  

}

function modelReady() {
  select('#status').html('Model Loaded');
}


function draw() {
  // image(video, 0, 0);
   translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);
  
  if(pose) {
    fill(255,0, 0);
    noStroke();
    ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 24);
    ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 24);
    ellipse(pose.rightElbow.x, pose.rightElbow.y, 24);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 24);
    
    for (let i = 0; i < skeleton.length; i++) {
      
    let a = skeleton[i][0];
    let b = skeleton[i][1];
    stroke(255);
    strokeWeight(4);
    line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
  
     for (let i = 0; i < hands_landmarks.length; i++) {
      let x = hands_landmarks[i].x * 640;
      let y = hands_landmarks[i].y * 360;
      let line_next;
       
        isPalm = palms.indexOf(i); // is it a palm landmark or finger landmark?
      if (isPalm == -1) {
        // connect with previous finger landmark if it's a finger landmark
        line_next = hands_landmarks[i - 1];
      } else {
        // connect with next palm landmark if it's a palm landmark
        line_next = hands_landmarks[palms[(isPalm + 1) % palms.length]];
      }
       stroke(255);
      strokeWeight(2);
      line(x, y, line_next.x * 640, line_next.y * 360);
       
      fill(255, 0, 0);
      noStroke();
      ellipse(x - 2 , y - 2, 10);
       
     }
  
  

  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();
}