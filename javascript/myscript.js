"use strict";

const options = document.getElementById('my-options');
const randomPass = document.getElementById('random-password-section');
const customPass = document.getElementById('custom-password-section');

const displayRandom = document.getElementById('rp-display');
const displayCustom = document.getElementById('cp-display');

const myRandomPass = document.getElementById('my-new-random-password');
const myCustomPass = document.getElementById('my-new-custom-password');

const randomPasswordButton = document.getElementById('rp-button');
const customPaswordButton = document.getElementById('cp-button');

const form1 = document.getElementById('password-length');
const form2 = document.getElementById('password-composition');

const tenChars = document.getElementById('10c');
const twentyChars = document.getElementById('20c');
const thirtyChars = document.getElementById('30c');
const fortyChars = document.getElementById('40c');

const customChar = document.getElementById('custom-len');
const hiddenInputBlock = document.getElementById('hidden-input-block');
const userCustomNum = document.getElementById('custom-num');

const lowercaseChar = document.getElementById('l-char');
const uppercaseChar = document.getElementById('u-char');
const numberChar = document.getElementById('n-char');
const specialChar = document.getElementById('s-char');


const lowerCharList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const upperCharList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numCharList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const speCharList = ["!", "@", "#", "$", "%", "^", "&", "*"];

function displayOptions(){
    let theValue = options.value;
    if (theValue === 'random-pass'){
        randomPass.style.display = 'block';
        customPass.style.display = 'none';
    } else if (theValue === 'custom-pass'){
        randomPass.style.display = 'none';
        customPass.style.display = 'block';
    }
}
options.addEventListener('click', displayOptions);


//Select a random list among the 4 character lists.
function randomCharType(){
    const charLists = [lowerCharList, upperCharList, numCharList, speCharList];
    const randomCharList = Math.floor(Math.random() * charLists.length);
    return charLists[randomCharList];
}

//Returns a random character from one of the lists when randomCharType is passed as parameter.
function randomChar(charType){
    const myChar = Math.floor(Math.random() * charType.length);
    return charType[myChar];
}

//Generates a random number in range excluding the second second parameter.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

//returns a random password as a string between 8 and 20 characters long.  
function myRandomPassword(){
    let myPassword = "";
    for(let i = 0; i <= getRandomInt(8, (20 + 1)); i++){
        myPassword+=randomChar(randomCharType());
    }
    return myPassword;
}


//Returns the selected lenght of the password as usersLength.
let usersLength 
function lengthValue(){
    let myLength;

    if(tenChars.checked === true || twentyChars.checked === true || thirtyChars.checked === true || fortyChars.checked === true){
        hiddenInputBlock.style.display = 'none';
        userCustomNum.value = 8;
    }

    if (tenChars.checked === true){
        myLength = tenChars.value;
    } else if (twentyChars.checked === true){
        myLength = twentyChars.value;
    } else if (thirtyChars.checked === true){
        myLength = thirtyChars.value;
    } else if (fortyChars.checked === true){
        myLength = fortyChars.value;
    } else if (customChar.checked === true){
        hiddenInputBlock.style.display = 'block';
        myLength = userCustomNum.value;
    } else {
        myLength = getRandomInt(8, (20+1));
    }
    usersLength = myLength;
}
form1.addEventListener('click', lengthValue);

//Store in the ingredients object the type of characters the user would like to use to generate the password.
let ingredients = {};
function addIngretiend(usersChoice){
    let theChoice;
    usersChoice === lowercaseChar ? theChoice = 'lowercase' : 0;
    usersChoice === uppercaseChar ? theChoice = 'uppercase' : 0;
    usersChoice === numberChar ? theChoice = 'number' : 0;
    usersChoice === specialChar ? theChoice = 'special' : 0;

    usersChoice.addEventListener('click', function(){
        if (usersChoice.checked === true){
            ingredients[theChoice] = usersChoice.value;
        } else if (usersChoice.checked === false){
            delete ingredients[theChoice];
        }
    });
}
addIngretiend(lowercaseChar);
addIngretiend(uppercaseChar);
addIngretiend(numberChar);
addIngretiend(specialChar);

//Return a random list among the options the user selected to generate the custom password.
function composition(){
    let uChars = [];
    for (let list in ingredients){
        uChars.push(ingredients[list]);
    }
    let finalUserChars = [];
    for (let char of uChars){
        char === 'lowercase' ? finalUserChars.push(lowerCharList) : 0;
        char === 'uppercase' ? finalUserChars.push(upperCharList) : 0;
        char === 'number' ? finalUserChars.push(numCharList) : 0;
        char === 'special' ? finalUserChars.push(speCharList) : 0;
    }
    const randomUserChar = Math.floor(Math.random() * finalUserChars.length);
    return finalUserChars[randomUserChar];
}

//returns the custom password.
function customPassword(){
    let myPassword = "";
    for(let i = 0; i <= +usersLength; i++){
        myPassword+=randomChar(composition());
    }
    return myPassword;
}

randomPasswordButton.addEventListener('click', function(){
    myRandomPass.textContent = myRandomPassword();
    displayRandom.style.display = 'block';
});
customPaswordButton.addEventListener('click', function(){
    myCustomPass.textContent = customPassword();
    displayCustom.style.display = 'block';
});