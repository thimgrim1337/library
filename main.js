'use strict';

const plusBtn = document.querySelector('.btn-plus');
const addBtn = document.querySelector('.btn-add');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.mdi-close-circle-outline');
const books = document.querySelector('.books');

/* let myLibrary = [
  {
    title: 'Song of Ice and Fire',
    author: 'George R. R. Martin',
    pages: 550,
    read: false,
  },
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    pages: 450,
    read: false,
  },
  {
    title: 'Foundation',
    author: 'R. Asimov',
    pages: 500,
    read: false,
  },
  {
    title: 'The Lord of The Ring',
    author: 'J.R.R. Tolkien',
    pages: 600,
    read: false,
  },
  {
    title: 'Song of Ice and Fire',
    author: 'George R. R. Martin',
    pages: 550,
    read: false,
  },
]; */

class Book {
  constructor(
    title = 'Unknown',
    author = 'Unknown',
    pages = 0,
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.library = [];
  }
  addBook = (e) => {
    e.preventDefault();
    const title = document.querySelector('#bookTitle').value;
    const author = document.querySelector('#bookAuthor').value;
    const pages = document.querySelector('#bookPages').value;
    const isRead = document.querySelector('#bookRead').checked;

    const book = new Book(title, author, pages, isRead);
    this.library.push(book);
    UI.createBookCard(this.library, book);
  };
}
let myLibrary = new Library();

/* const addBookToLibrary = (e) => {
  e.preventDefault();
  const title = document.querySelector('#bookTitle').value;
  const author = document.querySelector('#bookAuthor').value;
  const pages = document.querySelector('#bookPages').value;
  const read = document.querySelector('#bookRead').checked;

  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
  createBookCard(book);
}; */

class UI {
  static createBookCard = (library, book) => {
    const books = document.querySelector('.books');
    const div = document.createElement('div');
    const index = library.indexOf(book);
    div.innerHTML += `
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <span>${book.pages} pages</span>
    <button data-index=${index} class="btn-read ${
      book.read === true ? 'green' : ''
    }">Read ?</button>
    <button data-index=${index}
    class="btn-remove">Remove</button>
    `;
    div.className = 'book';
    div.dataset.index = index;

    books.appendChild(div);
    closeModal();
  };
}

const ui = new UI();

/* const createBookCard = (book) => {
  const books = document.querySelector('.books');
  const div = document.createElement('div');
  const index = myLibrary.indexOf(book);
  div.innerHTML += `
  <h2>${book.title}</h2>
  <h3>${book.author}</h3>
  <span>${book.pages} pages</span>
  <button data-index=${index} class="btn-read ${
    book.read === true ? 'green' : ''
  }">Read ?</button>
  <button data-index=${index}
  class="btn-remove">Remove</button>
  `;
  div.className = 'book';
  div.dataset.index = index;

  books.appendChild(div);
  closeModal();
}; */

const showBooks = () => {
  if (myLibrary.length === 0) return;
  for (const book of myLibrary) {
    createBookCard(book);
  }
};

const openModal = () => {
  modal.style.display = 'block';
};

const closeModal = () => {
  modal.style.display = 'none';
  clearModal();
};

const clearModal = () => {
  document.querySelector('#bookTitle').value = '';
  document.querySelector('#bookAuthor').value = '';
  document.querySelector('#bookPages').value = '';
  document.querySelector('#bookRead').checked = false;
};

const setRead = (e) => {
  e.target.classList.toggle('green');

  myLibrary[e.target.dataset.index].read =
    !myLibrary[e.target.dataset.index].read;
};

const removeBook = (e) => {
  const book = document.querySelector(
    `[data-index="${e.target.dataset.index}"]`
  );
  myLibrary.splice(e.target.dataset.index, 1);
  book.remove();
  updateDataIndex();
};

const updateDataIndex = () => {
  const indexes = document.querySelectorAll('[data-index]');
  let index = 0;
  for (let i = 0; i < indexes.length; i++) {
    indexes[i].dataset.index = index;
    if ((i + 1) % 3 == 0) index++;
  }
  console.log(indexes);
};

// showBooks();

const readBtn = document.getElementsByClassName('btn-read');
[...readBtn].forEach((btn) => btn.addEventListener('click', setRead));

const removeBtn = document.getElementsByClassName('btn-remove');
[...removeBtn].forEach((btn) => btn.addEventListener('click', removeBook));

plusBtn.addEventListener('click', openModal);

addBtn.addEventListener('click', myLibrary.addBook);

modalClose.addEventListener('click', closeModal);
