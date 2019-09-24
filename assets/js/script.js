
(() => {

    let cookie_counter = 0;
    let multiplier = 1;
    let price_multiplier = 20;
    let autoclick = 0;
    let price_autoclick = 100;
    let seconds = 30;
    let boost = 1;
    let price_boost = 150;
    let timer_autoclick;
    let boostLaunch = false;    //false means the boost isn't activated


    const multiplier_augment = 2;
    const price_augment = 3;    //the multiplier for each price
    const speed = 1000;

    function timer(){
        /*
            timer() is the time that the boost is activated
        */
        seconds--;

        //boost is still activated
        if(seconds > 0){
            setTimeout(timer, speed);
        }
        //boost ended and must be reset
        else {
            seconds = 30;
            boostLaunch = false;
            boost = 1;

        }
        document.getElementById("boost").innerHTML = `Boost: ${seconds} sec`;

    }

    function check_button(){
        /*
            check_button() check is each upgrade is buyable
        */
        document.getElementById("multi").disabled = cookie_counter < price_multiplier;
        document.getElementById("auto").disabled = cookie_counter < price_autoclick;
        document.getElementById("boost").disabled = cookie_counter < price_boost || boostLaunch;

    }

    function change_score(value){
        /*
            change_score() modify
        */
        if (value >= 0){
            cookie_counter += (value*boost);
        }
        else {
            cookie_counter += value;
        }
        document.getElementById("score").innerHTML = cookie_counter;

        check_button();
    }

    /* Click button */
    document.getElementById("cookie").addEventListener("click", () => {
        change_score(multiplier);
    });
    /* Multiplier button */
    document.getElementById("multi").addEventListener("click", () => {
        
        price_multiplier *= price_augment;
        change_score(-(price_multiplier / price_augment));
        multiplier *= multiplier_augment;
        
        document.getElementById("multiPrice").innerHTML = `Price: ${price_multiplier} cookies`;
        document.getElementById("multi").innerHTML= `Multiplier x ${multiplier} `;


    });
    /* Autoclick*/
    document.getElementById("auto").addEventListener("click", () => {
        
        if (autoclick == 0) {
            timer_autoclick = setInterval(() => {
                change_score(autoclick);
            }, speed);
        }
        autoclick++;
        price_autoclick *= price_augment;
        change_score(-(price_autoclick / price_augment));

        document.getElementById("auto").innerHTML = `${autoclick} autoclick`;
        document.getElementById("autoPrice").innerHTML = `Price: ${price_autoclick} cookies`;

    });
    /* Boost button */
    document.getElementById("boost").addEventListener("click", () => {

        boostLaunch = true;

        price_boost*= price_augment;
        change_score(-(price_boost / price_augment));
        
        boost = 3;

        setTimeout(timer, speed);
        document.getElementById("boostPrice").innerHTML = `Price: ${price_boost} cookies`;
    });

    
    check_button();

})();