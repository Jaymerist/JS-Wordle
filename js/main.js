/*
We're going to build wordle without the keyboard.

1. Add an event listener that listens to the form.
2. Validate if the value to see if it's five characters
3. Create a function called "addguess" which pushes the guess on the guesses array
   Note: this is going to to take our new guess as a parameter.
4. only call the add guess function if the form is valid.
5. Create a showGuessOnPage function which will show the guess on the page.
    a. return early if there are no guesses
    b. create a selector that will select the guess row characters as a nodelist.
    c. using foreach and your knowledge of accessing indexes to add each letter to
       each element.
    d. create a isCharacterInCorrectPlace function to check if the character is in the right
       index of the word.
       - if it is add the 'correct-letter-placement' class to the element.
       - return the function early if it is so that we can check the next character
    e.  create a isCharacterInWord function to check if the character is in the function.
        - add the incorrect-letter-placement class to the element if it is.
        - Note if it's in the correct placement it should have been true in the function
          above.
6. Show the message in the element with the class wordle-success if it's successful.
   Note: you can use includes on an array!
   We're going to create a function that will check this each guess!

*/
let word = "tacos"
let guesses = []
let current
let wordleForm = document.querySelector("#wordle-form")
let wordleSuccessAlert = document.querySelector('.wordle-success')
let guessesContainer = document.querySelector('.guesses-container')
let wordGuessElements = document.querySelectorAll(".guesses")

wordleForm.addEventListener("submit", (event)=> {
    event.preventDefault()
    let newGuessElement = event.target.elements["guess"]
    let newGuess = newGuessElement.value
    if (isTextFiveChars(newGuess)) {
        //valid
        newGuessElement.classList.remove("is-invalid")
    } else {
        //invalid
        newGuessElement.classList.add("is-invalid")
        return
    }
    addGuess(newGuess)
    checkIfCorrect()

    newGuessElement.value = ""

})

guessesContainer.addEventListener("click", (event) => {
    if(!isWordGuessElement(event.target)){
        return
    }
    let clickedWordGuessElement = event.target

    console.log("clicked")
    //select all of the guesses
    let wordGuessElements = document.querySelectorAll(".guesses")
    //check which index we clicked
    
    let wordGuessElementsArray = Array.from(wordGuessElements)
    let indexToRemove = wordGuessElementsArray.indexOf(
        clickedWordGuessElement
    )
    

    //remove that guess
    removeGuess(indexToRemove)
    //this will change our showGuessOnPage slightly

})

const removeGuess = index => {
    console.log('before')
    console.log(guesses)
    console.log(index, 1)
    guesses.splice(index, 1)
    renderGuesses()
}


const renderGuesses = () => {
    //reset the word elements
    resetWordGuessElements()
    //loop through the guesses and show them on the page
    guesses.forEach((guess, index)=> {
        showGuessOnPage(index)
    })
}

const resetWordGuessElements = () => {
    wordGuessElements.forEach((element,index)=>{
        element.innerHTML = `<div class=" guess-character"></div>
        <div class=" guess-character"></div>
        <div class=" guess-character"></div>
        <div class=" guess-character"></div>
        <div class=" guess-character"></div>
        delete`
    })
}

const isWordGuessElement = (element) => {
    // console.log("isWordGuessElement")
    // console.log(element.classList.contains("guesses"))
    return element.classList.contains("guesses")
}

const addGuess = (guess) => {
    // add the guess to the array
    guesses.push(guess)

    console.log(guesses)
    renderGuesses()
}

const showGuessOnPage = (guessIndex) => {

    // if (guesses.length === 0) {
    //     return
    // } 

    // let guessIndex = guesses.length - 1

    let selector = `.guess-${guessIndex} .guess-character`
    let characterDivs = document.querySelectorAll(selector)
    characterDivs.forEach((element, index)=> {
        element.innerText = guesses[guessIndex][index]
        if (isCharacterInCorrectPlace(guesses[guessIndex], index)) {
            element.classList.add("correct-letter-placement")
            return
        }
        if (isCharacterInWord(guesses[guessIndex], index)) {
            element.classList.add("incorrect-letter-placement")
        }


    })
}

const checkIfCorrect = () => {
    if (guesses.includes(word)){
        wordleSuccessAlert.classList.remove("hidden")
    }
}

const isCharacterInCorrectPlace = (guess, index)=> {
     if (word[index].toLowerCase() === guess[index].toLowerCase()) {
         return true
     }
     return false
}

const isCharacterInWord = (guess, index)=> {
    if (word.toLowerCase().includes(guess[index].toLowerCase())) {
        return true
    }
    return false
}

const isTextFiveChars = (guess) => {
    if (guess.length === 5) {
        return true
    }
    return false
}