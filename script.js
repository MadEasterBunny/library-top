const container = document.querySelector(".container");
const formContainer = document.querySelector(".form-container");
const submit = document.querySelector("#submit");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`
  }
}

const addBookToLibrary = (title, author, pages, read) => {
    myLibrary.push(new Book(title, author, pages, read));

    myLibrary.map(book => {
        const text = document.createElement("p");
        text.textContent = `${book.title} by ${book.author} has ${book.pages} pages, ${book.read}`;
    
        container.appendChild(text);
    });
}

submit.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.querySelector("form");

    const title = form.elements.title.value;
    const author = form.elements.author.value;
    const pages = form.elements.pages.value;
    let read = "";
    if(form.elements.read.checked) {
        read = "has been read"
    } else {
        read = "has not been read"
    }

    addBookToLibrary(title, author, pages, read);
});
