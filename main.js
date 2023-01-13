'use strict';

const plusBtn = document.querySelector('.btn-plus');
const addBtn = document.querySelector('.btn-add');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.mdi-close-circle-outline');
const books = document.querySelector('.books');
let index = 0;

let myLibrary = [
  {
    title: 'Song of Ice and Fire',
    author: 'George R. R. Martin',
    pages: 550,
    read: 'yes',
  },
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    pages: 450,
    read: 'yes',
  },
  {
    title: 'Foundation',
    author: 'R. Asimov',
    pages: 500,
    read: 'yes',
  },
  {
    title: 'The Lord of The Ring',
    author: 'J.R.R. Tolkien',
    pages: 600,
    read: 'yes',
  },
  {
    title: 'Song of Ice and Fire',
    author: 'George R. R. Martin',
    pages: 550,
    read: 'yes',
  },
];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  setRead = () => {
    this.read != this.read;
  };
}

const createBookCard = (book) => {
  const books = document.querySelector('.books');
  const div = document.createElement('div');
  div.innerHTML += `
  <h2>${book.title}</h2>
  <h3>${book.author}</h3>
  <span>${book.pages} pages</span>
  <button class="btn-read ${book.read === true ? 'green' : ''}">Read ?</button>
  <button class="btn-remove">Remove</button>
  `;
  div.className = 'book';

  div.dataset.index = index;
  index++;

  books.appendChild(div);
  closeModal();
};

const addBookToLibrary = (e) => {
  e.preventDefault();
  const title = document.querySelector('#bookTitle').value;
  const author = document.querySelector('#bookAuthor').value;
  const pages = document.querySelector('#bookPages').value;
  const read = document.querySelector('#bookRead').checked;

  const book = new Book(title, author, pages, read);

  createBookCard(book);
  myLibrary.push(book);
};

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

showBooks();

const readBtn = document.querySelector('.btn-read');

plusBtn.addEventListener('click', openModal);

addBtn.addEventListener('click', addBookToLibrary);

modalClose.addEventListener('click', closeModal);
