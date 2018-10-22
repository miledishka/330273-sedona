var form = document.querySelector("#review__form");
var closeButtons = document.querySelectorAll(".modal__btn--close");

//
// window.addEventListener("keydown", function (evt) {
//   if (evt.keyCode === 27 && modal.classList.contains("active")) {
//     toggleModal("modal");
//   }
// });

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

  if (!name.value || !email.value || !phone.value || !surname.value) {
    modalError.classList.add('active');
  } else {
    modalSuccess.classList.add('active');
  }
};
var closeModal = function(evt) {
  evt.target.closest(".modal").classList.remove("active");
};

form.addEventListener("submit", formSubmitHandler);
closeButtons.forEach(function(closeButton) {
  closeButton.addEventListener("click", closeModal);
});
