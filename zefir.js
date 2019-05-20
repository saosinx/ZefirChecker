chrome.runtime.onMessage.addListener(request => {
  const list = document.getElementById("cycle_version") || null;
  const string = request.string.length ? request.string.toLowerCase() : null;

  if (list && string) {
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
});
