document.addEventListener("DOMContentLoaded", function() {
  // Check if admin is logged in
  if (localStorage.getItem("loggedIn") === "true") {
    showUserManagement();
    displayUsers();
  } else {
    showLoginForm();
  }

  // Login form submission
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "password") {
      localStorage.setItem("loggedIn", "true");
      showUserManagement();
      displayUsers();
    } else {
      displayMessage("error", "Invalid username or password");
    }
  });

  // Add user form submission
  document.getElementById("userForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const userType = document.getElementById("userType").value;

    const newUser = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      userType: userType
    };

    addUser(newUser);
    displayUsers();
    resetForm();
    displayMessage("success", "User added successfully!");
  });

  // Delete user button click
  document.getElementById("userTable").addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
      const email = e.target.getAttribute("data-email");
      deleteUser(email);
      displayUsers();
      displayMessage("success", "User deleted successfully!");
    }
  });

  // Edit user button click
  document.getElementById("userTable").addEventListener("click", function(e) {
    if (e.target.classList.contains("edit-btn")) {
      const email = e.target.getAttribute("data-email");
      const user = getUser(email);
      if (user) {
        showEditForm(user);
      }
    }
  });

  // Update user form submission
  document.getElementById("userForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const userType = document.getElementById("userType").value;

    const updatedUser = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      userType: userType
    };

    updateUser(email, updatedUser);
    displayUsers();
    resetForm();
    displayMessage("success", "User updated successfully!");
  });

  // Cancel edit button click
  document.getElementById("userForm").addEventListener("click", function(e) {
    if (e.target.classList.contains("cancel-btn")) {
      resetForm();
      displayMessage("", "");
    }
  });

  // Functions
  function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("userForm").style.display = "none";
    document.getElementById("userTable").style.display = "none";
  }

  function showUserManagement() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("userForm").style.display = "block";
    document.getElementById("userTable").style.display = "block";
  }

  function displayUsers() {
    const users = getUsers();
    const tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";

    if (users) {
      users.forEach(function(user) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>${user.name}</td>
          <td>${user.surname}</td>
          <td>${user.userType}</td>
          <td>
            <button class="edit-btn" data-email="${user.email}">Edit</button>
            <button class="delete-btn" data-email="${user.email}">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }
  }

  function displayMessage(className, message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.textContent = message;
    document.body.insertBefore(messageDiv, document.getElementById("userForm"));
    setTimeout(function() {
      messageDiv.remove();
    }, 3000);
  }

  function addUser(user) {
    const users = getUsers() || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  function deleteUser(email) {
    const users = getUsers() || [];
    const updatedUsers = users.filter(function(user) {
      return user.email !== email;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  function getUser(email) {
    const users = getUsers() || [];
    return users.find(function(user) {
      return user.email === email;
    });
  }

  function updateUser(email, updatedUser) {
    const users = getUsers() || [];
    const updatedUsers = users.map(function(user) {
      if (user.email === email) {
        return updatedUser;
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  function getUsers() {
    const usersJSON = localStorage.getItem("users");
    if (usersJSON) {
      return JSON.parse(usersJSON);
    } else {
      // Fetch and parse data from users.json file
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "users.json", false);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          localStorage.setItem("users", xhr.responseText);
        }
      };
      xhr.send();
  
      return JSON.parse(localStorage.getItem("users"));
    }
  }

  function resetForm() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("userType").value = "admin";
    document.getElementById("addUser").style.display = "block";
    document.getElementById("addUser").textContent = "Add User";
    document.getElementById("userForm").removeEventListener("submit", updateUser);
    document.getElementById("userForm").addEventListener("submit", addUser);
  }

  function showEditForm(user) {
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("name").value = user.name;
    document.getElementById("surname").value = user.surname;
    document.getElementById("userType").value = user.userType;
    document.getElementById("addUser").style.display = "none";
    document.getElementById("addUser").textContent = "Update User";
    document.getElementById("userForm").removeEventListener("submit", addUser);
    document.getElementById("userForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const updatedUser = {
        email: email,
        password: document.getElementById("password").value,
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        userType: document.getElementById("userType").value
      };
      updateUser(email, updatedUser);
      displayUsers();
      resetForm();
      displayMessage("success", "User updated successfully!");
    });
  }
});
