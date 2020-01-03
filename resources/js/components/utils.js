export function getCurrentTime () {
    let today = new Date();
    return today.getHours() + ":" + today.getMinutes() + ':00';
}

export function getCurrentDate() {
    return (new Date()).toLocaleDateString('en-CA');
}

export function arrayToMatrix(inputArray, rowLength) {
    let array = [...inputArray];
    let matrix = [];

    let counter = 0;
    while(array.length > 0) {
        if(counter%rowLength == 0) matrix.push([]);
        matrix[matrix.length - 1].push(array.shift());
        counter++;
    }

    return matrix;
}