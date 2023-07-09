
// Initialize empty arrays for users and books data
let usersData = [];
let booksData = [];

// Display a message with a specified type and content
function displayMessage(type, content) {
  const messageContainer = document.getElementById('messageContainer');
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = content;
  messageContainer.appendChild(message);
  setTimeout(() => {
    messageContainer.removeChild(message);
  }, 3000);
}

// Display books in the table
function displayBooksTable() {
 
  const booksTableBody = document.getElementById('booksTableBody');
  booksTableBody.innerHTML = '';

  booksData.forEach((book) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.bookID}</td>
      <td>${book.bookTitle}</td>
      <td>${book.authorName} ${book.authorSurname}</td>
      <td>${book.bookDescription}</td>
      <td>${book.bookDescriptionLong}</td>
      <td>${book.bookQuantity}</td>
      <td>${book.bookGenre}</td>
      <td>
        <button onclick="editBook('${book.bookID}')">Edit</button>
        <button onclick="deleteBook('${book.bookID}')">Delete</button>
      </td>
    `;
    booksTableBody.appendChild(row);
  });
}

// Add a book
function addBook(event) {
  event.preventDefault();

  const bookID = document.getElementById('bookID').value;
  const bookTitle = document.getElementById('bookTitle').value;
  const authorName = document.getElementById('authorName').value;
  const authorSurname = document.getElementById('authorSurname').value;
  const bookDescription = document.getElementById('bookDescription').value;
  const bookDescriptionLong = document.getElementById('bookDescriptionLong').value;
  const bookQuantity = document.getElementById('bookQuantity').value;
  const bookGenre = document.getElementById('bookGenre').value;


   
  if (existingBook) {
    displayMessage('error', 'Book with the same author surname and title already exists.');
  } else {
    const newBook = {
      bookID,
      bookTitle,
      authorName,
      authorSurname,
      bookDescription,
      bookDescriptionLong,
      bookQuantity,
      bookGenre
    };

    booksData.push(newBook);
    localStorage.setItem('booksData', JSON.stringify(booksData));
    displayBooksTable();
    document.getElementById('addBookForm').reset();
    displayMessage('success', 'Book added successfully.');
  }
}

// Edit a book
function editBook(bookID) {
  const book = booksData.find((book) => book.bookID === bookID);
  if (book) {
    document.getElementById('editBookId').value = book.bookID;
    document.getElementById('editBookID').value = book.bookID;
    document.getElementById('editBookTitle').value = book.bookTitle;
    document.getElementById('editAuthorName').value = book.authorName;
    document.getElementById('editAuthorSurname').value = book.authorSurname;
    document.getElementById('editBookDescription').value = book.bookDescription;
    document.getElementById('editBookDescriptionLong').value = book.bookDescriptionLong;
    document.getElementById('editBookQuantity').value = book.bookQuantity;
    document.getElementById('editBookGenre').value = book.bookGenre;
    document.getElementById('editFormContainer').style.display = 'block';
  }
}

// Close the edit form
function closeEditForm() {
  document.getElementById('editFormContainer').style.display = 'none';
  document.getElementById('editBookForm').reset();
}

// Submit the edited book
function submitEditedBook(event) {
  event.preventDefault();

  const bookID = document.getElementById('editBookId').value;
  const bookTitle = document.getElementById('editBookTitle').value;
  const authorSurname = document.getElementById('editAuthorSurname').value;

  const bookIndex = booksData.findIndex((book) => book.bookID === bookID);
  if (bookIndex !== -1) {
    booksData[bookIndex].bookTitle = bookTitle;
    booksData[bookIndex].authorSurname = authorSurname;
    localStorage.setItem('booksData', JSON.stringify(booksData));
    displayBooksTable();
    closeEditForm();
    displayMessage('success', 'Book updated successfully.');
  }
}

// Delete a book
function deleteBook(bookID) {
  if (confirm('Are you sure you want to delete this book?')) {
    booksData = booksData.filter((book) => book.bookID !== bookID);
    localStorage.setItem('booksData', JSON.stringify(
    booksData));
    displayBooksTable();
    displayMessage('success', 'Book deleted successfully.');
  }
}

// Log in
function logIn(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const isAdmin = usersData.some((user) => user.email === email && user.password === password && user.userType === 'admin');
  const isLibrarian = usersData.some((user) => user.email === email && user.password === password && user.userType === 'librarian');

  if (isAdmin || isLibrarian) {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('booksContainer').style.display = 'block';
    displayBooksTable();
  } else {
    displayMessage('error', 'Invalid credentials.');
  }
}

// Retrieve user data from local storage or fetch from a JSON file
const savedUsersData = localStorage.getItem('usersData');
if (savedUsersData) {
  usersData = JSON.parse(savedUsersData);
} else {
  fetch('users.json')
    .then((response) => response.json())
    .then((data) => {
      usersData = data;
      localStorage.setItem('usersData', JSON.stringify(usersData));
    })
    .catch((error) => console.error('Error fetching user data:', error));
}

// Retrieve book data from local storage or fetch from a JSON file
const savedBooksData = localStorage.getItem('booksData');
if (savedBooksData) {
  booksData = JSON.parse(savedBooksData);
} else {
  fetch('books.json')
    .then((response) => response.json())
    .then((data) => {
      booksData = data;
      localStorage.setItem('booksData', JSON.stringify(booksData));
    })
    .catch((error) => console.error('Error fetching book data:', error));
}

// Add event listeners to form submissions
document.getElementById('loginForm').addEventListener('submit', logIn);
document.getElementById('addBookForm').addEventListener('submit', addBook);
document.getElementById('editBookForm').addEventListener('submit', submitEditedBook);
