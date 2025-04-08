// Question 1
const myName = 'Obasi Ikechukwu Thompson'
const age = 24
const nationality = 'Nigerian'
console.log(myName, age, nationality)

// Question 2
const favQuotes = 'Take one day at a time'
const uppercaseFavQuotes = favQuotes.toUpperCase()
console.log(uppercaseFavQuotes)
const lowercaseFavQuotes = favQuotes.toLowerCase()
console.log(lowercaseFavQuotes)

//Question 3
const word = 'Hello'
const reversedWord = word.split('').reverse().join('')
console.log(reversedWord)

//Question 4
const priceOne = 50
const priceTwo = 75
const priceThree = 125

const totalPrice = priceOne + priceTwo + priceThree
const message = `The total cost of your items is: ${totalPrice}. Thanks for patronizing us`
console.log(message)

// Question 5
const scoreOne = 74
const scoreTwo = 82
const scoreThree = 95
const scoreFour = 63
const scoreFive = 71

const average = (scoreOne + scoreTwo + scoreThree + scoreFour + scoreFive) / 5
const scoreMessage = `The average score of the students in Basic 7 is: ${average}.`
console.log(scoreMessage)

//Question 6
const favFoods = ['Fried Rice', 'Meat', 'Beans', 'Vegetable soup', 'Bread']
console.log(favFoods[0])
console.log(favFoods[favFoods.length - 1])

//Question 7
favFoods.unshift('Meat Pie')
favFoods.push('Yam')
console.log(favFoods)

//Question 8
const jssOne = ["Alice", "Brian", "Chloe", "Daniel", "Ella", "Frank", "Grace", "Henry", "Isla", "Jack"];
const jssTwo = ["Karen", "Liam", "Maya", "Noah", "Olivia", "Peter", "Quinn", "Ruby", "Sam", "Tina"];
const jssThree = ["Umar", "Vera", "Will", "Xena", "Yusuf", "Zara", "Aiden", "Bella", "Caleb", "Diana"];

console.log(jssOne)
console.log(jssTwo)
console.log(jssThree)