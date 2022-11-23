// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

//declare character arrays

const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const specialCharacters = ['?', '!', '@', '#', '$', '"', '#', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/',
':', ';', '<', '=', '>', '[', ']', '^', '_', '{', '}', '~'];

let lowerCase = false,
upperCase = false,
nums = false,
specialChars = false;


//prompt user for password length and character params
function getParams(){
  //get users requested password length
  let passLen = prompt("How many characters would you like to include your password? *Must be between 8 and 128*");
  //validate user input 
  while(passLen < 8 || passLen > 128 || isNaN(passLen)){
    passLen = prompt("ERROR: " + passLen + " is not accepted input. *Must be between 8 and 128*");
  }

  //prompt to include lower-case letters
  let allowLower = prompt("Would you like to include lower-case letters? (Y/N)");
  while(allowLower.toLowerCase() != 'n' && allowLower.toLowerCase() != 'y'){
    allowLower = prompt('ERROR: ' + allowLower + ' is not accepted input. Would you like lower-case letters? (Y/N)');
  }
  //if validated user response is 'y', change value of lowerCase to true
  lowerCase = (allowLower.toLowerCase() == 'y') ? true : false;

  //prompt user to include upper-case letters
  let allowUpper = prompt("Would you like to include upper-case letters? (Y/N)");
  while(allowUpper.toLowerCase() != 'n' && allowUpper.toLowerCase() != 'y'){
    allowUpper = prompt("ERROR: ${allowUpper} is not accepted input. Would you like upper-case letters? (Y/N)");
  }
  upperCase = (allowUpper.toLowerCase() == 'y') ? true : false;

  //prompt user to include numbers
  let allowNums = prompt("Would you like to include numbers? (Y/N)");
  while(allowNums.toLowerCase() != 'n' && allowNums.toLowerCase() != 'y'){
    allowNums = prompt("ERROR: ${allowNums} is not accepted input. Would you like to include numbers? (Y/N)");
  }
  nums = (allowNums.toLowerCase() == 'y') ? true : false;

  //prompt user to include special characters
  let allowSpecial = prompt("Would you like to include special characters? (Y/N)");
  while(allowSpecial.toLowerCase() != 'n' && allowSpecial.toLowerCase() != 'y'){
    allowSpecial = prompt("ERROR: ${allowSpecial} is not accepted input. Would you like to include special characters? (Y/N)");
  }
  specialChars = (allowSpecial.toLowerCase() == 'y') ? true : false;

  //if no params are selected, inform user & call getParams again
  if(lowerCase == false && upperCase == false && nums == false && specialChars == false){
    alert("ERROR, NO PARAMETERS HAVE BEEN SELECTED");
    getParams();
  }
  return passLen;
}

function generateArr(){
  defaultArr = [];
  if(lowerCase || upperCase){
    defaultArr = defaultArr.concat(chars);
  }if(nums){
    defaultArr = defaultArr.concat(numbers);
  }if(specialChars){
    defaultArr = defaultArr.concat(specialCharacters);
  }
  return defaultArr;
}

function generatePassword(passLength, combinedArr){
  let password = "";
  for(let i = 0; i < passLength; i++){
    let randomNumber = Math.floor(Math.random()*combinedArr.length);
    let currentChar = combinedArr[randomNumber];
    console.log(currentChar);

    if((lowerCase || upperCase) && chars.includes(currentChar)){
      console.log(currentChar);
      if(lowerCase && upperCase){
        let randomUpper = Math.floor(Math.random() * 2) + 1;
        if(randomUpper == 1){
          currentChar = currentChar.toUpperCase();
        }
      }if(upperCase && !lowerCase){
        currentChar = currentChar.toUpperCase();
      }
    }
    password += currentChar;
  }
  return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword(getParams(), generateArr());
  var passwordText = document.querySelector("#generate-password");
  
  console.log(password);
  passwordText.innerHTML = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);