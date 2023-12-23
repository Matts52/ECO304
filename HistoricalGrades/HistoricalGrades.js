window.onload = function() {
    generateNavbar();

    // Set selected values based on URL parameters
    setSelectedBasedOnUrlParam("selectSemester", "semester");
    setSelectedBasedOnUrlParam("selectMajor", "major");

    // Generate chart
    visualizeGrades();
}


async function visualizeGrades() {

    // Fetch project data from JSON file and filter for selected category
    const response = await fetch('../Data/Historical_Grades.json');
    var grades_data = await response.json();

    const semParam = getUrlParameter('semester')
    const majorParam = getUrlParameter('major')

    // do any filtering based on url parameters
    if (semParam && semParam != 'All') {
        grades_data = grades_data.filter(record => record.Semester.trim() === semParam);
    }

    if (majorParam && majorParam != 'All') {
        grades_data = grades_data.filter(record => record.Major.trim() === majorParam);
    }

    data = grades_data;

    //console.table(data);

    // Initialize an array to store counts in each bucket
    const bucketCounts = Array(20).fill(0);

    // Calculate counts in each bucket
    data.forEach(entry => {
      const grade = entry.Grade;
      const bucketIndex = Math.floor(grade / 5); // Assuming 20 buckets, each of width 5
      bucketCounts[bucketIndex]++;
    });

    const canvas = document.getElementById('histogramChart');
    const ctx = canvas.getContext('2d');

    // generate the chart
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 20 }, (_, index) => `${index * 5}-${(index + 1) * 5 - 1}`),
        datasets: [{
          label: 'Grade Distribution',
          data: bucketCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: { 
            title: {
              display: true,
              text: 'Grade Range'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Count'
            }
          }
        }
      }
    });
}


// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
// Function to set selected attribute based on URL parameters
function setSelectedBasedOnUrlParam(selectId, paramName) {
    var paramValue = getUrlParameter(paramName);
    if (paramValue) {
      $("#" + selectId).val(paramValue);
    }
  }



// Wait for select box changes
$("#selectSemester, #selectMajor").change(function() {
    var semesterValue = $("#selectSemester").val();
    var majorValue = $("#selectMajor").val();
    
    var url = [location.protocol, '//', location.host, location.pathname].join('');
    
    // Include selected values in the URL
    if (semesterValue) {
      url += "?semester=" + semesterValue;
    }
    
    if (majorValue) {
      // Add '&' if semesterValue is present in the URL
      url += (semesterValue ? "&" : "?") + "major=" + majorValue;
    }
    
    window.location = url;
  });


