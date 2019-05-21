function setListOption(list, string) {
  const children = list.children.length;

  for (let i = 0; i < children; i += 1) {
    const child = list.children[i];
    const childString = child.innerHTML.toLowerCase();

    if (childString.includes(string)) {
      list.value = child.value;

      list.classList.remove("zefirSuccess");
      void list.offsetWidth;
      list.classList.add("zefirSuccess");
    }
  }
}

chrome.runtime.onMessage.addListener(request => {
  const list = document.getElementById("cycle_version") || null;
  const string = request.string.length ? request.string.toLowerCase() : null;

  if (list && string) {
    setListOption(list, string);
  }
});

console.log("DOMContentLoaded");

const zefirSelect = document.getElementById("zefir-select");
zefirSelect.addEventListener("click", function() {
  this.classList.add("zefir-select-container_focused");
  this.classList.add("zefir-select-container_opened");

  if (this.id !== "zefir-select") {
    console.log("unfocused");
  }
});

document.addEventListener("click", function(e) {
  if (!e.target.closest("#zefir-select")) {
    zefirSelect.classList.remove(
      "zefir-select-container_focused",
      "zefir-select-container_opened"
    );
  }
});
