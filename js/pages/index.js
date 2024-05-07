import { myFetcher } from "../features/fetcher.mjs";
import { blogPostsAPI } from "../features/API.mjs";
import { blogPostBuilder } from "../features/postBuilder.mjs";

const main = async function () {
    try {
    //   showLoadingIcon();
      const blogPosts = await myFetcher(blogPostsAPI);
      const blogPostObjects = blogPosts.data;
    //   blogPostBuilder(blogPostObjects);
      console.log("The object information", blogPosts);
      console.log("The different objects", blogPostObjects);
    //   hideLoadingIcon();
    } catch (error) {
      console.error(error);
    }
  };
  
  main();
