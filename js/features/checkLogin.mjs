import { createPostButton } from "./createPostButton.mjs";

export function checkLogin() {
  let signInText = document.getElementById("signInText");
  let registerText = document.getElementById("registerText");
  let getUserProfile = JSON.parse(localStorage.getItem("userProfile"));
  let localAccessToken = localStorage.getItem("accessToken");

  if (
    getUserProfile &&
    localAccessToken &&
    getUserProfile.accessToken === localAccessToken
  ) {
    const pathName = window.location.pathname;
    if (
      !pathName.endsWith("/post/createpost.html") &&
      !pathName.endsWith("/account/login.html") &&
      !pathName.endsWith("/account/register.html") &&
      localAccessToken &&
      getUserProfile &&
      getUserProfile.accessToken === localAccessToken
    ) {
      createPostButton();
    }
    signInText.innerText = `Signed in as: ${getUserProfile.name}`;
    signInText.removeAttribute("href");
    registerText.innerText = "Sign Out";
    registerText.addEventListener("click", function () {
      registerText.setAttribute("href", "");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("accessToken");
    });
  } else return;
}

checkLogin();
