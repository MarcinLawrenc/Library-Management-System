// Sample book data (you can replace it with your own data or fetch from an API)
const books = [
    {
      title: 'Book 1',
      author: 'Author 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      title: 'Book 2',
      author: 'Author 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      title: 'Book 3',
      author: 'Author 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    // Add more books here...
  ];
  
  // Function to generate HTML for book items
  function createBookItem(book) {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
  
    const title = document.createElement('h2');
    title.classList.add('book-title');
    title.textContent = book.title;
  
    const author = document.createElement('p');
    author.classList.add('book-author');
    author.textContent = 'By ' + book.author;
  
    const description = document.createElement('p');
    description.classList.add('book-description');
    description.textContent = book.description;
  
    bookItem.appendChild(title);
    bookItem.appendChild(author);
    bookItem.appendChild(description);
  
    return bookItem;
  }
  
  // Function to render book items on the page
  function renderBookList() {
    const bookList = document.getElementById('book-list');
  
    books.forEach((book) => {
      const bookItem = createBookItem(book);
      bookList.appendChild(bookItem);
    });
  }
  
  // Call the function to render the book list
  renderBookList();