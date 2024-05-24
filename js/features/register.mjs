import { registerAPI } from "./API.mjs";
import { checkLogin } from "./checkLogin.mjs";
import { localAccessToken } from "./API.mjs";
import { getUserProfile } from "./API.mjs";

if (
  getUserProfile ||
  localAccessToken ||
  getUserProfile.accessToken == localAccessToken
) {
  console.log("ahhahah");
  window.location.href = "../index.html";
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  let userNameForm = document.getElementById("userNameForm").value;
  let emailForm = document.getElementById("emailForm").value;
  let passWordForm = document.getElementById("passWordForm").value;

  if (!passWordForm.trim() || !userNameForm.trim() || !emailForm.trim()) {
    console.error("Can not submit any empty fields!");
    window.alert("Can not submit any empty fields!");
    return;
  }

  fetch(registerAPI, {
    method: "POST",
    body: JSON.stringify({
      name: userNameForm,
      email: emailForm,
      password: passWordForm,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("A problem registering a user has occurred");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Sent Registry API Data", data);
      window.alert("User registered successfully");
      window.alert("We will now direct you to the login page");
      window.location.href = "login.html";
    });
});
