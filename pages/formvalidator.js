class formValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this.SubmitButttonSelector = config.SubmitButttonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputEls = formElement.querySelectorAll(this._inputSelector);
    this._element = formElement;
    this._submitButton = formElement.querySelector(this.SubmitButttonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.remove(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessage = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _toggleButtonState(inputElement) {
    if (this._hasInvalidInput(this._inputEls)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      return (this._submitButtonSelector.disabled = true);
    }
    this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return Array.from(this._inputEls).every(
      (inputEl) => inputEl.validity.valid
    );
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._enableSubmitButton);
    this._submitButton.disabled = false;
  }

  _disableSubmitButton() {
    this._submitButton.classList.add(this._disableSubmitButton);
    this._submitButton.disabled = true;
  }
  _setEventlisteners() {
    this._inputEls = this._element.querySelectorAll(this._inputSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this._submitButton);
      });
    });
  }

  enableValidation() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventlisteners();
  }

  /*
  FormValidaor needs to know about all forms and all input fields inside them.
  FormValidator knows about all changes inside input fields. To provitde it we need to create event listener for keydown.
  AND! you need to run the same mechanism like on keydown for modal OPEN, otherwise if user does an error, after modal close, error will stay.

  */
}

export default formValidator;
