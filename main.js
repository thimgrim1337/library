'use strict';

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

  addBook = (book) => {
    this.library.push(book);
  };

  removeBook = (index) => {
    this.library.splice(index, 1);
  };

  setRead = (index) => {
    this.library[index].isRead = !this.library[index].isRead;
  };
}
const myLibrary = new Library();

class UI {
  static createBook = (e) => {
    e.preventDefault();
    const title = document.querySelector('#bookTitle').value;
    const author = document.querySelector('#bookAuthor').value;
    const pages = document.querySelector('#bookPages').value;
    const isRead = document.querySelector('#bookRead').checked;

    if (!myLibrary.library.some((book) => book.title === title)) {
      const book = new Book(title, author, pages, isRead);
      myLibrary.addBook(book);
      UI.createBookCard(book);
    } else alert('Book is already in library');
  };

  static removeBook = (e) => {
    const book = document.querySelector(
      `[data-index="${e.target.dataset.index}"]`
    );
    myLibrary.removeBook(e.target.dataset.index);
    book.remove();
  };

  static createBookCard = (book) => {
    const books = document.querySelector('.books');
    const div = document.createElement('div');
    const index = myLibrary.library.indexOf(book);
    div.innerHTML += `
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <span>${book.pages} pages</span>
    <button data-index=${index} class="btn-read ${
      book.isRead === true ? 'green' : ''
    }">Read ?</button>
    <button data-index=${index}
    class="btn-remove">Remove</button>
    `;
    div.className = 'book';
    div.dataset.index = index;

    if (myLibrary.library.length === 1)
      books.insertBefore(div, books.firstChild);
    else books.insertBefore(div, document.querySelector('.btn-plus'));

    UI.closeModal();

    UI.removeBtn[index].addEventListener('click', UI.removeBook);
    UI.readBtn[index].addEventListener('click', UI.setRead);
  };

  static setRead = (e) => {
    e.target.classList.toggle('green');
    myLibrary.setRead(e.target.dataset.index);
  };

  static openModal = () => {
    this.modal.style.display = 'block';
  };

  static closeModal = () => {
    this.modal.style.display = 'none';
    UI.clearModal();
  };

  static clearModal = () => {
    document.querySelector('#bookTitle').value = '';
    document.querySelector('#bookAuthor').value = '';
    document.querySelector('#bookPages').value = '';
    document.querySelector('#bookRead').checked = false;
  };
}
UI.modal = document.querySelector('.modal');
UI.plusBtn = document.querySelector('.btn-plus');
UI.addBtn = document.querySelector('.btn-add');
UI.modalClose = document.querySelector('.mdi-close-circle-outline');
UI.readBtn = document.getElementsByClassName('btn-read');
UI.removeBtn = document.getElementsByClassName('btn-remove');

UI.plusBtn.addEventListener('click', UI.openModal);
UI.addBtn.addEventListener('click', UI.createBook);
UI.modalClose.addEventListener('click', UI.closeModal);
