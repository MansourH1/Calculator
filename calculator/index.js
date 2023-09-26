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
    let WholeEq=equation.split(/(\+|\-)/);
for(let i= 0; i<WholeEq.length;i++){
if(WholeEq[i].match(/(\*|\÷)/)){
    let part = WholeEq[i].split(/(\*|\÷)/);
    for(let j=0;j<part.length;j++){
    if(part[1]=="*"){
    res=0;
    res+=parseFloat(part[0]*part[2]);
    part = part.slice(3);
    part.unshift(res);
    j=0;
    }else if(part[1]=="÷"){
        res=0;
        res+=parseFloat(part[0]/part[2]);
        part = part.slice(3);
        part.unshift(res);
       j=0;
   }
   if(part.length==1){
    res=part[0];
    WholeEq[i]=res;
     }
   }
 }
}
for(let k=0;k<WholeEq.length;k++){
    if(WholeEq[1]=="+"){
        res=0;
        res+=parseFloat(WholeEq[0])+parseFloat(WholeEq[2]);
        WholeEq = WholeEq.slice(3);
        WholeEq.unshift(res);
        k=0;
        }else if(WholeEq[1]=="-"){
            res=0;
            res+=parseFloat(WholeEq[0])-parseFloat(WholeEq[2]);
            WholeEq = WholeEq.slice(3);
            WholeEq.unshift(res);
           k=0;
       }
       if(WholeEq.length==1){
        res=WholeEq[0];
         }
}
  document.getElementById("Result").innerHTML = `${res}`;
}
