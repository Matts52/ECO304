window.onload = function() {
    generateNavbar();
    visualizeGrades();
}


async function visualizeGrades() {

    // Fetch project data from JSON file and filter for selected category
    const response = await fetch('../Data/Historical_Grades.json');
    const grades_data = await response.json();
    const data = grades_data.filter(record => record.Semester.trim() === 'Fall 2023');


    console.table(data);

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


// wait for select box change
$("#selectBox").change(function() {
    var optionValue = $(this).val();
    var url = [location.protocol, '//', location.host, location.pathname].join('');
  window.location = url+"?semester=" + optionValue;
  });


