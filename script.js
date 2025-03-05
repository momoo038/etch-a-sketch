const container = document.querySelector("#container");
const gridButton = document.querySelector("#btn");
const progress = document.querySelector("#ui-progress")
const progressPercentage = document.querySelector("#percentage")

function createGrid(size) {
    // Clear existing grid and progress bar
    container.innerHTML = "";
    container.style.opacity = "1";
    progress.style.backgroundColor = "rgba(0, 0, 0, 0)";
    progressPercentage.textContent = "0%";
    progressPercentage.style.color = "black";
    gridButton.textContent = "Reset";

    let filledCount = 0;

    // Calculate the size of each grid item dynamically based on the container width and the grid size
    const containerWidth = 500;  
    const gridItemSize = Math.floor(containerWidth / size);  

    // Set the container width dynamically based on the grid size
    container.style.width = `${gridItemSize * size}px`;

    // Logic to create the grid
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            const grid = document.createElement("div");
            grid.classList.add("grid-item");
            grid.style.width = `${gridItemSize}px`;  
            grid.style.height = `${gridItemSize}px`; 
            container.appendChild(grid);

            // Random color on mouse hover
            grid.addEventListener("mouseenter", () => {
                if (!grid.style.backgroundColor) {
                    grid.style.backgroundColor = getRandomColor();
                    filledCount++;
                    updateProgress(filledCount, size * size);
                }
            });
        }
    }
}

// button to create grid of desired size on prompt
gridButton.addEventListener("click", () => {
    const newSize = prompt("Enter a new grid size (2-100):");

    if (newSize > 100){
        alert("Grid size must be less than or equal to 100.");
    } else if (isNaN(newSize) || newSize == undefined || newSize <= 1.5 || newSize == null){
        alert("Invalid input. Please enter a number greater than 2.");
    } else {
        createGrid(parseInt(newSize));
    }
});


// function to generate random color
function getRandomColor(){
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// function to update progress bar and color on progress
function updateProgress(filledCount, totalCount){
    const opacity = (filledCount/totalCount) * 1;
    const percentage = Math.round((filledCount / totalCount) * 100); 
    progress.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`; 
    progressPercentage.textContent = `${percentage}%`;

    if (percentage == 100){
        progressPercentage.style.color = ("red");
        gridButton.textContent = "Reset";
    } else {
        progressPercentage.style.color = ("black");
    }
}