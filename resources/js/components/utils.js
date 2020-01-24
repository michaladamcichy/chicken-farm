export function formatTimeElement(element) {
    return ('0' + String(element)).slice(-2);
}

export function getCurrentTime () {
    let today = new Date();
    let time = formatTimeElement(today.getHours()) + ":" + formatTimeElement(today.getMinutes()) + ':' + formatTimeElement(today.getSeconds());

    return time;
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
        let item = array.shift();
        item.row = counter;
        matrix[matrix.length - 1].push(item);
        counter++;
    }

    return matrix;
}

export function matrixToArray(inputMatrix) {
    let matrix = [...inputMatrix]
    let output = []

    matrix.forEach(element => {
        element.forEach(element => {
            output.push(element);
        })
    });

    return output;
}
