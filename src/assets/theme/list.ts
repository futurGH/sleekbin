import { themes } from "ace-builds/src-min-noconflict/ext-themelist";

const custom = [["Sleekula", "sleekula", "dark"]];

for (const customTheme of custom) {
  themes.push({
    caption: customTheme[0],
    theme: `ace/theme/${customTheme[1]}`,
    isDark: customTheme[2] === "dark",
    name: customTheme[1],
  });
}

export default themes;
