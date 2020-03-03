const defaultDarkBackgroundColor = JSON.stringify({r: 30, g: 30, b: 30, a: 1});
const defaultLightBackgroundColor = JSON.stringify({r: 255, g: 255, b: 255, a: 1});
const defaultDarkForegroundColor = JSON.stringify({r: 30, g: 30, b: 30, a: 1});
const defaultLightForegroundColor = JSON.stringify({r: 255, g: 255, b: 255, a: 1});

export const setDefaultColors = colors => {
  colors.dark_background_color =
    colors.dark_background_color || defaultDarkBackgroundColor;
  colors.dark_foreground_color =
    colors.dark_foreground_color || defaultDarkForegroundColor;
  colors.light_background_color =
    colors.light_background_color || defaultLightBackgroundColor;
  colors.light_foreground_color =
    colors.light_foreground_color || defaultLightForegroundColor;
};

export const changeTheme = (bgColor, textColor) => {
  const backgroundColorStyle = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`;
  const textColorStyle = `rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, ${textColor.a})`;

  const bodyEl = document.getElementsByTagName("body")[0];

  bodyEl.style.setProperty("background-color", backgroundColorStyle, "important");
  bodyEl.style.setProperty("color", textColorStyle, "important");

  const appHeaderEl = document.getElementsByClassName("app-header")[0];

  if (appHeaderEl) {
    appHeaderEl.style.setProperty("background-color", backgroundColorStyle, "important");
    appHeaderEl.style.setProperty("color", textColorStyle, "important");
  }
};

export const applyTheme = (theme, darkMode) => {
  if (!theme.dark_background_color) return;
  let bgRgb = JSON.parse(theme.dark_background_color);
  let foreRgb = JSON.parse(theme.light_background_color);
  if (!darkMode) {
    bgRgb = JSON.parse(theme.light_background_color);
    foreRgb = JSON.parse(theme.dark_foreground_color);
  }
  changeTheme(bgRgb, foreRgb);
};
