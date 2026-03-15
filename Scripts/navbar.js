// Function to generate the navbar
function generateNavbar() {
   var currentPage = window.location.pathname;
   var fixedLocation = '/ECO304';

   var navLinks = [
      { id: 'home', text: 'Home', href: '/' },
      { id: 'questions', text: 'Questions', href: '/Questions' },
      { id: 'visualizations', text: 'Visualizations', href: '/Visualizations' },
      { id: 'animations', text: 'Animations', href: '/Animations' },
      { id: 'gradeCalc', text: 'Grade Calculator', href: '/Grades' },
      { id: 'histGrades', text: 'Historical Grades', href: '/HistoricalGrades' },
      { id: 'glossary', text: 'Glossary', href: '/Glossary' },
      { id: 'resources', text: 'Resources', href: '/Resources' }
   ];

   var linksHtml = '';
   for (var i = 0; i < navLinks.length; i++) {
      var link = navLinks[i];
      linksHtml += '<a id="' + link.id + '" href="' + fixedLocation + link.href + '">' + link.text + '</a>';
   }

   var navbarHtml =
      '<nav class="topnav">' +
         '<a class="nav-wordmark" href="' + fixedLocation + '/">ECO304</a>' +
         '<button class="nav-hamburger" aria-label="Toggle navigation" onclick="this.classList.toggle(\'open\'); document.getElementById(\'nav-links\').classList.toggle(\'open\')">&#9776;</button>' +
         '<div id="nav-links" class="nav-links">' + linksHtml + '</div>' +
      '</nav>';

   document.getElementById('navbar-container').innerHTML = navbarHtml;

   var currentPageLink = document.querySelector('#nav-links a[href="' + currentPage + '"]');
   if (currentPageLink) {
      currentPageLink.classList.add('active');
   }
}



