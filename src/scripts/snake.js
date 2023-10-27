import { clearElem, drawAtRandomPosition } from "./food.js";
import { gameUpdate, updateScore } from "./game.js";
import { bonus, cell, config, food, gift } from "./variables.js";


class Snake {
    constructor(ctx) {
        this.maxPosX = ctx.canvas.width - 3 * cell.width;
        this.maxPosY = ctx.canvas.height - 3 * cell.height;
        this.posX = Math.floor(Math.random() * ((this.maxPosX / cell.width) - 1)) * cell.width + cell.width * 3;
        this.posY = Math.floor(Math.random() * ((this.maxPosY / cell.height) - 1)) * cell.height + cell.height * 3;
        this.direction = "right";
        this.tail = [];
        this.size = 1;
        this.color = '#009E00';
    }

    createHead() {
        const board = document.querySelector("#board");
        const board_ctx = board.getContext("2d");
        board_ctx.fillStyle = this.color;
        board_ctx.fillRect(this.posX, this.posY, cell.width, cell.height)
    }

    update() {
        let oldPosX = this.posX;
        let oldPosY = this.posY;
        const board = document.querySelector("#board");
        const board_ctx = board.getContext("2d");

        if (this.size > 1) {
            this.tail.push({ x: oldPosX, y: oldPosY });
            while (this.tail.length > this.size - 1) {
                this.tail.shift();
            }
        }

        for (let i = 0; i < this.tail.length; i++) {
            board_ctx.fillRect(this.tail[i].x, this.tail[i].y, cell.width, cell.height);
        }


        if(this.direction == 'up') this.posY -= cell.height;
        if(this.direction == 'down') this.posY += cell.height;
        if(this.direction == 'left') this.posX -= cell.width;
        if(this.direction == 'right')this.posX += cell.width;
    }

    resetSnake() {
        this.posX = Math.floor(Math.random() * ((this.maxPosX / cell.width) - 1)) * cell.width + cell.width * 3;
        this.posY = Math.floor(Math.random() * ((this.maxPosY / cell.height) - 1)) * cell.height + cell.height * 3;
        this.direction = 'right'
        this.size = 1;
        this.tail = [];
    }

    eat() {
        if ((this.posX != food.posX || this.posY != food.posY) 
        && (this.posX != bonus.posX || this.posY != bonus.posY)
        && (this.posX != gift.posX || this.posY != gift.posY)
        ) return;


        if(this.posX == food.posX && this.posY == food.posY) {
            config.currentScore += 50;
            this.size++;
            drawAtRandomPosition(food);
            updateScore();
        }

        if(this.posX == bonus.posX && this.posY == bonus.posY) {
            config.currentScore += 100;
            updateScore();
            gameUpdate();
            bonus.exist = false;
            return;
        }

        if(this.posX == gift.posX && this.posY == gift.posY) {
            config.currentScore += 500;
            updateScore();
            gameUpdate();
            gift.exist = false;
            return;
        }

        clearInterval(config.gameLoop)
        config.gameLoop = setInterval(() => {
            gameUpdate();
            config.directionChanged = false;
        }, config.gameInterval / config.currentDifficulty)
    }
}

export {Snake}