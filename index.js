

// My logic to display the popup of game rules
const rulesbutton=document.getElementById('Rules-button');
const rulespopup=document.getElementById('rules-popup');
rulesbutton.addEventListener("click",function (){
    rulespopup.classList.add("show");
});

const closeButton=document.getElementById('close-button');
closeButton.addEventListener("click",function (){
    rulespopup.classList.remove("show");
});

window.addEventListener(
    "click",
    function(event){
        if(event.target === rulesbutton){
            rulesbutton.classList.remove("show");
        }
    }
)

// My actual game logic
function displayscores(){
    let your_score= document.getElementById("Your-score");
    let computer_score=document.getElementById("Computer-score");
    let scores1=JSON.parse(localStorage.getItem("Your-score")) || 0;
    let scores2=JSON.parse(localStorage.getItem("Computer-score")) || 0;
    console.log(your_score)
    your_score.innerText=scores1;
    console.log(computer_score)
    computer_score.innerText=scores2;
    

 }

let yourScore = parseInt(localStorage.getItem('yourScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
function triggerWinAnimation() {
    const container = document.querySelector('.container');
    container.classList.add('win-animation');
  
    // Optionally, remove the class after the animation ends
    setTimeout(() => {
      container.classList.remove('win-animation');
    }, 3000); // Adjust based on animation duration
  }
  
  
// Main function to play the game
function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);
    const message = determineMessage(winner, userChoice, computerChoice); // Define message here
    const svgstring1=`<svg width="80" height="59" viewBox="0 0 80 59" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" onclick="displaynextbutton">
            <rect width="80" height="58.5075" fill="url(#pattern0_1486_18)"/>
            <defs>
            <pattern id="pattern0_1486_18" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_1486_18" transform="scale(0.0149254 0.0204082)"/>
            </pattern>
            <image id="image0_1486_18" width="67" height="67" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABDCAYAAADHyrhzAAAAAXNSR0IArs4c6QAABYhJREFUeF7tm1+IFVUcx3+/M7pGQqbXUnHZmXNm09RSah/6oz2YEpUZJZlSVEQR0V+plzACi0B6KMh6iUL6Q6WUD2VYYtlSZBDcHhKrxTvnnLvYaiq6KN5d273zi7m6tm276s75HduVO693vt/f9/eZM3NmzsxFqG+nCGCdxT8ERjoMEYbhvCAICmmaHiwUCruKxWKPrwM4YmHEcdN8oGA9AMzoa54ADghBd5dKttUHkBEJQ8rGuQhjdiDi+P80jdCBGMwqlUpHuIGMSBixir4DwBuGajYleMQY8/Z5D0MptQCBvj9to0RfJcbect7AiKLo2gBxDUA6nwj/BAHbghR+qwI8hQLjMzR65GptJn0CUOUE8r+cJkqF9wDBe4hiTN5mqinNstb+nlc/mO6cwwjD8KoxgfgRAMY5NZLSysTajU4eA8ReYcyePbvheKWyigQuRqIKodiKUF0GIBa7NkEprdXWrnb16a/3BmM5QPCzijYDIPuFLmuAALZpbW4aFTDiWL4ABC9xhu3vRUTHUoLJ1tpurhpeRkYURRcIgfsQYAJX0EF9UDyaJMlbXDXYYIRhOE0IeEwgthCIbgS6kyvkUD5EtL/7+F9zOjo6DnLUYoERx/EVlFa/RsQpHKGG5YHpB0lSvn9YmiF2doaRXSiLMioi4jyOQHk8sJpeXyqXs+naaXOGEUfRChC4wSmFqzil7Ym1i1xtnGEopT5GoJWuQVz1BLhYa/2Ni48zjFjKg4BQcAnBoSWCzdqY2128nGBEUTQ1ELjXJQCXlgCqotI1rbRv34G8nk4w4jhcCCS25y3OriN4IDHm/by+TjCkDB8XKN7MW5xbR0Cva21X5fV1ghFL+QYgPJG3OLeOCDZpY+7K6+sEQ8pog0Bckbc4ty4l2miMzT2zOcFQUm5GhNu4m8rrR0BrtLYv5tW7wYiiTShwWd7i3DoCXKK13pLX1wlGcxStJ4EP5i3OqSOinrEN4wptbW1H8/o6wYilfB4QXs5bnFNHBD9oYxa4eDrBaG5uWkpp8LlLAC4tAa3W2q518XOC0aLUhE5K9wNig0sIDi2KYE6pVPrVxcsJRlY4VuE2jgVelyYopURb2+zikWmdYWTvQBDEh65BXPRE8Jo25lkXDxYYtdcBXZUyIE51DZNXj4IWcryZdx4ZWQNKhc8giFfzNuOiQ6JDjWE0pbW1tdfFh2VkZCbZaniA0AaITa6Bhq/HdxOtWe51WEZG1kCzlA8TAvtnAmeCU03pDmvtZ2fa72x+Z4NRWxhWchcCzDybwhz7EFFl4qTCJcViscLhxwbj5Oi4jxByL64MtyGi9FNtysuHqxtqf1YYtferMtoJiLO4Ap7OhyC9V+vyR1y1WGGcnFnOyX1H9mCWElxqre0csTBq9x3dXX8AwGSukIP5pAStxpiFnDXYR0YWLpbhOkDxJGfQgV4E9JzW9hXOGl5gXK7UlT1Av3AGHeiVUs88Y/aw1vACIwsupUwEgvIEZG+izfQT36zwbd5gKCXfQYCH+KL2d+K76/yXq5+wtTtSb/ccIqWnd1u7jju7t5HRHIbXUSB2cAeu+aFYlCQJ+5s8bzBmhqHsDYT2AUME1Xj37nZ2b28wlFJNCFT2AePiiZPGcz2PnJNrhkcYRxNtLvIBefSNDISOJKlNq+zb6INBaSkx5cvYSXAsCA8VytdpQgA7tTZz6zCyo0f0U8nYa+owAMDH02of2NF3zQD6MtH21vrIyJ7MCL7Qxiytw6gRoC2JtkvqME7AqJ8mp0YCwdbEmJvrI8PTP5C8zyYzGhunVxvG7mE/gkwfzQ+Wy9vU2tLScmHn4UPHuGEQ4Lda6xu5fWvLJD5M+zyVUs7/UhyYD3t7Dyft7UUfub3C8BHYp2cdRj+6fwM6cPxTOeszZwAAAABJRU5ErkJggg=="/>
            </defs>
            </svg>`
            const svgstring2=`<svg width="42" height="57" viewBox="0 0 42 57" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect x="4.91736" width="37" height="53.5029" transform="rotate(5.2734 4.91736 0)" fill="url(#pattern0_1486_20)"/>
<defs>
<pattern id="pattern0_1486_20" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_1486_20" transform="matrix(0.00294059 0 0 0.00203357 -0.286919 0)"/>
</pattern>
<image id="image0_1486_20" width="512" height="512" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`
            const svgstring3=`<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" onclick="displaynextbutton" >
            <rect width="72" height="72" fill="url(#pattern0_1486_19)"/>
            <defs>
            <pattern id="pattern0_1486_19" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_1486_19" transform="scale(0.015625)"/>
            </pattern>
            <image id="image0_1486_19" width="64" height="64" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABOxJREFUeF7tmm3IVFUQx/9z51yj6IUMkbLIXkCiQrGI7FOhfojolSgLQiqIqCSywLIoCOxDZaklBiUI0YsZWn4IKaQ+JBoESYFlURGZEr18ibKePXOmnYdrLNu9z7rn3ru7z7N7Pu7emTPzu3PmnDtzCEM+aMj9xwjAKAKGnMBoCQx5AIySYF+WQJqmF4cQngMwD8CXRLTce7+rH9HYDwCzmPkLACe3OHxYRC4A8F2vIdQN4GxmniMiewEcMueSJFlGROvaHSWip7z3j2a/z3TOzfXe/wBgf51QagPgnFurqsuA8TzjVfXBEMI659xqVV2e49RmEVnCzHcAeBHAsdkzm0TkTgChDhC1AGDmGwFsaTNYmHl+CGFpAYAtIvIIM+8DMK1N9i4ReXkyAdgA4O52g1V1RZIkM4sAANgBYGOOo9tF5NrJBOANAEty1vmzlgaKAKjqHiJanePobhG5bASgBgJ15YChj4DXm9vXLTlLwMKbSi6BFMBZAH4H8GvZoKgrAmoB4JxboKqme3a2LW4UkXsBNGJBTCYAi5n5GwCntjqrqg+FEPIS51ExmTQAiGilqn6Y49UnInLpUXmb89CkAQDgeQBv5fhwQETOGDQARbtAdBIEsAbA5hGA/xMYRcBoCfQhB5yYpul5jUbDDiLftkdlswZQlAOsCoSYg9CgJMHEObdKVR8AcEzm+C4RuQ3A90dA1ASg/0kwSZKVRLQq54i7z3t/EYC/7b8pC4CZDwCYVbDn3ioiFvoTAVibLYH7c3RsVdXdRPRM3ufwIGyD05n5twkOHDtFZNFEAAD8kcmfkKPnHwB/Apg+qACmMfNf9oILIKiInGuV3aIlEHtaU1WrIq8nopf6ehByzn2lqnOKHLH84L1/rGoAHcD17iDknFujqnnr94iNZsxsZn6t2fC4OfaNdynXUwCLVfX9Dga+CWBhM2RndOlI7OO9A2Dlama2w09eEot1oKxcTwHYFrcNwHVlra5Q/icROT1WX9f1AGa2Ls0rsRPWIHew2TQpOpt0nK5rAABOYWbr81lxchBGb5dAdtB5D8CVg+A9EX3tvS/cmjvZGBMBlgeWNiuzmzop78X/qvpZCGF+7FxRAJqfpicx888tX4Sx81ch95GIXBGrKBaARcE7AGppWHbpzAYRuadLmf8eLwPAOj/WpOjrUNX7QgjrY42IBgDg+GwZHBc7eRVySZIsaDQae2J1lQFgy8DK1DfFTl6B3I8icqZV2WJ1lQLgnFukqh/ETl5Wjoie9t6vKKOnFACbOEmSvUQ0t4wRkbLaTMTzxsbGPo+UHxcrDYCZrwewtYwRkbJ2p6j08isNwIxn5ncBXBPpSIxYQ0TOB2Dd4lKjEgAATmPmT9tb16Usm0CYiJ703j9Rhf6qACC7vLCz5X5fFfbl6dghIldVdW+wMgBmqXNuoapuB1DL2YCI9nvv7baYXY+pZFQKwCxK0/SSEMLbzft+0T37As/sIsTVAH6pxPNMSeUAMr0zmPmFCguj27L2m/UNKh11ARg30jl3uao+DiD2a+1gs932sIi8WqnXLcpqBXBknixB3g7gBqsodXLGvvGt7BZCsJqDNWNqGz0B0GI9p2l6oV1qSpLkHFW1Wp4DcJiIDlkHqNle+xiAXZPvyeg1gJ441c0kIwDd0JqKz44iYCq+1W58GvoI+BchC2Jf8sTnigAAAABJRU5ErkJggg=="/>
            </defs>
            </svg>`
        // Update the display buttons with the choices
        document.getElementById("player-choice").textContent = `Your Choice: ${userChoice}`;
         if(userChoice=='rock'){
            
            document.getElementById("player-choice").style.backgroundColor='white';
            document.getElementById("player-choice").style.width='120px';
            document.getElementById("player-choice").style.height='120px';
            document.getElementById("player-choice").style.borderRadius='120px';
            document.getElementById("player-choice").style.border='10px solid #0074B6';
            document.getElementById("player-choice").innerHTML=svgstring1;
            document.getElementById('player-choice').style.position='absolute'

            document.getElementById('player-choice').style.left='330px'
            document.getElementById('player-choice').style.top='530px'
            






         }
         else if(userChoice=='paper'){
            document.getElementById("player-choice").style.backgroundColor='white';
            document.getElementById("player-choice").style.backgroundColor='white';
            document.getElementById("player-choice").style.width='120px';
            document.getElementById("player-choice").style.height='120px';
            document.getElementById("player-choice").style.borderRadius='120px';
            document.getElementById("player-choice").style.border='10px solid #BD00FF';
            document.getElementById("player-choice").innerHTML=svgstring2;
            document.getElementById('player-choice').style.position='absolute'

            document.getElementById('player-choice').style.left='330px'
            document.getElementById('player-choice').style.top='530px'


         }
         else{
            document.getElementById("player-choice").style.backgroundColor='white';
            document.getElementById("player-choice").style.backgroundColor='white';
            document.getElementById("player-choice").style.width='120px';
            document.getElementById("player-choice").style.height='120px';
            document.getElementById("player-choice").style.borderRadius='120px';
            document.getElementById("player-choice").style.border='10px solid #FFA943';
            document.getElementById("player-choice").innerHTML=svgstring3;
            document.getElementById('player-choice').style.position='absolute'

            document.getElementById('player-choice').style.left='330px'
            document.getElementById('player-choice').style.top='530px'




         }
         //computer
         if(computerChoice=='rock'){
            document.getElementById("computer-choice").style.backgroundColor='white';
            document.getElementById("computer-choice").style.width='120px';
            document.getElementById("computer-choice").style.height='120px';
            document.getElementById("computer-choice").style.borderRadius='120px';
            document.getElementById("computer-choice").style.border='10px solid #0074B6';
            document.getElementById("computer-choice").innerHTML=svgstring1;
            document.getElementById('computer-choice').style.position='absolute'

            document.getElementById('computer-choice').style.left='530px'
            document.getElementById('computer-choice').style.top='530px'


         }
         else if(computerChoice=='paper'){
            document.getElementById("computer-choice").style.backgroundColor='white';
            document.getElementById("computer-choice").style.width='120px';
            document.getElementById("computer-choice").style.height='120px';
            document.getElementById("computer-choice").style.borderRadius='120px';
            document.getElementById("computer-choice").style.border='10px solid #BD00FF';
            document.getElementById("computer-choice").innerHTML=svgstring2;
            document.getElementById('computer-choice').style.position='absolute'

            document.getElementById('computer-choice').style.left='530px'
            document.getElementById('computer-choice').style.top='530px'


         }
         else{
            document.getElementById("computer-choice").style.backgroundColor='white';
            document.getElementById("computer-choice").style.width='120px';
            document.getElementById("computer-choice").style.height='120px';
            document.getElementById("computer-choice").style.borderRadius='120px';
            document.getElementById("computer-choice").style.border='10px solid #FFA943';
            document.getElementById("computer-choice").innerHTML=svgstring3;
            document.getElementById('computer-choice').style.position='absolute'

            document.getElementById('computer-choice').style.left='530px'
            document.getElementById('computer-choice').style.top='530px'


         }

        document.getElementById("computer-choice").textContent = `Computer's Choice: ${computerChoice}`;
        document.getElementById('button-border-1').style.display = 'none';
        document.getElementById('button-border-2').style.display = 'none';
        document.getElementById('button-border-3').style.display = 'none';
    
        // const userchoicebuttonstyle=window.getComputedStyle(button1);
        // const computerchoicebuttonstyle=window.getComputedStyle(button2);
        // const userchoicebuttonstyle2=window.getComputedStyle(button3);
        
          
     
    
    updateScore(winner);
    displayResult(message, userChoice, computerChoice);
}
function displaynextbutton(){
    
   const next_button= document.createElement('Next-Button');
   next_button.innerHTML="Next";
   next_button.addEventListener('click',()=>{
    window.location.href="win.html";

})

    // Add styles to the button
    next_button.style.marginTop = "20px";
    next_button.style.padding = "10px 20px";
    next_button.style.backgroundColor = "transparent";
    next_button.style.border = "2px solid white";
    next_button.style.borderRadius = "10px";
    next_button.style.cursor = "pointer";
    next_button.style.fontSize = "1.2em";
    next_button.style.fontWeight = "bold";
    next_button.style.color = "white";
    next_button.style.textAlign = "center";
    next_button.style.transition = "background-color 0.3s ease";
    next_button.style.position = "absolute"; // Ensures the button's position works with top/left
    next_button.style.left = "1567px"; // Centers the button horizontally
    next_button.style.top = "1010px"; // Adjust the vertical position
    next_button.style.transform = "translateX(-50%)"; // Centers horizontally based on `left: 50%`
    next_button.style.opacity = "1"; // Ensures button is visible

document.body.appendChild(next_button);
const button_1=document.getElementById('Rules-button');
button_1.style.left='1316px'


}

