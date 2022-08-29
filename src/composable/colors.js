export const useColorByValueHsl = ({color1 = 50, color2 = 140, ratio}) => Math.round(ratio * color1 + (color2 - color1) / 2);
