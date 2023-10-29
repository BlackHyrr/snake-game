import { Snake } from "./snake.js";

const cell = {
    height: 34,
    width: 34
}

let food = {
    posX: 0,
    posY: 0,
    imgsrc: "./public/assets/media/apple.png"
}

let bonus = {
    posX: 0,
    posY: 0,
    imgsrc: "./public/assets/media/bonus.png",
    exist: false
}

let gift = {
    posX: 0,
    posY: 0,
    imgsrc: "./public/assets/media/gift.png",
    exist: false
}

let config = {
    MAX_BOARD_WIDTH: 850,
    MAX_BOARD_HEIGHT: 550,
    difficultyChoices: {
        easy: 1.3,
        normal: 1.75,
        hard: 2.4,
        very_hard: 3.5,
        nightmare: 6
    },
    gameInterval: 500,
    currentDifficulty: 1,
    starsAmount: 1,
    currentScore: 0,
    highestScore: 0,
    gameLoop: {},
    movementKeys: {
        up: "z",
        down: "s",
        left: "q",
        right: "d"
    },
    directionChanged: false
}

const board = document.querySelector("#board");
let board_ctx = board.getContext("2d");
let snake = new Snake(board_ctx);


export { cell, config, food, snake, bonus, gift}