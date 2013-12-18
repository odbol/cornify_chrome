// Saves options to localStorage.
function save_options_input() {
  var select = document.getElementById("color");
  var color = select.children[select.selectedIndex].value;
  localStorage["favorite_color"] = color;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options_input() {
  var favorite = localStorage["favorite_color"];
  if (!favorite) {
    return;
  }
  var select = document.getElementById("color");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }
}

function saveText() {

  $('input').each(function (i, el) {
    var key = this.id,
        value = this.value;

    if (!value || value.trim() === "") {
      localStorage.removeItem(key);
    }
    else {
      localStorage[key] = value;
    }
  });
}

function restoreText() {
  $('input').each(function (i, el) {
    var key = el.id,
        value = localStorage[key];

    if (value) {
      this.value = value;
    }
  });
}

function save_options() {
  save_options_input();

  saveText();
}

function restore_options() {
  restore_options_input();

  restoreText();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);