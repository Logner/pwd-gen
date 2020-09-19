// Assignment code here

// Hex class for quick unicode manipulation
var hex = {
  mapping: [['0',0],['1',1],['2',2], ['3',3],['4',4],['5',5],
            ['6',6], ['7',7], ['8',8],['9',9],['A',10], 
            ['B',11], ['C', 12], ['D',13], ['E',14], ['F',15]],

  // A simple quotient-remainder method to convert int to hex
  // inputs: any random integer, outputs: the corresponding hexadecimal number
  int_to_hex: function(integer) {
    var quo = Math.floor(integer/16);
    var rem = Math.floor(integer % 16);
    var uni = ""

    // when the quotient is greater than 'F' or 15:
    while (quo >= 16) {
      uni = this.mapping[rem][0] + uni;

      rem = Math.floor(quo % 16);
      quo = Math.floor(quo/16);      
    };

    uni = this.mapping[quo][0] + this.mapping[rem][0] + uni;
    return uni;
  },

  // A simple regression method to convert hex to int
  // inputs: any random hexadecimal Number, outputs: the corresponding integer
  hex_to_int: function(string) {
    var total = 0;
    var counter = 0;
    for (i=string.length-1; i>=0; i--) {
      var num = string[i];

      if (parseInt(num) || num==='0') {
        num =  parseInt(num)*Math.pow(16, counter);
      }
      else {
        for (j=10; j<16; j++) {
          if (this.mapping[j][0] === num) {
            num = this.mapping[j][1]*Math.pow(16, counter);
          }
        }
      }
      total += num;
      counter ++;
    };

    return total;

  }
}

// Function that generates the password
// requirements: hex class
var generatePassword = function() {

  // Input Verification
  // Selecting Password Length
  var pwd_len = prompt("Please type in the desired length of password \n minimum: 8 characters \n maximum: 128 characters");

  // Try again until entered number is between 8 and 128 is confirmed
   while (!(parseInt(len) && (len)>7 && (len)<129)) {
     pwd_len = prompt("Try again: \n\n Please type in the desired length of password \n minimum: 8 characters \n maximum: 128 characters");
   }

  // Selecting types of characters to be included in the Password
  var includedCharList = [];

  // takes Unicode start and end, appends corresponding characters to includedCharList
  function gen_continuous_char_list(start_hex, end_hex) {
    for (var i = (hex.hex_to_int(start_hex)); i <= (hex.hex_to_int(end_hex)); i++) {
      includedCharList.push(String.fromCharCode(i));
    };
  };

  // If no character type has been selected, repeat.
  while (!(includedCharList.length > 0)) {

   // Unicode: 41-5A 
   var upperCase = confirm('Should the password include UPPERCASE letters?');
   if (upperCase) {gen_continuous_char_list('41', '5A')};

   // Unicode: 61-7A
   var lowerCase = confirm('Should the password include LOWERCASE letters?')
   if (lowerCase) {gen_continuous_char_list('61', '7A')};

   // Unicode: 30-39
   var num = confirm('Should the password include NUMBERS?')
   if (num) {gen_continuous_char_list('30', '39')};

   // Unicode: 20-2F, 3A-40, 5B-60, 7B-7E
   var specialChar = confirm('Should the password include SPECIAL CHARACTERS?')
   if (specialChar) {
    gen_continuous_char_list('20', '2F');
    gen_continuous_char_list('3A', '40');
    gen_continuous_char_list('5B', '60');
    gen_continuous_char_list('7B', '7E')
   };
   console.log("These characters have been included in the password: " + includedCharList);
  };

  // empty password container
  var pwd = "";

  // Generating the password
  for (i=0; i < pwd_len; i++) {
    // Selecting a random character from includedCharList to append to the generated password
    pwd += includedCharList[Math.floor((Math.random()*includedCharList.length))]
  }
  // Returning generated password
  return pwd;
};


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
