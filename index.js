const tw = document.getElementById("typewriter");

const words = [
  "FOSS only",
  "Reproducible",
  "Rolling and stable",
  "Riced",
  "User-friendly",
  "Dev-friendly"
];

const speed = 95; // (ms)
const pause = 1200; // time available to read

async function typeIt(txt) {
  for (let i = 0; i <= txt.length; i++) {
    tw.innerHTML = txt.slice(0, i) + '<span class="cursor"></span>';
    await new Promise(r => setTimeout(r, speed));
  }
}

async function backspace() {
  let t = tw.textContent;
  while (t.length) {
    t = t.substring(0, t.length - 1);
    tw.innerHTML = t + '<span class="cursor"></span>';
    await new Promise(r => setTimeout(r, speed / 1.8));
  }
}

async function run() {
  for (;;) {
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      await typeIt(w);
      await new Promise(r => setTimeout(r, pause));
      await backspace();
    }
  }
}

run();
