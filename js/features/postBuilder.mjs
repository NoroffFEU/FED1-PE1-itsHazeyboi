export function blogPostBuilder(blogPost) {
  let blogPostList = document.querySelector(".blogposts-list");
  blogPostList.innerHTML = "";

  blogPost.forEach((element) => {
    let postContainer = document.createElement("div");
    let blogPostImage = document.createElement("img");
    let postContainerBottom = document.createElement("div");
    let postContainerBottomHeader = document.createElement("h2");

    postContainer.className = "post-container flex-c";
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
  });
}
