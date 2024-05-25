import { myFetcher } from "../features/fetcher.mjs";
import { blogPostsAPI } from "../features/API.mjs";
import { blogPostBuilder } from "../features/postBuilder.mjs";
import { hideLoadingIcon } from "../features/loader.mjs";
import { showLoadingIcon } from "../features/loader.mjs";
import { localAccessToken } from "../features/API.mjs";
import { getUserProfile } from "../features/API.mjs";

const main = async function () {
  try {
    showLoadingIcon();
    const blogPosts = await myFetcher(blogPostsAPI);
    const blogPostObjects = blogPosts.data;
    console.log("The object information", blogPosts);
    console.log("The different objects", blogPostObjects);
    blogPostBuilder(blogPostObjects);
    hideLoadingIcon();
  } catch (error) {
    console.error(error);
  }
};

main();
