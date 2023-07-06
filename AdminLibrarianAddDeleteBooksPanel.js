// Function to check if users data is already loaded in local storage
function isUsersDataLoaded() {
  return localStorage.getItem('usersData') !== null;
}

// Function to check if books data is already loaded in local storage
function isBooksDataLoaded() {
  return localStorage.getItem('booksData') !== null;
}

// Load users data from users.json into local storage
function loadUsersData() {
  fetch('users.json')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('usersData', JSON.stringify(data));
      console.log('Users data loaded successfully.');
    })
    .catch(error => {
      console.error('Error loading users data:', error);
    });
}

// Load books data from books.json into local storage
function loadBooksData() {
  fetch('books.json')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('booksData', JSON.stringify(data));
      console.log('Books data loaded successfully.');
    })
    .catch(error => {
      console.error('Error loading books data:', error);
    });
}

// Function to load users and books data into local storage if not already loaded
function loadData() {
  if (!isUsersDataLoaded()) {
    loadUsersData();
  }

  if (!isBooksDataLoaded()) {
    loadBooksData();
  }
}

// Function to perform login authentication
function handleLoginForm(event) {
  event.preventDefault();

  // Get the form values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Retrieve users data from local storage
  const usersData = JSON.parse(localStorage.getItem('usersData'));

  // Find the user with matching email and password
  const user = usersData.find(u => u.email === email && u.password === password);

  if (user) {
    // User found, login successful
    console.log('Login successful:', user);

    // Save the user data in local storage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Redirect to the appropriate page based on user type
    if (user.userType === 'admin') {
      window.location.href = 'admin.html';
    } else if (user.userType === 'librarian') {
      window.location.href = 'librarian.html';
    } else {
      window.location.href = 'reader.html';
    }
  } else {
    // User not found, display error message
    console.error('Login failed. Invalid email or password.');
    document.getElementById('login-error').textContent = 'Invalid email or password.';
  }
}

// Function to display the book table
function displayBookTable() {
  // Retrieve books data from local storage
  const booksData = JSON.parse(localStorage.getItem('booksData'));

  // Get the table body element
  const tableBody = document.getElementById('book-table-body');

  // Clear the table body
  tableBody.innerHTML = '';

  // Iterate over each book and add a row to the table
  booksData.forEach(book => {
    const row = tableBody.insertRow();

    // Add cells to the row
    const bookIdCell = row.insertCell();
    bookIdCell.textContent = book.bookID;

    const bookTitleCell = row.insertCell();
    bookTitleCell.textContent = book.bookTitle;

    const authorNameCell = row.insertCell();
    authorNameCell.textContent = book.authorName;

    const authorSurnameCell = row.insertCell();
    authorSurnameCell.textContent = book.authorSurname;

    const bookQuantityCell = row.insertCell();
    bookQuantityCell.textContent = book.bookQuantity;
  });
}

// Function to add a new book
function addBook(event) {
  event.preventDefault();

  // Retrieve books data from local storage
  const booksData = JSON.parse(localStorage.getItem('booksData'));

  // Get the form values
  const bookId = document.getElementById('book-id').value;
  const bookTitle = document.getElementById('book-title').value;
  const authorName = document.getElementById('author-name').value;
  const authorSurname = document.getElementById('author-surname').value;
  const bookQuantity = document.getElementById('book-quantity').value;

  // Create a new book object
  const newBook = {
    bookID: bookId,
    bookTitle: bookTitle,
    authorName: authorName,
    authorSurname: authorSurname,
    bookQuantity: bookQuantity
  };

  // Add the new book to the books data
  booksData.push(newBook);

  // Update the books data in local storage
  localStorage.setItem('booksData', JSON.stringify(booksData));

  // Clear the form fields
  document.getElementById('book-id').value = '';
  document.getElementById('book-title').value = '';
  document.getElementById('author-name').value = '';
  document.getElementById('author-surname').value = '';
  document.getElementById('book-quantity').value = '';

  // Refresh the book table
  displayBookTable();
}

// Function to delete a book
function deleteBook(bookId) {
  // Retrieve books data from local storage
  const booksData = JSON.parse(localStorage.getItem('booksData'));

  // Find the index of the book with matching bookID
  const bookIndex = booksData.findIndex(book => book.bookID === bookId);

  if (bookIndex !== -1) {
    // Book found, remove it from the books data
    booksData.splice(bookIndex, 1);

    // Update the books data in local storage
    localStorage.setItem('booksData', JSON.stringify(booksData));

    // Refresh the book table
    displayBookTable();
  }
}

// Function to handle the logout action
function handleLogout() {
  // Clear the current user data from local storage
  localStorage.removeItem('currentUser');

  // Redirect to the login page
  window.location.href = 'index.html';
}

// Function to initialize the admin/librarian page
function initAdminLibrarianPage() {
  // Check if the user is logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser || (currentUser.userType !== 'admin' && currentUser.userType !== 'librarian')) {
    // User is not logged in or does not have the required user type, redirect to login page
    window.location.href = 'index.html';
    return;
  }

  // Display the current user's name
  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.textContent = `Welcome, ${currentUser.name} ${currentUser.surname}`;

  // Display the book table
  displayBookTable();

  // Add event listener to the logout button
  const logoutButton = document.getElementById('logout-button');
  logoutButton.addEventListener('click', handleLogout);

  // Add event listener to the add book form
  const addBookForm = document.getElementById('add-book-form');
  addBookForm.addEventListener('submit', addBook);
}

// Function to initialize the login page
function initLoginPage() {
  // Add event listener to the login form
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', handleLoginForm);
}

// Function to initialize the application
function initializeApp() {
  loadData();

  // Get the current page
  const currentPage = window.location.pathname;

  if (currentPage === '/index.html') {
    initLoginPage();
  } else if (currentPage === '/admin.html' || currentPage === '/librarian.html') {
    initAdminLibrarianPage();
  }
}

// Initialize the application
initializeApp();
