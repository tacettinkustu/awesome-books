//DOM Manipulations
const form = document.querySelector(".add-book");
const bookTitle = document.querySelector(".title");
const bookAuthor = document.querySelector(".author");
const bookList = document.querySelector(".book-list");

//Classes
//Change to class
class UI {
  constructor() {}
  static addBookToUI(newBook) {
    bookList.innerHTML += `
        <li class='book'>
          <p class='book-title margin-sm'>${newBook.title}</p>
          <p class='book-author margin-sm'>${newBook.author}</p>
          <button class='remove' type='button'>Remove</button>
          <hr />
        </li>
    `;
  }
  static clearInputs(element1, element2) {
    element1.value = "";
    element2.value = "";
  }

  static removeBookFromUI(target) {
    target.parentElement.remove();
  }
}

//Change to class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

//Change to class
class Storage {
  constructor() {
    this.collection = [];
  }
  static addCollection(newBook) {
    this.collection.push(newBook);
    localStorage.setItem("collection", JSON.stringify(this.collection));
  }

  static removeFromCollection(target) {
    const removeBook =
      target.previousElementSibling.previousElementSibling.textContent;

    this.collection.filter((book, index) => {
      if (book.title === removeBook) {
        this.collection.splice(index, 1);
      }
      return this.collection;
    });
    localStorage.setItem("collection", JSON.stringify(this.collection));
  }

  static getBooksFromStorage() {
    if (localStorage.getItem("collection") === null) {
      this.collection = [];
    } else {
      this.collection = JSON.parse(localStorage.getItem("collection"));
    }
    return this.collection;
  }
}

//functions
function addBook(e) {
  const title = bookTitle.value;
  const author = bookAuthor.value;

  const newBook = new Book(title, author);

  Storage.addCollection(newBook);

  UI.addBookToUI(newBook);
  UI.clearInputs(bookTitle, bookAuthor);

  e.preventDefault();
}

function removeBook(e) {
  if (e.target.className === "remove") {
    UI.removeBookFromUI(e.target);
    Storage.removeFromCollection(e.target);
  }
}

//addeventlisteners
form.addEventListener("submit", addBook);
bookList.addEventListener("click", removeBook);
document.addEventListener("DOMContentLoaded", () => {
  const allBooks = Storage.getBooksFromStorage();
  allBooks.forEach((book) => UI.addBookToUI(book));
});
