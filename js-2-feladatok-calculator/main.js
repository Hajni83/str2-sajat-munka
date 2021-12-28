let result = document.getElementById("inputText");

let calculate = number =>{
    result.value += number;
}

let Result=() =>{
    try{
        result.value = eval(result.value)
    }
    catch(err){
        result.error();
    }
}

let clr = () => result.value = "";