const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg ",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Elements                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-new-card-modal");
const addCardFormElement = addNewCardModal.querySelector(".modal__form");
const cardNameInput = document.querySelector(".modal__input_type_title");
const cardLinkInput = document.querySelector(".modal__input_type_url");
const addNewcardCloseButton = addNewCardModal.querySelector(".modal__close");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const previewText = previewImageModal.querySelector(".modal__preview-title");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Functions                                                                                                                                                */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// outside of getCardElement
//   select the preview image modal
//   and its child element

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
    deleteButton.classList.toggle("card__delete-button");
  });

  cardImageEl.addEventListener("click", () => {
    imgEL.src = cardData.link;
    previewText.textContent = cardData.name;
    previewImageModal.classList.add("modal_opened");
  });

  // card image listener
  // in the handler for card image listener
  //    add alt and src to the image
  //    add the text content
  //    open the modal

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Event Handlers                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardData = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  closeModal(addNewCardModal);
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                                                                                                                                                                          */
/*                                                                     Event Listener                                                                                                                                                 */
/*                                                                                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));
addNewcardCloseButton.addEventListener("click", () =>
  closeModal(addNewCardModal)
);

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
