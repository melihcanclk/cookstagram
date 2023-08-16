export const convertSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    let stringToReturn = '';
    if (hours > 0) {
        stringToReturn += `${hours} hours `;
    }
    if (minutes > 0) {
        stringToReturn += `${minutes} minutes `;
    }
    if (secondsLeft > 0) {
        stringToReturn += `${secondsLeft} seconds `;
    }
    return stringToReturn;
}

