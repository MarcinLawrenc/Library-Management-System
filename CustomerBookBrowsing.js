// Fetch data from books.json
fetch('books.json')
  .then(response => response.json())
  .then(data => {
    const bookList = document.getElementById('book-list');

    // Iterate over the books data
    data.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book-item');

      const bookThumbnail = document.createElement('img');
      bookThumbnail.classList.add('book-thumbnail');
      bookThumbnail.src = book.bookPhotoUrl || 'bookPhotos/bookphoto.jpg';

      const bookTitle = document.createElement('h2');
      bookTitle.textContent = book.bookTitle;

      const bookAuthor = document.createElement('p');
      bookAuthor.textContent = `${book.authorName} ${book.authorSurname}`;

      bookItem.addEventListener('click', () => {
        showBookDetails(book);
      });

      bookItem.appendChild(bookThumbnail);
      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthor);

      bookList.appendChild(bookItem);
    });
  })
  .catch(error => {
    console.error('Error fetching book data:', error);
  });

const bookDetailsContainer = document.getElementById('book-details-container');
const bookDetails = document.getElementById('book-details');
const closeButton = document.getElementById('close-button');

closeButton.addEventListener('click', hideBookDetails);

function showBookDetails(book) {
  bookDetails.innerHTML = `
    <h2>${book.bookTitle}</h2>
    <p>${book.authorName} ${book.authorSurname}</p>
    <p>${book.bookDescriptionLong}</p>
  `;

  bookDetailsContainer.style.display = 'block';
}

function hideBookDetails() {
  bookDetails.innerHTML = '';
  bookDetailsContainer.style.display = 'none';
}