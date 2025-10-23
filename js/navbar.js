// navbar.js
const navbarHTML = `
<nav id="mainNav">
  <a href="https://chriskreienkamp.github.io/">Home</a>
  <a href="https://chriskreienkamp.github.io/projects.html">Projects</a>
  <a href="https://chriskreienkamp.github.io/about.html">About</a>
</nav>
`;

// Insert navbar into a placeholder div
document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("nav-placeholder");
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;
  }
});
