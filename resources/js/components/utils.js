export function getCurrentTime () {
    let today = new Date();
    return today.getHours() + ":" + today.getMinutes() + ':00';
}

export function getCurrentDate() {
    return (new Date()).toLocaleDateString('en-CA');
} 