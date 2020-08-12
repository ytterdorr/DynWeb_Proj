let kontakt = document.querySelector("#contact");
console.log(kontakt);

const form = document.querySelector("#contact-form");

kontakt.addEventListener("change", function (event) {
  console.log(kontakt.value);
});
