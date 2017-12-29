const game = {};
game.houses = ['stark', 'lannister', 'targaryen'];

game.easterEgg = () => {const egg = new Egg("up,up,down,down,left,right,left,right", () => $('.houseSelector').show()).listen();};

game.keyboard = () => {
    function clickLetter(e) {
        // if the key pressed is a letter then set it to the value of letterClicked and check if the letter is in the answer
        if (game.livesCount > 0) {
            // only listen for letters
            if (game.alphabet.includes(e.key.toUpperCase())) {
                game.letterClicked = e.key;
                game.correctLetterGuess();
                // if a button's text matches that of the letter pressed hide it from the user so they will know not to select it again
                for (i = 0; i < document.querySelectorAll('.letter').length; i++) {
                    if (document.querySelectorAll('.letter')[i].innerText === game.letterClicked) {
                        document.querySelectorAll('.letter')[i].hidden = true;
                    }
                }
            }  
        }
    }
    document.addEventListener("keyup", clickLetter);
    $('#wordGuess').on('click', () => document.removeEventListener('keyup', clickLetter));
    $('#wordGuess').on('blur', () => document.addEventListener('keyup', clickLetter));
};

// GAME CONTROLS

// create letters for user to click
game.clickInputs = function () {
    $('ul.letterSelector').empty();
    game.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // create a list item for each letter then append it onto the ul with the class letter selector
    for (let i = 0; i < game.alphabet.length; i++) {
        const letter = `<li><button class="letter">${game.alphabet[i]}</button></li>`
        $('ul.letterSelector').append(letter);
    }
}

game.buttons = function () {
    const letterHelpButton = '<button id="letterHelp">Free Letter</button>';
    const newGameButton = '<button id="newGame">New Game</button>';
    $('.gameControls').html(letterHelpButton).append(newGameButton);
}

// selects a random letter from the answer 
game.randomLetterGenerator = () => game.randomLetter = game.randomLetterArr[game.randomIndexGenerator(game.randomLetterArr)];

game.letterHelp = function () {
    $('button#letterHelp').on('click', function () {
        game.randomLetterGenerator();
        // if the text from the li matches the random letter have it fade out and removed so the user cannot select it again
        for (let i = 1; i <= game.alphabet.length; i++) {
            if (($(`li:nth-child(${i})`).text()) === game.randomLetter.toUpperCase()) {
                $(`li:nth-child(${i})`).fadeOut('slow', 'swing');
            }
        }
        // if the user still has 'free letters' remaining decrease the number available by 1
        if (game.freeLettersCount > 0) {
            game.freeLettersCount -= 1;
            const answerLetters = document.querySelectorAll('.answerLetter');
            answerLetters.forEach(letter => {
                if (letter.dataset.letter === game.randomLetter) {
                    letter.innerText = letter.dataset.letter;
                }
            });
            
            game.winCheck();

            // remove the randomly selected letter from the array so it cannot be selected again
            for (let i = 0; i < game.randomLetterArr.length; i++) {
                if (game.randomLetter === game.randomLetterArr[i]) {
                    game.randomLetterArr.splice(i, 1);
                }
            }

            alert(`You have ${game.freeLettersCount} free letter(s) left`);
            // once the user has used up all their 'free letters' remove the option
            if (game.freeLettersCount === 0) {
                $(this).fadeOut('slow', 'swing');
            }
        }
    });
};

game.houseSelector = function () {
    $('button.house').on('click', function () {
        // upon clicking one of the houses, if the id of that button matches with a certain house add that class to all buttons so the relevant styles will be applied
        for (let i = 0; i < game.houses.length; i++) {
            if ($(this).attr('id', ) === game.houses[i]) {
                $('button').addClass(game.houses[i]);
            }
        }
        // then hide the 'house selector' from the user
        $('.houseSelector').hide(800, 'linear');
    })
};

game.controls = () => {
    game.clickInputs();
    game.buttons();
}

// RANDOM LETTER GENERATOR

