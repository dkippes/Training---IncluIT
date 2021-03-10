/**
 * A left rotation operation on an array shifts each of the array's elements 1 unit to the left.
 * Precondition: None
 * @param  {Array} array=[]
 * @param  {Number} n=0
 */
function left_rot(array = [], n = 0) {

    for(let i=0; i < n; i++) {
        // The first element is push to the end of the array
        array.push(array.shift())
    }

    return console.log(array);
}

module.exports = left_rot;