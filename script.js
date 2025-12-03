const myLibrary = [];

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
    const container = document.querySelector("#library");
    container.innerHTML = "";

    myLibrary.map(book => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = book.id;
        card.innerHTML = `
        <div class="book-title-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>book</title><path d="M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z" /></svg>
        <h3 class="book-title">${book.title}</h3>
        </div>
        <p class="book-author">by ${book.author}</p>
        <p class="book-pages">${book.pages} pages</p>
        <p class="read-status ${book.read ? "read" : "unread"}">${book.read ? "Read" : "Unread"}</p>
        <div class="card-btns">
        <button class="toggleRead ${book.read ? "read" : "unread"}">${book.read ? "Mark as Unread" : "Mark as Read"}</button>
        <button class="remove">Remove</button>
        </div>`;
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
            const id = btn.parentElement.parentElement.dataset.id;
            toggleBookStatus(id);
        })
    })
    
    removeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.parentElement.parentElement.dataset.id;
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

addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 398, false);
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 208, false);
addBookToLibrary("The Alchemist", "Paulo Coelho", 197, false);
