
// Get references to various HTML elements by their IDs
var bookName = document.getElementById("bookName");
var submitButton = document.getElementById("submitButton");
var bookLink = document.getElementById("bookSiteLink");
var warning = document.getElementById("warning");
var warninglink = document.getElementById("warninglink");

// Initialize an array to store book data, and declare a variable for displaying messages
var booksArr = displayFromLocalST();
var message;

// Function to retrieve and display book data from local storage
function displayFromLocalST() {
  // Retrieve stored book data from local storage or initialize an empty array if no data is found
  var booksArr = JSON.parse(localStorage.getItem("books")) || [];

  // Log the retrieved data for debugging purposes
  console.log("Books from local storage:", booksArr);

  // Display the retrieved book data in a table
  displayQouteInTable(booksArr);

  // Remove the "d-none" class from an element with the ID "hideTable" to make it visible
  document.getElementById("hideTable").classList.remove("d-none");

  // Return the retrieved or initialized array
  return booksArr;
}

// Function to handle adding new book information
function getbookInfo(bookList) {
  // Check if both book name and book link are provided
  if (bookName.value != "" && bookLink.value != "") {
    // Create a new book object and push it to the booksArr array
    booksArr.push({ book: bookName.value, link: bookLink.value });

    // Store the updated book data in local storage
    localStorage.setItem("books", JSON.stringify(booksArr));

    // Log the book list for debugging
    console.log(bookList);

    // Remove the "d-none" class from an element with the ID "hideTable" to make it visible
    document.getElementById("hideTable").classList.remove("d-none");

    // Display the updated book list in a table
    displayQouteInTable(bookList);
  } else if (bookName.value === "") {
    // If the book name is empty, display a warning message
    message = `<p class ="lead">please enter a valid book name</p>`;
    warning.innerHTML = message;
    if (bookName.value != "") {
      // If the book name is later filled in, hide the warning message
      warning.setAttribute("class", "d-none");
    }
  } else if (bookLink.value === "") {
    // If the book link is empty, display a warning message
    message = `<p class ="lead">please enter a valid book link</p>`;
    warninglink.innerHTML = message;
    if (bookLink.value != "") {
      // If the book link is later filled in, hide the warning message
      warninglink.setAttribute("class", "d-none");
    }
  }
}

// Function to display book data in a table
function displayQouteInTable(bookList) {
  var items = "";

  // Iterate through the bookList array and generate table rows
  for (let i = 0; i < bookList.length; i++) {
    items += ` <tr>
      <td class="fs-3 text-dark-emphasis lead text-center">
        <p>${bookList[i].book}</p>
      </td>
      <td class="fs-4 lead text-center">
        <a href="https://${bookList[i].link}" class="btn btn-outline-success" target="_blank">Visit</a>
        <button class="btn btn-outline-danger" onclick="deleteBook(${i})">Delete</button>
        <button class="btn btn-outline-info" onclick="update(${i})">Update</button>
      </td>
    </tr>`;
  }

  // Clear the input fields
  clearInputs();

  // Set the generated table rows as HTML content of an element with the ID "displayTable"
  document.getElementById("displayTable").innerHTML = items;

  // Return the bookList array
  return bookList;
}

// Function to delete a book entry
function deleteBook(indexOfBook) {
  // Remove the book at the specified index from the booksArr array
  booksArr.splice(indexOfBook, 1);

  // Update the local storage with the modified book data
  localStorage.setItem("books", JSON.stringify(booksArr));

  // Refresh the displayed book table
  displayQouteInTable(booksArr);
}

// Function to update book information
function update(indexOfBook) {
  // Retrieve the book at the specified index in the booksArr array
  var listOfBook = booksArr[indexOfBook];

  // Set the input fields with the book's name and link
  bookName.value = listOfBook.book;
  bookLink.value = listOfBook.link;

  // Configure the submit button to call the saveUpdate function with the index for updating the book
  submitButton.setAttribute("onclick", `saveUpdate(${indexOfBook})`);
  submitButton.setAttribute("class", "btn shadow btn-success");
  submitButton.innerHTML = "Save";
}

// Function to save updated book information
function saveUpdate(indexOfBook) {
  // Retrieve the book at the specified index in the booksArr array
  var listOfBook = booksArr[indexOfBook];

  // Update the book's name and link based on the input field values
  listOfBook.book = bookName.value;
  listOfBook.link = bookLink.value;

  // Update the local storage with the modified book data
  localStorage.setItem("books", JSON.stringify(booksArr));

  // Refresh the displayed book table
  displayQouteInTable(booksArr);

  // Configure the submit button to call the getbookInfo function for adding new books
  submitButton.setAttribute("onclick", "getbookInfo(booksArr)");
  submitButton.setAttribute("class", "btn shadow btn-primary");
  submitButton.innerHTML = "Submit";
}

// Function to clear input fields
function clearInputs() {
  bookName.value = "";
  bookLink.value = "";
}

