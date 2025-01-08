export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    // assign isLiked to this object
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._isliked = isLiked;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon({
          id: this._id,
        });
        // and pass it id and isLiked
        this._handleLikeIcon(this);
      });

    // _setEventListeners() {
    //   this._cardElement
    //       .querySelector(".card__like-button")
    //       .addEventListener("click", () => {
    //           this._handleLikeIcon({
    //               id: this._id,
    //               isLiked: this._isliked
    //           });
    //       });
    // }

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleCardDelete({
          id: this._id,
          cardElement: this._cardElement,
        });
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  // _handleDeleteCard() {
  //   this._cardElement.remove();
  //   this._cardElement = null;
  // }

  toggleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);

    this._setEventListeners();

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    // call this._setEventListeners

    return this._cardElement;
  }

  _setEventlisteners() {}
}
