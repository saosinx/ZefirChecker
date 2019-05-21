document.addEventListener(
  "DOMContentLoaded",
  () => {
    zefirButton.addEventListener(
      "click",
      () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          port = chrome.tabs.connect(tabs[0].id, { name: "knockknock" });
          port.postMessage({ joke: "Knock knock" });

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
