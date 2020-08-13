let leftSide = document.querySelector(".left-side");
console.log(leftSide);

leftSide.innerHTML = `
<nav>
  <ul>
    <a href="/index.html"><li>Hem</li></a>
    <a href="/html/gasthamn.html"><li>Gästhamn</li></a>
    <a href="/html/kontakt.html"><li>Kontakt</li></a>
    <a href="/html/turism.html"><li>Turism</li></a>
    <a href="/html/historia.html"><li>Historia</li> </a>
    <a href="/html/medlem.html"><li>Medlem</li> </a>
    <a href="/html/english.html"><li>English</li></a>
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
