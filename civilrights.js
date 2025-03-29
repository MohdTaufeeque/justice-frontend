async function loadIndiaNews() {
    try {
        const response = await fetch("https://gnews.io/api/v4/top-headlines?country=in&token=aad334a2981dd4b6ec1fbd98a85c36a2");
        const data = await response.json();

        let output = "<h2>Latest India News</h2><ul>";
        data.articles.forEach(article => {
            // Use backticks for template literals
            output += `<li><h3>${article.title}</h3><p>${article.description}</p><a href="${article.url}" target="_blank">Read more</a><hr></li>`;
        });
        output += "</ul>";

        document.getElementById("newsContainer").innerHTML = output;
    } catch (error) {
        document.getElementById("newsContainer").innerHTML = "<h2>Error loading news</h2>";
        console.error("Error fetching India news:", error);
    }
}

window.onload = loadIndiaNews;
