import { getUserProfile, localAccessToken, deleteAPI } from "./API.mjs";

export function blogPostBuilder(blogPost) {
  let blogPostList = document.querySelector(".blogposts-list");
  blogPostList.innerHTML = "";

  blogPost.forEach((element) => {
    let postContainer = document.createElement("div");
    let blogPostImage = document.createElement("img");
    let postContainerBottom = document.createElement("div");
    let postContainerBottomHeader = document.createElement("h2");

    postContainer.className = "post-container flex-c";
    postContainer.id = element.id;
    blogPostImage.className = "blogpost-image";
    postContainerBottom.className =
      "postcontainer-bottom flex-c center-horizontal";

    blogPostImage.setAttribute("src", `${element.media.url}`);
    blogPostImage.setAttribute("alt", `${element.media.alt}`);
    postContainerBottomHeader.innerHTML = `${element.title}`;

    postContainer.append(blogPostImage);
    postContainer.append(postContainerBottom);
    postContainerBottom.append(postContainerBottomHeader);
    blogPostList.append(postContainer);

    blogPostImage.addEventListener("click", async () => {
      window.location.replace(`/post/index.html?id=${postContainer.id}`);
    });

    postContainerBottomHeader.addEventListener("click", async () => {
      window.location.replace(`/post/index.html?id=${postContainer.id}`);
    });

    if (
      getUserProfile &&
      localAccessToken &&
      getUserProfile.accessToken === localAccessToken
    ) {
      let editOrDeleteWrapper = document.createElement("div");
      let editButton = document.createElement("button");
      let editButtonP = document.createElement("p");
      let editButtonImg = document.createElement("img");
      let deleteButton = document.createElement("button");
      let deleteButtonP = document.createElement("p");
      let deleteButtonImg = document.createElement("img");

      editButton.append(editButtonP, editButtonImg);
      deleteButton.append(deleteButtonP, deleteButtonImg);
      editOrDeleteWrapper.append(editButton, deleteButton);
      postContainerBottom.appendChild(editOrDeleteWrapper);

      editOrDeleteWrapper.classList.add(
        "editOrDeleteWrapper",
        "flex-r",
        "center-both"
      );

      editButton.classList.add("editButton", "flex-r", "center-horizontal");
      editButtonP.innerText = "Edit Post";
      editButtonImg.classList.add("adminIcons");
      editButtonImg.src = "media/favicons/cogwheel.svg";
      editButtonImg.setAttribute("alt", "edit this post button");

      deleteButton.classList.add("deleteButton", "flex-r", "center-horizontal");
      deleteButtonP.innerText = "Delete Post";
      deleteButtonImg.classList.add("adminIcons");
      deleteButtonImg.src = "media/favicons/trashcan.svg";
      deleteButtonImg.setAttribute("alt", "Delete this post button");

      deleteButton.addEventListener("click", async () => {
        let userConfirmed = window.confirm("Do you wish to delete this post?");
        const findParent = deleteButton.closest(".post-container");
        if (userConfirmed) {
          async function deletePost() {
            try {
              await fetch(`${deleteAPI}/${findParent.id}`, {
                method: "DELETE",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  Authorization: `Bearer ${localAccessToken}`,
                },
              });
            } catch (error) {
              console.error("Error deleting the post:", error);
            }
          }
          await deletePost();
          location.reload();
        } else {
          return;
        }
      });
      editButton.addEventListener("click", async () => {
        let findEditButtonParent = editButton.closest(".post-container");
        window.location.replace(
          `../post/edit.html?id=${findEditButtonParent.id}`
        );
      });
    }
  });
}
