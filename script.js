// Login Form
const loginForm = document.getElementById("loginForm");
const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");

// User Form
const userForm = document.getElementById("userForm");
const userEmailInput = document.getElementById("userEmail");
const userPasswordInput = document.getElementById("userPassword");
const userNameInput = document.getElementById("userName");
const userSurnameInput = document.getElementById("userSurname");
const userTypeInput = document.getElementById("userType");

// User Table
const userTable = document.getElementById("userTable");
const userTableBody = userTable.querySelector("tbody");

// Edit Form
const editFormContainer = document.getElementById("editFormContainer");
const editEmailInput = document.getElementById("editEmail");
const editPasswordInput = document.getElementById("editPassword");
const editNameInput = document.getElementById("editName");
const editSurnameInput = document.getElementById("editSurname");
const editUserTypeInput = document.getElementById("editUserType");

// Message
const messageDiv = document.getElementById("message");

// Display login form initially
loginForm.style.display = "block";
userForm.style.display = "none";
userTable.style.display = "none";
editFormContainer.style.display = "none";
messageDiv.style.display = "none";

// Event listener for login form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value.trim();

  // Check if the user is admin (dummy check, should be replaced with actual authentication logic)
  if (email === "admin@example.com" && password === "admin123") {
    displayUserManagement();
  } else {
    displayMessage("error", "Invalid credentials. Please try again.");
  }
});

// Event listener for add user form submission
userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = userEmailInput.value.trim();
  const password = userPasswordInput.value.trim();
  const name = userNameInput.value.trim();
  const surname = userSurnameInput.value.trim();
  const userType = userTypeInput.value;

  if (email && password && name && surname && userType) {
    const newUser = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      userType: userType,
    };

    addUser(newUser);
    displayUsers();
    displayMessage("success", "User added successfully!");

    // Reset the form inputs
    userForm.reset();
  } else {
    displayMessage("error", "Please fill in all the fields.");
  }
});

// Event listener for edit form submission
editFormContainer.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = editEmailInput.value.trim();
  const password = editPasswordInput.value.trim();
  const name = editNameInput.value.trim();
  const surname = editSurnameInput.value.trim();
  const userType = editUserTypeInput.value;

  if (email && password && name && surname && userType) {
    const updatedUser = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      userType: userType,
    };

    updateUser(updatedUser);
    displayUsers();
    displayMessage("success", "User updated successfully!");

    // Hide the edit form
    hideEditForm();
  } else {
    displayMessage("error", "Please fill in all the fields.");
  }
});

// Event listener for cancel button in add user and edit user forms
const cancelButtons = document.querySelectorAll(".cancel-btn");
cancelButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    hideEditForm();
  });
});

// Display the user management section
function displayUserManagement() {
  loginForm.style.display = "none";
  userForm.style.display = "block";
  userTable.style.display = "block";
  displayUsers();
}

// Display the users in the table
function displayUsers() {
  userTableBody.innerHTML = "";

  const users = getUsersFromLocalStorage();
  users.forEach(function (user) {
    const row = document.createElement("tr");

    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    const passwordCell = document.createElement("td");
    passwordCell.textContent = user.password;
    row.appendChild(passwordCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = user.name;
    row.appendChild(nameCell);

    const surnameCell = document.createElement("td");
    surnameCell.textContent = user.surname;
    row.appendChild(surnameCell);

    const userTypeCell = document.createElement("td");
    userTypeCell.textContent = user.userType;
    row.appendChild(userTypeCell);

    const actionsCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", function () {
      showEditForm(user);
    });
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", function () {
      deleteUser(user.email);
      displayUsers();
      displayMessage("success", "User deleted successfully!");
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    userTableBody.appendChild(row);
  });
}

// Show the edit form with pre-filled values
function showEditForm(user) {
  editEmailInput.value = user.email;
  editPasswordInput.value = user.password;
  editNameInput.value = user.name;
  editSurnameInput.value = user.surname;
  editUserTypeInput.value = user.userType;

  editFormContainer.style.display = "block";
}

// Hide the edit form
function hideEditForm() {
  editFormContainer.style.display = "none";
  editEmailInput.value = "";
  editPasswordInput.value = "";
  editNameInput.value = "";
  editSurnameInput.value = "";
  editUserTypeInput.value = "";
}

// Display a message
function displayMessage(type, text) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = "block";

  // Hide the message after 3 seconds
  setTimeout(function () {
    messageDiv.style.display = "none";
  }, 3000);
}

// Local Storage Helper Functions

// Get users from local storage
function getUsersFromLocalStorage() {
  let users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(users);
  } else {
    return [];
  }
}

// Add user to local storage
function addUser(user) {
  let users = getUsersFromLocalStorage();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

// Update user in local storage
function updateUser(updatedUser) {
  let users = getUsersFromLocalStorage();
  let updatedUsers = users.map(function (user) {
    if (user.email === updatedUser.email) {
      return updatedUser;
    } else {
      return user;
    }
  });
  localStorage.setItem("users", JSON.stringify(updatedUsers));
}

// Delete user from local storage
function deleteUser(email) {
  let users = getUsersFromLocalStorage();
  let updatedUsers = users.filter(function (user) {
    return user.email !== email;
  });
  localStorage.setItem("users", JSON.stringify(updatedUsers));
}

// Call the displayUsers function to initially load and display the users from local storage
window.addEventListener("DOMContentLoaded", function () {
  fetch("users.json")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("users", JSON.stringify(data));
      displayUsers();
    })
    .catch((error) => {
      console.error("Error fetching user data from users.json:", error);
    });
});
