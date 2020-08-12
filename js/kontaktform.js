let kontakt = document.querySelector("#contact-select");
console.log(kontakt);

const form = document.querySelector("#contact-form");

kontakt.addEventListener("change", function (event) {
  console.log(kontakt.value);
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

  //   contactFields.forEach((el) => {
  //     el.classList.add("hidden");
  //   });

  //   if (kontakt.value == "epost") {
  //     document.querySelector("#epost-p").classList.remove("hidden");
  //   } else if (kontakt.value == "telefon") {
  //     document.querySelector("#telefon-p").classList.remove("hidden");
  //   }
});
