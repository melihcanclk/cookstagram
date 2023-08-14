function parse(text: string, matches: Array<[number, number]>): Array<{ text: string; highlight: boolean }> {
    return [
        // return all parts of the text
        ...text.split('').map((char, index) => {
            return {
                text: char,
                highlight: matches.some(
                    (match) => index >= match[0] && index < match[1],
                ),
            };
        }),
    ]
}

export default parse;