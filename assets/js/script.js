
(() => {

    let cookie_counter = 0;
    let multiplier = 1;
    let price_multiplier = 20;
    let autoclick = 0;
    let price_autoclick = 100;
    let seconds = 30;
    let boost = 1;
    let price_boost = 150;


    const multiplier_augment = 2;
    const price_augment = 3;
    const speed = 1000;

    let timer_autoclick = setInterval(change_score, speed, autoclick);

    function timer(){
        seconds--;
        if(seconds > 0){
            setTimeout(timer, speed);
        }
        else {
            seconds = 30;
            document.getElementById("boost").disabled = false;
            boost = 1;

        }
        document.getElementById("boost").innerHTML = `Boost: ${seconds} sec`;

    }


    function change_score(value){
        if (value >= 0){
            cookie_counter += (value*boost);
        }
        else {
            cookie_counter += value;
        }
        document.getElementById("score").innerText = cookie_counter;
    }
    /* Click button */
    document.getElementById("cookie").addEventListener("click", () => {
        change_score(multiplier);
    });
    /* Multiplier button */
    document.getElementById("multi").addEventListener("click", () => {
        
        if (price_multiplier <= cookie_counter) {
            change_score(-price_multiplier);
            price_multiplier *= price_augment;
            document.getElementById("multiPrice").innerHTML = `Price: ${price_multiplier} cookies`;
            multiplier *= multiplier_augment;
            document.getElementById("multi").innerHTML= `Multiplier x ${multiplier} `;
        }
        else {
            console.log("tu peux pas");
        }

    });
    /* Autoclick*/
    document.getElementById("auto").addEventListener("click", () => {
 
        if (price_autoclick <= cookie_counter) {
            change_score(-price_autoclick);
            clearInterval(timer_autoclick);
            autoclick++;
            timer_autoclick = setInterval(change_score, speed, autoclick);
            price_autoclick *= price_augment;
            document.getElementById("auto").innerHTML = `${autoclick} autoclick`;
            document.getElementById("autoPrice").innerHTML = `Price: ${price_autoclick} cookies`;
        }
        

    });
    /* Boost button */
    document.getElementById("boost").addEventListener("click", () => {

        if (cookie_counter >= price_boost){
            document.getElementById("boost").disabled = true;
            change_score(-price_boost);
            boost = 3;
            setTimeout(timer, speed);
            price_boost*= price_augment;
            document.getElementById("boostPrice").innerHTML = `Price: ${price_boost} cookies`;
        }
    });




})();