// Function to get a random choice for the computer
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) return null;

    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    return (computerChoice === winConditions[userChoice]) ? 'user' : 'computer';
}

function replaybuttondisplay() {
    const replayButton = document.createElement('button');
    replayButton.innerHTML = "Replay";

    // Apply styles directly using JavaScript
    replayButton.style.marginTop = "20px";
    replayButton.style.backgroundColor = "white";
    replayButton.style.border="1px solid white"
    replayButton.style.color = "black";
    replayButton.style.padding = "10px 20px";
    replayButton.style.border = "none";
    replayButton.style.cursor = "pointer";
    replayButton.style.borderRadius = "5px";
    replayButton.style.transition = "background-color 0.3s ease-in-out";
    replayButton.style.width = "174px";
    replayButton.style.height = "44px";
    replayButton.style.position='absolute'
    replayButton.style.left = "416px";
    replayButton.style.top = "720px";
    replayButton.style.animation = "fadeIn 1s forwards 0.5s"; // Animation with delay

    // Add event listener
    replayButton.addEventListener('click', () => {
        window.location.href = "index.html";
    });

    // Append to the body
    document.body.appendChild(replayButton);
}

// Function to create the message based on the winner and choices
function determineMessage(winner, userChoice, computerChoice) {
    if (winner === null) {
        replaybuttondisplay()
        return 'It is a tie!';
    } else if (winner === 'user') {
        displaynextbutton()
        triggerWinAnimation()
        return `You win! ${userChoice} beats ${computerChoice} AGAINST PC`;

    } else {
        triggerWinAnimation()
        replaybuttondisplay()
        return `You lost! ${computerChoice} beats ${userChoice} AGAINST PC`;
    }
}

