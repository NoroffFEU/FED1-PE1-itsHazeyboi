import { setCorrectPath } from "./windowUrlReplacer.mjs";

export function createPostButton() {
  let headerBottom = document.querySelector(".header-bottom");
  let a = document.createElement("a");
  let div = document.createElement("div");
  let p = document.createElement("p");
  let img = document.createElement("img");
  headerBottom.appendChild(a);
  a.appendChild(div);
  div.appendChild(p);
  div.appendChild(img);
  a.classList.add("text-highlight");
  a.setAttribute("href", `${setCorrectPath()}/post/createpost.html`);
  div.classList.add("create-post-button");
  div.classList.add("flex-r");
  p.innerText = "Create Post";
  img.src = "../media/favicons/plus-sign.svg";
  img.setAttribute("alt", "create post button");
}
