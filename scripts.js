const UIcontroller = (() => {
    const renderScore = (message) => {
        document.querySelector("#score").innerHTML = message;
    }
    const renderLives = (message) => {
        document.querySelector("#lives").innerHTML = message;
    }

    return{
        renderScore,
        renderLives
    }
})();


const gameScreen = (() => {
    // declare an array of elements
    let elementsArray = ["🔴", "🟡", "🟢", "🔵"];
    // create new empty array
    let selectionArray = [];

    // create a randomizer to pick from the elements array
    let randomizedArray = () => {
        if(selectionArray != null){ 
            selectionArray = [];
        }
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

const player = (() => {
    const createPlayer = ((name, playerScore, playerLives) =>{
        return {
            name,
            playerScore,
            playerLives
        };
    });
    return { createPlayer };
})();


const gameMechanics = (() => {
    // declare an empty array of player's choices
    let playerChoices = [];

    // state of the game variable 
    let gameInProgress = false;

    // create the current player
    const currentPlayer = player.createPlayer(document.getElementById("player-name").value, 0, 3);

    // event listener that starts the game
    document.querySelector("#start").addEventListener("click", () => {
        if(gameInProgress) return;
        const dialog = document.getElementById("player-dialog");
   
        const currentPlayerInput = document.getElementById("player-name").value;
        if(currentPlayerInput === ""){
            alert("Please, enter your name!");
            return;
        }
        dialog.close();
        gameScreen.randomizedArray()
        gameScreen.display();
        gameInProgress = true;
    })

    // show initial score and lives
    UIcontroller.renderScore(`Score: <br> ${currentPlayer.playerScore}<br>`);
    UIcontroller.renderLives(`Lives: <br> ${currentPlayer.playerLives}`);
    // variable that stores the possible selections
    let options = document.querySelectorAll('.selection');
    
    // function that evaluates if the player has run out of lives
    const evalLives = () => {
        if(currentPlayer.playerLives === 0){
            document.querySelector("#simon").textContent = "Simon Says: You've Lost!"
            return
        }
    }

    // function that evaluates victory for each round
    let evalVictory = () => {
        if(JSON.stringify(playerChoices)===JSON.stringify(gameScreen.getElements())){
            currentPlayer.playerScore += (gameScreen.getElementsLength()) * 10;
            console.log(currentPlayer.playerScore);
            gameScreen.randomizedArray();
            gameScreen.display();
            playerChoices = [];
            // update the scores and lives
            UIcontroller.renderScore(`Score: <br> ${currentPlayer.playerScore}<br>`);
            UIcontroller.renderLives(`Lives: <br> ${currentPlayer.playerLives}`);  
    
        } else if(playerChoices.length >= gameScreen.getElementsLength() && JSON.stringify(playerChoices)!==JSON.stringify(gameScreen.getElements())) {
            currentPlayer.playerLives -= 1;
            gameScreen.randomizedArray();
            gameScreen.display();
            playerChoices = [];
            console.log(currentPlayer.playerLives);
            // update scores and lives
            UIcontroller.renderScore(`Score: <br> ${currentPlayer.playerScore}<br>`);
            UIcontroller.renderLives(`Lives: <br> ${currentPlayer.playerLives}`);
        }
    }

    // function that stores the player selections inside the array
    let addChoices = (choice) =>{
        if(currentPlayer.playerLives <= 0){
            document.querySelector("#simon").textContent = "Simon Says: You've Lost!"
            return
        }
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


