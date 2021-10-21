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
    bookTable.appendChild(garbage);
    garbage.appendChild(garbageIcon);
    statusCell.appendChild(statusButton)
    bookTable.appendChild(titleCell);
    bookTable.appendChild(authorCell);
    bookTable.appendChild(pagesCell);
    bookTable.appendChild(statusCell);
    garbage.addEventListener('click', () => {
        bookTable.removeChild(newRow);
        bookTable.removeChild(garbage);
        bookTable.removeChild(titleCell);
        bookTable.removeChild(authorCell);
        bookTable.removeChild(pagesCell);
        bookTable.removeChild(statusCell);
        myLibrary = myLibrary.filter(function(item) {
            return item !== book
        })
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
    })
    let edit = document.getElementById('edit')
    let editMode = false;
    edit.addEventListener('click', () => {
        if (editMode == false) {
            garbageIcon.classList.add('fas', 'fa-trash-alt');
            editMode = true;
            edit.classList.toggle('normal');
            edit.classList.add('editmode');
        } else {
            editMode = false;
            garbageIcon.classList.remove('fas', 'fa-trash-alt');
            edit.classList.toggle('normal');
            edit.classList.remove('editmode');
        }
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

// make it so that when u delete it removes from array//