import { blogPostsAPI } from "./API.mjs";
import { loginAPI } from "./API.mjs";
import { myFetcher } from "./fetcher.mjs";
import { setCorrectPath } from "./windowUrlReplacer.mjs";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const data = await myFetcher(blogPostsAPI);
    const data2 = data.data;
    console.log(data2);
    const lastThreePosts = data2.slice(0, 3);
    console.log(lastThreePosts);

    const scrollLeftButton = document.querySelector(".scroll-left");
    const scrollRightButton = document.querySelector(".scroll-right");
    const carouselImage = document.querySelector(".carousel-blog-post-image");
    const carouselTitle = document.getElementById("carousel-title");

    let currentIndex = 0;

    function updateCarousel() {
      carouselImage.src = lastThreePosts[currentIndex].media.url;
      carouselImage.id = lastThreePosts[currentIndex].id;
      carouselTitle.textContent = lastThreePosts[currentIndex].title;
    }

    updateCarousel();

    scrollLeftButton.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + lastThreePosts.length) % lastThreePosts.length;
      updateCarousel();
    });

    scrollRightButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % lastThreePosts.length;
      updateCarousel();
    });

    carouselImage.addEventListener("click", () => {
      let findId = carouselImage.id;
      window.location.replace(
        `${setCorrectPath()}/post/index.html?id=${findId}`
      );
    });
  } catch (error) {
    console.error(error);
  }
});
