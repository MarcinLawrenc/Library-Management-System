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