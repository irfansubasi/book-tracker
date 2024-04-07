const form = document.querySelector("form");
const firstMsg = document.querySelector(".add-new");
const firstBookButton = document.querySelector(".plus");
const addNewButton = document.querySelector("#add-new-book");
const submitBtn = document.querySelector("#add-book-btn");
const dialog = document.querySelector("dialog");
const cancelBtn = document.querySelector("#cancel-btn");
const listBooksSection = document.querySelector("#books-list");


// Array to store the books
const myLibrary = [];

// Adding click event listener to the cancel button
cancelBtn.addEventListener("click", () => dialog.close());

// Adding click event listener to the add new book button
addNewButton.addEventListener("click", () => {
    dialog.showModal();
});

// Adding click event listener to the first book button
firstBookButton.addEventListener("click", () => {
    dialog.showModal();
});

// Submit event for the form
form.addEventListener("submit", (event) => {
    // Preventing page from reloading
    event.preventDefault();

    // Hiding the first message element
    firstMsg.classList.add("d-none");

    // Getting the values from the form
    let bookTitle = document.querySelector("#name").value;
    let bookAuthor = document.querySelector("#author").value;
    let bookPage = document.querySelector("#page").value;
    let bookRead = document.querySelector("#read").checked;

    // Closing the dialog
    dialog.close();

    // Getting the book cover and creating URL
    let bookCover = document.querySelector("#cover").files[0];
    let coverUrl = bookCover ? URL.createObjectURL(bookCover) : 'images/placeholder.png';

    // Adding book to the library
    addBookToLibrary(bookTitle, bookAuthor, bookPage, bookRead, coverUrl);

    // Listing the books
    listBooks(myLibrary);

    // Making the books list section visible
    listBooksSection.classList.remove("d-none");
    listBooksSection.classList.add("d-flex");

});

// Book constructor function
function Book(title, author, page, read, coverUrl){

    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.coverUrl = coverUrl;

}

// Function to add book to the library
function addBookToLibrary(title, author, page, read, coverUrl){

    const newBook = new Book(title, author, page, read, coverUrl);
    myLibrary.push(newBook);

}


// Function to list the books
function listBooks(bookList){

    let lastItem = bookList.length - 1;

    let isRead = bookList[lastItem].read;

    let bookDiv = `
        <div class="book-card card col p-3 border border-warning border-5 rounded-5" style="width: 18rem;" id="book-${lastItem}">
            <img src="${bookList[lastItem].coverUrl}" class="card-img-top" id="cover-${lastItem}">
            <div class="card-body text-center pt-4">
                <h1 class="card-title">${bookList[lastItem].title}</h1>
                <h5 class="card-title">by ${bookList[lastItem].author}</h5>
                <h6 class="card-title">${bookList[lastItem].page} pages</h6>
                <h6 class="card-title">
                    <input onclick = "updateBookCardsOpacity(${lastItem})" type="checkbox" class="btn-check" id="book-input-${lastItem}" ${isRead ? 'checked' : ''}>
                    <label class="btn btn-outline-warning" for="book-input-${lastItem}">Finished</label>
                </h6>
            </div>
        </div>
    `;
    addNewButton.insertAdjacentHTML('beforebegin', bookDiv);

    // Update opacity for the book cards
    updateBookCardsOpacity(lastItem);

}

// Function to update the opacity for book cards based on read status
function updateBookCardsOpacity(bookIndex) {
    const card = document.getElementById(`book-${bookIndex}`);
    
    if (card) {
        const readCheckbox = card.querySelector('input[type="checkbox"]');
        const textCheckbox = card.querySelector('label');
        
        if(readCheckbox.checked) {
            card.style.opacity = '1';
            textCheckbox.textContent = `Finished`;
        } else {
            card.style.opacity = '0.5';
            textCheckbox.textContent = `Unfinished`;
        }
    }
}


