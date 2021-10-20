let myLibrary = [];

function Book(title,author,pages,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

function addBookToLibrary() {
  
}

newBook = (e) => {
  let testBook = getFormInfo();
  myLibrary.push(testBook);
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
