import { blogPostsAPI } from "../features/API.mjs";
import { myFetcher } from "../features/fetcher.mjs";
import { localAccessToken } from "../features/API.mjs";
import { getUserProfile } from "../features/API.mjs";
import { deleteAPI } from "../features/API.mjs";
import { checkLogin } from "../features/checkLogin.mjs";

if (
  !getUserProfile ||
  !localAccessToken ||
  getUserProfile.accessToken !== localAccessToken
) {
  console.log("ahhahah");
  window.location.href = "../index.html";
}

// ^ This is just something to prevent users from going to the 'createpost' page without having the proper credentials

const parameterString = window.location.search;
const searchParameters = new URLSearchParams(parameterString);
const pageId = searchParameters.get("id");
let postFull = await myFetcher(`${blogPostsAPI}/${pageId}`);

console.log(postFull.data);

let imageContainer = document.querySelector(".uploadImageContainer");
let newImage = document.createElement("img");
let imageUrlCheck = true;
newImage.classList.add("blogpost-image");
newImage.src = postFull.data.media.url;
imageContainer.innerHTML = "";
imageContainer.appendChild(newImage);

let imageForm = document.getElementById("imageURL");
let postTitleForm = document.getElementById("postTitleForm");
let postContentForm = document.getElementById("postContentForm");

imageForm.defaultValue = postFull.data.media.url;
postTitleForm.defaultValue = postFull.data.title;
postContentForm.defaultValue = postFull.data.body;

// This snippet updates the backround image right away at the edit post page

document.getElementById("imageURL").addEventListener("input", function () {
  let imageContainer = document.querySelector(".uploadImageContainer");
  const imageUrl = this.value;
  let newImage = document.createElement("img");
  newImage.classList.add("blogpost-image");
  newImage.src = postFull.data.media.url;
  imageContainer.innerHTML = "";
  imageContainer.appendChild(newImage);
  // Check if the entered value is a valid URL
  // If it's a valid URL, update the image source
  if (/^https?:\/\/\S+\.\S+$/.test(imageUrl)) {
    imageContainer.style.backgroundColor = "#00000000";
    newImage.src = imageUrl;
    imageUrlCheck = true;
  } else {
    newImage.src = postFull.data.media.url;
    imageUrlCheck = false;
  }
});

// Here I handle sending the data, whilst also throwing up different errors for potential
// situations where the user does something wrong

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  let imageURL = document.getElementById("imageURL").value;
  let postTitle = document.getElementById("postTitleForm").value;
  let postTextContent = document.getElementById("postContentForm").value;

  if (!postTitle.trim() || !imageURL.trim() || !postTextContent.trim()) {
    window.alert("Can not submit any empty fields!");
    return;
  }

  if (!imageUrlCheck) {
    window.alert("Not a valid URL!");
    console.log(imageUrlCheck);
    return;
  }

  fetch(`${blogPostsAPI}/${pageId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: postTitle,
      body: postTextContent,
      media: {
        url: imageURL,
      },
      title: postTitle,
      body: postTextContent,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${localAccessToken}`,
    },
  })
    .then((response) => response.json())
    .then((json) => console.log("json---", json))
    .then(window.alert("Post Edited Successfully"))
    .then((window.location.href = "../index.html"));
});

updateCounter();

// ^ A little something for UX's sake so that its easy to understand that there is a max limit
// of 10000 characters on the API blog post's post.

let deleteButtonEditPage = document.querySelector(".deleteButtonEditPage");
deleteButtonEditPage.addEventListener("click", async () => {
  let userConfirmed = window.confirm("Do you wish to delete this post?");
  const parameterString = window.location.search;
  const searchParameters = new URLSearchParams(parameterString);
  const findId = searchParameters.get("id");

  if (userConfirmed) {
    try {
      await fetch(`${deleteAPI}/${findId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localAccessToken}`,
        },
      });

      window.alert("Post deleted successfully");
      window.location.href = "../index.html";
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  } else {
    return;
  }
});
