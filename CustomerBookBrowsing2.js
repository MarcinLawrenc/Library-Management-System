// Initialize empty array for reserved books data
let booksCartData = [];

// Fetch data from books.json
fetch('books.json')
.then(response => response.json())
.then(data => {
  const bookList = document.getElementById('book-list');

    // Iterate over the books data
    data.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book-item');

    // Adding Event Listener to the book item
    bookItem.addEventListener('click', () => {
        addToHistory(book); // adding book to the history
        displayHistory(); // display the history
    });

      const bookInfo = document.createElement('div');
      bookInfo.classList.add('book-info');

      const bookThumbnail = document.createElement('img');
      bookThumbnail.classList.add('book-thumbnail');
      bookThumbnail.src = book.bookPhotoUrl || 'bookPhotos/bookphoto.jpg';

      const bookTitle = document.createElement('h2');
      bookTitle.textContent = book.bookTitle;

      const bookAuthor = document.createElement('p');
      bookAuthor.textContent = `${book.authorName} ${book.authorSurname}`;

      const reserveButton = document.createElement("button");
      reserveButton.innerHTML = "Reserve Book";
      reserveButton.addEventListener('click', () => {
        addBookToCart(book);
      });

      bookInfo.addEventListener('click', () => {
        showBookDetails(book);
      });

      bookItem.appendChild(bookInfo)
      bookItem.appendChild(reserveButton)

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

let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let body = document.querySelector('body');

openShopping.addEventListener('click', ()=>{
  body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
  body.classList.remove('active');
})


function addBookToCart(book) {
  const bookID = book.bookID;
  const isInCart = booksCartData.some((book) => book.bookID === bookID);
  if (isInCart) {
  console.log ('Book with the same author surname and title already exists.');}
  else { booksCartData.push(book);
  localStorage.setItem('booksCartData', JSON.stringify(booksCartData));
  const bookCount = countBooksInLocalStorage();
  console.log('Number of books in local storage:', bookCount);

  const bookCountSpan = document.getElementById('bookCountSpan');
  bookCountSpan.textContent = bookCount.toString();
  reloadCard();}
}

function countBooksInLocalStorage() {
  const booksCartData = localStorage.getItem('booksCartData');
  if (booksCartData) {
    const parsedData = JSON.parse(booksCartData);
    const count = parsedData.length;
    return count;
  } else {
    return 0; // If 'booksCartData' is not found in local storage, return 0.
  }
  
}

// Get the reference to the image element
const cartButton = document.getElementById('CartButton');

// Add event listener to the image element
cartButton.addEventListener('click', function() {
  // Your event handling code goes here
  console.log('CartButton clicked!');
  body.classList.add('active');
});

// Display books in the table
function reloadCard() {
 
  let listCard = document.querySelector('.listCard');
  listCard.innerHTML = '';

  booksCartData.forEach((book) => {
    let newDiv = document.createElement('li');
    newDiv.innerHTML = `
              <div><img src="${book.bookPhotoUrl}"/></div>
              <div>${book.bookTitle}</div>
              <div>${book.authorName} ${book.authorSurname}</div>
              <div>
              <button onclick="deleteBook('${book.bookID}')">Delete</button>
        
              </div>`;
              listCard.appendChild(newDiv);
  });
}

// Delete a book
function deleteBook(bookID) {
  if (confirm('Are you sure you want to delete this book?')) {
    booksCartData = booksCartData.filter((book) => book.bookID !== bookID);
    localStorage.setItem('booksData', JSON.stringify(
    booksCartData));
    reloadCard();
    
  }
}



const historyPanel = document.getElementById('history-panel');
const historyToggle = document.getElementById('history-toggle');

// Add a click event listener to the toggle button
historyToggle.addEventListener('click', function() {
    historyPanel.classList.toggle('active');
});


// Function to add a book to the history
function addToHistory(book) {
    let history = JSON.parse(localStorage.getItem('viewHistory')) || [];

    history.push(book);

    localStorage.setItem('viewHistory', JSON.stringify(history));
}

// Function to display the view history in the history panel
function displayHistory() {

    historyPanel.innerHTML = '';

    let history = JSON.parse(localStorage.getItem('viewHistory')) || [];

    history.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('history-item');

        const bookTitle = document.createElement('h2');
        bookTitle.textContent = book.bookTitle;

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `${book.authorName} ${book.authorSurname}`;

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);

        historyPanel.appendChild(bookDiv);
    });
}