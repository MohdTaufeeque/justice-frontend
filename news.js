// Selecting elements
const slides = document.querySelectorAll(".carousel-images img");
const totalSlides = slides.length;
let index = 0;

// Function to show the current slide
function showSlide() {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${index * 100}%)`;
    });
}

// Function to go to the next slide
function nextSlide() {
    index = (index + 1) % totalSlides;
    showSlide();
}

// Function to go to the previous slide
function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide();
}

// Auto-slide every 5 seconds
let autoSlide = setInterval(nextSlide, 5000);

// Stop auto-slide on hover
document.querySelector(".carousel").addEventListener("mouseover", () => {
    clearInterval(autoSlide);
});

// Resume auto-slide when the mouse leaves
document.querySelector(".carousel").addEventListener("mouseleave", () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// Attach event listeners to buttons
document.querySelector(".prev").addEventListener("click", prevSlide);
document.querySelector(".next").addEventListener("click", nextSlide);


//  News Pagination
let currentPage = 1;
const newsPerPage = 3;
function loadNews() {
    const newsList = document.getElementById("newsList");
    newsList.innerHTML = "";
    for (let i = (currentPage - 1) * newsPerPage; i < currentPage * newsPerPage; i++) {
        if (newsData[i]) {
            let card = `<div class="news-card"><h3>${newsData[i].title}</h3><p>${newsData[i].description}</p></div>`;
            newsList.innerHTML += card;
        }
    }
}
document.getElementById("nextPage").addEventListener("click", () => { currentPage++; loadNews(); });
document.getElementById("prevPage").addEventListener("click", () => { if (currentPage > 1) currentPage--; loadNews(); });

// 🔹 Comments Section
function submitComment() {
    let comment = document.getElementById("commentBox").value;
    let commentList = document.getElementById("commentsList");
    let newComment = document.createElement("p");
    newComment.innerText = comment;
    commentList.appendChild(newComment);
    document.getElementById("commentBox").value = "";
}
// Toggle Trending News Sidebar
document.getElementById("toggleTrending").addEventListener("click", function() {
    const sidebar = document.getElementById("trendingNews");
    sidebar.classList.toggle("show");
});
