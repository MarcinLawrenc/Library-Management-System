// Fetch data from books.json
fetch('books.json')
  .then(response => response.json())
  .then(data => {
    const bookList = document.getElementById('book-list');

    // Iterate over the books data
    data.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book-item');

      const bookInfo = document.createElement('div');
      bookInfo.classList.add('book-info');

      const bookThumbnail = document.createElement('img');
      bookThumbnail.classList.add('book-thumbnail');
      bookThumbnail.src = book.bookPhotoUrl || 'bookPhotos/bookphoto.jpg';

      const bookTitle = document.createElement('h2');
      bookTitle.textContent = book.bookTitle;

      const bookAuthor = document.createElement('p');
      bookAuthor.textContent = `${book.authorName} ${book.authorSurname}`;

      bookInfo.addEventListener('click', () => {
        showBookDetails(book);
      });

      bookItem.appendChild(bookInfo)

      bookInfo.appendChild(bookThumbnail);
      bookInfo.appendChild(bookTitle);
      bookInfo.appendChild(bookAuthor);

      bookList.appendChild(bookItem);
    });
  })
  .catch(error => {
    console.error('Error fetching book data:', error);
  });

function showBookDetails(book) {
  const bookDetailsContainer = document.createElement('div');
  bookDetailsContainer.id = 'book-details-container';

  const bookDetails = document.createElement('div');
  bookDetails.id = 'book-details';

  const closeButton = document.createElement('button');
  closeButton.id = 'close-button';
  closeButton.textContent = 'Close';

  closeButton.addEventListener('click', () => {
    hideBookDetails(bookDetailsContainer);
  });

  bookDetails.innerHTML = `
    <h2>${book.bookTitle}</h2>
    <p>${book.authorName} ${book.authorSurname}</p>
    <p>${book.bookDescriptionLong}</p>
  `;

  bookDetailsContainer.appendChild(bookDetails);
  bookDetailsContainer.appendChild(closeButton);

  document.body.appendChild(bookDetailsContainer);
}

function hideBookDetails(container) {
  document.body.removeChild(container);
}
