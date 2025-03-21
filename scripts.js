const gameScreen = (() => {
    // declare an array of elements
    let elementsArray = ["🔴", "🟡", "🟢", "🔵"];
    // create new empty array
    let selectionArray = [];

    // create a randomizer to pick from the elements array
    let randomizedArray = () => {
        let numberOfChoices = Math.floor(Math.random() * 5) + 3; // ten posible selections, with a minimum of 3
         

        for(let i= 0; i < numberOfChoices; i++){
            let arrayPicker = Math.floor(Math.random() * 4); // four possible selections
            selectionArray.push(elementsArray[arrayPicker]);
        }
        return selectionArray
    }
    
    // function that shows on the screen the selected elements and  
    const display = () => {
        let htmlScreen = document.querySelector("#options-display");
        

        for(i=0; i < selectionArray.length; i++){
            let span = document.createElement("span");
            span.textContent = selectionArray[i];
            htmlScreen.appendChild(span);
            
        }
        setTimeout(()=> {
            htmlScreen.innerHTML = "";
        }, 3000);
       
    }
    

    // function that passes the elements array length
    const getElementsLength = () => selectionArray.length;

    // function that passes the elements array
    const getElements = () => selectionArray;

    return {
        randomizedArray,
        getElementsLength,
        display,
        getElements
    }
})();

const player = ((/*name*/) => {
    let playerScore = 0;
    let playerLives = 3;
    return {
        /*name, */
        playerScore,
        playerLives
    }

})();


const gameMechanics = (() => {
    // declare an empty array of player's choices
    let playerChoices = [];

    // state of the game variable 
    let gameInProgress = false;

    // event listener that starts the game
    document.querySelector("#start").addEventListener("click", () => {
        if(gameInProgress) return;
        
        gameScreen.randomizedArray()
        gameScreen.display();
        gameInProgress = true;
    })
    // variable that stores the possible selections
    let options = document.querySelectorAll('.selection');
    
      // function that evaluates victory for each round
      let evalVictory = () => {
        if(JSON.stringify(playerChoices)===JSON.stringify(gameScreen.getElements())){
            player.playerScore += (gameScreen.getElementsLength()) * 10;
            console.log(player.playerScore);
        }
    }

    // function that stores the player selections inside the array
    let addChoices = (choice) =>{
        if(playerChoices.length >= gameScreen.getElementsLength()) return;
        playerChoices.push(choice);
        console.log(playerChoices);
        evalVictory();
        return playerChoices;
    }
    
    // event listener that calls the previous function
    options.forEach(option => {
        option.addEventListener("click", function(){
            addChoices(option.textContent);
        })
    })

  

    
        
    

})();


