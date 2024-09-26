import { myFetcher } from "../features/fetcher.mjs";
import { blogPostsAPI } from "../features/API.mjs";
import { checkLogin } from "../features/checkLogin.mjs";
import { setCorrectPath } from "../features/windowUrlReplacer.mjs";
import { getUserProfile } from "../features/API.mjs";
import { localAccessToken } from "../features/API.mjs";

const parameterString = window.location.search;
const searchParameters = new URLSearchParams(parameterString);
const pageId = searchParameters.get("id");
const fetchInfo = await myFetcher(`${blogPostsAPI}/${pageId}`);

const createdAt = fetchInfo.data.created;
const updatedAt = fetchInfo.data.updated;

// Function to format date
function formatDate(dateInput) {
  const date = new Date(dateInput);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

const createdAtFormatted = formatDate(createdAt);
const updatedAtFormatted = formatDate(updatedAt);

let blogPostImage = document.querySelector(".blogpage-image");
let header = document.querySelector("h1");
let postAuthor = document.getElementById("postAuthor");
let postText = document.getElementById("blogpost-text");
let dateCreated = document.getElementById("publicationDate");
let updatedTime = document.getElementById("updatedTime");

blogPostImage.src = fetchInfo.data.media.url;
blogPostImage.setAttribute("alt", fetchInfo.data.media.alt);
postAuthor.innerText = `Published by: ${fetchInfo.data.author.name}`;
header.innerText = fetchInfo.data.title;
postText.innerText = fetchInfo.data.body;
dateCreated.innerText = `Post Created: ${createdAtFormatted}`;
updatedTime.innerText = `Post Updated: ${updatedAtFormatted}`;

if (fetchInfo.data.created === fetchInfo.data.updated) {
  updatedTime.style = "display: none";
}

if (getUserProfile && localAccessToken && getUserProfile.accessToken === localAccessToken) {
  let main = document.querySelector("main");
  let createEditPostButton = document.createElement("button");

  main.appendChild(createEditPostButton);
  createEditPostButton.innerText = "Edit Post";
  createEditPostButton.classList.add("button-square2");
  createEditPostButton.id = "editButtonPostPage";

  let editPostButton = document.getElementById("editButtonPostPage");
  editPostButton.addEventListener("click", () => {
    window.location.href = `${setCorrectPath()}/post/edit.html?id=${pageId}`;
  });
}
