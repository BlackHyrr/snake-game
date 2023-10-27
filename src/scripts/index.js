import { gameUpdate, newGame, sortScoreBoard, updateHighscore } from "./game.js"
import { config, snake } from "./variables.js";

const pauseButton = () => {
    const pause = document.querySelector(".pause-window");
    const pauseBtn = document.querySelector(".pause-btn");
    pauseBtn.addEventListener("click", () => {
        pause.classList.toggle("hidden");
        clearInterval(config.gameLoop);
    })
}

const difficultyButton = () => {
    const popup = document.querySelector(".difficulty-popup");
    const difficultyBtn = document.querySelector(".difficulty-btn");
    difficultyBtn.addEventListener("click",() => {
        popup.classList.toggle("hidden");
    })
}

const displayDifficultyStars = (starsAmount) => {
    const div = document.querySelector('.current-difficulty .stars');
    const oldDiv = document.querySelector('.stars-container');
    let newDiv = document.createElement('div');
    newDiv.classList.add('stars-container');
    for(let i = 1; i <= starsAmount; i++) {
        let newStar = document.createElement('i');
        newStar.classList.add('fa-solid');
        newStar.classList.add('fa-star');
        newDiv.appendChild(newStar);
    }
    div.replaceChild(newDiv, oldDiv);
}

const setDifficultySpeed = () => {
    document.querySelector("#dif-easy").dataset.difficulty = config.difficultyChoices.easy;
    document.querySelector("#dif-normal").dataset.difficulty = config.difficultyChoices.normal;
    document.querySelector("#dif-hard").dataset.difficulty = config.difficultyChoices.hard;
    document.querySelector("#dif-veryhard").dataset.difficulty = config.difficultyChoices.very_hard;
    document.querySelector("#dif-nightmare").dataset.difficulty = config.difficultyChoices.nightmare;
}

const changeDifficulty = () => {
    const popup = document.querySelector(".difficulty-popup");
    popup.addEventListener('click', (event) => {
        let dif = event.target.closest('.dif-setting');
        if(!dif) return;
        let test = dif.querySelector("span")
        config.currentDifficulty = test.dataset.difficulty;

        config.currentDifficulty == config.difficultyChoices.normal ? config.starsAmount = 2 :
        config.currentDifficulty == config.difficultyChoices.hard ? config.starsAmount = 3 :
        config.currentDifficulty == config.difficultyChoices.very_hard ? config.starsAmount = 4 :
        config.currentDifficulty == config.difficultyChoices.nightmare ? config.starsAmount = 5 :
        config.starsAmount = 1;
        displayDifficultyStars(config.starsAmount);
        popup.classList.toggle("hidden");
    })
}

const restartButton = () => {
    const pause = document.querySelector(".pause-window");
    const restartBtn = document.querySelector(".restart-btn");
    restartBtn.addEventListener("click",() => {
        pause.classList.toggle("hidden");
        displayDifficultyStars(config.starsAmount)
        newGame();
    })
}

const quitButton = () => {
    const pause = document.querySelector(".pause-window");
    const quitBtn = document.querySelector(".quit-btn");
    const gameSection = document.querySelector(".game");
    const mainMenu = document.querySelector(".main-menu");
    quitBtn.addEventListener("click",() => {
        pause.classList.toggle("hidden");
        gameSection.classList.add("hidden");
        mainMenu.classList.remove("hidden");
        clearInterval(config.gameLoop);
        if(config.currentScore > config.highestScore) {
            config.highestScore = config.currentScore;
        }
        config.currentScore = 0;
        document.querySelector('#score-value').textContent = config.currentScore;
    })
}

const highscoreButton = () => {
    const popup = document.querySelector(".highscore-board");
    const highscoresBtn = document.querySelector(".highscores-btn");
    highscoresBtn.addEventListener("click",() => {
        popup.classList.toggle("hidden");
        popup.classList.toggle("highscore-board-animation");
    })
}

const optionsButton = () => {
    const popup = document.querySelector(".options-popup");
    const optionsBtn = document.querySelector(".options-btn");
    optionsBtn.addEventListener("click",() => {
        popup.classList.toggle("hidden");
    })
}

const changeOptions = () => {
    const popup = document.querySelector(".options-popup");
    const optionsValidBtn = document.querySelector(".options-valid-btn");
    optionsValidBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const keyboard = document.querySelector('#keyboard').value;
        if(keyboard == 'AZERTY') {
            config.movementKeys = {
                up: "z",
                down: "s",
                left: "q",
                right: "d"
            }
        }

        if(keyboard == 'QWERTY') {
            config.movementKeys = {
                up: "w",
                down: "s",
                left: "a",
                right: "d"
            }
        }
        const snakeColor = document.querySelector('#snake-color').value;
        localStorage.setItem("snake-color", snakeColor);
        snake.color = localStorage.getItem("snake-color");
        popup.classList.toggle("hidden");
    })
}

const cancelOptions = () => {
    const popup = document.querySelector(".options-popup");
    const optionsCancelBtn = document.querySelector(".options-cancel-btn");
    optionsCancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        popup.classList.toggle("hidden");
    })
}

const loginBtn = () => {
    const popup = document.querySelector(".login-popup");
    const loginBtn = document.querySelector(".login-btn");
    loginBtn.addEventListener('click', () => {
        popup.classList.toggle("hidden");
    })
}


const resumeButton = () => {
    const resumeBtn = document.querySelector(".resume-btn");
    const pause = document.querySelector(".pause-window");
    resumeBtn.addEventListener("click", () => {
        pause.classList.toggle("hidden");
        config.gameLoop = setInterval(() => {
            gameUpdate();
        }, config.gameInterval / config.currentDifficulty)
    })
}

const creditsButton = () => {
    const popup = document.querySelector(".credits-popup");
    const creditsBtn = document.querySelector(".credits-btn");
    creditsBtn.addEventListener('click', () => {
        popup.classList.toggle("hidden");
    })
    const closeBtn = document.querySelector(".credits-popup .close-btn");
    closeBtn.addEventListener('click', () => {
        popup.classList.toggle("hidden");
    })
}

const startButton = () => {
    const startButton = document.getElementById("start-button");
    const gameSection = document.querySelector(".game");
    const mainMenu = document.querySelector(".main-menu");


    startButton.addEventListener("click", function () {
        gameSection.classList.remove("hidden");
        mainMenu.classList.add("hidden");
        displayDifficultyStars(config.starsAmount)
        newGame();
    });
}

const snakeControls = () => {
    window.addEventListener("keydown", (event) => {
        let key = event.key;
        if (!config.directionChanged) {
            if (key == config.movementKeys.up && snake.direction != 'down') {
                snake.direction = 'up';
                config.directionChanged = true;
            }
            if (key == config.movementKeys.down && snake.direction != 'up') {
                snake.direction = 'down';
                config.directionChanged = true;
            }
            if (key == config.movementKeys.left && snake.direction != 'right') {
                snake.direction = 'left';
                config.directionChanged = true;
            }
            if (key == config.movementKeys.right && snake.direction != 'left') {
                snake.direction = 'right';
                config.directionChanged = true;
            }
        }
    });


    config.directionChanged = false;
}

document.addEventListener("DOMContentLoaded", () => {
    sortScoreBoard();
    creditsButton();
    setDifficultySpeed();
    startButton();
    difficultyButton();
    highscoreButton();
    optionsButton();
    changeOptions();
    cancelOptions();
    loginBtn();
    pauseButton();
    resumeButton();
    restartButton();
    quitButton();
    changeDifficulty();
    snakeControls();
    updateHighscore();
})