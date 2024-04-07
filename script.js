const form = document.querySelector("form");
const firstMsg = document.querySelector(".add-new");
const firstBookButton = document.querySelector(".plus");
const addNewButton = document.querySelector("#add-new-book");
const submitBtn = document.querySelector("#add-book-btn");
const dialog = document.querySelector("dialog");
const cancelBtn = document.querySelector("#cancel-btn");
const listBooksSection = document.querySelector("#books-list");



const myLibrary = [];


cancelBtn.addEventListener("click", () => dialog.close());

addNewButton.addEventListener("click", () => {
    dialog.showModal();
});

firstBookButton.addEventListener("click", () => {
    dialog.showModal();
});

form.addEventListener("submit", (event) => {

    firstMsg.classList.add("d-none");

    let bookTitle = document.querySelector("#name").value;
    let bookAuthor = document.querySelector("#author").value;
    let bookPage = document.querySelector("#page").value;
    let bookRead = document.querySelector("#read").checked;


    dialog.close();

    event.preventDefault();

    addBookToLibrary(bookTitle, bookAuthor, bookPage, bookRead);

    listBooks(myLibrary);

    listBooksSection.classList.remove("d-none");
    listBooksSection.classList.add("d-flex");

});

function Book(title, author, page, read){

    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;

}

function addBookToLibrary(title, author, page, read){

    const newBook = new Book(title, author, page, read);
    myLibrary.push(newBook);

}



function listBooks(bookList){

    let lastItem = bookList.length - 1;

    let isRead = bookList[lastItem].read;

    let bookDiv = `
        <div class="book-card card col p-3 border border-warning border-5 rounded-5" style="width: 18rem;" id="book-${lastItem}">
            <img src="images/placeholder.png" class="card-img-top img-fluid" id="cover1">
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
    const newBookDiv = document.createElement('div');
    newBookDiv.innerHTML = bookDiv;

    listBooksSection.insertBefore(newBookDiv, addNewButton);
    updateBookCardsOpacity(lastItem);

}


function updateBookCardsOpacity(bookIndex) {
    const card = document.getElementById(`book-${bookIndex}`);
    
    if (card) {
        const readCheckbox = card.querySelector('input[type="checkbox"]');
        
        if(readCheckbox.checked) {
            card.style.opacity = '1';
        } else {
            card.style.opacity = '0.5';
        }
    }
}


