/*
HangBoto- Jason Bevans
*/

var treeData = [
  {
    css: 'bg-ground',
  },
  {
    css: 'bg-tree',
  },
  {
    css: 'bg-rope',
  },
  {
    css: 'bg-head',
  },
  {
    css: 'bg-body',
  },
  {
    css: 'bg-left-arm',
  },
  {
    css: 'bg-right-arm',
  },
  {
    css: 'bg-left-leg',
  },
  {
    css: 'bg-right-leg',
  },
];

var alphabets = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

var gameData = {};
var currentQuestion = -1;

wordList = [
  { answer: 'cat', hint: 'cute and cuddly' },
  { answer: 'apple', hint: 'bright red fruit' },
  { answer: 'banana', hint: 'monkeys love these' },
  { answer: 'sing', hint: 'something you can do in the shower' },
  { answer: 'milk', hint: 'babies love this drink' }
];

function refreshResults() {
  wordHolder = $('.guesses');
  answer = wordHolder.find('ul');
  answer.html('');
  var won = true;

  for (var i = 0; i < gameData.currentWord.answer.length; i++) {
    var guess = $('<li></li>');
    if (
      gameData.correct.filter(function (e) {
        return e === gameData.currentWord.answer[i];
      }).length > 0
    ) {
      guess.text(gameData.currentWord.answer[i]);
      space = 1;
    } else {
      guess.text('_');
      won = false;
    }
    answer.append(guess);
  }
  return won;
}

function keyClicked(e) {
  var button = $(e.target);
  var index = parseInt(button.data('index'));
  button.attr('disabled', 'disabled');
  submitGuess(gameData.currentWord, alphabets[index]);
}

function solve() {
  wordHolder = $('.guesses');
  answer = wordHolder.find('ul');
  answer.html('');
  for (var i = 0; i < gameData.currentWord.answer.length; i++) {
    var guess = $('<li></li>');
    guess.text(gameData.currentWord.answer[i]);
    answer.append(guess);
  }
}

function wonLostStatus() {  
  if (gameData.lives > 0) {
    if (refreshResults()) {
      $('#status').html('<img alt="win" src="images/win.svg"/>');
      $('.key').attr('disabled', 'disabled');
    }
  } else {
    $('#status').html('<img alt="win" src="images/lose.svg"/>');
    $('.key').attr('disabled', 'disabled');
    solve();
  }
}

function submitGuess(word, key) {
  if (word.answer.indexOf(key) > -1) {
    gameData.correct.push(key);
    gameData.guessed.push(key);
  } else {
    gameData.guessed.push(key);

    var tree = $('#tree');
    if (gameData.lives > 1) {
      tree.append(
        '<div class="' + treeData[gameData.livesUsed].css + '"></div>'
      );
    } else {
      tree.append(
        '<div class="' + treeData[gameData.livesUsed].css + '"></div>'
      );
    }

    gameData.lives--;
    gameData.livesUsed++;
  }
  wonLostStatus();
}

function startOver() {
  if (currentQuestion === wordList.length -1) {
    currentQuestion = -1;
  }
  
  currentQuestion++;
  
  gameData = {
    lives: 9,
    livesUsed: 0,
    correct: [],
    guessed: [],
    currentWord: wordList[currentQuestion],
  };

  refreshResults(gameData.currentWord);

  var keyboard = $('.keyboard');
  keyboard.html('');
  $('#tree').html('');
  $('#status').html('');
  var hint = $('.hint');
  hint.text(gameData.currentWord.hint);

  for (var i = 0; i < alphabets.length; i++) {
    var button = $(
      '<button class="btn btn-default key" data-index="' +
        i.toString() +
        '">' +
        alphabets[i] +
        '</button>'
    );
    button.click(keyClicked);
    keyboard.append(button);
  }
}

$(document).ready(function () {
  startOver();

  // Restart
$( ".restart" ).click(function() {
  startOver();
});
});
