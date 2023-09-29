function Calculate(button) {
    let value = button.textContent; // Get the text content of the button
    let equation = document.getElementById("Equation");
    let characters ="%0123456789.()^";
    if (characters.includes(value)) {
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

    let operators="x÷+-";
    if (operators.includes(value)) {
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
        let array = ["plus", "divide", "power", "minus"];
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
                break;
            }
        }
    }
    if (value == "AC") {
        equation.innerHTML = "";
    }
}



function power(equation){
equation = equation.trim();
if(equation.includes("^")){
    let spot = equation.indexOf("^");
    let ClosingBrackets = 0;
    for(var i =spot;i<equation.length;i--){
if(equation.charAt(i)==")"){
    ClosingBrackets++;
}
if(equation.charAt(i)=="("){
    ClosingBrackets--;
if(ClosingBrackets==0){
    console.log(i);
    break;
}
}
    }
    let powered = equation.substring(i,spot);
    // console.log(powered);
    let pow ="";
    for(let k=spot+1;k<equation.length;k++){
        if(equation.charAt(k)!="%" && equation.charAt(k)!="x" && equation.charAt(k)!="÷" &&
        equation.charAt(k)!="+" && equation.charAt(k)!="-" && equation.charAt(k)!="."&&
        equation.charAt(k)!="(" && equation.charAt(k)!=")" ){
           pow+=equation.charAt(k); 
        }else{
            break;
        }

    }
    console.log(pow);
    let neweq="";
    for(let j =0;j<parseInt(pow);j++){
        if(j==parseInt(pow)-1){
            neweq+= powered;
            break;
        }
neweq+= powered + "x";
    }
    console.log(neweq);
     equation = equation.substring(0,i)+"("+neweq+")"+equation.substring(spot+pow.length+1);
    return power(equation)
}else{
    FirstCatch(equation);
}
}




function FirstCatch(equation){
    equation = equation.trim();
    if(equation.includes("(")){
        let start = equation.lastIndexOf("(")
        let end = equation.indexOf(")" ,start);
               console.log(`Start: ${start}, End:${end}`);
               let ToSolve = equation.substring(start+1 , end) ;
               console.log(`${ToSolve}`);
               let res = Result(ToSolve);
               console.log('Result:' + `${res}`);
               console.log(equation.substring(0 ,start)+res+equation.substring(end+1));
            return FirstCatch(equation.substring(0 ,start)+res+equation.substring(end+1));
    }else{
        var res = Result(equation);
    }
sessionStorage.setItem("LastAnswer", `${res}`);
    document.getElementById("Result").innerHTML = `${res}`;
}

function Result(equation) {
    if(equation.includes("x")) { 
        equation = equation.replace(/x/g, "*");
    }
    if(equation.includes("%")) { 
        equation = equation.replace(/%/g, "÷100");
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
  return res;
}

function Copy(){
    let ResultToBeCopied = document.getElementById("Result").textContent;
    navigator.clipboard.writeText(ResultToBeCopied);
}

function LastAnswer(){
    // Check if a session item exists
if (sessionStorage.getItem("LastAnswer") === null) {
    console.log("No session found");
} else {
    let value = sessionStorage.getItem("LastAnswer");
    let equation = document.getElementById("Equation");
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
    console.log("Session found");
}


}
