
(() => {

    let cookie_counter = 0;
    let multiplier = 1;
    let price_multiplier = 20;
    let autoclick = 0;

    const multiplier_augment = 2;
    const price_multiplier_augment = 3;
    const speed = 1000;

    let timer_autoclick = setInterval(change_score, speed, autoclick);


    function change_score(value){
        cookie_counter += value;
        console.log(value)
        document.getElementById("score").innerText = cookie_counter;
    }
    document.getElementById("cookie").addEventListener("click", () => {
        change_score(multiplier);
    });

    document.getElementById("multiplier").addEventListener("click", () => {
        
        if (price_multiplier <= cookie_counter) {
            change_score(-price_multiplier);
            price_multiplier *= price_multiplier_augment;
            document.getElementById("price_multiplier").innerHTML = `Prix: ${price_multiplier} cookies`;
            multiplier *= multiplier_augment;
        }
        else {
            console.log("tu peux pas");
        }
        document.getElementById("multiplier").innerHTML= `x ${multiplier}`;
    });

    document.getElementById("autoclick").addEventListener("click", () => {
        clearInterval(timer_autoclick);
        autoclick++;
        timer_autoclick = setInterval(change_score, speed, autoclick);
        
        document.getElementById("autoclick").innerHTML = `${autoclick} autoclick`;
    });

    document.getElementById("boost").addEventListener("click", () => {


    });


})();