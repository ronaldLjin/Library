let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

}

let bookTable = document.getElementById('booktable')

displayBook = (book) => {
    let newRow = document.createElement('tr');
    bookTable.appendChild(newRow);
    let garbageIcon = document.createElement('i');
    let garbage = document.createElement('td');
    let titleCell = document.createElement('td');
    let authorCell = document.createElement('td');
    let pagesCell = document.createElement('td');
    let statusCell = document.createElement('td');
    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    let statusButton = document.createElement('button');
    if (book.read == true) {
        statusButton.textContent = "Completed";
        statusButton.classList.add('completed');
    } else {
        statusButton.textContent = "In-progress";
        statusButton.classList.add('inprogress')
    }
    newRow.appendChild(garbage);
    garbage.appendChild(garbageIcon);
    garbageIcon.classList.add('fas', 'fa-trash-alt');
    statusCell.appendChild(statusButton)
    newRow.appendChild(titleCell);
    newRow.appendChild(authorCell);
    newRow.appendChild(pagesCell);
    newRow.appendChild(statusCell);
    bookTable.appendChild(newRow);
    garbage.addEventListener('click', () => {
        bookTable.removeChild(newRow);
        myLibrary = myLibrary.filter(function(item) {
            return item !== book
        })
        load()
    })
    statusButton.addEventListener('click', () => {
        if (book.read == true) {
            statusButton.textContent = "In-progress";
            statusButton.classList.remove('completed');
            statusButton.classList.add('inprogress');
            book.read = false;
        } else {
            statusButton.textContent = "Completed";
            statusButton.classList.remove('inprogress');
            statusButton.classList.add('completed');
            book.read = true;
        }
        load()
    })
}

let message = document.getElementById('message')

newBook = (e) => {
    let testBook = getFormInfo();
    myLibrary.push(testBook);
    if (testBook.title.length == 0 || testBook.author.length == 0) {
        message.textContent = "Please ensure your title and author aren't blank."
    } else if (isNaN(Number(testBook.pages)) || testBook.pages === "" || Number(testBook.pages) % 1 != 0) {
        message.textContent = 'Please input a whole number under "pages."'
    } else {
        displayBook(testBook);
        bookInfo.style.display = "none";
        mask.style.display = "none";
    }
    load()
    e.preventDefault();
}


function getFormInfo() {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('status').checked
    return new Book(title, author, pages, read)
}

let bookInfo = document.getElementById('bookInfo');
bookInfo.addEventListener('submit', newBook);
bookInfo.style.display = "none";
let mask = document.getElementById('mask')
mask.style.display = "none";

let close = document.getElementById("close", () => {
    bookInfo.style.display = "none"
    mask.style.display = "none";
})

let formButton = document.getElementById('addbook');
formButton.addEventListener('click', () => {
    if (bookInfo.style.display === "none") {
        bookInfo.style.display = "block"
        mask.style.display = "block";
    } else {
        bookInfo.style.display = "none"
        mask.style.display = "none";
    }
})
mask.addEventListener('click', () => {
    bookInfo.style.display = "none"
    mask.style.display = "none";
})

function load(e) {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

window.onload = function() {
    if (localStorage.getItem("myLibrary") !== null && localStorage.getItem("myLibrary") !== "[]") {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        if (myLibrary.length > 1) {
            for (let i = 0; i < myLibrary.length; i++) {
                displayBook(myLibrary[i]);
            }
        } else if (myLibrary.length == 1) {
            displayBook(myLibrary[0])
        }
    }
}