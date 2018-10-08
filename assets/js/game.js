// See README for testing instructions

$(document).ready(function () {

    var foxMcCloud;
    var falcoLombardi;
    var peppyHare;
    var slippyToad;
    initializeCharacters();
    var characters = [foxMcCloud, falcoLombardi, peppyHare, slippyToad];
    var heroName;
    var globalHero;
    var defenderName;
    var defenderSelected = false;
    var enemies = [];
    var wins = 0;
    var losses = 0;
    var heroDefeated = false;
    var heroChosen = false;


    // MAJOR TASK #1: CHOOSE A CHARACTER
    // make character buttons

    startGame();

    // MAJOR TASK #2: MOVE THE HERO TO HERO DIV AND ENEMIES TO ENEMY DIV
    // =================================================================================

    // This function is called within the startGame() function

    // MAJOR TASK #3: CHOOSE WHICH ENEMY TO ATTACK
    // =================================================================================

    // Called within the Task2 function

    // MAJOR TASK #4: ATTACK THE DEFENDER
    // =================================================================================
    var attackButton = $("#attack-button")
    attackButton.on("click", attack)


    function attack() {
        // make sure a defender is chosen 
        if (defenderSelected) {
            // grab the objects for hero and defender
            var heroObject;
            var defenderObject;
            for (var i = 0; i < characters.length; i++) {
                if (characters[i].name == heroName) {
                    heroObject = characters[i];
                }
                if (characters[i].name == defenderName) {
                    defenderObject = characters[i];
                }
            }
            // decrease the HP
            defenderObject.HP -= globalHero.attackPower;
            globalHero.HP -= defenderObject.counterAttackPower;

            // bonus attack power for hero
            globalHero.attackPower += globalHero.constantAttackPower;

            // if Hero is defeated
            // console.log("Hero HP" + globalHero.HP);
            if (globalHero.HP <= 0) {
                heroObject.HP = 0;
                losses++;
                console.log(heroDefeated);
                heroDefeated = true;
                console.log(heroDefeated);
                alert("You have been defeated")
                resetGame();
                startGame();
                // console.log("Hero still alive? " + !heroDefeated); 

            };


            refreshCharacters();

            //  if all defenders are defeated, game over, increment wins.
            console.log("Hero still alive? " + !heroDefeated);
            console.log("Defenders still alive? " + $('#defender').is(':empty'));
            console.log(" Enemies still alive? " + $('#enemies').is(':empty'));
            console.log($('#enemies'));
            updateStats();

            // Defender is defeated
            if (defenderObject.HP <= 0) {
                alert("Enemy Defeated!")
                $("#defender").empty();
                defenderObject.defeated = true;
                defenderSelected = false;
            }

            // function resetgame 
            function resetGame() {
                resetCharacters();
                startGame();
            }
            function updateStats() {
                $("#stats").empty();
                var stats = $("<div>");
                stats.addClass("stats");
                var winsDiv = $("<div>");
                winsDiv.text("Wins: " + wins);
                var lossesDiv = $("<div>");
                lossesDiv.text("Losses: " + losses);
                stats.append(winsDiv);
                stats.append(lossesDiv);
                $("#stats").append(stats);
            }
        }
        var victory = checkVictory();
        if (victory) {
            resetGame();
        }
    }
    // convention: constructors are Capitalized
    function Character(name, HP, attackPower, counterAttackPower, constantAttackPower, img) {
        this.name = name;
        this.HP = HP;
        this.attackPower = attackPower;
        this.counterAttackPower = counterAttackPower;
        this.constantAttackPower = constantAttackPower;
        this.img = img;
        this.defeated = false;
        this.hero = false;
    }
    function initializeCharacters() {
        foxMcCloud = new Character('Fox McCloud', 200, 28, 28, 208, "assets/img/fox.png");
        falcoLombardi = new Character('Falco Lombardi', 160, 22, 22, 22, "assets/img/falco.png");
        peppyHare = new Character('Peppy Hare', 120, 16, 16, 16, "assets/img/peppy.png");
        slippyToad = new Character('Slippy Toad', 140, 19, 19, 19, "assets/img/slippy.png");
    }
    function createCard(character) {
        //     let { name, HP, img } = character;
        //     var charCard = `
        //     <button class="button character-card" character=${name} HP=${HP} style="background: url('${img}')">
        //         <p class="character-button-text">${name} ${HP}</p>
        //     </button>
        // `;
        // console.log(charCard);
        var charCard = $("<button>");
        charCard.addClass("button character-card");
        charCard.attr("character", character.name);
        charCard.attr("HP", character.HP);
        charCard.attr("style", "background: url(" + character.img + ")");
        charCard.html('<p class = "character-button-text">' + character.name + ' ' + character.HP + '</p>');
        return charCard;
    }
    function startGame() {
        $("#choose-character").empty();
        for (var i = 0; i < characters.length; i++) {
            var charCard = createCard(characters[i]);
            charCard.addClass("choose")
            $("#choose-character").append(charCard);
        }
        heroDefeated = false;
        heroChosen = false;

        task2()
        $("#hero").empty();
    }
    function task2() {
        $(".choose").on("click", function () {
            //    Add Hero to hero div
            // Move Enemies to enemy-choose
            heroChosen = true;
            for (var i = 0; i < characters.length; i++) {
                var name = characters[i].name;
                heroName = ($(this).attr("character"));

                // make sure it is not the Hero
                if (heroName == name) {
                    globalHero = characters[i];
                    characters[i].hero = true;
                    var hero = createCard(characters[i]);
                    hero.addClass("hero-class task2")
                    $("#hero").append(hero);
                }

                if (heroName != name) {
                    enemies.push(characters[i]);
                    var enemy = createCard(characters[i]);
                    enemy.addClass("enemy-choose")
                    $("#enemies").append(enemy);
                }
            }

            //Clear Choose Div
            $("#choose-character").empty();

            // create Enemy On-click
            recreateEnemyOnClicks();
        })
    }
    function recreateEnemyOnClicks() {

        $(".enemy-choose").on("click", function () {
            // clear defenders and enemies
            $("#hero").empty();
            $("#enemies").empty();
            $("#defender").empty();

            // repopulate the hero
            var updatedHero = createCard(globalHero);
            updatedHero.addClass("hero-class recreateEnemyOnClicks")
            $("#hero").append(updatedHero);


            // repopulate the defender
            if (($(this).attr("character"))) {
                defenderName = ($(this).attr("character"));
                defenderSelected = true;
            }
            // Add remaining enemies
            for (var i = 0; i < enemies.length; i++) {
                if (!enemies[i].defeated) {
                    // make sure it is not the defender
                    var name = enemies[i].name;
                    if (defenderName == name) {
                        var defender = createCard(enemies[i]);
                        defender.addClass("defender-class")
                        $("#defender").append(defender);
                    }
                    if (defenderName != name) {
                        // Create a new enemy button.
                        var enemy = createCard(enemies[i]);
                        enemy.addClass("enemy-class enemy-choose")
                        $("#enemies").append(enemy);

                    }
                }

                // re-create on-clicks
                recreateEnemyOnClicks();
            }
        });

    }
    function refreshCharacters() {
        $("#enemies").empty();
        $("#defender").empty();
        $("#hero").empty();

        // repopulate the hero
        if (heroChosen) {
            var updatedHero = createCard(globalHero);
            updatedHero.addClass("hero-class refreshCharacters")
            $("#hero").append(updatedHero);
        }
        // repopulate the defender
        if (($(this).attr("character"))) {
            defenderName = ($(this).attr("character"));
        }
        // Add remaining enemies
        var enemyAlive = false;
        for (var i = 0; i < enemies.length; i++) {
            if (!enemies[i].defeated) {
                // make sure it is not the defender
                var name = enemies[i].name;
                if (defenderName == name) {
                    var defender = createCard(enemies[i]);
                    defender.addClass("defender-class")
                    $("#defender").append(defender);
                }
                if (defenderName != name) {
                    // Create a new enemy button.
                    var enemy = createCard(enemies[i]);
                    enemy.addClass("enemy-class enemy-choose")
                    $("#enemies").append(enemy);
                    enemyAlive = true;

                }
            }

            // re-create on-clicks
            recreateEnemyOnClicks();

        }
        if (!enemyAlive) {
            console.log(enemyAlive);
            $('enemies').empty();
        }
    }
    function checkVictory() {
        if ($('#defender').is(':empty') && !heroDefeated && ($('#enemies').is(':empty'))) {
            // console.log("Hero has been defeated? " + !heroDefeated); 
            alert("You Win!")
            wins++
            return true;
        }
        return false;
    }

});