game.wordsArr = ['white walker', 'king slayer', 'mad king', 'onion knight', 'master of coin', 'valyrian steel', 'red wedding', 'iron throne', 'khaleesi', 'winter is coming', 'direwolf', 'dragon', 'winter is coming', 'hand of the king', 'faceless men', 'khal drogo', 'queen of dragons', 'winterfell', 'wildlings', 'the mountain', 'warg', 'hodor', 'greenseer', 'knight king', 'faith of the seven', 'braavos', 'greyscale', 'maester', 'sellsword', 'sons of the harpy', 'unsullied', 'turncloak', 'westeros', 'nymeria', 'grey wind', 'shaggydog', 'ghost', 'viserion', 'dance of dragons', 'song of fire and ice', 'drogon', 'rhaegal', 'jojen reed', 'brienne of tarth', 'casterly rock', 'castle black', 'crow', 'milk of the poppy', 'three eyed raven', 'wildfire', 'dragonglass', 'weirwood', 'high septon', 'red keep', 'harenhal', 'qarth', 'greyjoy rebellion', 'drowned god', 'children of the forest', 'first men', 'war of the five kings', 'the long knight', 'city watch', 'gold cloaks', 'kingsguard', 'mance rayder', 'iron bank', 'brotherhood without banners', 'lord of light', 'lightbringer', 'needle', 'iron islands', 'thoros of myr', 'the hound', 'dragonstone', 'melisandre', 'wight', 'grey worm', 'azor ahai', 'the citadel', 'ironborn', 'andals', 'petyr baelish', 'walder frey', 'jon snow', 'eddard stark', 'sansa stark', 'arya stark', 'lady stoneheart', 'bran stark', 'edmure tully', 'lyanna mormont', 'benjen stark', 'meera reed', 'tormund', 'davos seaworth', 'cersei lannister', 'jaime lannister', 'tyrion lannister', 'qyburn', 'ser bronn', 'tywin lannister', 'joffrey baratheon', 'tommen baratheon', 'myrcella baratheon', 'daenerys targaryen', 'rhaegar targaryen', 'varys', 'small council', 'yara greyjoy', 'reek', 'bastard', 'theon greyjoy', 'missandei', 'samwell tarly', 'gilly', 'podrick payne', 'dontos hollard', 'lyanna stark', 'rickard karstark', 'robb stark', 'king of the north', 'margaery tyrell', 'bend the knee', 'half man', 'craven', 'riverrun', 'oberyn martell',];

// function that returns a random index given an array of a certain length
game.randomIndexGenerator = arr => game.randIndex = Math.floor(Math.random() * arr.length);

// select a random word from the words array using a random index and replace any spaces with non-blank spaces
game.randomWord = () => game.answer = game.wordsArr[game.randomIndexGenerator(game.wordsArr)];
    
game.hiddenAnswer = () => {
    game.randomWord();
    const splitAnswer = game.answer.split(' ').map(word => word.split(''));
    game.displayedWord = splitAnswer
        .map(word => word
        .map(letter => `<div class="answerLetter" data-letter=${letter}>__</div>`))
        .map(word => word.join(''))
        .map(word => `<div class="word flex">${word}</div>`);
    $('.hiddenAnswer').html(game.displayedWord);
};

game.noSpaces = str => str.replace(/\s/g, '');

game.noDuplicates = function (str) {
    const strArr = str.split('');
    let unqiqueLetters = new Set(strArr);
    return [... unqiqueLetters].join('');
};

// LIVES & FREE LETTERS COUNT

game.counter = () => {
    // lives and number of 'free letters' will depend on the length of the answer 
    // to have a uniform measure, the number of spaces must be removed and any duplicate letters should be eliminated
    game.wordMeasure = game.noSpaces(game.noDuplicates(game.answer)).length;
    if (game.wordMeasure <= 5) {
        game.livesCount = game.wordMeasure - 1;
        game.freeLettersCount = 1;
    }
    else if (game.wordMeasure > 5 && game.wordMeasure <= 10) {
        game.livesCount = game.wordMeasure - 2;
        game.freeLettersCount = 2;
    }
    else if (game.wordMeasure > 10 && game.wordMeasure <= 15) {
        game.livesCount = game.wordMeasure - 4;
        game.freeLettersCount = 3;
    } else {
        game.livesCount = game.wordMeasure - 8;
        game.freeLettersCount = 4;
    }
    $('p.livesTracker').html(`You have <span>${game.livesCount}</span> lives left`);
};

