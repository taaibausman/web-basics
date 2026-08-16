/* ======================================================
   PROJECT DATA
====================================================== */

const projects = [

    {
        title: "Portfolio Website",

        category: "frontend",

        image: "assets/images/project1.jpg",

        description: "A modern responsive portfolio website built using HTML, CSS, and JavaScript.",

        technologies: ["HTML", "CSS", "JavaScript"],

        github: "#",

        live: "#"
    },

    {
        title: "Weather Dashboard",

        category: "javascript",

        image: "assets/images/project2.jpg",

        description: "Weather dashboard using Open-Meteo API with live weather updates and search functionality.",

        technologies: ["JavaScript", "API", "CSS"],

        github: "#",

        live: "#"
    },

    {
        title: "Notes App",

        category: "javascript",

        image: "assets/images/project3.jpg",

        description: "Create, edit, delete, and search notes with Local Storage support.",

        technologies: ["JavaScript", "LocalStorage"],

        github: "#",

        live: "#"
    },

    {
        title: "SafeChat AI",

        category: "python",

        image: "assets/images/project4.jpg",

        description: "AI-powered chatbot for detecting harmful conversations using Machine Learning.",

        technologies: ["Python", "FastAPI", "Transformers"],

        github: "#",

        live: "#"
    },

    {
        title: "Book Recommendation System",

        category: "python",

        image: "assets/images/project5.jpg",

        description: "Recommendation system using collaborative filtering and machine learning.",

        technologies: ["Python", "Pandas", "Scikit-Learn"],

        github: "#",

        live: "#"
    },

    {
        title: "Data Warehouse ETL",

        category: "python",

        image: "assets/images/project6.jpg",

        description: "ETL pipeline using SQL Server Integration Services and SQL Server.",

        technologies: ["SQL", "SSIS", "ETL"],

        github: "#",

        live: "#"
    }

];


/* ======================================================
   SELECT ELEMENTS
====================================================== */

const projectContainer = document.getElementById("projects-container");

const filterButtons = document.querySelectorAll(".filter-btn");

// Guard elements
if (!projectContainer) {
    console.warn('No #projects-container found — skipping projects render');
}

if (!filterButtons || filterButtons.length === 0) {
    console.warn('No filter buttons found — projects filters disabled');
}


/* ======================================================
   DISPLAY PROJECTS
====================================================== */

function displayProjects(projectArray) {

    if (!projectContainer) return;

    projectContainer.innerHTML = "";

    projectArray.forEach(project => {

        const techList = project.technologies
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join("");

        const card = `

        <article class="project-card">

            <img src="${project.image}" alt="${project.title}">

            <div class="overlay"></div>

            <div class="project-content">

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <div class="tech-list">

                    ${techList}

                </div>

                <div class="project-buttons">

                    <a href="${project.github}" target="_blank" class="btn secondary-btn">

                        GitHub

                    </a>

                    <a href="${project.live}" target="_blank" class="btn primary-btn">

                        Live Demo

                    </a>

                </div>

            </div>

        </article>

        `;

        // sanitize simple values to avoid injecting undefined
        projectContainer.insertAdjacentHTML('beforeend', card);

    });

}


/* ======================================================
   FILTER PROJECTS
====================================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const category = button.dataset.filter;

        if (category === "all") {

            displayProjects(projects);

        }

        else {

            const filtered = projects.filter(project =>

                project.category === category

            );

            displayProjects(filtered);

        }

    });

});


/* ======================================================
   INITIAL DISPLAY
====================================================== */

displayProjects(projects);