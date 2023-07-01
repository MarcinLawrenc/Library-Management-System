// Fetch JSON data from the file
fetch('books.json')
  .then(response => response.json())
  .then(data => {
    // Access and use the data here
    displayBooks(data);
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Display books on the page
function displayBooks(books) {
  const bookList = document.getElementById('book-list');

  books.forEach(book => {
    const bookItem = createBookItem(book);
    bookList.appendChild(bookItem);
  });
}

// Create book item
function createBookItem(book) {
  const bookItem = document.createElement('div');
  bookItem.classList.add('book-item');
  bookItem.style.backgroundImage = `url(${book.bookPhotoUrl})`;
  bookItem.addEventListener('click', () => {
    displayBookDetails(book);
  });

  const title = document.createElement('h2');
  title.classList.add('book-title');
  title.textContent = book.bookTitle;

  const author = document.createElement('p');
  author.classList.add('book-author');
  author.textContent = `By ${book.authorName} ${book.authorSurname}`;

  bookItem.appendChild(title);
  bookItem.appendChild(author);

  return bookItem;
}

// Display book details
function displayBookDetails(book) {
  const bookDetails = document.getElementById('book-details');
  bookDetails.innerHTML = ''; // Clear previous details

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.textContent = 'X';
  closeButton.addEventListener('click', () => {
    hideBookDetails(bookDetails);
  });

  const image = document.createElement('img');
  image.classList.add('book-photo-large');
  image.src = book.bookPhotoUrl;
  image.alt = book.bookTitle;

  const title = document.createElement('h2');
  title.classList.add('book-title');
  title.textContent = book.bookTitle;

  const author = document.createElement('p');
  author.classList.add('book-author');
  author.textContent = `By ${book.authorName} ${book.authorSurname}`;

  const description = document.createElement('p');
  description.classList.add('book-description');
  description.textContent = book.bookDescriptionLong;

  bookDetails.appendChild(closeButton);
  bookDetails.appendChild(image);
  bookDetails.appendChild(title);
  bookDetails.appendChild(author);
  bookDetails.appendChild(description);

  // Hide other books
  const bookItems = document.getElementsByClassName('book-item');
  Array.from(bookItems).forEach(item => {
    item.style.display = 'none';
  });

  // Show book details
  bookDetails.style.display = 'block';
}

// Hide book details and show all books
function hideBookDetails() {
  const bookDetails = document.getElementById('book-details');
  bookDetails.style.display = 'none';

  const bookItems = document.getElementsByClassName('book-item');
  Array.from(bookItems).forEach(item => {
    item.style.display = 'inline-block';
  });
}