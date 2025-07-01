document.addEventListener("DOMContentLoaded", function() {
  const telInputs = document.querySelectorAll(".select-tel");
  telInputs.forEach(input => {
    window.intlTelInput(input, {
      initialCountry: "gb",
      separateDialCode: true,
      autoPlaceholder: "off",
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js"
    });
  });
});
