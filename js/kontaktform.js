let kontakt = document.querySelector("#contact-select");

kontakt.addEventListener("change", function () {
  // hide contact method fields
  contactMethod = document.querySelector(".contact-method");
  contactMethod.innerHTML = "";
  if (kontakt.value == "epost") {
    contactMethod.innerHTML = `<label for="contact-input">Epost*</label>
    <input type="email" name="contactMethod" id="contact-input" required/>`;
  } else if (kontakt.value == "telefon") {
    contactMethod.innerHTML = `<label for="contact-input">Telefonnummer*</label>
    <input type="tel" name="contactMethod" id="contact-input" required/>`;
  }
});
