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

var generatePassword = function() {

  // Input Verification

  // Selecting Password Length
  var len = prompt("Please type in the desired length of password \n minimum: 8 characters \n maximum: 128 characters");

  // Try again until valid input is confirmed
   while (!(parseInt(len) && (len)>7 && (len)<129)) {
     len = prompt("Please type in the desired length of password \n minimum: 8 characters \n maximum: 128 characters");
   }

  // Selecting types of characters to be included in the Password
  var includedCharList = [];

  while (!(includedCharList === [])) {
   // Unicode: 41-5A 
   var upperCase = confirm('Should the password include UPPERCASE letters?')
   if (upperCase) {
     console.log(hex.hex_to_int('41'));
    for (i=(hex.hex_to_int("41")); i<=(hex.hex_to_int('5A')); i++) {
      console.log(i);
      includedCharList += hex.int_to_hex(i);
    };
   };

   // Unicode: 61-7A
   var lowerCase = confirm('Should the password include LOWERCASE letters?')
   if (lowerCase) {
    for (i=hex.hex_to_int("61"); i<=hex.hex_to_int('7A'); i++) {
      includedCharList += hex.int_to_hex(i);
    };
   };

   // Unicode: 30-39
   var num = confirm('Should the password include NUMBERS?')
   if (num) {
    for (i=hex.hex_to_int("30"); i<=hex.hex_to_int('39'); i++) {
      includedCharList += hex.int_to_hex(i);
    };
   };

   // Unicode: 20-2F, 3A-40, 5B-60, 7B-7E
   var specialChar = confirm('Should the password include SPECIAL CHARACTERS?')
   if (specialChar) {
     for (i=hex.hex_to_int("20"); i<=hex.hex_to_int('2F'); i++) {
       includedCharList += hex.int_to_hex(i);
     };
     for (i=hex.hex_to_int("3A"); i<=hex.hex_to_int('40'); i++) {
      includedCharList += hex.int_to_hex(i);
    };
    for (i=hex.hex_to_int("5B"); i<=hex.hex_to_int('60'); i++) {
      includedCharList += hex.int_to_hex(i);
    };
    for (i=hex.hex_to_int("7B"); i<=hex.hex_to_int('7E'); i++) {
      includedCharList += hex.int_to_hex(i);
    };
   };
  };

  // Generating the password
  var pwd = '';
  var lenLst = includedCharList.length
  console.log(len)
  console.log(lenLst)

  for (i=0; i < len; i++) {
    pwd += includedCharList[Math.floor((Math.random()*lenLst))]
  }

  console.log(pwd)
  console.log(pwd.length)

  // Returning Computed Password
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
