/*----- constants -----*/

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

const wordsShrek = ['SHREK','GINGY','LEG','PUSS','MONGO','FIONA','DONKEY','LOLLIPOP','SUZY','SANTA'];
const wordsTheGingerbreadMan = ['WOMAN','KITCHEN','BAKING','OVEN','RUNNING','FOX','RIVER','EATEN','MAN','COW'];
const wordsHanselAndGretel = ['OVEN','HANSEL','GRETEL','WITCH','BREAD','TRAIL','FATHER','SWEETS','PIE','PLUMP','EAT','CRUMBS'];

const images = {
    default: 'images/cane.png',
    img1: 'images/1.png',
    img2: 'images/2.png',
    img3: 'images/3.png',
    img4: 'images/4.png',
    winner: 'images/winner.png'
}
  /*----- app's state (variables) -----*/

   let winningScore = 0;
   let losingScore = 0;
   let numberOfLivesLeft = 4;
   let lettersGuessedWrong = [];
   let lettersMatched = [];
   let pickRandomWord = '';
   let chosenWord = '';
   let hintLetter = '';
   let numberOfOccurences = '';
   let rowOneOfLetters = [];
   let rowTwoOfLetters = [];
   let rowThreeOfLetters = [];
   let thirdOfLettersLength = '';
   let allLettersClicked = [];
   let result = '';
   
  /*----- cached element references -----*/

  //buttons
   let letterButtonsRowOne = document.getElementById('buttons1');
   let letterButtonsRowTwo = document.getElementById('buttons2');
   let letterButtonsRowThree = document.getElementById('buttons3');
   let allLetterButtons = document.getElementById('all-letter-buttons');
   let shrekButton = document.getElementById('shrek');
   let gingerbreadButton = document.getElementById('gingerbread');
   let hanselButton = document.getElementById('hansel');
   let rightButtons = document.getElementById('right-side-buttons');
   let hintButton = document.getElementById('hint');
   let playAgainButton = document.getElementById('reset');
  //Score Keeping
   let displayDashes = document.getElementById('blanks');
   let displayWrongLettersGuessed = document.getElementById('wrong-guesses');
   let displayLivesLeft = document.getElementById('chances-left');
   let displayWinningScore = document.getElementById('win');
   let displayLosingScore = document.getElementById('lose');
   //Audio Buttons and Sound Effects
   let musicPlayButton = document.getElementById('music-image');
   let musicPauseButton = document.getElementById('music-stop-image');
   let audio = document.getElementById('audio');
   let soundEffectsWin = document.getElementById('win-sound');
   let soundEffectsLose = document.getElementById('lose-sound');
   let soundEffectsLivesLost = document.getElementById('lives-lost-sound');
   let soundEffectsClickSound = document.getElementById('click-sound');
   let soundEffectsDontClickSound = document.getElementById('do-not-click-sound');
   //Images
   let outputImage = document.getElementById('output-image');
   let resultImage = document.getElementById('winner-image');

  /*----- functions -----*/

    init()

   function playAudio() {
        musicPlayButton.addEventListener('click',function(evt){
            audio.play();
        });

    }

    function pauseAudio()   {
        musicPauseButton.addEventListener('click',function(evt){
            audio.pause();
        });
    
    }

    pauseAudio()
  
    function createLetterButton()   {
        let uppercaseLetters = letters.map(function(letter){
            return letter.toUpperCase();
        });

        thirdOfLettersLength = Math.ceil(uppercaseLetters.length / 3);    

        rowOneOfLetters = uppercaseLetters.splice(0,thirdOfLettersLength);
        rowTwoOfLetters = uppercaseLetters.splice(0,thirdOfLettersLength);
        rowThreeOfLetters = uppercaseLetters.splice(0,thirdOfLettersLength);

        // I took this letter creating button function from 
        //https://stackoverflow.com/questions/48977848/how-do-i-create-different-button-for-each-item-in-an-array-javascript

        rowOneOfLetters.forEach(function(letter){
            letterButtonsRowOne.innerHTML += '<button>' + letter + '</button>';
        });
        rowTwoOfLetters.forEach(function(letter){
            letterButtonsRowTwo.innerHTML += '<button>' + letter + '</button>';
        });
        rowThreeOfLetters.forEach(function(letter){
            letterButtonsRowThree.innerHTML += '<button>' + letter + '</button>';
        });
  }

  createLetterButton()

function generateWord() {
    rightButtons.addEventListener('click', function(evt){

        soundEffectsClickSound.play()

        if  (evt.target.id === 'shrek') {
            pickRandomWord = wordsShrek[Math.floor(Math.random() * wordsShrek.length)];
            chosenWord = pickRandomWord.replace(/./g,'_').split('');
            displayDashes.innerHTML = pickRandomWord.replace(/./g,' _ ');
        }
        if  (evt.target.id === 'gingerbread')   {
            pickRandomWord = wordsTheGingerbreadMan[Math.floor(Math.random() * wordsTheGingerbreadMan.length)];
            chosenWord = pickRandomWord.replace(/./g,'_').split('');
            displayDashes.innerHTML = pickRandomWord.replace(/./g,' _ ');
        } 
        if  (evt.target.id === 'hansel')    {
            pickRandomWord = wordsHanselAndGretel[Math.floor(Math.random() * wordsHanselAndGretel.length)];
            chosenWord = pickRandomWord.replace(/./g,'_').split('');
            displayDashes.innerHTML = pickRandomWord.replace(/./g,' _ ');
        }
    });
}


