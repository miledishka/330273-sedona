var form = document.querySelector("#review__form");
var closeButtons = document.querySelectorAll(".modal__btn--close");

var formSubmitHandler = function (evt) {
  evt.preventDefault();

  var modalSuccess = document.querySelector(".modal__success");
  var modalError = document.querySelector(".modal__error");

  var name = form.querySelector("input[name=name]");
  var surname = form.querySelector("input[name=surname]");
  var email = form.querySelector("input[name=email]");
  var phone = form.querySelector("input[name=phone]");

  modalSuccess.classList.remove("active");
  modalError.classList.remove("active");

  var fieldsStatus = [];

  [name, email, phone, surname].forEach(function(field) {
    field.classList.remove('form-section--error');

    if (!field.value) {
      field.classList.add('form-section--error');
      fieldsStatus.push(true);
    } else {
      fieldsStatus.push(false);
    }
  });

  var formValid = fieldsStatus.filter(function (el) {
    return el;
  }).length === 0;

  if (formValid) {
    modalSuccess.classList.add('active');
  } else {
    modalError.classList.add('active');
  }
};

var closeModal = function(evt) {
  evt.target.closest(".modal").classList.remove("active");
};

form.addEventListener("submit", formSubmitHandler);
closeButtons.forEach(function(closeButton) {
  closeButton.addEventListener("click", closeModal);
});
