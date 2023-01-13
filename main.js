const plusBtn = document.querySelector('.btn-plus');
const addBtn = document.querySelector('.btn-add');
const readBtn = document.querySelector('.btn-read');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.mdi-close-circle-outline');

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

createBookCard = (book) => {
  const books = document.querySelector('.books');
  const div = document.createElement('div');
  div.innerHTML += `
  <h2>${book.title}</h2>
  <h3>${book.author}</h3>
  <span>${book.pages}</span>
  <button class="btn-read ${book.read === true ? 'green' : ''}">Read ?</button>
  <button class="btn-remove">Remove</button>
  `;
  div.className = 'book';
  books.appendChild(div);
  closeModal();
};

addBookToLibrary = (e) => {
  e.preventDefault();
  const title = document.querySelector('#bookTitle').value;
  const author = document.querySelector('#bookAuthor').value;
  const pages = document.querySelector('#bookPages').value;
  const read = document.querySelector('#bookRead').checked;
  console.log(title, author, pages, read);

  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
  createBookCard(book);
};

openModal = () => {
  modal.style.display = 'block';
};

closeModal = () => {
  modal.style.display = 'none';
  clearModal();
};

clearModal = () => {
  document.querySelector('#bookTitle').value = '';
  document.querySelector('#bookAuthor').value = '';
  document.querySelector('#bookPages').value = '';
  document.querySelector('#bookRead').checked = false;
};

plusBtn.addEventListener('click', openModal);

addBtn.addEventListener('click', addBookToLibrary);

readBtn.addEventListener('click', () => {
  readBtn.classList.toggle('green');
});

modalClose.addEventListener('click', closeModal);
