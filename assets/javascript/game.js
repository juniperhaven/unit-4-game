// this is an array of all the character objects.
// they have a name, health, base player attack, image path, and enemy attack. enemies with higher attack power start with higher base attack power as player characters, because that makes logical sense to me. but all enemies still start with higher attack power than a player. always.
// Hawkeye and Black Widow have the lowest enemy attack power, and as long as you start with one of them, you shouldn't have too much difficulty winning, even if you use Hawkeye.
var characters = [ 
    {name: "Hawkeye",
    health: 350,
    playerAttack: 15,
    imgPath: "assets/images/hawkeye.jpg",
    enemyAttack: 22},

    {name: "Black Widow",
    health: 370,
    playerAttack: 12,
    imgPath: "assets/images/black-widow.jpg",
    enemyAttack: 27},

    {name: "Captain America",
    health: 410,
    playerAttack: 12,
    imgPath: "assets/images/cap.jpg",
    enemyAttack: 30},

    {name: "Iron Man",
    health: 390,
    playerAttack: 14,
    imgPath: "assets/images/iron-man.jpg",
    enemyAttack: 35}
]

// here is the array for the enemy characters, the object for the player character, and the object for the defender character.
// I also included a tracker of how many battles you've won in a playthrough, and when it hits 3, you win the game and are told you've won.
// defender is to check if you've already picked an enemy to fight, so that you can't keep picking enemies over and over, and also so you can't attack while there's no active enemy.
// youLive is to check if you're still alive, so that you can't attack after you die and lose the game.
// yourAttack, yourHealth, and enemyHealth exist to make my life easier so that I don't have to reset like eight object variables every time the restart button is used. yourAttack is default set to 12 because that's what the base player attack is.
// then there's the reset button, so that I'm not making it twice for when you win or lose. on a click, the button goes away, the player character div is cleared, variables that need resetting are reset, and createCharacter is called anew.
var enemyChars = [];
var playerChar = {};
var defenderChar = {};
var win = 0;
var defender = false;
var youLive = true;
var yourAttack = 0;
var yourHealth = 0;
var enemyHealth = 0;
var resetButton = $("<button/>", {
    text: "Reset",
    id: "reset-button"
});

createCharacter();

function createCharacter() {
    for(var i = 0; i < characters.length; i++) {
        var charName = $("<div/>");
        var charImage = $("<img src = "+characters[i].imgPath+">");
        var charHealth = $("<div/>");
        charName.text(characters[i].name);
        charHealth.text(characters[i].health);

        // I had to do the data-name attribute stuff like this all the way through, because otherwise, any name other than Hawkeye's would only take the first part of the name. so you'd get stuff like data-name = "Captain", which...did not work.
        var charCard = $(`<div class = 'char-card' data-name = "${characters[i].name}">`);
        $(charCard).append(charName);
        $(charCard).append(charImage);
        $(charCard).append(charHealth);
        $("#character-selection").append(charCard);
    }
}

function appendEnemy() {
    for(var i = 0; i < enemyChars.length; i++){
        var charName = $("<div/>");
        var charImage = $("<img src = "+enemyChars[i].imgPath+">");
        var charHealth = $("<div/>");
        charName.text(enemyChars[i].name);
        charHealth.text(enemyChars[i].health);

        // I added the id to enemy character cards because I couldn't figure out how to remove them when they're selected as defenders without the id, and they do need to be removed from the enemy selection area when you choose them as a defender. 
        // I also removed the space from the name, because otherwise I couldn't select the id for things like "Black Widow".
        // I am admittedly unclear why it's outlining "/\/s/" in red, given that it works fine and this IS what was suggested to me, but. whatever. I guess.
        var id = enemyChars[i].name;
        id = id.replace(/\s/g, '');
        var charCard = $(`<div class = 'enemy-card' data-name = "${enemyChars[i].name}">`);
        charCard.attr("id", id);
        $(charCard).append(charName);
        $(charCard).append(charImage);
        $(charCard).append(charHealth);
        $("#enemy-characters").append(charCard);
    }
}

function appendPlayer(){
    var charName = $("<div/>");
    var charImage = $("<img src = "+playerChar.imgPath+">");
    var charHealth = $("<div id = 'player-health'/>");
    charName.text(playerChar.name);
    charHealth.text(playerChar.health);
    var charCard = $(`<div id = 'player-card' data-name = "${playerChar.name}">`);
    $(charCard).append(charName);
    $(charCard).append(charImage);
    $(charCard).append(charHealth);
    $("#player-character").append(charCard);
}

function appendDefender(){
    var charName = $("<div/>");
    var charImage = $("<img src = "+defenderChar.imgPath+">");
    var charHealth = $("<div id = 'defender-health'/>");
    charName.text(defenderChar.name);
    charHealth.text(defenderChar.health);
    var charCard = $(`<div id = 'defender-card' data-name = "${defenderChar.name}">`);
    $(charCard).append(charName);
    $(charCard).append(charImage);
    $(charCard).append(charHealth);
    $("#current-enemy").append(charCard);
}

function defHealthUpdate() {
    $("#defender-health").text(enemyHealth);
}

function playerHealthUpdate() {
    $("#player-health").text(yourHealth);
}

