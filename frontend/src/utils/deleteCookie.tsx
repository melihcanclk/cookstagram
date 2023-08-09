export const deleteCookie = (cookieName: string) => {
    // delete cookie by setting it to an empty string and expiring it
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}