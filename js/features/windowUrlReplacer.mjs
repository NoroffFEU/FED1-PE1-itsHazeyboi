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
  const gitHubPath = "/FED1-PE1-itsHazeyboi/index.html";
  const currentPath = window.location.pathname;
  const isExactPath = currentPath === gitHubPath;

  if (isExactPath) {
    return "./media/favicons/plus-sign.svg";
  } else {
    return "../media/favicons/plus-sign.svg";
  }
}
