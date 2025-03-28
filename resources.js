
// Function to filter government resources dynamically
function filterResources() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let lists = document.querySelectorAll(".resource-box ul li");

    lists.forEach((item) => {
        let text = item.innerText.toLowerCase();
        if (text.includes(input)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Function to toggle sections (Fixed Issue)
function toggleSection(sectionId, buttonId) {
    let section = document.getElementById(sectionId);
    let button = document.getElementById(buttonId);

    if (section.classList.contains("hidden")) {
        section.classList.remove("hidden");
        button.innerText = "Show Less ⬆";
    } else {
        section.classList.add("hidden");
        button.innerText = "More ⬇";
    }
}
