const grid = document.getElementById('numberGrid');
const stats = document.getElementById('stats');
const modal = document.getElementById('modal');
const modalNumber = document.getElementById('modalNumber');
const confirmBtn = document.getElementById('confirmBtn');

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');

let vendidos = 0;
let currentNumberDiv = null;
let currentNumberValue = null;
const data = {};

for (let i = 0; i < 10000; i++) {
  let num = i.toString().padStart(4, '0');
  let div = document.createElement('div');
  div.textContent = num;
  div.className = 'number';

  div.addEventListener('click', () => {
    if (div.classList.contains('sold')) return;
    currentNumberDiv = div;
    currentNumberValue = num;
    modalNumber.textContent = num;
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    modal.style.display = 'flex';
  });

  grid.appendChild(div);
}

confirmBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !phone || !email) {
    alert("Por favor completa todos los campos.");
    return;
  }

  data[currentNumberValue] = { name, phone, email };
  currentNumberDiv.classList.add('sold');
  vendidos++;
  stats.textContent = `Vendidos: ${vendidos} | Disponibles: ${10000 - vendidos}`;
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

function activarAdmin() {
  const clave = prompt("Ingresa la clave secreta:");
  if (clave === "admin123") {
    document.getElementById("adminTools").style.display = "block";
    alert("Modo administrador activado ✅");
  } else {
    alert("Clave incorrecta ❌");
  }
}

function mostrarData() {
  const output = document.getElementById('output');
  let texto = "";

  for (let num in data) {
    const d = data[num];
    texto += `Número: ${num}\nNombre: ${d.name}\nCelular: ${d.phone}\nCorreo: ${d.email}\n\n`;
  }

  output.textContent = texto || "Aún no hay datos registrados.";
}

function descargarData() {
  let texto = "";

  for (let num in data) {
    const d = data[num];
    texto += `Número: ${num}\nNombre: ${d.name}\nCelular: ${d.phone}\nCorreo: ${d.email}\n\n`;
  }

  if (texto === "") {
    alert("No hay datos para descargar.");
    return;
  }

  const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "rifa_compradores.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
