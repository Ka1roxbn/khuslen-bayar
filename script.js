const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Текстүүд яг байгаагаар нь
const texts = [
  "Khuslenbayar-",
  "クスレンバヤル-"
];

const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);

// Багана бүрт y байрлал, текст индекс, үсгийн индекс, хурд хадгалах
const drops = Array.from({ length: columns }).map(() => ({
  y: Math.random() * canvas.height,
  textIndex: Math.floor(Math.random() * texts.length),
  charIndex: 0,
  speed: Math.random() * 1.5 + 0.5
}));

// Солонгорсон өнгө үүсгэгч функц
function getRainbowColor(i) {
  const freq = 0.3;
  const r = Math.floor(Math.sin(freq * i + 0) * 127 + 128);
  const g = Math.floor(Math.sin(freq * i + 2) * 127 + 128);
  const b = Math.floor(Math.sin(freq * i + 4) * 127 + 128);
  return `rgb(${r},${g},${b})`;
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < columns; i++) {
    const drop = drops[i];
    const currentText = texts[drop.textIndex];
    const char = currentText[drop.charIndex % currentText.length];

    ctx.fillStyle = getRainbowColor(i);
    ctx.fillText(char, i * fontSize, drop.y);

    drop.y += fontSize * drop.speed;

    if (drop.y > canvas.height) {
      drop.y = 0;
      drop.speed = Math.random() * 1.5 + 0.5;
      drop.textIndex = Math.floor(Math.random() * texts.length);
      drop.charIndex = 0;
    } else {
      drop.charIndex++;
    }
  }
}

// 50ms тутам зурдаг loop
setInterval(draw, 50);
