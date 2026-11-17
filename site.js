// Shared behaviour for all pages. Loaded with `defer`, so the DOM is ready.
(function () {
    // Current year in the footer
    document.querySelectorAll('[data-current-year]').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    // Mobile menu toggle
    document.querySelectorAll('.navbar-burger').forEach(function (burger) {
        var menu = document.getElementById(burger.dataset.target);
        if (!menu) return;

        function setOpen(open) {
            burger.classList.toggle('is-active', open);
            menu.classList.toggle('is-active', open);
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        burger.addEventListener('click', function () {
            setOpen(!menu.classList.contains('is-active'));
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('is-active')) {
                setOpen(false);
                burger.focus();
            }
        });
        document.addEventListener('click', function (e) {
            if (menu.classList.contains('is-active') && !menu.contains(e.target) && !burger.contains(e.target)) {
                setOpen(false);
            }
        });
    });

    // Navbar shadow once the page is scrolled
    var navbar = document.querySelector('.main-navbar');
    if (navbar) {
        var update = function () { navbar.classList.toggle('has-shadow', window.scrollY > 10); };
        update();
        window.addEventListener('scroll', update, { passive: true });
    }
})();
