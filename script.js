let user_input = document.getElementById("user-input");
let buttons = document.querySelectorAll("button");
console.log("buttons", buttons);

let isOperatorClicked = false;
let isDotClicked = false;


buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let buttonValue = e.target.textContent;
    let currentInput = user_input.textContent;

    if (buttonValue === "C") {
      user_input.textContent = "";
      isOperatorClicked = false;
      isDotClicked = false;
    } else if (buttonValue === "X") {
      user_input.textContent = currentInput.slice(0, -1);
    } else if (buttonValue === "=") {
      try {
        user_input.textContent = eval(currentInput);
      } catch (error) {
        user_input.textContent = "0";
      }
      isOperatorClicked = false;
      isDotClicked = false;
    } else {
      if (buttonValue === "0" && (currentInput === "" || isOperatorClicked || currentInput > 0) ) {
        user_input.textContent += buttonValue;
        
      } 
      else if (
        buttonValue === "0" && 
        currentInput.endsWith("0") &&
        !isOperatorClicked
      ) {
        
        return;
      } 
      else if (
        /[-+*/%.]/.test(currentInput.slice(-1)) &&
        /[-+*/%.]/.test(buttonValue)
      ) {
        currentInput = currentInput.slice(0, -1);
        user_input.textContent = currentInput;
        user_input.textContent += buttonValue;
      } else {
        const lastChar = currentInput.slice(-1);

        if (/[-+*/%.]/.test(lastChar)) {
          isOperatorClicked = true;
        }
        if (buttonValue === "." && buttonValue === "0") {
          if (isDotClicked) {
            return;
          }
          isDotClicked = true;
        }

        user_input.textContent += buttonValue;
      }
    }
    user_input.scrollTop = user_input.scrollHeight;
    user_input.scrollLeft = user_input.scrollWidth;
  });
});