function guessLetter()  {
    generateWord()
    generateHint()

    allLetterButtons.addEventListener('click', function(evt){

        soundEffectsClickSound.play()
        let guess = evt.target.textContent

        if  (guess.length !==1) return;
        allLettersClicked = lettersMatched.concat(lettersGuessedWrong)

        for (let j = 0; j < pickRandomWord.length; j++) {
            if  (pickRandomWord[j] === guess) {
                chosenWord[j] = guess;
            } 
        }
        if (pickRandomWord.includes(guess)=== false)    {
            lettersGuessedWrong.push(guess);
            numberOfLivesLeft--;
            soundEffectsLivesLost.play();
        } 
        if  (numberOfLivesLeft <= 0)    {
            lettersGuessedWrong = [];
            lettersMatched = [];
            numberOfLivesLeft = 0;
        }
        if  (winningScore === 1)    {
            lettersGuessedWrong = [];
            lettersMatched = [];
            numberOfLivesLeft = ' ';
        }
        if  (allLettersClicked.includes(guess) === true)    {
            soundEffectsDontClickSound.play();
            soundEffectsClickSound.pause();
            lettersGuessedWrong.pop(guess);
            numberOfLivesLeft++;
        }
        result = chosenWord.join(' ');
        displayDashes.innerHTML = result;
        displayWrongLettersGuessed.innerHTML = 'Wrong Guesses:' + lettersGuessedWrong;
        displayLivesLeft.innerHTML = 'Chances Left:' + numberOfLivesLeft;
        render()
    });
}

guessLetter()

function generateHint() {
    hintButton.addEventListener('click',function(evt){  

        soundEffectsClickSound.play()
        hintLetter = pickRandomWord[Math.floor(Math.random() * pickRandomWord.length)]
       
        for (let j = 0; j < pickRandomWord.length; j++) {
            if  (pickRandomWord[j] === hintLetter) {
                chosenWord[j] = hintLetter;
            } 
        }
        if (hintLetter.length === 1 )   {
            hintButton.disabled = true;
        }
        if (result.includes(hintLetter)) {
            hintButton.disabled = false;
        }
        result = chosenWord.join(' ');
        displayDashes.innerHTML = result;
        render() 
    });
}

function init() {
    playAudio()
    displayLivesLeft.innerHTML = 'Chances Left: ' + 4;
    displayLosingScore.innerHTML = 'Losing Score: ' + ' ';
    displayWinningScore.innerHTML = 'Winning Score: ' + ' ';
    displayWrongLettersGuessed.innerHTML = 'Wrong Guesses: ' + ' ';
    outputImage.src = images.default;
    hintButton.disabled = false;;

    playAgainButton.addEventListener('click',function(evt){
        soundEffectsClickSound.play();
        resultImage.style.visibility = 'hidden';
        outputImage.style.visibility = 'visible';
        outputImage.src = images.default
        displayDashes.innerHTML = ' ';
        displayLivesLeft.innerHTML = 'Chances Left: ' + 4;
        displayLosingScore.innerHTML = 'Losing Score: ' + ' ';
        displayWinningScore.innerHTML = 'Winning Score: ' + ' ';
        displayWrongLettersGuessed.innerHTML = 'Wrong Guesses: ' + ' ';
        winningScore = 0;
        losingScore = 0;
        numberOfLivesLeft = 4;
        lettersGuessedWrong = [];
        lettersMatched = [];
        pickRandomWord = '';
        chosenWord = '';
        hintLetter = '';
        numberOfOccurences = '';
        hintButton.disabled = false;
    });
}

function render()   {

    if  (numberOfLivesLeft === 4)    {
        outputImage.src = images.default;
    }
    if  (numberOfLivesLeft === 3)    {
        outputImage.src = images.img1;
    }
    if  (numberOfLivesLeft === 2)    {
        outputImage.src = images.img2;
    } 
    if  (numberOfLivesLeft === 1)    {
        outputImage.src = images.img3;
    } 
    if  (numberOfLivesLeft === 0)    {
        outputImage.src = images.img4;
        displayDashes.innerHTML = pickRandomWord;
        displayLosingScore.innerHTML = 'Losing Score:' + 1;
        soundEffectsLose.play();
    }
    if  (result.includes('_') === false)    {
        resultImage.style.visibility = 'visible';
        resultImage.src = images.winner;
        outputImage.style.visibility = 'hidden';
        displayDashes.innerHTML = ' ';
        soundEffectsWin.play();
    }
}





