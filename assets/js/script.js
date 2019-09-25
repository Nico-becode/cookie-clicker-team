
(() => {

    let default_game = {
        cookie_counter: 0,
        multiplier: 1,
        price_multiplier: 20,
        autoclick: 0,
        price_autoclick: 100,
        seconds: 30,        //the timer of the boost
        boost: 1,
        price_boost: 150,
        timer_autoclick: null,
        boostLaunch: false  //false means the boost isn't activated

    }

    const multiplier_augment = 2;
    const price_augment = 3;    //the multiplier for each price
    const speed = 1000;

    let my_game;

    function clear_game() {
        /*
            clear_game() reset de game at the last localsavegarde
        */
        my_game = localStorage.getItem("data");

        if (!my_game){
            my_game = default_game;
        }
        else {
            my_game = JSON.parse(my_game);
            my_game.timer_autoclick = setInterval(() => {
                change_score(my_game.autoclick);
            }, speed);
            if (my_game.boostLaunch){
                setTimeout(timer, speed);
            }
        }


        document.getElementById("score").innerHTML = my_game.cookie_counter;
        document.getElementById("multiPrice").innerHTML = `Price: ${my_game.price_multiplier} cookies`;
        document.getElementById("multi").innerHTML= `Multiplier x ${my_game.multiplier} `;
        document.getElementById("auto").innerHTML = `${my_game.autoclick} autoclick`;
        document.getElementById("autoPrice").innerHTML = `Price: ${my_game.price_autoclick} cookies`;
        document.getElementById("boost").innerHTML = `Boost: ${my_game.seconds} sec`;
        document.getElementById("boostPrice").innerHTML = `Price: ${my_game.price_boost} cookies`;

    }

    function save_game() {
        /*
            save_game() put the data of game on the localStorage
        */
        localStorage.setItem("data", JSON.stringify(my_game));
        console.log("save");
        setTimeout(save_game, 10000);
    }

    function timer(){
        /*
            timer() is the time that the boost is activated
        */
        my_game.seconds--;

        //boost is still activated
        if(my_game.seconds > 0){
            setTimeout(timer, speed);
        }
        //boost ended and must be reset
        else {
            my_game.seconds = 30;
            my_game.boostLaunch = false;
            my_game.boost = 1;

        }
        document.getElementById("boost").innerHTML = `Boost: ${my_game.seconds} sec`;

    }

    function check_button(){
        /*
            check_button() check is each upgrade is buyable
        */
        document.getElementById("multi").disabled = my_game.cookie_counter < my_game.price_multiplier;
        document.getElementById("auto").disabled = my_game.cookie_counter < my_game.price_autoclick;
        document.getElementById("boost").disabled = my_game.cookie_counter < my_game.price_boost || my_game.boostLaunch;

    }

    function change_score(value){
        /*
            change_score() modify the score of the game
        */
       //new high score
        if (value >= 0){
            my_game.cookie_counter += (value * my_game.boost);
        }
        //buy at the store
        else {
            my_game.cookie_counter += value;
        }
        document.getElementById("score").innerHTML = my_game.cookie_counter;

        check_button();
    }

    /* Click button */
    document.getElementById("cookie").addEventListener("click", () => {
        change_score(my_game.multiplier);
    });

    /* Multiplier button */
    document.getElementById("multi").addEventListener("click", () => {
        
        my_game.price_multiplier *= price_augment;
        //give the previous price
        change_score(-(my_game.price_multiplier / price_augment));
        my_game.multiplier *= multiplier_augment;
        
        document.getElementById("multiPrice").innerHTML = `Price: ${my_game.price_multiplier} cookies`;
        document.getElementById("multi").innerHTML= `Multiplier x ${my_game.multiplier} `;


    });
    /* Autoclick*/
    document.getElementById("auto").addEventListener("click", () => {
        
        if (my_game.autoclick == 0) {
            my_game.timer_autoclick = setInterval(() => {
                change_score(my_game.autoclick);
            }, speed);
        }
        my_game.autoclick++;
        my_game.price_autoclick *= price_augment;
        //give the previous price
        change_score(-(my_game.price_autoclick / price_augment));

        document.getElementById("auto").innerHTML = `${my_game.autoclick} autoclick`;
        document.getElementById("autoPrice").innerHTML = `Price: ${my_game.price_autoclick} cookies`;

    });
    /* Boost button */
    document.getElementById("boost").addEventListener("click", () => {

        my_game.boostLaunch = true;

        my_game.price_boost*= price_augment;
        //give the previous price
        change_score(-(my_game.price_boost / price_augment));
        
        my_game.boost = 3;

        setTimeout(timer, speed);
        document.getElementById("boostPrice").innerHTML = `Price: ${my_game.price_boost} cookies`;
    });

    
    clear_game();
    check_button();
    setTimeout(save_game, 10000);

})();