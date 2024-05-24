import { myFetcher } from "../features/fetcher.mjs";
import { blogPostsAPI } from "../features/API.mjs";
import { checkLogin } from "../features/checkLogin.mjs";

const parameterString = window.location.search;
const searchParameters = new URLSearchParams(parameterString);
const pageId = searchParameters.get("id");
const fetchInfo = await myFetcher(`${blogPostsAPI}/${pageId}`);
console.log(fetchInfo);

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
dateCreated.innerText = `Post Created: ${fetchInfo.data.created}`;
updatedTime.innerText = `Post Updated: ${fetchInfo.data.updated}`;

if (fetchInfo.data.created === fetchInfo.data.updated) {
  updatedTime.style = "display: none";
}
