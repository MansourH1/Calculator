const OPERATOR_BUTTONS = ["plus", "divide", "power", "minus", "res"];
const VALID_CHARACTERS = "%0123456789.()^";
const OPERATORS = "x÷+-";


function Calculate(button) {
  let value = button.textContent; // Get the text content of the button
  let equation = document.getElementById("Equation");
  if (VALID_CHARACTERS.includes(value)) {
    equation.innerHTML += value;
    EnableButtons(OPERATOR_BUTTONS);
  }

  if (OPERATORS.includes(value)) {
    equation.innerHTML += value;
    DisableButtons(OPERATOR_BUTTONS);
  }

  if (value == "del") {
    let eq = equation.textContent;
    equation.textContent = eq.substring(0, eq.length - 1);
    EnableButtons(OPERATOR_BUTTONS);
  }
  if (value == "AC") {
    equation.innerHTML = "";
  }
}




function PowerNumbersOnly(equation) {
  equation = equation.trim();
  const CHAR = "%x÷+-.()";
  const regex = /([-+]?\d*\.?\d+)\^([-+]?\d*\.?\d+)/g;
  
  equation = equation.replace(regex, (match, base, exponent) => {
    if (!CHAR.includes(base) && !CHAR.includes(exponent)) {
      const newBase = parseFloat(base) ** parseFloat(exponent);
      return newBase.toString();
    } else {
      return match;
    }
  });

 PowerParenthesis(equation);
}




function PowerParenthesis(equation) {
  equation = equation.trim();
  if (equation.includes("^")) {
    let spot = equation.indexOf("^");

    let ClosingBrackets = 0;
    for (var i = spot; i < equation.length; i--) {
      if (equation.charAt(i) == ")") {
        ClosingBrackets++;
      }
      if (equation.charAt(i) == "(") {
        ClosingBrackets--;
        if (ClosingBrackets == 0) {
          console.log(i);
          break;
        }
      }
    }
    let powered = equation.substring(i, spot);
    // console.log(powered);
    let pow = "";
    const CHAR = "%x÷+-.()";
    for (let k = spot + 1; k < equation.length; k++) {
      if (!CHAR.includes(equation.charAt(k))) {
        pow += equation.charAt(k);
      } else {
        break;
      }

    }
    console.log(pow);
    let neweq = "";
    for (let j = 0; j < parseInt(pow); j++) {
      if (j == parseInt(pow) - 1) {
        neweq += powered;
        break;
      }
      neweq += powered + "x";
    }
    console.log(neweq);
    equation = equation.substring(0, i) + "(" + neweq + ")" + equation.substring(spot + pow.length + 1);
    return PowerParenthesis(equation)
  } else {
    FirstCatch(equation);
  }
}




function FirstCatch(equation) {
  equation = equation.trim();
  if (equation.includes("(")) {
    let start = equation.lastIndexOf("(")
    let end = equation.indexOf(")", start);
    console.log(`Start: ${start}, End:${end}`);
    let ToSolve = equation.substring(start + 1, end);
    console.log(`${ToSolve}`);
    let res = Result(ToSolve);
    console.log('Result:' + `${res}`);
    console.log(equation.substring(0, start) + res + equation.substring(end + 1));
    return FirstCatch(equation.substring(0, start) + res + equation.substring(end + 1));
  } else {
    var res = Result(equation);
  }
  sessionStorage.setItem("LastAnswer", `${res}`);
  document.getElementById("Result").innerHTML = `${res}`;
}




function Result(equation) {
  if (equation.includes("x")) {
    equation = equation.replace(/x/g, "*");
  }
  if (equation.includes("%")) {
    equation = equation.replace(/%/g, "÷100");
  }
  equation = equation.trim();
  let res = 0;
  let WholeEq = equation.split(/(\+|\-)/);
  for (let i = 0; i < WholeEq.length; i++) {
    if (WholeEq[i].match(/(\*|\÷)/)) {
      let part = WholeEq[i].split(/(\*|\÷)/);
      for (let j = 0; j < part.length; j++) {
        if (part[1] == "*") {
          res = 0;
          res += parseFloat(part[0] * part[2]);
          part = part.slice(3);
          part.unshift(res);
          j = 0;
        } else if (part[1] == "÷") {
          res = 0;
          res += parseFloat(part[0] / part[2]);
          part = part.slice(3);
          part.unshift(res);
          j = 0;
        }
        if (part.length == 1) {
          res = part[0];
          WholeEq[i] = res;
        }
      }
    }
  }
  for (let k = 0; k < WholeEq.length; k++) {
    if (WholeEq[1] == "+") {
      res = 0;
      res += parseFloat(WholeEq[0]) + parseFloat(WholeEq[2]);
      WholeEq = WholeEq.slice(3);
      WholeEq.unshift(res);
      k = 0;
    } else if (WholeEq[1] == "-") {
      res = 0;
      res += parseFloat(WholeEq[0]) - parseFloat(WholeEq[2]);
      WholeEq = WholeEq.slice(3);
      WholeEq.unshift(res);
      k = 0;
    }
    if (WholeEq.length == 1) {
      res = WholeEq[0];
    }
  }
  return res;
}

function Copy() {
  let ResultToBeCopied = document.getElementById("Result").textContent;
  navigator.clipboard.writeText(ResultToBeCopied);
}

function LastAnswer() {
  // Check if a session item exists
  if (sessionStorage.getItem("LastAnswer") === null) {
    console.log("No session found");
  } else {
    let value = sessionStorage.getItem("LastAnswer");
    let equation = document.getElementById("Equation");
    equation.innerHTML += value;
    EnableButtons(OPERATOR_BUTTONS);
    console.log("Session found");
  }
}


function EnableButtons(array) {
  if (document.getElementById(array[0]).disabled) {
    for (let i = 0; i < array.length; i++) {
      let button = document.getElementById(array[i]);
      button.removeAttribute("disabled");
    }
  }
}

function DisableButtons(array) {
  if (!document.getElementById(array[0]).disabled) {
    for (let i = 0; i < array.length; i++) {
      let button = document.getElementById(array[i]);
      button.setAttribute("disabled","");
    }
  }
}
