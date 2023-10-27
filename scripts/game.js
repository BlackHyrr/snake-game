import { createBoard } from "./board.js";
import { drawAtRandomPosition, draw } from "./food.js";
import { bonus, config, food, gift, snake} from "./variables.js";

const board = document.querySelector("#board");
let board_ctx = board.getContext("2d");
const gameUpdate = () => {
    board_ctx.clearRect(0, 0, board_ctx.canvas.width, board_ctx.canvas.height);

    if(bonus.exist) {
        draw(bonus)
    } else {
        board_ctx.clearRect(0, 0, board_ctx.canvas.width, board_ctx.canvas.height);
        if(Math.random() < 0.04) {
            drawAtRandomPosition(bonus)
            bonus.exist = true;
        }
    }

    if(gift.exist) {
        draw(gift)
    } else {
        board_ctx.clearRect(0, 0, board_ctx.canvas.width, board_ctx.canvas.height);
        if(Math.random() < 0.01) {
            drawAtRandomPosition(gift)
            gift.exist = true;
        }
    }
    draw(food);
    snake.update();
    snake.createHead();
    if (snake.posX < 0 || snake.posX >= board_ctx.canvas.width || snake.posY < 0 || snake.posY >= board_ctx.canvas.height) {
        gameOver();
    }

    for (let i = 0; i < snake.tail.length; i++) {
        if (snake.posX === snake.tail[i].x && snake.posY === snake.tail[i].y) {
            gameOver()
        }
    }

    snake.eat();
}

const newGame = () => {
    createBoard();
    snake.resetSnake();
    snake.createHead();
    config.currentScore = 0;
    updateScore();
    drawAtRandomPosition(food);
    config.gameLoop = setInterval(() => {
        gameUpdate();
        config.directionChanged = false;
    }, config.gameInterval / config.currentDifficulty)
}

const gameOver = () => {
    clearInterval(config.gameLoop); 
    if(config.currentScore > config.highestScore) {
        config.highestScore = config.currentScore;
        alert(`GAME OVER. New highscore ! Score: ${config.highestScore}`);
    } else {
        alert(`GAME OVER. Score: ${config.currentScore}`);
    }

    updateHighscore();
    config.currentScore = 0;
    const mainMenu = document.querySelector(".main-menu");
    const gameSection = document.querySelector(".game");
    gameSection.classList.toggle("hidden");
    mainMenu.classList.toggle("hidden");
    board_ctx.clearRect(0, 0, board_ctx.canvas.width, board_ctx.canvas.height);
}

const updateScore = () => {
    document.querySelector('#score-value').textContent = config.currentScore;
    const player = document.querySelector('.scoreboard #player');
    player.querySelector('.user-score').innerText = `${config.currentScore}`;
    sortScoreBoard();
    updateHighscore();
}

const sortScoreBoard = () => {

    let users = [...document.querySelectorAll('.scoreboard .user')];
    const isNumeric = true;
    const selector = element => element.querySelector('.scoreboard .user-score').innerText;
    const collator = new Intl.Collator(undefined, {numeric: isNumeric, sensitivity: 'base'});
    const parentElement = document.querySelector('.scoreboard #high-score')

    users.sort((userA, userB) => {
        const [firstUser, secondUser] = [userB, userA];
        const scoreOfFirstUser = selector(firstUser);
        const scoreOfSecondUser = selector(secondUser);
        return collator.compare(scoreOfFirstUser , scoreOfSecondUser)
    }).forEach(element => parentElement.appendChild(element));
}

const updateHighscore = () => {
    if(config.currentScore > config.highestScore) {
        config.highestScore = config.currentScore;
        localStorage.setItem("myHighestScore", config.highestScore);
        document.querySelector('.highscore-board #player .user-score').innerText = config.highestScore;
        sortHighscoreBoard();
    }
}

const sortHighscoreBoard = () => {
    let highestScore = localStorage.getItem("myHighestScore");
    document.querySelector('.highscore-board #player .user-score').innerText = highestScore;
    let users = [...document.querySelectorAll('.highscore-board .user')];
    const isNumeric = true;
    const selector = element => element.querySelector('.highscore-board .user-score').innerText;
    const collator = new Intl.Collator(undefined, {numeric: isNumeric, sensitivity: 'base'});
    const parentElement = document.querySelector('.highscore-board #high-score')

    users.sort((userA, userB) => {
        const [firstUser, secondUser] = [userB, userA];
        const scoreOfFirstUser = selector(firstUser);
        const scoreOfSecondUser = selector(secondUser);
        return collator.compare(scoreOfFirstUser , scoreOfSecondUser)
    }).forEach(element => parentElement.appendChild(element));
}

export {newGame, gameOver, updateScore, gameUpdate, sortScoreBoard, updateHighscore, sortHighscoreBoard}