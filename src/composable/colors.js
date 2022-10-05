export const useColorByValueHsl = ({
                                     ratio,
                                     ratioMin = 0,
                                     ratioMax = 5,
                                     color1 = 0,
                                     color2 = 120,
                                   }) => {
  const hue = Math.round((ratio - ratioMin) / (ratioMax - ratioMin) * (color2 - color1));

  const saturation = 100
  const lightness = 48

  return {hue, saturation, lightness};
};
