data.forEach((book, index) => {
    const bookItem = document.createElement('div');
    const bookItemId = `book-${index + 1}`; 
    bookItem.id = bookItemId; 
  
    
    bookItem.classList.add('book-item');
  
    const bookThumbnail = document.createElement('img');
    bookThumbnail.classList.add('book-thumbnail');
    bookThumbnail.src = book.bookPhotoUrl || 'bookPhotos/bookphoto.jpg';
  
    const bookTitle = document.createElement('h2');
    bookTitle.textContent = book.bookTitle;
  
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `${book.authorName} ${book.authorSurname}`;
  
    
    bookItem.appendChild(bookThumbnail);
    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
  
    
    const parentContainer = document.getElementById('parentContainerId');
    parentContainer.appendChild(bookItem);
  });