async function loadConsumerNews() {
    try {
        const response = await fetch("https://gnews.io/api/v4/search?q=consumer%20protection&lang=en&country=in&token=aad334a2981dd4b6ec1fbd98a85c36a2");
        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            document.getElementById("consumerNewsContainer").innerHTML = "<h2>No Consumer Protection News Found</h2>";
            return;
        }

        let output = "<h2>Latest Consumer Protection News in India</h2><ul>";
        data.articles.forEach(article => {
            output += `<li>
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read More</a>
                        <hr>
                      </li>`;
        });
        output += "</ul>";

        document.getElementById("consumerNewsContainer").innerHTML = output;
    } catch (error) {
        document.getElementById("consumerNewsContainer").innerHTML = "<h2>Error Loading News</h2>";
        console.error("Error fetching consumer protection news:", error);
    }
}

window.onload = loadConsumerNews;
