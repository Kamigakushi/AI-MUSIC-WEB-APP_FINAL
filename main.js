song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1_status = "";
song2_status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload ()
{
    song_1 = loadSound("Peter pan.mp3");
    song_2 = loadSound("Harry potter.mp3");
}
function setup()
{
  canvas = createCanvas(600,500);
  canvas.position(485,250);
  
  video = createCapture(VIDEO);
  video.hide();
  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
  console.log("Model Loaded!");
}
function gotPoses(results)
{
  if(results.length > 0)
  {
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY);
  }
}
function draw()
{
  image(video,0,0,600,500);
  fill("#FF0000");
  stroke("#FF0000");
  circle(rightWristX,rightWristY,20);
  if (scoreRightWrist > 0.2)
  {
    circle(rightWristX,rightWristY,20);
    song_2.stop();
    if (song1_status ==false)
    {
      song1.play();
      document.getElementById('song_name').innerHTML = "Playing Peter Pan theme song";
    }
  }
  if (scoreLeftWrist > 0.2)
  {
    circle(leftWristX,leftWristY,20);
    song_1.stop();
    if (song2_status ==false)
    {
      song2.play();
      document.getElementById('song_name').innerHTML = "Playing Harry Potter theme song";
    }
  }
}
