export const convertSeconds = (minutes: number | undefined) => {
    if (!minutes) {
        return '';
    }
    const hours = Math.floor(minutes / 60);
    let stringToReturn = '';
    if (hours > 0) {
        stringToReturn += `${hours} hours `;
    }
    if (minutes > 0) {
        stringToReturn += `${minutes} minutes `;
    }
    return stringToReturn;
}

