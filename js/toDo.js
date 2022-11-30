let enter = document.getElementById("enter");
let input = document.getElementById("input");
let list = document.getElementById("output");
let item = document.getElementById("item");
let radioOption = document.querySelectorAll("input[name=view_list]");
let languages = [];
let keys = localStorage.getItem("counter");

function inputLength() {
  return input.value.length;
}

function listLenght() {
  return item.length;
}

function createListElement() {
  localStorage.setItem("toDo_" + keys, input.value);
  keys = Number(keys) + 1;
  localStorage.setItem("counter", Number(keys));
  createListComponents(input.value, keys);
}

function addOnEnter(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

function createListComponents(value, key) {
  let div = createDiv();
  createDivText(value, div);
  createDeleteButon(div, key);
}

function renderList() {
  Object.keys(localStorage)
    .sort()
    .forEach(function (key) {
      if (key.split("_")[0] === "toDo") {
        createListComponents(localStorage.getItem(key), key);
      }
    });
}

function createDiv() {
  let div = document.createElement("div");
  div.className =
    "border border-1 rounded min-width me-1 my-2 hovered d-flex justify-content-between text-center align-items-center";
  div.setAttribute("id", "item");
  return div;
}

function createDivText(value, div) {
  let divText = document.createElement("div");
  divText.appendChild(document.createTextNode(value));
  div.appendChild(divText);
  list.appendChild(div);
  input.value = "";
  divText.addEventListener("click", function (e) {
    editListItem(e);
  });
  return divText;
}

function createDeleteButon(div, key) {
  let deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm mx-2 my-2";
  deleteButton.appendChild(document.createTextNode("X"));
  div.appendChild(deleteButton);
  deleteButton.addEventListener("click", function () {
    deleteListItem(div, key);
  });
}

function deleteListItem(div, key) {
  debugger;
  div.remove();
  localStorage.removeItem(key);
}

function editListItem(event) {
  let divText = event.target;
  const text = divText.textContent;
  const keyToUpdate = getKeyByValue(localStorage, text);
  divText.contentEditable = true;
  divText.focus();
  divText.addEventListener("blur", saveListItem);
  divText.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      divText.contentEditable = false;
    }
  });
  function saveListItem() {
    divText.contentEditable = false;
    localStorage.setItem(keyToUpdate, divText.textContent);
  }
}

function renderView() {
  if (radioOption[0].checked) {
    document.getElementById("output").style.display = "flex";
  } else if (radioOption[1].checked) {
    document.getElementById("output").style.display = "block";
  }
}

function limitLength(event, value) {
  if (value != undefined && value.toString().length > 20) {
    event.preventDefault();
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

input.addEventListener("keypress", addOnEnter);

window.onload = renderList();
