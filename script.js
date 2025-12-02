const dialog = document.querySelector("dialog")
const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const addBookToLibrary = (title, author, pages, read) => {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
    renderLibrary();
    console.log(myLibrary);
}

const renderLibrary = () => {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    myLibrary.map(book => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = book.id;
        card.innerHTML = `
        <h3>Title: ${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>${book.read}</p>`;
        container.appendChild(card);
    });
}

const clearNewBookForm = () => {
    const textNumEl = document.querySelectorAll("input:not([type='checkbox'])");
    const checkboxEl = document.querySelector("#read");

    textNumEl.forEach(el => {
        el.value = "";
    });

    if(checkboxEl.checked) {
        checkboxEl.checked = false
    }
}

document.querySelector("#new-book").addEventListener("click", () => {
    dialog.showModal();
});

document.querySelector("#close").addEventListener("click", () => {
    clearNewBookForm();
    dialog.close();
});

document.querySelector("#submit").addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.querySelector("form");

    const title = form.elements.title.value;
    const author = form.elements.author.value;
    const pages = form.elements.pages.value;
    let read = "";
    if(form.elements.read.checked) {
        read = "Read"
    } else {
        read = "Not read"
    }

    addBookToLibrary(title, author, pages, read);
    clearNewBookForm();
    dialog.close();
});