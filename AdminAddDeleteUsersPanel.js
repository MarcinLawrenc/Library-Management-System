// Function to retrieve the user list from local storage or JSON file
function getUsers() {
  let users = localStorage.getItem("users");
  if (users) {
    return Promise.resolve(JSON.parse(users));
  } else {
    // Make an AJAX request to load users from a JSON file
    return fetch("users.json")
      .then(response => response.json())
      .then(data => {
        saveUsersToStorage(data); // Save the loaded users to local storage
        return data;
      })
      .catch(error => {
        console.error("Error loading users:", error);
        return [];
      });
  }
}

// Function to save the user list to local storage
function saveUsersToStorage(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Function to display the user list
function displayUsers() {
  getUsers().then(users => {
    let userList = document.getElementById("users");
    userList.innerHTML = "";

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let li = document.createElement("li");
      li.innerText = user.name + " " + user.surname;
      userList.appendChild(li);
    }
  });
}

// Function to login
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Check if user exists
  getUsers().then(users => {
    let loggedInUser = users.find(user => user.email === email && user.password === password);

    if (loggedInUser) {
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("userForm").style.display = "block";
      displayUsers();
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });
}

// Function to save user
function saveUser() {
  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;

  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    name: name,
    surname: surname
  };

  getUsers().then(users => {
    users.push(user);
    saveUsersToStorage(users);
    displayUsers();

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
  });
}

// Function to update user
function updateUser() {
  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  getUsers().then(users => {
    let updatedUser = {
      email: email,
      password: password,
      name: name,
      surname: surname
    };

    // Find and update the user in the list
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        users[i] = updatedUser;
        break;
      }
    }

    saveUsersToStorage(users);
    displayUsers();

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
  });
}

// Function to delete user
function deleteUser() {
  let email = document.getElementById("email").value;

  getUsers().then(users => {
    users = users.filter(user => user.email !== email);

    saveUsersToStorage(users);
    displayUsers();

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
  });
}

// Function to logout
function logout() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("userForm").style.display = "none";

  // Clear input fields
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

// Display login form by default
document.getElementById("loginForm").style.display = "block";