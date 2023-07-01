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
    const email = document.getElementById("email").value;
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();
    const user = users.find(function(user) {
      return user.email === email && user.password === password && user.userType === "admin";
    });

    if (user) {
      localStorage.setItem("loggedIn", "true");
      showUserManagement();
      displayUsers();
    } else {
      displayMessage("error", "Invalid email or password");
    }
  });

  // Add user form submission
  document.getElementById("userForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("userPassword").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const userType = document.getElementById("userType").value;

    const user = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      userType: userType
    };

    addUser(user);
    displayUsers();
    resetForm();
    displayMessage("success", "User added successfully!");
  });

  // Edit form submission
  document.getElementById("editForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("editEmail").value;
    const password = document.getElementById("editPassword").value;
    const name = document.getElementById("editName").value;
    const surname = document.getElementById("editSurname").value;
    const userType = document.getElementById("editUserType").value;

    const updatedUser = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      userType: userType
    };

    updateUser(updatedUser);
    displayUsers();
    displayMessage("success", "User updated successfully!");
    hideEditForm();
  });

  // Edit and Delete button clicks
  document.querySelector("#userTable tbody").addEventListener("click", function(e) {
    if (e.target.classList.contains("edit-btn")) {
      const email = e.target.getAttribute("data-email");
      const user = getUser(email);
      if (user) {
        showEditForm(user);
      }
    } else if (e.target.classList.contains("delete-btn")) {
      const email = e.target.getAttribute("data-email");
      deleteUser(email);
      displayUsers();
      displayMessage("success", "User deleted successfully!");
    }
  });

  // Cancel button click
  document.getElementById("userForm").addEventListener("click", function(e) {
    if (e.target.classList.contains("cancel-btn")) {
      resetForm();
    }
  });

  // Show login form
  function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("userForm").style.display = "none";
    document.getElementById("userTable").style.display = "none";
    document.getElementById("editFormContainer").style.display = "none";
    document.getElementById("message").style.display = "none";
  }

  // Show user management form
  function showUserManagement() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("userForm").style.display = "block";
    document.getElementById("userTable").style.display = "block";
    document.getElementById("editFormContainer").style.display = "none";
    document.getElementById("message").style.display = "block";
  }

  // Show edit form
  function showEditForm(user) {
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editPassword").value = user.password;
    document.getElementById("editName").value = user.name;
    document.getElementById("editSurname").value = user.surname;
    document.getElementById("editUserType").value = user.userType;
    document.getElementById("editFormContainer").style.display = "block";
  }

  // Hide edit form
  function hideEditForm() {
    document.getElementById("editFormContainer").style.display = "none";
  }

  function displayUsers() {
    const users = getUsers();
    const tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";

    if (users && users.length > 0) {
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

  function displayMessage(type, message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = type;
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

  function addUser(user) {
    let users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  function getUser(email) {
    const users = getUsers();
    return users.find(function(user) {
      return user.email === email;
    });
  }

  function updateUser(updatedUser) {
    let users = getUsers();
    users = users.map(function(user) {
      if (user.email === updatedUser.email) {
        return updatedUser;
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  function deleteUser(email) {
    let users = getUsers();
    users = users.filter(function(user) {
      return user.email !== email;
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  function resetForm() {
    document.getElementById("email").value = "";
    document.getElementById("userPassword").value = "";
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("userType").selectedIndex = 0;
  }

  // Fetch user data from users.json file
  fetch("users.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      localStorage.setItem("users", JSON.stringify(data));
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
    });
});
