const terminal = document.querySelector(".ckeditor");
let carIsInited = false;

function print(text) {
  const line = document.createElement("div");
  line.innerHTML = text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function handleCommand(value) {
  value = value.trim();

  if (
    value === "car init" ||
    value === "sudo car init" ||
    value === "car init --force" ||
    value === "sudo car init --force"
  ) {
    if (carIsInited && !value.includes("--force")) {
      print("<span style='color: red;'>error</span>: already initialized.");
      print("<span style='color: red;'>error</span>: use car init --force");
    } else {
      print("<span style='color: blue;'>info</span>: creating car configs");
      print("<span style='color: blue;'>info</span>: updating package list");
      print("<span style='color: green;'>ok</span>: package list updated");
      carIsInited = true;
    }
  } else if (value === "car listup" || value === "sudo car listup") {
    print("<span style='color: blue;'>info</span>: updating package list");
    print("<span style='color: green;'>ok</span>: package list updated");
  } else if (value === "car" || value === "sudo car") {
    print(
      "<span style='color: blue;'>info</span>: Usage: car [command] [options] [flags]",
    );
    print("<span style='color: blue;'>info</span>: Options:");
    print(
      "<span style='color: blue;'>info</span>: &nbsp;&nbsp;-v, --version   show version information and exit",
    );
    print(
      "<span style='color: blue;'>info</span>: &nbsp;&nbsp;init |Flags|    initialize car",
    );
    print(
      "<span style='color: blue;'>info</span>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--force    force initialization when already initialized",
    );
    print(
      "<span style='color: blue;'>info</span>: &nbsp;&nbsp;listup          update list of packages",
    );
    print(
      "<span style='color: blue;'>info</span>: &nbsp;&nbsp;install         install packages",
    );
    print(
      "<span style='color: blue;'>info</span>: <span style='color: red;'>currently unavailable in the web demo</span>&nbsp;&nbsp;          delete packages",
    );
    print(
      "<span style='color: blue;'>info</span>: &nbsp;&nbsp;update          run listup and perform a system upgrade",
    );
    print(
      "<span style='color: blue;'>info</span>: <span style='color: red;'>unavailable in the web demo</span>&nbsp;&nbsp;search for packages",
    );
    print(
      "<span style='color: blue;'>info</span>: <span style='color: red;'>unavailable in the web demo</span>&nbsp;&nbsp;cleanbuild      use rare to compile a package in docker",
    );
    print("<span style='color: blue;'>info</span>: License: GPLv3-only");
    print(
      "<span style='color: blue;'>info</span>: Authors: Juraj Kollár &lt;mostypc7@gmail.com&gt;",
    );
  } else if (
    value.startsWith("car get") ||
    value.startsWith("sudo car get") ||
    value.startsWith("car install") ||
    value.startsWith("sudo car install") ||
    value.startsWith("car i") ||
    value.startsWith("sudo car i")
  ) {
    let packageName = value
      .replace(/^sudo\s+/, "")
      .replace(/^car\s+(get|install|i)\s+/, "");

    print(
      "<span style='color: blue;'>info</span>: downloading https://github.com/redroselinux/car3-pkgs/raw/refs/heads/main/" +
        packageName +
        ".tar.zst",
    );

    setTimeout(() => {
      print("######################################################### 100.0%");
      print(
        "<span style='color: green;'>ok</span>: downloads took 0.500 seconds",
      );

      setTimeout(() => {
        print(
          "<span style='color: green;'>ok</span>: installed " +
            packageName +
            " successfully in 89 ms",
        );

        createLine();
      }, 89);
    }, 500);
  } else if (
    value === "car --version" ||
    value === "car -v" ||
    value === "sudo car --version" ||
    value === "sudo car -v"
  ) {
    print(
      "<span style='color: blue;'>info</span>: car version 3.10 (nim rewrite of c rewrite of origin python version) (2026-04-04, 14:50:31) [Nim 2.2.8] on linux",
    );
    print(
      "<span style='color: blue;'>info</span>: author: mostypc123 &lt;mostypc7@gmail.com&gt;",
    );
    print(
      "<span style='color: blue;'>info</span>: source: https://github.com/redroselinux/car",
    );
  } else {
    print("Unknown command: " + value);
    createLine();
  }
}

function createLine() {
  const line = document.createElement("div");
  line.style.display = "flex";
  line.style.gap = "8px";

  const prompt = document.createElement("span");
  prompt.textContent = "$";
  prompt.style.color = "#ff8787";

  const input = document.createElement("input");
  input.style.background = "transparent";
  input.style.border = "none";
  input.style.outline = "none";
  input.style.color = "#fff";
  input.style.fontFamily = "monospace";
  input.style.fontSize = "20px";
  input.style.flex = "1";

  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value;
      input.remove();
      const text = document.createElement("span");
      text.textContent = value;
      line.appendChild(text);

      if (
        value.startsWith("car get") ||
        value.startsWith("sudo car get") ||
        value.startsWith("car install") ||
        value.startsWith("sudo car install") ||
        value.startsWith("car i") ||
        value.startsWith("sudo car i")
      ) {
        handleCommand(value);
      } else {
        handleCommand(value);
        if (
          !value.startsWith("car get") &&
          !value.startsWith("sudo car get") &&
          !value.startsWith("car install") &&
          !value.startsWith("sudo car install") &&
          !value.startsWith("car i") &&
          !value.startsWith("sudo car i")
        ) {
          createLine();
        }
      }

      terminal.scrollTop = terminal.scrollHeight;
    }
  });

  line.appendChild(prompt);
  line.appendChild(input);
  terminal.appendChild(line);
}

createLine();
