import { loginAPI } from "./API.mjs";
import { myFetcher } from "./fetcher.mjs";
import { createPostButton } from "./createPostButton.mjs";

function checkLogin() {
  let topHeaderChange = document.querySelector(".header-top");
  let signInText = document.getElementById("signInText");
  let registerText = document.getElementById("registerText");
  let getUserProfile = JSON.parse(localStorage.getItem("userProfile"));
  let localAccessToken = localStorage.getItem("accessToken");
  console.log(getUserProfile);

  if (getUserProfile.accessToken === localAccessToken) {
    createPostButton();
    signInText.innerText = `Signed in as: ${getUserProfile.name}`;
    registerText.innerText = "Sign Out";
    registerText.addEventListener("click", function () {
      registerText.setAttribute("href", "");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("accessToken");
    });
  } else return;
}

checkLogin();
