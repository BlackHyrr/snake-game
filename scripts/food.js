import { cell, food, snake } from "./variables.js";

const board = document.querySelector("#board");
const board_ctx = board.getContext("2d");

const draw = (elem) => {
    const img = new Image();
    img.src = elem.imgsrc;
    img.width = cell.width;
    img.height = cell.height;

    let update = true;
    function renderFunction(){
        if(update){
        update = false;
        board_ctx.drawImage(img, elem.posX, elem.posY, cell.width, cell.height);
        }
        requestAnimationFrame(renderFunction);
    }
    requestAnimationFrame(renderFunction);
}

const drawAtRandomPosition = (elem) => {

    let maxPosX = board_ctx.canvas.width
    let maxPosY = board_ctx.canvas.height

    do {
        elem.posX = Math.floor(Math.random() * (maxPosX / cell.width - 1)) * cell.width;
        elem.posY = Math.floor(Math.random() * (maxPosY / cell.height - 1)) * cell.height;
    } while (elem.posX == snake.posX || elem.posY == snake.posY);

    draw(elem);
};

const clearElem = (elem) => {
    board_ctx.clearRect(elem.posX, elem.posY, cell.width, cell.height)
}

export { drawAtRandomPosition, draw, clearElem };