$("#character-selection").on("click", ".char-card", function() {
    
    // this goes looking for the customized data-name attribute of what you clicked on.
    var charSelect = $(this).attr("data-name");

    // this is the charSelect thing. it determines who you've chosen as your player, empties the selection div, sets your player charater object, sets your current health, sets the array of enemy characters, and then calls the functions that append the enemy characters to the appropriate div and the player character to the appropriate div.
    if(charSelect === "Hawkeye") {
        $("#character-selection").empty();

        for(var i = 0; i < characters.length; i++){
            if(characters[i].name != "Hawkeye"){
                enemyChars.push(characters[i]);
            }
            else{
                playerChar = characters[i];
            }
        }

        yourAttack = playerChar.playerAttack;
        yourHealth = playerChar.health;
        appendPlayer();
        appendEnemy();
    }
    else if(charSelect === "Black Widow") {
        $("#character-selection").empty();

        for(var i = 0; i < characters.length; i++){
            if(characters[i].name != "Black Widow"){
                enemyChars.push(characters[i]);
            }
            else{
                playerChar = characters[i];
            }
        }

        yourAttack = playerChar.playerAttack;
        yourHealth = playerChar.health;
        appendPlayer();
        appendEnemy();
    }
    else if(charSelect === "Captain America") {
        $("#character-selection").empty();

        for(var i = 0; i < characters.length; i++){
            if(characters[i].name != "Captain America"){
                enemyChars.push(characters[i]);
            }
            else{
                playerChar = characters[i];
            }
        }

        yourAttack = playerChar.playerAttack;
        yourHealth = playerChar.health;
        appendPlayer();
        appendEnemy();
    }
    else if(charSelect === "Iron Man") {
        $("#character-selection").empty();

        for(var i = 0; i < characters.length; i++){
            if(characters[i].name != "Iron Man"){
                enemyChars.push(characters[i]);
            }
            else{
                playerChar = characters[i];
            }
        }

        yourAttack = playerChar.playerAttack;
        yourHealth = playerChar.health;
        appendPlayer();
        appendEnemy();
    }
});

$("#enemy-characters").on("click", ".enemy-card", function(e) {
    if(!defender) {
        var defSelect = $(this).attr("data-name");

        if(defSelect === "Hawkeye") {

            for(var i = 0; i < enemyChars.length; i++) {
                if(enemyChars[i].name === "Hawkeye") {
                    defenderChar = enemyChars[i];
                    defender = true;
                }
            }

            enemyHealth = defenderChar.health;
            $("#Hawkeye").remove();
            appendDefender();
        }
        else if(defSelect === "Black Widow") {

            for(var i = 0; i < enemyChars.length; i++) {
                if(enemyChars[i].name === "Black Widow") {
                    defenderChar = enemyChars[i];
                    defender = true;
                }
            }

            enemyHealth = defenderChar.health;
            $("#BlackWidow").remove();
            appendDefender();
        }
        else if(defSelect === "Captain America") {

            for(var i = 0; i < enemyChars.length; i++) {
                if(enemyChars[i].name === "Captain America") {
                    defenderChar = enemyChars[i];
                    defender = true;
                }
            }

            enemyHealth = defenderChar.health;
            $("#CaptainAmerica").remove();
            appendDefender();
        }
        else if(defSelect === "Iron Man") {

            for(var i = 0; i < enemyChars.length; i++) {
                if(enemyChars[i].name === "Iron Man") {
                    defenderChar = enemyChars[i];
                    defender = true;
                }
            }

            enemyHealth = defenderChar.health;
            $("#IronMan").remove();
            appendDefender();
        }
    }
});

$("#attack-button").click(function(){
    if(defender && youLive){
        // you always attack first.
        enemyHealth = enemyHealth-yourAttack;
        defHealthUpdate();

        // if your enemy isn' dead, they go next.
        if(enemyHealth > 0) {
            yourHealth = yourHealth-defenderChar.enemyAttack;
            playerHealthUpdate();

            // given that these sentences show up at the exact same time in the demo, I felt okay about putting them here, because it only goes if you and your enemy are able to attack. if they can't attack, they're dead, and you get told you won the fight.
            // also I used .html so I could include the line break.
            $("#attacks").html("You attacked "+defenderChar.name+" for "+yourAttack+" damage.<br>"+defenderChar.name+" attacked you for "+defenderChar.enemyAttack+" damage.");
            
            // I'm going to be real, I incremented by playerAttack so I could feel like the variable was doing SOMETHING instead of just sitting uselessly.
            yourAttack = yourAttack+playerChar.playerAttack;
        }

        // if you're now dead as a result of enemy attack, you are informed you have lost.
        if(yourHealth <= 0) {
            // again, .html for line break.
            $("#attacks").html("You have been defeated.<br>Game Over.");
            youLive = false;
            $("#reset").append(resetButton);
            $("reset-button").on("click", function() {
                $("#reset").empty();
                $("#attacks").empty();
                $("#current-enemy").empty();
                $("#player-character").empty();
                win = 0;
                yourAttack = 0;
                yourHealth = 0;
                enemyHealth = 0;
                enemyChars = [];
                defender = false;
                youLive = true;
                createCharacter();
            })
        }
        else if(enemyHealth <= 0) {
            $("#defender-card").remove();
            $("#attacks").text("You have defeated "+defenderChar.name+"! You may now select another enemy to fight.");
            defender = false;
            win++;
        }
    }

    // if you've fought and defeated all available enemies, you win! yay you!
    if(win==3) {
        $("#attacks").html("You have won!");
        $("#reset").append(resetButton);
        $("reset-button").on("click", function() {
            $("#reset").empty();
            $("#attacks").empty();
            $("#current-enemy").empty();
            $("#player-character").empty();
            win = 0;
            yourAttack = 0;
            yourHealth = 0;
            enemyHealth = 0;
            enemyChars = [];
            defender = false;
            youLive = true;
            createCharacter();
        })
    }
});

// things to do now:
// get some cool fonts and a nice background. and maybe stylize the buttons a little.