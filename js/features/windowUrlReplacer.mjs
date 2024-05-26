export function setCorrectPath() {
  const gitHubPath = "/FED1-PE1-itsHazeyboi";
  const isFrontPageGithub = window.location.pathname.includes(gitHubPath);
  if (isFrontPageGithub) {
    return gitHubPath;
  } else {
    return "";
  }
}

export function setCorrectMedia() {
  const gitHubPath = "norofffeu.github.io/FED1-PE1-itsHazeyboi/index.html";
  const isFrontPageGithub = window.location.pathname.endsWith(gitHubPath);
  if (isFrontPageGithub) {
    return "./media/favicons/plus-sign.svg";
  } else {
    return "../media/favicons/plus-sign.svg";
  }
}
