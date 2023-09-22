function Calculate(button) {
    let value = button.textContent; // Get the text content of the button
    let equation = document.getElementById("Equation");
    if (value == "%" || value == "1" || value == "2" ||
        value == "3" || value == "4" || value == "5" ||
        value == "6" || value == "7" || value == "8" ||
        value == "9" || value == ".") {
        equation.innerHTML += value;

        let array = ["plus", "divide", "power", "minus", "res"];
        for (let i = 0; i < array.length; i++) {
            if (document.getElementById(array[i]).disabled) {
                let button = document.getElementById("plus");
                button.removeAttribute("disabled");
                button = document.getElementById("divide");
                button.removeAttribute("disabled");
                button = document.getElementById("power");
                button.removeAttribute("disabled");
                button = document.getElementById("minus");
                button.removeAttribute("disabled");
                button = document.getElementById("res");
                button.removeAttribute("disabled");
                break;
            }
        }
    }

    if (value == "x" || value == "÷" || value == "-" || value == "+") {
        equation.innerHTML += value;
        button.setAttribute("disabled", "");
        button = document.getElementById("divide");
        button.setAttribute("disabled", "");
        button = document.getElementById("power");
        button.setAttribute("disabled", "");
        button = document.getElementById("minus");
        button.setAttribute("disabled", "");
        button = document.getElementById("res");
        button.setAttribute("disabled", "");
    }

    if (value == "del") {
        let eq = equation.textContent;
        equation.textContent = eq.substring(0, eq.length - 1);
        if(!button.disabled){
        button.setAttribute("disabled", "");
        button = document.getElementById("divide");
        button.setAttribute("disabled", "");
        button = document.getElementById("power");
        button.setAttribute("disabled", "");
        button = document.getElementById("minus");
        button.setAttribute("disabled", "");
        button = document.getElementById("res");
        button.setAttribute("disabled", "");
    }
    }
    if (value == "AC") {
        equation.innerHTML = "";
    }

}

function Result() {
    let equation = document.getElementById("Equation").textContent;
    if(equation.includes("x")) { 
        equation = equation.replace(/x/g, "*");
    }
    equation = equation.trim();
    let res=0;
    let splitted = equation.split(/(\*|÷|\+|\-)/);
    for(let i=0;i<splitted.length;i++){
        if(splitted[1]=="*"){
            res=0;
            res+=parseFloat(splitted[0]*splitted[2]);
            splitted = splitted.slice(3);
            splitted.unshift(res);
            i=0;
            for(let j=0;j<splitted.length;j++){
                console.log(splitted[j]);
            }
        }else if(splitted[1]=="÷"){
             res=0;
             res+=parseFloat(splitted[0]/splitted[2]);
             splitted = splitted.slice(3);
            splitted.unshift(res);
            i=0;
        }else if(splitted[1]=="+"){
            res=0;
            res+=parseFloat(splitted[0])+parseFloat(splitted[2]);
            splitted = splitted.slice(3);
           splitted.unshift(res);
           i=0;
        }else if(splitted[1]=="-"){
            res=0;
            res+=parseFloat(splitted[0]-splitted[2]);
            splitted = splitted.slice(3);
           splitted.unshift(res);
           i=0;
        }
        if(splitted.length==1){
            res=splitted[0];
        }
        console.log(i);
    }
    document.getElementById("Result").innerHTML = `${res}`;
}
