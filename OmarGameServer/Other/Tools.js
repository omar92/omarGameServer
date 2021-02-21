// @ts-check
module.exports = new Tools();

function Tools() {

    /**
     * @param {Array} array
     * @param {(Array:array) => boolean} condition
     * @returns {any}
     */
    this.SearchArray = function (array, condition) {
        for (let i = 0; i < array.length; i++) {
            if (condition(array[i])) {
                return array[i];
            }
        }
        return null;
    }
    /**
     * @param {Array} array
     * @param {(Array:array) => boolean} condition
     * @param {boolean} isMany
     */
    this.DeletFromArray = function (array, condition, isMany) {
        for (let i = 0; i < array.length; i++) {
            if (condition(array[i])) {
                array.splice(i, 1);
                if (i > 0) i--;
                if (!isMany) break;
            }
        }
    }
}

