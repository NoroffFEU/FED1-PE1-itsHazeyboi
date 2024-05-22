import { loginAPI } from "./API.mjs";
import { checkLogin } from "./checkLogin.mjs";

let localAccessToken = localStorage.getItem("accessToken");
let getUserProfile = JSON.parse(localStorage.getItem("userProfile"));

// Importing some features and other things

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  let userNameForm = document.getElementById("userNameForm").value;
  let passWordForm = document.getElementById("passWordForm").value;

  if (!passWordForm.trim() || !userNameForm.trim()) {
    console.error("Can not submit any empty fields!");
    window.alert("Can not submit any empty fields!");
    return;
  }

  fetch(loginAPI, {
    method: "POST",
    body: JSON.stringify({
      email: userNameForm,
      password: passWordForm,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("json---", data);
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("userProfile", JSON.stringify(data.data));
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      window.alert("Login failed!");
    });
});

// This boots you out of the login page incase you already are logged in
if (
  getUserProfile ||
  localAccessToken ||
  getUserProfile.accessToken == localAccessToken
) {
  console.log("ahhahah");
  window.location.href = "../index.html";
}
