const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");
let currentInput = ""; // Stores the full input as a string

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (!isNaN(value)) {
      // Append number to current input
      currentInput += value;
      screen.textContent = currentInput;
    } else if (button.classList.contains("operator")) {
      // Add operator to current input
      const operator = button.getAttribute("data-operator");
      if (currentInput && !["+", "-", "*", "/"].includes(currentInput.slice(-1))) {
        currentInput += operator;
        screen.textContent = currentInput;
      }
    } else if (value === "←") {
      // Backspace functionality
      currentInput = currentInput.slice(0, -1);
      screen.textContent = currentInput || "0";
    } else if (value === "=") {
      // Evaluate the expression safely
      try {
        const result = eval(currentInput.replace(/÷/g, "/").replace(/×/g, "*"));
        currentInput = result.toString();
        screen.textContent = currentInput;
      } catch (error) {
        screen.textContent = "Error";
        currentInput = "";
      }
    } else if (value === "C") {
      // Clear all input
      currentInput = "";
      screen.textContent = "0";
    }
  });
});
