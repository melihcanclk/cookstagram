export const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = '';
}