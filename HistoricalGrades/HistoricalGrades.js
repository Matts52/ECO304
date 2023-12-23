window.onload = function() {
    generateNavbar();
    visualizeGrades();
}


async function visualizeGrades() {

    // Fetch project data from JSON file and filter for selected category
    const response = await fetch('../Data/Historical_Grades.json');
    const grades_data = await response.json();

    console.table(grades_data);

    // Initialize an array to store counts in each bucket
    const bucketCounts = Array(20).fill(0);

    // Calculate counts in each bucket
    grades_data.forEach(entry => {
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



