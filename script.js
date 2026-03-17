// Array
const myLibrary = [];

// Object Constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = read;  
}

/**
 * Prototypes
 */

// read status
Book.prototype.getReadStatus = function(){
    return this.readStatus ? 'read' : 'not read yet'
};

// book info
Book.prototype.info = function() {
    return `${this.title} by ${this.author} has ${this.pages} pages, ${this.getReadStatus()}`;
};

// toggle status
Book.prototype.toggleRead = function() {
    this.readStatus = !this.readStatus; 
};

// Removing books
function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    displayLibrary(); // Refresh
}

/**
 * Displaying in the  Library
 */

function displayLibrary() {
    const container = document.getElementById('library-container');
    if(!container) return; 
    container.innerHTML = ""; 
    
    myLibrary.forEach((book) => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        const statusClass = book.readStatus ? 'read' : 'not-read';
        
        // HTML code injection
        card.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">By: ${book.author}</div>
            <p class ="book-pages">${book.pages} pages</p>
            <button class="status-btn ${statusClass}">${book.getReadStatus()}</button>
            <button class="remove-btn">Eliminar</button>
        `;
        
        // Looping through the array
        
        // remove event
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            deleteBook(book.id);
        });

        // toggle event
        const statusBtn = card.querySelector('.status-btn');
        statusBtn.addEventListener('click', (e) => {
            book.toggleRead();
            // Update only the button not the whole list
            e.target.textContent = book.getReadStatus(); // points to the toggle function
            e.target.classList.toggle('read', book.readStatus);// points to the CSS status class
            e.target.classList.toggle('not-read', !book.readStatus);
        });

        container.appendChild(card);
    });
}

// adding books to the library 
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayLibrary();
}

// Starting displayed books
addBookToLibrary("Cien años de soledad", "Gabriel García Márquez", 471, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 370, false);
addBookToLibrary("The Silmarillion", "J.R.R Tolkien", 480, false);
addBookToLibrary("Sapiens: A Brief History of Humankind", "Yuval Noah Harari ", 512, false);
addBookToLibrary("The Wealth of Nations", "Adam Smith", 690, false);
addBookToLibrary("The Art of War", "Sun Tzu", 160, false);
addBookToLibrary("The Divine Comedy", "Dante Alighieri", 750, false);

/**
 * Form
 */
const bookForm = document.getElementById('add-book-form');

bookForm.addEventListener('submit', (e) => {
    // Avoid page refresh
    e.preventDefault();

    // pull out input values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked; // .checked devuelve true o false

    // callback function
    addBookToLibrary(title, author, pages, read);

    //clean the form
    bookForm.reset();
    e.target.reset();
});

