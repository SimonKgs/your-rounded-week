
const metallicColors = [
    '#D4AF37', // Metallic Red
    '#6D28D9', // Metallic Purple
    '#0033A0', // Metallic Blue
    '#4A6F28', // Metallic Green
    '#B76E79', // Metallic Rose
];

export const getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * metallicColors.length);
    return metallicColors[randomIndex];
};