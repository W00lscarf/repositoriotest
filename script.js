/* Estado interno de la calculadora */
const state = {
  display: "0",      // lo que ves
  first: null,       // primer operando
  op: null,          // operación pendiente: add, subtract, multiply, divide
  waitingSecond: false, // si estamos escribiendo el segundo operando
};

const displayEl = document.getElementById("display");
const keysEl = document.querySelector(".keys");

/* Renderizar en pantalla */
function updateDisplay() {
  displayEl.textContent = state.display.replace(".", ","); // coma para visualización
}
updateDisplay();

/* Helpers */
const toNumber = (s) => Number(s.replace(",", "."));
const clampLength = (s, max = 14) => (s.length > max ? s.slice(0, max) : s);

/* Operaciones puras: no tocan el DOM */
function compute(a, b, op) {
  switch (op) {
    case "add": return a + b;
    case "subtract": return a - b;
    case "multiply": return a * b;
    case "divide": return b === 0 ? "Error" : a / b;
    default: return b;
  }
}

/* Gestión de clics en teclas */
keysEl.addEventListener("click", (e) => {
  const key = e.target.closest("button");
  if (!key) return;

  if (key.dataset.digit != null) {
    onDigit(key.dataset.digit);
  } else if (key.dataset.action === "decimal") {
    onDecimal();
  } else if (key.dataset.action === "clear") {
    onClear();
  } else if (key.dataset.action === "backspace") {
    onBackspace();
  } else if (key.dataset.action === "sign") {
    onSign();
  } else if (key.dataset.action === "percent") {
    onPercent();
  } else if (key.dataset.action === "equals") {
    onEquals();
  } else if (key.dataset.op) {
    onOperator(key.dataset.op);
  }
  updateDisplay();
});

/* Entrada por teclado físico */
window.addEventListener("keydown", (e) => {
  const k = e.key;
  if (/\d/.test(k)) return onDigit(k), updateDisplay();
  if (k === "." || k === ",") return onDecimal(), updateDisplay();
  if (k === "Backspace") return onBackspace(), updateDisplay();
  if (k === "Escape") return onClear(), updateDisplay();
  if (k === "Enter" || k === "=") return onEquals(), updateDisplay();
  if (k === "+") return onOperator("add"), updateDisplay();
  if (k === "-") return onOperator("subtract"), updateDisplay();
  if (k === "*") return onOperator("multiply"),*
