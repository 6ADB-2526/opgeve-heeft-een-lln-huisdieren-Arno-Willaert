// lijst met namen

const users = [
  { id: 1, naam: "Kleintjes", voornaam: "Karel" },
  { id: 2, naam: "Dotjes", voornaam: "Els" },
  { id: 3, naam: "Kleintjes", voornaam: "Steven" },
];

const select = document.getElementById("mySelect");
const welkom = document.getElementById("welkom");
const checkbox = document.getElementById("heeftHuisdieren");
const dierenContainer = document.getElementById("dierenContainer");
const form = document.getElementById("myForm");

// ====== 1. Selecteer persoon ======
select.addEventListener("change", () => {
  const selectedId = parseInt(select.value);
  const user = users.find((u) => u.id === selectedId);
  if (user) {
    welkom.textContent = `Welkom ${user.voornaam} ${user.naam}`;
  } else {
    welkom.textContent = "";
  }
});

// ====== 2. Checkbox toggle ======
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    dierenContainer.classList.remove("visually-hidden");
    // voeg meteen eerste veld toe
    if (dierenContainer.querySelectorAll("input").length === 0) {
      addDierInput();
    }
  } else {
    dierenContainer.classList.add("visually-hidden");
    dierenContainer.innerHTML = `<label class="form-label">Naam van het huisdier(en)</label>`;
  }
});

// ====== 3. Dynamisch invulvelden toevoegen ======
function addDierInput() {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control mb-2";
  input.placeholder = "Vul de naam van het huisdier in";

  input.addEventListener("input", () => {
    const allInputs = dierenContainer.querySelectorAll("input");
    const lastInput = allInputs[allInputs.length - 1];
    if (lastInput.value.trim() !== "") {
      addDierInput();
    }
  });

  dierenContainer.appendChild(input);
}

// ====== 4. Versturen ======
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dierenNamen = [];
  if (checkbox.checked) {
    const inputs = dierenContainer.querySelectorAll("input");
    inputs.forEach((inp) => {
      if (inp.value.trim() !== "") {
        dierenNamen.push(inp.value.trim());
      }
    });
  }

  console.log("Ingevoerde dieren:", dierenNamen);
});
