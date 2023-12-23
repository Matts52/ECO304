window.onload = function() {
    generateNavbar();
    visualizeGrades();
}


async function visualizeGrades() {

    // Fetch project data from JSON file and filter for selected category
    const response = await fetch('../Data/Historical_Grades.json');
    const grades_data = await response.json();

    console.table(grades_data);




}


