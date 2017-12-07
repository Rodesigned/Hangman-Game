//Song list
var songs = ['readyforit', 'delicate', 'lookwhatyoumademedo', 'gorgeous', 'dress', 'endgame'];
var userGuess = '';
var word = '';
var hiddenWord = '';
var wordArray = [];
var hiddenWordArray = [];
var maxGuesses = 10;
var numWins = 0;
var numLosses = 0;
var wrongLetters = '';
var usedLetters = '';
var captionString = '';

//Picks a word from the array using Math.random()
function pickWord() {
   word = songs[Math.floor(Math.random() * songs.length)];
}

// returns the word using dashes
function hideWord() {
    wordArray = word.split('');
    for (var i = 0; i < wordArray.length; i++) {
        hiddenWord += '-';
    }
    hiddenWordArray = hiddenWord.split('');
    return hiddenWord;
}

// returns the word
function showWord() {
    return word;
}

//Returns boolean if userGuess is wrong
function guessMatches(charOfWord) {
    return userGuess === charOfWord;
}


//Adds a wrong guess to the string wrongLetters and reduces the number of remaining guesses
function addWrongLetter(userGuess) {
    if (!word.includes(userGuess) && !wrongLetters.includes(userGuess)) {
        wrongLetters += userGuess;
        maxGuesses--;

    }
}

//Adds a right guess to the string usedLetters
function addUsedLetter(userGuess) {
    if (word.includes(userGuess) && !usedLetters.includes(userGuess)) {
        usedLetters += userGuess;
    }
}

// replaces dashes with guessed letter if correct. returns modified word-play
//starts with and returns string but modifies array of string letters
function guessLetter() {
    for (var i = 0; i < hiddenWordArray.length; i++) {
        if (guessMatches(wordArray[i])) {
            hiddenWordArray[i] = userGuess;
            addUsedLetter(userGuess);
        } else {
            addWrongLetter(userGuess);
        }
    }
    hiddenWord = hiddenWordArray.join('');
    return hiddenWord;
}

//adds one to numWins if user wins round
function addWin() {
    numWins++;
}

//adds one to numLosses if user loses round
function addLoss() {
    numLosses++;
}

//returns boolean if user got the word through guesses
function wonGame() {
    return hiddenWord === word;
}

//returns boolean if user ran out of guesses
function gameOver() {
    return maxGuesses === 0;
}

//returns boolean if word is empty string hence indicating a new game
function isNewGame() {
    return word === '';
}

//returns boolean if user is playing current round
function isPlaying() {
    return hiddenWord !== word && maxGuesses > 0;
}

//resets the game with reset variables
function reset() {
    userGuess = '';
    word = '';
    hiddenWord = '';
    wordArray = [];
    hiddenWordArray = [];
    maxGuesses = 7;
    wrongLetters = '';
    usedLetters = '';
    captionString = '';
}

// changes the dom to show hashed word
function hiddenWordDOM(){
    document.getElementById('word-play').innerHTML = hiddenWord;
}

// changes the dom to show wrong guesses
function wrongLettersDOM(){
    document.getElementById('charset-wrong').innerHTML = wrongLetters;
}

// changes the  dom to show max letters
function maxLettersDOM(){
    document.getElementById('num-guesses').innerHTML = maxGuesses;
}

// changes the dom to show a message for the winning word 
function winningWordDOM(winningString){
    document.getElementById('winning-word').innerHTML = winningString;
}

// changes the dom to show the status of the game
function statusIsDOM(statusString){
    document.getElementById('status-is').innerHTML = statusString;
}

// changes the dom to show or hide the word
function wordPlayDOM(playString){
    document.getElementById('word-play').innerHTML = playString;
}

//changes the dom to show the num of wins
function showWinsDOM(){
    document.getElementById('wins').innerHTML = 'Wins: ' + numWins;
}

//changes the dom to show num of losses
function numLossesDOM(){
    document.getElementById('losses').innerHTML = 'Losses: ' + numLosses;
}


// changes the dom to change the img
function imgDOM(imgUrl){
    document.getElementById('ts-img').innerHTML = imgUrl;
}
//displays the start screen
function gameStart() {
    pickWord();
    hideWord();
    hiddenWordDOM();
    wrongLettersDOM();
    maxLettersDOM();
    winningWordDOM('');
    statusIsDOM('<p>Try guessing my newest songs!</p>');
}

//displays plays on the screen
function showPlay() {
    wordPlayDOM(guessLetter());
    wrongLettersDOM();
    maxLettersDOM();
    statusIsDOM('<p>Try my newest songs! </p>');
}

//displays a win on the screen
function showWin() {
    addWin();
    wordPlayDOM(showWord());
    statusIsDOM('<p>You won!</p>');
    showWinsDOM();
    winningWordDOM('<p>You guessed it! <em>' + word + '</em>. Press any key to continue!</p>');
    changeImg();
}

//displays a loss on the screen
function showLoss() {
    addLoss();
    wordPlayDOM(showWord());
    statusIsDOM('<p>Game Over<p>');
    numLossesDOM();
    winningWordDOM('<p>The song was <em>' + word + '</em>. Press any key to continue!</p>');
}

//changes image when user wins
function changeImg() {
	if (word === songs[0]) {
		imgDOM('<img class="record" src=assets/images/readyforit.png>');
		//var audio = new Audio("assets/audio/readyforit.mp3");
		//audio.play();
		
	} else if (word === songs[1]) {
		imgDOM('<img class="record" src=assets/images/delicate.png>');
		//var audio = new Audio("assets/audio/delicate.mp3");
		//audio.play();
		
	} else if (word === songs[2]) {
		imgDOM('<img class="record" src=assets/images/lwymmd.png>');
		//var audio = new Audio("assets/audio/lwymmd.mp3");
		//audio.play();
		
		
	} else if (word === songs[3]) {
		imgDOM('<img class="record" src=assets/images/georous.png>');
		//var audio = new Audio("assets/audio/gorgeous.mp3");
		//audio.play();
		
		
	} else if (word === songs[4]) {
		imgDOM('<img class="record" src=assets/images/dress.png>');
		//var audio = new Audio("assets/audio/dress.mp3");
		//audio.play();
		
		
	} else if (word === songs[5]) {
		imgDOM('<img class="record" src=assets/images/endgame.png>');
		//var audio = new Audio("assets/audio/endgame.mp3");
		//audio.play();	
	}
}

//press any key to start the game, and start a new game,

gameStart();
document.onkeyup = function(event) {
    // Determines which exact key was selected. Make it lowercase
    userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    //makes sure letter key affects dom only
    if(userGuess.match(/[a-zA-Z]/)){
        if (isNewGame()) {
            gameStart();
        } else if (isPlaying()) {
            showPlay();
            if (wonGame()) {
                showWin();
                reset();
            } else if (gameOver()) {
                showLoss();
                reset();
            }
        }
    }

};