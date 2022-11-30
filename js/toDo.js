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
  let div = document.createElement("div");
  div.className = "border border-1 rounded min-width me-1 my-2 hovered";
  div.setAttribute("id", "item");
  localStorage.setItem("toDo_" + keys, input.value);
  div.appendChild(document.createTextNode(input.value));
  list.appendChild(div);
  input.value = "";
  keys = Number(keys) + 1;
  localStorage.setItem("counter", Number(keys));
  let deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm mx-2 my-2";
  deleteButton.appendChild(document.createTextNode("X"));
  div.appendChild(deleteButton);
  div.addEventListener("click", editListItem);
  deleteButton.addEventListener("click", deleteListItem);

  function deleteListItem() {
    div.remove();
    localStorage.removeItem(keys);
  }
  function editListItem() {
    const text = div.textContent.replace("X", "");
    console.log(text);
    const keyToUpdate = getKeyByValue(localStorage, text);
    console.log(keyToUpdate);
    div.contentEditable = true;
    div.focus();
    div.addEventListener("blur", saveListItem);
    function saveListItem() {
      div.contentEditable = false;
      localStorage.setItem(keyToUpdate, div.textContent.replace("X", ""));
    }
  }
}

function addOnEnter(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

function renderList() {
  Object.keys(localStorage)
    .sort()
    .forEach(function (key) {
      if (key.split("_")[0] === "toDo") {
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
        div.addEventListener("click", editListItem);
        deleteButton.addEventListener("click", deleteListItem);

        function deleteListItem() {
          div.remove();
          localStorage.removeItem(key);
        }

        function editListItem() {
          const text = div.textContent.replace("X", "");
          console.log(text);
          const keyToUpdate = getKeyByValue(localStorage, text);
          console.log(keyToUpdate);
          div.contentEditable = true;
          div.focus();
          div.addEventListener("blur", saveListItem);
          function saveListItem() {
            div.contentEditable = false;
            localStorage.setItem(keyToUpdate, div.textContent.replace("X", ""));
          }
        }
      }
    });
}

function renderView() {
  if (radioOption[0].checked) {
    document.getElementById("output").style.display = "block";
  } else if (radioOption[1].checked) {
    document.getElementById("output").style.display = "flex";
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

input.addEventListener("keypress", addOnEnter);

window.onload = renderList();
