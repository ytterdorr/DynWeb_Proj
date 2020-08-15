let leftSide = document.querySelector(".left-side");
console.log(leftSide);

let relPath;
if (window.location.origin == "https://ytterdorr.github.io") {
  relPath = "/Djupvik";
} else {
  relPath = "";
}

leftSide.innerHTML = `
<nav>
  <ul>
    <a href="${relPath}/index.html"><li>Hem</li></a>
    <a href="${relPath}/html/gasthamn.html"><li>Gästhamn</li></a>
    <a href="${relPath}/html/kontakt.html"><li>Kontakt</li></a>
    <a href="${relPath}/html/turism.html"><li>Turism</li></a>
    <a href="${relPath}/html/historia.html"><li>Historia</li> </a>
    <a href="${relPath}/html/medlem.html"><li>Medlem</li> </a>
    <a href="${relPath}/html/english.html"><li>English</li></a>
  </ul>
</nav>

  <footer>
    <p>©Djupvikshamn.se <br/>
    info@djupvikshamn.se</p>
  </footer>
`;

function toggleMenu() {
  document.querySelector(".left-side").classList.toggle("show-menu");
  document.querySelector(".menu-button").classList.toggle("show-menu");
  document.querySelector(".close-menu-background").classList.toggle("hidden");
}

function showMenu() {
  menu = document.querySelector(".left-side");
  menu.classList.add("show-menu");
  document.querySelector(".menu-button").classList.add("show-menu");
}

function hideMenu() {
  document.querySelector(".left-side").classList.remove("show-menu");
  document.querySelector(".menu-button").classList.remove("show-menu");
}
