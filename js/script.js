document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.custom-navbar');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('#navbarNav');

  function handleScroll() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (window.scrollY >= sectionTop - navbar.offsetHeight && window.scrollY < sectionTop + sectionHeight - navbar.offsetHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href').substring(1);
      link.classList.toggle('active', href === current);
    });

    if (window.scrollY > 50) {
      navbar.classList.add('solid');
    } else {
      navbar.classList.remove('solid');
    }
  }

  window.addEventListener('scroll', handleScroll);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - navbar.offsetHeight,
          behavior: 'smooth',
        });

        // Automatically close the navbar on link click
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true,
        });

        handleScroll(); // Update active class after scroll
      }
    });
  });

  // Let Bootstrap handle the toggling
  navbarToggler.addEventListener('click', function () {
    // Do nothing, Bootstrap will handle the toggling
  });

  handleScroll();
});
