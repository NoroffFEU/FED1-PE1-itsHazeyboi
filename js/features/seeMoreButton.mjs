import { myFetcher } from "./fetcher.mjs";
import { blogPostsAPI } from "./API.mjs";
import { blogPostBuilder } from "./postBuilder.mjs";

export async function seeMoreButtonFunction() {
  const blogPosts = await myFetcher(blogPostsAPI);
  const blogPostObjects = blogPosts.data;
  console.log(blogPostObjects);
  blogPostBuilder(blogPostObjects);
  let blogPostListLength = document.querySelectorAll(".post-container").length;
  console.log(blogPostListLength);
  seeMoreButton.remove();
}
