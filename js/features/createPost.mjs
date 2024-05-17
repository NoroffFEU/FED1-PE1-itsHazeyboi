const securityToken = localStorage.getItem("accessToken");
let imageUrlTrue = false;

// This snippet updates the backround image right away at the create post page

document.getElementById("imageURL").addEventListener("input", function () {
  let imageContainer = document.querySelector(".uploadImageContainer");
  let newImage = document.createElement("img");
  newImage.classList.add("blogpost-image");
  imageContainer.innerHTML = "";
  const imageUrl = this.value;

  // Check if the entered value is a valid URL
  if (/^https?:\/\/\S+\.\S+$/.test(imageUrl)) {
    // If it's a valid URL, update the image source
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

  fetch("https://v2.api.noroff.dev/blog/posts/Hansi", {
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
      Authorization: `Bearer ${securityToken}`,
    },
  })
    .then((response) => response.json())
    .then((json) => console.log("json---", json))
    .then(window.alert("Post Created Successfully"))
    .then((window.location.href = "../index.html"));
});
