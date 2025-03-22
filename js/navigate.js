document.addEventListener("DOMContentLoaded", () => {
    fetch("/header.html")
        .then(res => res.text())
        .then(html => document.getElementById("header").innerHTML = html);

    <!-- Identify the current page and highlight the navigation item -->
    setTimeout(() => {
        const navLinks = document.querySelectorAll('#header-nav a');
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        console.log('Current page:', currentPage);
        console.log('navLinks:', navLinks);

        navLinks.forEach(link => {
            console.log('Link:', link.getAttribute('href'));
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }, 50); // wait for 50ms, aim to ensure the header is loaded
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("/footer.html")
        .then(res => res.text())
        .then(html => document.getElementById("footer").innerHTML = html);

});