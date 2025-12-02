const myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 295,
        read: true,
    }
];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

const addBookToLibrary = (title, author, pages, read) => {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    renderLibrary();
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
        <p>${book.read ? "Read" : "Not read"}</p>
        <button class="toggleRead">Toggle Read</button>
        <button class="remove">Remove</button>`;
        container.appendChild(card);
    });

    addCardEvents();
}

const toggleBookStatus = (id) => {
    const book = myLibrary.find(book => book.id === id);
    if(book) {
        book.toggleRead();
        renderLibrary();
    }
}

const removeBook = (id) => {
    const index = myLibrary.find(book => book.id === id);
    if(index !== -1) {
        myLibrary.splice(index, 1);
        renderLibrary();
    }
}

const addCardEvents = () => {
    const removeBtns = document.querySelectorAll(".remove");
    const toggleReadBtns = document.querySelectorAll(".toggleRead");

    toggleReadBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.parentElement.dataset.id;
            toggleBookStatus(id);
        })
    })
    
    removeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.parentElement.dataset.id;
            removeBook(id)
        })
    })
}

const events = {
    newBookBtn: document.querySelector("#new-book"),
    dialog: document.querySelector("dialog"),
    form: document.querySelector("form"),
    submitFormBtn: document.querySelector("#submit"),
    closeDialogBtn: document.querySelector("#close"),
}

events.newBookBtn.addEventListener("click", () => {
    events.dialog.showModal();
});

events.closeDialogBtn.addEventListener("click", () => {
    events.form.reset();
    events.dialog.close();
});

events.submitFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = events.form.elements.title.value;
    const author = events.form.elements.author.value;
    const pages = events.form.elements.pages.value;
    let read = events.form.elements.read.checked ? true : false;

    addBookToLibrary(title, author, pages, read);
    events.form.reset();
    events.dialog.close();
});

renderLibrary();