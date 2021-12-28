let result = document.getElementById("inputText");

let calculate = number =>{
    result.value += number;
}

let Result=() =>{
    try{
        let calc = Function("return " + result.value);
        result.value = calc();
    }
    catch(err){
        alert("Hibás adatok!");
    }
}

let clr = () => result.value = "";