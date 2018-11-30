{
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  let lastChecked;

  const handleCheck = (event) => {
    let inBetween = false;

    // ! using event.shiftKey
    if (event.shiftKey === true && event.target.checked) {
      checkboxes.forEach((checkbox) => {
        if (checkbox === lastChecked || checkbox === event.target) {
          inBetween = !inBetween;
        }

        if (inBetween === true) checkbox.checked = true;
      });
    }
    lastChecked = event.target;
  };

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', handleCheck);
  });
}
