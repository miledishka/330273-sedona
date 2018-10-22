function toggle(id, toggled_class) {
  element = document.getElementById(id);

  if (element.classList) {
    element.classList.toggle(toggled_class);
  } else {
    var classes = element.className.split(" ");
    var i = classes.indexOf(toggled_class);

    if (i >= 0) {
      classes.splice(i, 1);
    } else {
      classes.push(toggled_class);
    }

    element.className = classes.join(" ");
  }
}

function toggleModal(id) {
  toggle(id, "active");
  toggle("modal-overlay", "active");
  modal = document.getElementById(id);
  overlay = document.getElementById("modal-overlay");
  removeError(modal, overlay);
}

function removeError(modal, overlay) {
  if (!modal.classList.contains("active")) {
    modal.classList.remove("modal__error");
  }
}

var overlay = document.getElementById("modal-overlay");
var modal = document.getElementById("modal");
var form = modal.querySelector(".form-section");
var name = form.querySelector("input[name=name]");
var surname = form.querySelector("input[name=surname]");
var email = form.querySelector("input[name=email]");
var phone = form.querySelector("input[name=phone]");



window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27 && modal.classList.contains("active")) {
    toggleModal("modal");
  }
});

form.addEventListener("submit", function (evt) {
  if (!name.value || !email.value || !phone.value) {
    evt.preventDefault();
    modal.classList.remove("modal__error");
    modal.offsetWidth = modal.offsetWidth;
    modal.classList.add("modal__error");
  } else {
    modal.classList.remove("modal__success");
    modal.offsetWidth = modal.offsetWidth;
    modal.classList.add("modal__success");
  }
});
