const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", price: 15.99, isBestSeller: true, stock: 50 },
  { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", price: 12.99, isBestSeller: false, stock: 30 },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", price: 10.99, isBestSeller: true, stock: 40 },
  { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", price: 11.99, isBestSeller: false, stock: 20 },
  { id: 5, title: "The Hunger Games", author: "Suzanne Collins", genre: "Science Fiction", price: 14.99, isBestSeller: true, stock: 60 },
  { id: 6, title: "The Notebook", author: "Nicholas Sparks", genre: "Romance", price: 9.99, isBestSeller: true, stock: 70 },
  { id: 7, title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", price: 19.99, isBestSeller: true, stock: 80 },
  { id: 8, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", price: 8.99, isBestSeller: false, stock: 10 },
  { id: 9, title: "The Picture of Dorian Gray", author: "Oscar Wilde", genre: "Fiction", price: 13.99, isBestSeller: false, stock: 25 },
  { id: 10, title: "The Fault in Our Stars", author: "John Green", genre: "Romance", price: 12.99, isBestSeller: true, stock: 45 }
];

const isBestSeller = books.filter((book) => {
  return book.isBestSeller === true
})

const forEachBooks = books.map((book) => book.author)
console.log(forEachBooks)

const s = forEachBooks.map((book) => book.toUpperCase())
console.log(s
  
)

// console.log(isBestSeller)

// Questions:

// 1. Get all books that are best sellers.
// 2. Return an array of book titles in uppercase.
// 3. Write a function that accepts a genre and returns all books under that genre.
// 4. Log each book's title and its author.
// 5. Return all books that are priced less than $15.
// 6. Return a new array, each item should follow the format: "Book: [title] by [author]".
// 7. Write a function that returns all books with a stock less than 30.
// 8. Return all books that are not best sellers.
// 9. Write a function that takes an author name and returns how many books are written by that author.
// 10. Use forEach() to count how many books are Romance novels.

// Can you solve these questions using JavaScript concepts like map(), filter(), forEach(), if/else statements, comparison operators, functions, and negation?
