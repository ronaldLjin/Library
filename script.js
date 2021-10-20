let myLibrary = [];

function Book(title,author,pages,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

let bookTable = document.getElementById('booktable')

displayBook = (book) => {
    let newRow = document.createElement('tr');
    bookTable.appendChild(newRow);
    let garbage = document.createElement('i');
    let titleCell = document.createElement('td');
    let authorCell = document.createElement('td');
    let pagesCell = document.createElement('td');
    let statusCell = document.createElement('td');
    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    statusCell.textContent = book.read;
    garbage.classList.add('fas', 'fa-trash-alt')
    bookTable.appendChild(garbage);
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
    })
}

newBook = (e) => {
  let testBook = getFormInfo();
  myLibrary.push(testBook);
  displayBook(testBook);
  e.preventDefault();
}

let bookInfo = document.getElementById('bookInfo');
bookInfo.addEventListener('submit', newBook)


function getFormInfo() {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const pages = document.getElementById('pages').value
  const read = document.getElementById('status').checked
  return new Book(title,author,pages,read)
}
