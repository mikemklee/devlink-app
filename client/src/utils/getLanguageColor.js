import githubColors from "./githubColors";

const getLanguageColor = language => {
  if (language !== null) {
    return githubColors[language].color;
  } else {
    return "black";
  }
};

export default getLanguageColor;
