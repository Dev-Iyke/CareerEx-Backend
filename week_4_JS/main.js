// Question 1
function getStatus(score) {
  if (typeof score !== 'number') {
    console.log('Please enter a valid score as number')
    return
  };
  console.log(score >= 180 ? 'Passed' : 'Failed')
}
getStatus(190)


//Question 2
function getVotingStatus(age) {
  if (typeof age !== 'number') return 'Please enter a valid age as number'
  return age >= 18 ? 'You are eligible to vote' : 'Not  eligible'
}
console.log(getVotingStatus(2))


//Question 3
function getGrade(name, score) {
  console.log(`Hi, ${name}`)
  if (typeof score !== 'number') return 'Please enter a valid score as number';
  return score < 50 ? 'Fail' : score < 75 ? 'Average' : score < 90 ? 'Good' : 'Excellent'
}
console.log(getGrade('David', 115))


//Question 4
function authorize (hasID, isAbove18) {
  if (typeof hasID !== 'boolean' || typeof isAbove18 !== 'boolean') return 'Please enter either a true or false value';
  return (hasID && isAbove18) ? 'Access granted' : 'Access denied'
}
console.log(authorize('false', false))


//Question 5
const scores = [35, 75, 62, 48, 50];
for (i = 0, l = scores.length; i < l; i++){
  if (scores[i] > 50){
    console.log('Pass')
  } else if (scores[i] < 50){
    console.log('Failed')
  } else {
    console.log('Average')
  }
}


//Question 6
const passResponse = (mathsScore, englishScore) => {
  if (typeof mathsScore !== 'number' || typeof englishScore !== 'number') return 'Please enter a valid scores for maths and english as number'
  if(mathsScore >= 50 && englishScore >= 50){
    return 'Yes'
  } else {
    return 'No'
  }
}
console.log(passResponse(50, 40))


//Question 7
const hasEmailAndPhone = (email, phone) => {
  if (email && phone){
    return true
  } else {
    return false
  }
}
console.log(hasEmailAndPhone('great@shop.com'))


//Question 8
const validateUsernameAndPassword = (username, password) => {
  if (!username || !password){
    return 'Invalid input'
  } else {
    return 'Valid input'
  }
}
console.log(validateUsernameAndPassword('great@shop.com', 684))


//Question 9
function getJobType (hours) {
  if (typeof hours !== 'number') return 'Please enter a valid hour as number';
  return hours >= 40 ? 'Full-time' : 'Part-time'
}
console.log(getJobType(53))


//Question 10
const getMax = (x, y) => {
  return x > y ? x : y
}
console.log(getMax(4, 4))