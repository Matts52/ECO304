// Function to generate the navbar
function generateNavbar() {
    // Get the current page URL
    var currentPage = window.location.pathname;
 
    // Define the navigation links
    var navLinks = [
       { id: 'home', text: 'Home', href: '/ECO304/' },
       { id: 'questions', text: 'Questions', href: '/ECO304/Questions' },
       { id: 'visualizations', text: 'Visualizations', href: '/ECO304/Visualizations' },
       { id: 'animations', text: 'Animations', href: '/ECO304/Animations' },
       { id: 'gradeCalc', text: 'Grade Calculator', href: '/ECO304/GradeCalc' },
       { id: 'glossary', text: 'Glossary', href: '/ECO304/Glossary' }
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

 

