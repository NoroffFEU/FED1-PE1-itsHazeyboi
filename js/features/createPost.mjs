import { checkLogin } from "./checkLogin.mjs";
import { blogPostsAPI } from "./API.mjs";

let localAccessToken = localStorage.getItem("accessToken");
let getUserProfile = JSON.parse(localStorage.getItem("userProfile"));
let imageUrlTrue = false;

// This snippet updates the backround image right away at the create post page

document.getElementById("imageURL").addEventListener("input", function () {
  let imageContainer = document.querySelector(".uploadImageContainer");
  let newImage = document.createElement("img");
  newImage.classList.add("blogpost-image");
  imageContainer.innerHTML = "";
  const imageUrl = this.value;

  // Check if the entered value is a valid URL
  // If it's a valid URL, update the image source
  if (/^https?:\/\/\S+\.\S+$/.test(imageUrl)) {
    imageContainer.style.backgroundColor = "#00000000";
    newImage.src = imageUrl;
    imageContainer.appendChild(newImage);
    imageUrlTrue = true;
  } else {
    imageContainer.style.backgroundColor = "#7b7b7b";
    imageContainer.textContent = "Invalid image URL";
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
    console.error("Can not submit any empty fields!");
    window.alert("Can not submit any empty fields!");
    return;
  }

  if (!imageUrlTrue) {
    console.error("Can not submit a wrong URL!");
    window.alert("Can not submit a wrong URL!");
    return;
  }

  fetch(blogPostsAPI, {
    method: "POST",
    body: JSON.stringify({
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
    .then(window.alert("Post Created Successfully"))
    .then((window.location.href = "../index.html"));
});

export function updateCounter() {
  const textArea = document.getElementById("postContentForm");
  const counter = document.getElementById("counter");

  counter.innerText = `${textArea.value.length}/2000`;
}

// ^ A little something for UX's sake so that its easy to understand that there is a max limit
// of 2000 characters on the API blog post's post.

if (
  !getUserProfile ||
  !localAccessToken ||
  getUserProfile.accessToken !== localAccessToken
) {
  console.log("ahhahah");
  window.location.href = "../index.html";
}

// ^ This is just something to prevent users from going to the 'createpost' page without having the proper credentials
