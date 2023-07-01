let usersData = [];

// Function to display a message
function displayMessage(type, message) {
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.innerHTML = `<div class="${type}">${message}</div>`;
  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 3000);
}

// Function to display the user table
function displayUserTable() {
  const tbody = document.querySelector("#userTable tbody");
  tbody.innerHTML = "";

  usersData.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>${user.name}</td>
      <td>${user.surname}</td>
      <td>${user.userType}</td>
      <td class="actions-cell">
        <button onclick="editUser('${user.email}')">Edit</button>
        <button onclick="deleteUser('${user.email}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Function to add a user
function addUser() {
  const emailInput = document.getElementById("userEmail");
  const passwordInput = document.getElementById("userPassword");
  const nameInput = document.getElementById("userName");
  const surnameInput = document.getElementById("userSurname");
  const userTypeInput = document.getElementById("userType");

  const email = emailInput.value;
  const password = passwordInput.value;
  const name = nameInput.value;
  const surname = surnameInput.value;
  const userType = userTypeInput.value;

  // Check if the email already exists
  const existingUser = usersData.find((user) => user.email === email);
  if (existingUser) {
    displayMessage("error", "User with this email already exists.");
    return;
  }

  const newUser = {
    email,
    password,
    name,
    surname,
    userType,
  };

  usersData.push(newUser);

  // Save the updated user data to local storage
  localStorage.setItem("usersData", JSON.stringify(usersData));

  displayMessage("success", "User added successfully!");
  displayUserTable();

  // Clear input fields
  emailInput.value = "";
  passwordInput.value = "";
  nameInput.value = "";
  surnameInput.value = "";
  userTypeInput.value = "";
}

// Function to edit a user
function editUser(email) {
  const editForm = document.getElementById("editForm");
  const editEmailInput = document.getElementById("editEmail");
  const editPasswordInput = document.getElementById("editPassword");
  const editNameInput = document.getElementById("editName");
  const editSurnameInput = document.getElementById("editSurname");
  const editUserTypeInput = document.getElementById("editUserType");

  const user = usersData.find((user) => user.email === email);

  editEmailInput.value = user.email;
  editPasswordInput.value = user.password;
  editNameInput.value = user.name;
  editSurnameInput.value = user.surname;
  editUserTypeInput.value = user.userType;

  document.getElementById("editFormContainer").style.display = "block";

  editForm.onsubmit = function (e) {
    e.preventDefault();

    const updatedUser = {
      email: editEmailInput.value,
      password: editPasswordInput.value,
      name: editNameInput.value,
      surname: editSurnameInput.value,
      userType: editUserTypeInput.value,
    };

    const index = usersData.findIndex((user) => user.email === email);
    usersData[index] = updatedUser;

    // Save the updated user data to local storage
    localStorage.setItem("usersData", JSON.stringify(usersData));

    displayMessage("success", "User updated successfully!");
    displayUserTable();
    closeEditForm();
  };
}

// Function to close the edit form
function closeEditForm() {
  document.getElementById("editFormContainer").style.display = "none";
  document.getElementById("editForm").reset();
}

// Function to delete a user
function deleteUser(email) {
  if (confirm("Are you sure you want to delete this user?")) {
    usersData = usersData.filter((user) => user.email !== email);

    // Save the updated user data to local storage
    localStorage.setItem("usersData", JSON.stringify(usersData));

    displayMessage("success", "User deleted successfully!");
    displayUserTable();
  }
}

// Function to log in
function logIn() {
  const loginEmailInput = document.getElementById("loginEmail");
  const loginPasswordInput = document.getElementById("loginPassword");

  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  const adminUser = usersData.find((user) => user.email === email && user.userType === "admin");

  if (adminUser && adminUser.password === password) {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("userManagementContainer").style.display = "block";
    displayUserTable();
  } else {
    displayMessage("error", "Invalid email or password.");
  }

  loginEmailInput.value = "";
  loginPasswordInput.value = "";
}

// Retrieve user data from local storage or set it to an empty array if it doesn't exist
usersData = JSON.parse(localStorage.getItem("usersData")) || [];

// Check if any users exist in local storage
if (usersData.length > 0) {
  const adminUser = usersData.find((user) => user.userType === "admin");
  if (adminUser) {
    document.getElementById("loginContainer").style.display = "block";
  }
} else {
  // Fetch user data from users.json and save it to local storage
  fetch("users.json")
    .then((response) => response.json())
    .then((data) => {
      usersData = data;
      localStorage.setItem("usersData", JSON.stringify(usersData));
      const adminUser = usersData.find((user) => user.userType === "admin");
      if (adminUser) {
        document.getElementById("loginContainer").style.display = "block";
      }
    })
    .catch((error) => console.log(error));
}

// Handle form submission event for login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  logIn();
});

// Handle form submission event for adding a user
document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  addUser();
});