// LETTER GUESSING

game.correctLetterGuess = () => {
    const answerLetters = document.querySelectorAll('.answerLetter');
    answerLetters.forEach(letter => {
        if (letter.dataset.letter === game.letterClicked.toLowerCase()) {
            letter.innerText = letter.dataset.letter;
        }
    })
    if (! game.answer.includes(game.letterClicked.toLowerCase())) {
        if (!game.lettersClicked.has(game.letterClicked)) {
            game.loseLives();
        }
    }
    // after checking if the letter was correct on not add the letter clicked to the set
    game.lettersClicked.add(game.letterClicked);
    game.winCheck();
};

game.letterGuess = function () {
    $('ul.letterSelector').on('click', 'button', function () {
        // get the text from the input clicked and check if the letter is in the answer
        game.letterClicked = $(this).text();
        game.correctLetterGuess();
        $(this).fadeOut('400 milliseconds', 'swing');
    });
};

// WORD GUESSING

game.loseLives = () => {
    // if the user has not entered the letter before, then check if the letter is in the answer potentialy reducing lives by 1
    if (game.livesCount > 0) {
        game.livesCount -= 1;
        $('p.livesTracker').html(`You have <span>${game.livesCount}</span> lives left`);
        if (game.livesCount === 0) {
            $('h2.hiddenAnswer').html(game.answer.replace(/\s/g, '&nbsp&nbsp')).hide(2000, 'linear');
            $('h2.messageText').html('valar morghulis').show(1000, 'linear');
        }
    }
};

game.guessLengthCheck = () => {
    game.wordLengthDiff = game.answer.length - game.wordGuess.length;
    if (game.wordLengthDiff > 0) {
        alert(`Your guess was ${game.wordLengthDiff} letters too short. Try again.`);
    } else {
        alert(`Your guess was ${-game.wordLengthDiff} letters too long. Try again.`);
    }
};

game.correctWordGuess = () => {
    game.wordGuess = $('input#wordGuess').val();
    if (/^[a-zA-Z ]{1,}$/.exec(game.wordGuess)) {
        if (game.wordGuess.length === game.answer.length) {
            if (game.wordGuess.toLowerCase() === game.answer.toLowerCase()) {
                game.winSequence();
            } else {
                $('h2.hiddenAnswer').hide(2000, 'linear');
                $('h2.messageText').text('You know knothing').show(1000, 'linear').hide(1000, 'linear');
                $('h2.hiddenAnswer').show(400, 'linear');
                game.loseLives();
            }
        } else {
            game.guessLengthCheck();
        }
    } else {
        alert('Invalid input.');
    }
};

// GAME SCENARIOS 

game.winCheck = function () {
    const answerLetters = [...document.querySelectorAll('.answerLetter')];
    const win = answerLetters.every(letter => letter.innerText !== '__');
    // answersLetters is removed from the DOM upon a lose leaving the array empty
    // so to prevent a win to be triggered because the letters are not "__" add the condition that the array be not empty
    if (win && answerLetters.length !== 0) game.winSequence();
};

game.winSequence = function () {
    $('h2.hiddenAnswer').html(game.answer.replace(/\s/g, '&nbsp&nbsp')).hide(2000, 'linear');
    $('h2.messageText').text('What is dead may never die.').show(1500, 'linear');
};

game.gameStart = function () {
    game.lettersClicked = new Set();
    for (let i = 0; i < game.houses.length; i++) {
        $('button').removeClass(game.houses[i]);
    }
    $('h2.messageText').hide();
    $('h2.hiddenAnswer').show();
    game.hiddenAnswer();
    game.controls();
    game.randomLetterArr = game.noDuplicates(game.answer.replace(/\s/g, '')).split('');
    game.counter();
};

game.newGame = function () {
    $('body').on('click', 'button#newGame', function () {
        game.gameStart();
        game.letterHelp();
    });
}

game.events = function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        game.correctWordGuess();
        $('input').val('');
    });
    game.keyboard();
    game.letterGuess();
    game.letterHelp();
    game.easterEgg();
    game.houseSelector();
    game.newGame();
};

game.init = function () {
    game.gameStart();
    game.events();
};

$(game.init());