
let users = []; // Array to store user data
let currentUser = null; // Track the currently logged-in user

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Find the user with the provided email
  const user = users.find(user => user.email === email);

  if (user && user.password === password && user.userType === "admin") {
    currentUser = user; // Set the current user
    showUserTable();
  } else {
    document.getElementById("loginError").textContent = "Invalid email or password";
  }
}

function showUserTable() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("userForm").style.display = "none";
  document.getElementById("userTable").style.display = "block";

  displayUserTable();
}

function displayUserTable() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = ""; // Clear table

  // Display users in the table
  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.surname}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>${user.userType}</td>
      <td>
        <button onclick="editUser('${user.email}')">Edit</button>
        <button onclick="deleteUser('${user.email}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function saveUser() {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userType = document.getElementById("userType").value;

  // Validate form fields
  if (name && surname && email && password && userType) {
    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      // Update existing user
      existingUser.name = name;
      existingUser.surname = surname;
      existingUser.password = password;
      existingUser.userType = userType;
    } else {
      // Create a new user
      const newUser = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        userType: userType
      };
      users.push(newUser);
    }

    displayUserTable();
    cancelEdit();
  } else {
    alert("Please fill in all fields");
  }
}

function editUser(email) {
  const user = users.find(user => user.email === email);

  if (user) {
    // Fill the form with existing user data
    document.getElementById("name").value = user.name;
    document.getElementById("surname").value = user.surname;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("userType").value = user.userType;

    // Display the user form
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("userTable").style.display = "none";
    document.getElementById("userForm").style.display = "block";
  }
}

function deleteUser(email) {
  // Filter out the user to be deleted
  users = users.filter(user => user.email !== email);

  displayUserTable();
}

function cancelEdit() {
  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("userType").value = "librarian";

  // Hide the user form
  document.getElementById("userForm").style.display = "none";
  document.getElementById("userTable").style.display = "block";
}
