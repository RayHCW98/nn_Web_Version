
let button1;
let button2;
let buttonTrain;
let input;
let submit;
let count = -1;
let totalrun = 0;
let passed = 0;
var drawdata;
var net;
var halt;

function setup() {
  halt = false;
  createCanvas(1680, 840);
  net = new NeuralNetwork_Sigmoid_Quadratic_Cost([784, 16, 10]);
  button1 = createButton("Start");
  button1.position(0, 561);
  button1.mousePressed(startTrain);
  button2 = createButton("Stop");
  button2.position(0, 600);
  button2.mousePressed(stopTrain);
  
  
  
  // put setup code here
  drawdata = {first:[], secondF:[], secondB:[], third:[], actual:[], expect:[]};
  for (let i = 0; i < 10; ++i) {
    drawdata.first.push([415, 30 + i * 40]);
  }
  for (let i = 0; i < 9; ++i) {
    drawdata.first.push([415, 470 + i * 40]);
  }
  
  for (let i = 0; i < 16; ++i) {
    drawdata.secondF.push([725, 70 + i * 45]);
    drawdata.secondB.push([755, 70 + i * 45]);
  }

  for (let i = 0; i < 10; ++i) {
    drawdata.third.push([1065, 90 + i * 70]);
  }

  for (let i = 0; i < 10; ++i) {
    drawdata.actual.push([1145, 90 + i * 70]);
  }

  for (let i = 0; i < 10; ++i) {
    drawdata.expect.push([1165, 90 + i * 70]);
  }

  

}


function draw() {
  background(200);
  if (halt) {
    if (count > 9999) {
      ++totalrun;
    }
    ++count;
    if (count > 9999) {
      count = 0;
    }
    fill(255);
    stroke(0);
    for (let i = 0; i < 10; ++i) {
      if (i == traindata[count].label) {
        fill(0);
      }
      circle(1180, 90 + i * 70, 30);
      fill(255);
      
    }
    net.train([traindata[count]], 3, 1);
  }

  
  // put drawing code here
  if (count > -1 && count < 10000) {
    let img = traindata[count].image;
    for (let i = 0; i < 784; ++i) {
      fill(img[i] * 255);
      strokeWeight(0);
      
      rect((i % 28) * 10, 280 + Math.floor(i / 28) * 10, 10, 10);
      rect(300, i, 1, 1);
    }
    textSize(32);
    text(traindata[count].label, 100, 100);
  }

  net.showNetwork(drawdata);
  
  if (halt) {
    let max1 = net.showOutput(new Matrix(traindata[count]));
    let max2 = traindata[count].label;
    if (max1 == max2) {
      if (count > 9999) {
        ++passed;
      }
    }
    strokeWeight(2);
    stroke(0, 0, 255);
    line(drawdata.actual[max1][0], drawdata.actual[max1][1], drawdata.expect[max2][0], drawdata.expect[max2][1])
  }
  fill(0);
  strokeWeight(0);
  textSize(32);
  text(passed + "/" + totalrun, 100, 140);
  text(passed/totalrun + "%", 100, 180);
  
  

}




function startTrain() {
  halt = true;
}

function stopTrain() {
  halt = false;
}


function nextDigit() {
  if (count < 9999) {
    ++count;
    net.train([traindata[count]], 3, 1);
  }
  
}
function previousDigit() {
  if (count > 0) {
    --count;
    net.train([traindata[count]], 3, 1);
  }
}

function trainNet() {
  count = 0;
  net.train([traindata[count]], 3, 1);
  
}
