
// Initialize empty arrays for users, books and borrows data
let usersData = [];
let booksData = [];
let borrowsData = [];

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

const borrow = borrowsData.find((borrow) => borrow.borrowID === borrowID);

// Display books in the table
function displayBooksTable() {
  
  const booksTableBody = document.getElementById('booksTableBody');
  booksTableBody.innerHTML = '';

  borrowsData.forEach((borrow) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${borrow.borrowID}</td>
      <td>${borrow.bookID}</td>
      <td>${borrow.bookTitle}</td>
      <td>${borrow.authorName} ${borrow.authorSurname}</td>
      <td>${borrow.UserId}</td>
      <td>${borrow.email}</td>
      <td>${borrow.name}</td>
      <td>${borrow.surname}</td>
      <td>
        <button class="btn-del" onclick="deleteBook('${borrow.borrowID}')">Return</button>
      </td>
    `;
    booksTableBody.appendChild(row);
  });
}


// Add a borrow
function addBorrow(event) {
  event.preventDefault();

  const borrowID = countBorrowsInLocalStorage();
  const bookID = document.getElementById('bookID').value;
  const bookTitle = getBookTitle2(booksData, bookID);
  const email = document.getElementById('userEmail').value;
  const UserId = getUserId(email);
  const name = getUserName(email);
  const surname = getUserSurname(email);
  const authorName = getBookAuthorName(bookID);
  const authorSurname = getBookAuthorSurame(bookID);
  const bookQuantity = "";
  const booksBorrowedQuantity = "";
  const booksReservedQuantity = "";
   
    const newBorrow = {
      borrowID,
      bookID,
      UserId,
      bookTitle,
      email,
      name,
      surname,
      authorName,
      authorSurname,
      bookQuantity,
      booksBorrowedQuantity,
      booksReservedQuantity
    };

    borrowsData.push(newBorrow);
    localStorage.setItem('borrowsData', JSON.stringify(borrowsData));
    displayBooksTable();
    document.getElementById('addBookForm').reset();
    displayMessage('success', 'Book added successfully.');
  
}

function countBorrowsInLocalStorage() {
  const boorrowsCountData = localStorage.getItem('borrowsData');
  if (boorrowsCountData) {
    const parsedData = JSON.parse(boorrowsCountData);
    const count = parsedData.length + 1;
    return count;
  } else {
    return 1; // If 'booksCartData' is not found in local storage, return 0.
  }
  
}

function getBookAuthorSurame(bookID) {
  // Assuming booksData is an array containing book objects
  for (let i = 0; i < booksData.length; i++) {
    if (booksData[i].bookID === bookID) {
      return booksData[i].authorSurname;
    }
  }

  return "Book not found"; // Return a message if the book ID is not found
}


function getBookAuthorName(bookID) {
  // Assuming booksData is an array containing book objects
  for (let i = 0; i < booksData.length; i++) {
    if (booksData[i].bookID === bookID) {
      return booksData[i].authorName;
    }
  }

  return "Book not found"; // Return a message if the book ID is not found
}


function getBookTitle(bookID) {
  // Assuming booksData is an array containing book objects
  for (let i = 0; i < booksData.length; i++) {
    if (booksData[i].bookID === bookID) {
      return booksData[i].bookTitle;
    }
  }

  return "Book not found"; // Return a message if the book ID is not found
}

function getBookTitle2(arrayName, bookIDFromTable) {
  // Assuming booksData is an array containing book objects
  for (let i = 0; i < arrayName.length; i++) {
    if (arrayName[i].bookID === bookIDFromTable) {
      return arrayName[i].bookTitle;
    }
  }

  return "Book not found"; // Return a message if the book ID is not found
}

function getUserId(email) {
  // Assuming booksData is an array containing book objects
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email === email) {
      return usersData[i].UserId;
    }
  }

  return "Book not found"; // Return a message if the book ID is not found
}

function getUserName(email) {
  // Assuming booksData is an array containing book objects
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email === email) {
      return usersData[i].name;
    }
  }

  return "Book not found"; // Return a message if the book ID is not found
}

function getUserSurname(email) {
  // Assuming booksData is an array containing book objects
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email === email) {
      return usersData[i].surname;
    }
  }

  return "Book not found"; // Return a message if the book ID is not found
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
function deleteBook(borrowID) {
  if (confirm('Are you sure you want to return this book?')) {
    borrowsData = borrowsData.filter((borrow) => borrow.borrowID != borrowID);
    localStorage.setItem('borrowsData', JSON.stringify(borrowsData));
    displayBooksTable();
    displayMessage('success', 'Book returned successfully.');
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

// Retrieve borrows data from local storage or fetch from a JSON file
const savedBorrowsData = localStorage.getItem('borrowsData');
if (savedBorrowsData) {
  borrowsData = JSON.parse(savedBorrowsData);
} else {
  fetch('borrows.json')
    .then((response) => response.json())
    .then((data) => {
      borrowsData = data;
      localStorage.setItem('borrowsData', JSON.stringify(borrowsData));
    })
    .catch((error) => console.error('Error fetching book data:', error));
}

// Add event listeners to form submissions
document.getElementById('loginForm').addEventListener('submit', logIn);
document.getElementById('addBookForm').addEventListener('submit', addBorrow);
document.getElementById('editBookForm').addEventListener('submit', submitEditedBook);
