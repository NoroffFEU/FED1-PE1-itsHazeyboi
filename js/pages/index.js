import { myFetcher } from "../features/fetcher.mjs";
import { blogPostsAPI } from "../features/API.mjs";
import { blogPostBuilder } from "../features/postBuilder.mjs";
import { hideLoadingIcon } from "../features/loader.mjs";
import { showLoadingIcon } from "../features/loader.mjs";
import { localAccessToken } from "../features/API.mjs";
import { getUserProfile } from "../features/API.mjs";
import { seeMoreButtonFunction } from "../features/seeMoreButton.mjs";

const blogPosts = await myFetcher(blogPostsAPI);
const blogPostObjects = blogPosts.data;

const main = async function () {
  try {
    showLoadingIcon();
    const blogPostsToRender = blogPostObjects.slice(0, 12);
    console.log("The object information", blogPosts);
    console.log("The different objects", blogPostObjects);
    blogPostBuilder(blogPostsToRender);
    hideLoadingIcon();
  } catch (error) {
    console.error(error);
  }
};

main();

let seeMoreButton = document.getElementById("seeMoreButton");
let blogPostListLength = document.querySelectorAll(".post-container").length;
if (blogPostObjects.length === blogPostListLength) {
  seeMoreButton.remove();
}
seeMoreButton.addEventListener("click", () => {
  seeMoreButtonFunction();
});
