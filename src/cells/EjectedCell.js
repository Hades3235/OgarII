const Cell = require("./Cell");

class EjectedCell extends Cell {
    /**
     * @param {World} world
     * @param {number} x
     * @param {number} y
     * @param {Color} color
     */
    constructor(world, x, y, color) {
        const size = world.settings.ejectedSize;
        super(world, x, y, size, color);
    }

    get type() { return 3; }
    get isSpiked() { return false; }
    get isAgitated() { return false; }
    get avoidWhenSpawning() { return false; }

    /**
     * @param {Cell} other
     * @returns {CellEatResult}
     */
    getEatResult(other) {
        if (other.type === 2 || other.type === 4) return 3;
        if (other.type === 3) {
            if (!other.isBoosting) other.world.setCellAsBoosting(other);
            return 1;
        }
        return 0;
    }

    onSpawned() {
        this.world.ejectedCells.push(this);
    }
    onRemoved() {
        this.world.ejectedCells.splice(this.world.ejectedCells.indexOf(this), 1);
    }
}

module.exports = EjectedCell;

const World = require("../worlds/World");