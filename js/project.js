document.addEventListener("DOMContentLoaded", () => {
  // --------------------------
  // Section nav active link & sticky
  // --------------------------
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#sectionNav a");
  const nav = document.getElementById("sectionNav");
  const navOffset = nav ? nav.offsetTop : 0;

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80; // adjust for nav height
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });

    if (nav) {
      nav.classList.toggle("fixed", window.scrollY >= navOffset);
    }
  });

  // --------------------------
  // Stat box toggle
  // --------------------------
  document.querySelectorAll('.stat-box').forEach(box => {
    box.addEventListener('click', () => box.classList.toggle('expanded'));
  });

  // --------------------------
  // Tabs & cards
  // --------------------------
  const notecards = document.querySelectorAll('.notecard');

  notecards.forEach(card => {
    const tabs = card.querySelectorAll('.tabs button');
    const panels = card.querySelectorAll('[role="tabpanel"]');
    let activeIndex = 0;

    function showCard(index) {
      panels.forEach((panel, i) => panel.classList.toggle('active', i === index));
      tabs.forEach((tab, i) => tab.setAttribute('aria-selected', i === index ? 'true' : 'false'));
      activeIndex = index;
    }

    // Initial display
    showCard(0);

    // Tab click
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => showCard(i));
    });

    // Arrow navigation
    card.querySelectorAll('.card-header').forEach(header => {
      const prevBtn = header.querySelector('.prev');
      const nextBtn = header.querySelector('.next');

      prevBtn?.addEventListener('click', () => {
        const newIndex = (activeIndex - 1 + panels.length) % panels.length;
        showCard(newIndex);
      });

      nextBtn?.addEventListener('click', () => {
        const newIndex = (activeIndex + 1) % panels.length;
        showCard(newIndex);
      });
    });
  });

  // --------------------------
  // Responsive tabs (wrap detection)
  // --------------------------
  function updateLayout() {
    document.querySelectorAll('.notecard').forEach(card => {
      const tabsContainer = card.querySelector('.tabs');
      const panels = card.querySelectorAll('[role="tabpanel"]');
      if (!tabsContainer) return;

      const isWrapped = tabsContainer.scrollHeight > 50;
      tabsContainer.style.display = isWrapped ? 'none' : 'flex';
      panels.forEach(panel => {
        const header = panel.querySelector('.card-header');
        if (header) header.style.display = isWrapped ? 'flex' : 'none';
      });
    });
  }

  window.addEventListener('load', updateLayout);
  window.addEventListener('resize', updateLayout);
});
