let enter = document.getElementById("enter");
let input = document.getElementById("input");
let list = document.getElementById("output");
let item = document.getElementById("item");
let languages = [];
let keys = localStorage.getItem("counter");

function inputLength() {
  return input.value.length;
}

function listLenght() {
  return item.length;
}

function createListElement() {
  let div = document.createElement("div");
  div.className = "border border-1 rounded min-width me-1 my-2 hovered";
  div.setAttribute("id", "item");
  localStorage.setItem(keys, input.value);
  div.appendChild(document.createTextNode(input.value));
  list.appendChild(div);
  input.value = "";
  keys = Number(keys) + 1;
  localStorage.setItem("counter", Number(keys));
  let deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm mx-2 my-2";
  deleteButton.appendChild(document.createTextNode("X"));
  div.appendChild(deleteButton);
  deleteButton.addEventListener("click", deleteListItem);

  function deleteListItem() {
    div.remove();
    localStorage.removeItem(keys);
  }
}

function addOnEnter(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

function renderList() {
  Object.keys(localStorage).forEach(function (key) {
    if (key === "counter") {
      return;
    }
    let div = document.createElement("div");
    div.className = "border border-1 rounded min-width me-1 my-2 hovered";
    div.setAttribute("id", "item");
    div.appendChild(document.createTextNode(localStorage.getItem(key)));
    list.appendChild(div);
    input.value = "";
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm mx-2 my-2";
    deleteButton.appendChild(document.createTextNode("X"));
    div.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteListItem);

    function deleteListItem() {
      div.remove();
      localStorage.removeItem(key);
    }
  });
}

input.addEventListener("keypress", addOnEnter);
window.onload = renderList();
