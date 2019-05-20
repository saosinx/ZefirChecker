document.addEventListener(
  "DOMContentLoaded",
  () => {
    zefirButton.addEventListener(
      "click",
      () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          chrome.tabs.sendMessage(tabs[0].id, {
            string: document.getElementById("zefirString").value
          });
        });
      },
      false
    );
  },
  false
);
