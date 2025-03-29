async function loadCriminalNews() {
    try {
        // Ensure the URL is wrapped in quotation marks
        const response = await fetch("https://gnews.io/api/v4/search?q=criminal%20justice&lang=en&country=in&token=aad334a2981dd4b6ec1fbd98a85c36a2");
        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            document.getElementById("criminalNewsContainer").innerHTML = "<h2>No Criminal Justice News Found</h2>";
            return;
        }

        let output = "<h2>Latest Criminal Justice News in India</h2><ul>";
        data.articles.forEach(article => {
            output += `<li>
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read More</a>
                        <hr>
                      </li>`;
        });
        output += "</ul>";

        document.getElementById("criminalNewsContainer").innerHTML = output;
    } catch (error) {
        document.getElementById("criminalNewsContainer").innerHTML = "<h2>Error Loading News</h2>";
        console.error("Error fetching criminal justice news:", error);
    }
}

window.onload = loadCriminalNews;