// Function to update the score based on the winner
function updateScore(winner) {
    if (winner === 'user') {
        yourScore++;
        localStorage.setItem('yourScore', yourScore);
    } else if (winner === 'computer') {
        computerScore++;
        localStorage.setItem('computerScore', computerScore);
    }
}

// Function to display the result on the screen
function displayResult(message) {
    const resultElement = document.getElementById('play-buttons-container');
    resultElement.innerHTML = message;
    resultElement.style.position='absolute'
    resultElement.style.left='120px'
    resultElement.style.color='white'
    resultElement.style.fontSize='1.5em'
    resultElement.style.top='400px'
    const button2=document.getElementById('play-button-2')
    const button3=document.getElementById('play-button-3')
   button2.style.display='none';
    button3.style.display='none';
    

   const userScoreElement = document.getElementById('Your-score');
    userScoreElement.textContent = yourScore;

    const computerScoreElement = document.getElementById('Computer-score');
         computerScoreElement.textContent = computerScore;


 }

// Event listeners for game buttons
const rockButton = document.getElementById('play-button-1');
rockButton.addEventListener('click', function() {
    playGame('rock');
});

const paperButton = document.getElementById('play-button-2');
paperButton.addEventListener('click', function() {
    playGame('paper');
});

const scissorsButton = document.getElementById('play-button-3');
scissorsButton.addEventListener('click', function() {
    playGame('scissors');
});

