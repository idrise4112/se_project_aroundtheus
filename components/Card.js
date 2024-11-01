export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;

    this._cardSelector = cardSelector;
  }
  _setEventlisteners() {
    // Add event listener for the like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // Add event listener for the delete button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  getView() {
    this._cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt =
      "Description of the image";

    // call this._setEventListeners

    return this._cardElement;
  }
  _setEventlisteners() {}
}
