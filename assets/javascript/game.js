/**
Copyright (c) 2011-2017 GitHub Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


This application bundles the following third-party packages in accordance
with the following licenses:


Package: *
License: BSD
License Source: LICENSE
Source Text:

Copyright (c) Rajat Luthra (rajatluthra@gmail.com)
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

**/
/**
  Author: Rajat Luthra
  Date:   May 12th, 2017.

  Purpose: Crystal Collector main game js.
**/

var imageRef = ["assets/images/2088_roseab.png",
                "assets/images/1211808178.png",
                "assets/images/cryst.png",
                "assets/images/icecube.jpg",
                "assets/images/sun.png",
                "assets/images/Swarovski-crystal-icon.png"];

var userTotal = 0;
var randomNumberValue = 0; //getRandomInt(1,imageRef.length * 3);

var win = 0;
var lose = 0;

function initGame() {
  var holder = $(".crystalHolder");
  var ccCount = $("#crystalCount option:selected").text();
  holder.empty();
  for(var i=0;i<ccCount;i++) {
    var images = $("<img>");
    images.attr("id", "img"+i);
    images.animate({ width: "100px" });
    images.on("click", function() {
       playGame($(this).attr("randomNumber"));
    });
    holder.append(images);
  }
  reset();
}

function playGame(myNewSelection) {
    updateMyChoices(myNewSelection);
    userTotal += parseInt(myNewSelection);
    updateSpan("#myTotal", userTotal);
    if(randomNumberValue==userTotal) {
      updateScoreBoardOnScreen(randomNumberValue, userTotal, true);
      updateSpan("#win", (++win));
      reset();
    } else if (userTotal>randomNumberValue) {
      updateScoreBoardOnScreen(randomNumberValue, userTotal, false);
      updateSpan("#lose", (++lose));
      reset();
    }
}

function updateMyChoices(myNewSelection) {
  var olList = document.getElementById('myChoices');
  var entry = document.createElement('li');
  entry.id = myNewSelection;
  entry.appendChild(document.createTextNode(myNewSelection));
  olList.appendChild(entry);
}

function clearUserInputs() {
  var olList = document.getElementById('myChoices');
  olList.innerHTML = '';
}

function updateScoreBoardOnScreen(valueOne, valueTwo, success) {
  var scoreBoardTable  = document.getElementById("scoreBoard");

  /** Using -1 to add row at the end, use 0 if you want to add new row on top. **/
  var newRow = scoreBoardTable.insertRow(-1);

  /** adding 3 new columns . **/
  var myCol = newRow.insertCell(0);
  var coCol = newRow.insertCell(1);
  var dCol = newRow.insertCell(2);

  /** Adding text to newly added 3 row cells **/
  myCol.innerHTML = valueOne;
  coCol.innerHTML = valueTwo;
  dCol.innerHTML = success ? "Yes" : "No";
}

function reset() {
  userTotal = 0;
  var minValue = $("#minCategory option:selected").text();
  var maxValue = $("#maxCategory option:selected").text();
  var ccCount = $("#crystalCount option:selected").text();
  randomNumberValue = getRandomInt(minValue, maxValue);
  updateSpan("#randomNumberSpan", randomNumberValue);
  updateSpan("#myTotal", userTotal);
  clearUserInputs();
  for(var i=0;i<ccCount;i++) {
    var images = $("#img"+i);
    images.attr("src", imageRef[getRandomInt(1,imageRef.length-1)]);
    images.attr("randomNumber", getRandomInt(0,11));
  }
}

function getRandomInt(min, max) {
  min = parseInt(min);
  max = parseInt(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateSpan(id, value) {
  var spanObj = $(id);
  spanObj.html(value);
}
