
export const getCookie = (key: string) => {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            const cookieTrimmed = cookie.trim();
            if (cookieTrimmed.substring(0, key.length + 1) === (key + '=')) {
                cookieValue = decodeURIComponent(cookieTrimmed.substring(key.length + 1));
            }
        });
    }
    return cookieValue;
}
