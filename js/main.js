'use strict';

function crtEl(el) {
    return document.createElement(el);
}

function getCell(x, y) {
    return document.querySelectorAll('[data-pos="' + Math.floor(x) + '-' + Math.floor(y) + '"]')[0];
}

function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function Game() {
    this.FIELD_SIZE_X = 20;
    this.FIELD_SIZE_Y = 20;
    this.SNAKE_SIZE = 3;
    this.SNAKE_SPEED = 300;
    this.WALLS_SPEED = 3000;
    this.LEFT = 37;
    this.UP = 38;
    this.RIGHT = 39;
    this.DOWN = 40;

    this.foodCell = undefined;
    this.gameTimer = null;
    this.wallsTimer = null;
    this.walls = [];

    this.scoreInc = function () {
        document.getElementById('game-score').innerText = +document.getElementById('game-score').innerText + 1;
    }

    this.snake = function (game) {
        this.currentDirection = 38;

        this.body = [];

        this.go = function () {
            var nextCell = null;
            var pos = this.body[0].dataset.pos.split('-');
            var x = +pos[0];
            var y = +pos[1];

            switch (this.currentDirection) {
                case game.LEFT:
                    nextCell = this.goLeft(x, y);
                    break;
                case game.RIGHT:
                    nextCell = this.goRight(x, y);
                    break;
                case game.UP:
                    nextCell = this.goUp(x, y);
                    break;
                case game.DOWN:
                    nextCell = this.goDown(x, y);
                    break;
            }

            if (this.isSnakeCell(nextCell) || nextCell === undefined || game.walls.includes(nextCell)) {
                clearInterval(game.gameTimer);
                clearInterval(game.wallsTimer);
                alert('GAME OVER');
            } else {
                this.body.unshift(nextCell);
                nextCell.classList.add('snake-cell');
                this.endOfTail();
            }
        };

        this.goRight = function (x, y) {
            if (x >= game.FIELD_SIZE_X - 1) {
                x = -1;
            }
            var nextCell = getCell(x + 1, y);
            if (this.body[1] === nextCell) {
                nextCell = getCell(x - 1, y);
            }
            return nextCell;
        };

        this.goLeft = function (x, y) {
            if (x <= 0) {
                x = game.FIELD_SIZE_X;
            }
            var nextCell = getCell(x - 1, y);
            if (this.body[1] === nextCell) {
                nextCell = getCell(x + 1, y);
            }
            return nextCell;
        };

        this.goUp = function (x, y) {
            if (y <= 0) {
                y = game.FIELD_SIZE_Y;
            }
            var nextCell = getCell(x, y - 1);
            if (this.body[1] === nextCell) {
                nextCell = getCell(x, y + 1);
            }
            return nextCell;
        };

        this.goDown = function (x, y) {
            if (y >= game.FIELD_SIZE_Y - 1) {
                y = -1;
            }
            var nextCell = getCell(x, y + 1);
            if (this.body[1] === nextCell) {
                nextCell = getCell(x, y - 1);
            }
            return nextCell;
        };

        this.endOfTail = function () {
            if (game.foodCell !== this.body[0]) {
                var tail = this.body.pop();
                tail.classList.remove('snake-cell');
            } else {
                game.foodCell.classList.remove('food-cell');
                game._foodCreator();
                game.scoreInc();
            }
        };

        this.isSnakeCell = function (el) {
            return this.body.includes(el);
        }
    };

    this.run = function () {
        this._createGameField();
        this._createSnake();
        this.gameTimer = setInterval(function () {
            game._wallsDestroyer();
            game.snake.go();
        }, this.SNAKE_SPEED);
        this._foodCreator();
        this.wallsTimer = setInterval(this._wallsCreator, this.WALLS_SPEED);
    };

    this._createGameField = function () {
        var table = crtEl('table');
        table.classList.add('game-table');
        for (var i = 0; i < this.FIELD_SIZE_X; i++) {
            var tr = crtEl('tr');
            for (var j = 0; j < this.FIELD_SIZE_Y; j++) {
                var td = crtEl('td');
                td.classList.add('game-table-cell');
                td.dataset.pos = j + '-' + i;

                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        document.getElementsByClassName('game-body')[0].insertBefore(table, document.getElementsByClassName('game-body')[0].firstChild);
    };

    this._createSnake = function () {
        this.snake = new this.snake(this);
        var startX = this.FIELD_SIZE_X / 2;
        var startY = this.FIELD_SIZE_Y / 2;

        for (var i = 0; i < this.SNAKE_SIZE && startY + i < this.FIELD_SIZE_Y; i++) {
            var snakeCell = getCell(startX, startY + i);
            this.snake.body.push(snakeCell);
            snakeCell.classList.add('snake-cell');
        }
    };

    this._foodCreator = function () {
        var x = getRandom(0, this.FIELD_SIZE_X - 1);
        var y = getRandom(0, this.FIELD_SIZE_Y - 1);
        var foodCell = getCell(x, y);
        if (!this.snake.isSnakeCell(foodCell) && !this.walls.includes(foodCell)) {
            this.foodCell = foodCell;
            this.foodCell.classList.add('food-cell');
        } else {
            this._foodCreator();
        }
    };

    this._wallsCreator = function () {
        var x = getRandom(0, game.FIELD_SIZE_X - 1);
        var y = getRandom(0, game.FIELD_SIZE_Y - 1);
        var wallCell = getCell(x, y);
        if (!game.snake.isSnakeCell(wallCell) && wallCell !== game.foodCell) {
            wallCell.classList.add('wall-cell');
            wallCell.dataset.livetime = getRandom(3 * game.SNAKE_SPEED, game.FIELD_SIZE_X * game.SNAKE_SPEED);
            game.walls.push(wallCell);
        } else {
            game._wallsCreator();
        }
    };

    this._wallsDestroyer = function () {
        for (var i = 0; i < game.walls.length; i++) {
            game.walls[i].dataset.livetime = +game.walls[i].dataset.livetime - game.SNAKE_SPEED;
        }
        var j = game.walls.length;
        while (j--) {
            if (+game.walls[j].dataset.livetime <= 0) {
                game.walls[j].classList.remove('wall-cell');
                game.walls.splice(j, 1);
            }
        }
    }

}

var game = new Game();

function controller(e) {
    game.snake.currentDirection = e.keyCode;
}

function init() {
    window.addEventListener('keydown', controller);
    game.run();
}