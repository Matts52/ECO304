// Function to generate the navbar
function generateNavbar() {
    // Get the current page URL
    var currentPage = window.location.pathname;
 
    // Define the navigation links
    var navLinks = [
       { id: 'home', text: 'Home', href: '/' },
       { id: 'questions', text: 'Questions', href: '/Questions' },
       { id: 'visualizations', text: 'Visualizations', href: '/Visualizations' },
       { id: 'animations', text: 'Animations', href: '/Animations' },
       { id: 'gradeCalc', text: 'Grade Calculator', href: '/GradeCalc' },
       { id: 'glossary', text: 'Glossary', href: '/Glossary' }
    ];
 
    // Create the navbar HTML
    var navbarHtml = '<div class="topnav">';
    for (var i = 0; i < navLinks.length; i++) {
       var link = navLinks[i];
       navbarHtml += '<a id="' + link.id + '" href="' + link.href + '">' + link.text + '</a>';
    }
    navbarHtml += '</div>';
 
    // Set the generated navbar in the container
    document.getElementById('navbar-container').innerHTML = navbarHtml;
 
    // Set the active class on the current page link
    var currentPageLink = document.querySelector('a[href="' + currentPage + '"]');
    if (currentPageLink) {
       currentPageLink.classList.add('active');
    }
 }
 
 // Call the function when the page is loaded
 window.onload = generateNavbar;