//  Toggle About Us Dropdown Menu
document.getElementById("menu-toggle").addEventListener("click", function() {
    var menu = document.getElementById("menu-list");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

//  Image Slider Functionality
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

function prevSlide() {
    slideIndex = (slideIndex === 0) ? slides.length - 1 : slideIndex - 1;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex = (slideIndex === slides.length - 1) ? 0 : slideIndex + 1;
    showSlide(slideIndex);
}

showSlide(slideIndex);

//  Stats Counter Animation
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        counter.innerText = "0";
        let updateCount = () => {
            const target = +counter.getAttribute("data-count");
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
});

//  FAQ Accordion Toggle
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", function() {
        const answer = this.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});
