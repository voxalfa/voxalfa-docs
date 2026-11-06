async function fetchWasmModule() {
  const module = await import("/assets/wasm/voxalfa_wasm.js");
  const init = module.default;

  try {
    await init();
  } catch (error) {
    throw new Error(`Failed to initialize WASM module: ${error}`);
  }

  return module;
}

function initializeButtons(_wasm) {
  const codeBlocks = Array.from(
    document.querySelectorAll("pre > code[data-language='voxalfa']"),
  ).filter((node) => !node.className.includes("fragment"));

  for (const block of codeBlocks) {
    const buttonContainer = block.previousElementSibling;
    const previewButton = document.createElement("button");

    previewButton.innerHTML = previewIcon;
    previewButton.className = "custom-button";

    previewButton.addEventListener("click", () => {
      // TODO
    });

    buttonContainer.appendChild(previewButton);
  }
}

const previewIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
  <path d="M21 5v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-2 0H5v9.59l3.29-3.29a1 1 0 0 1 1.42 0L13 14.59l2.29-2.3a1 1 0 0 1 1.42 0L19 14.59V5zm0 12.41-3-3-2.29 2.29a1 1 0 0 1-1.42 0L9 13.41l-4 4V19h14v-1.59z"/>
</svg>`;

fetchWasmModule().then((wasm) => {
  initializeButtons(wasm);
});
