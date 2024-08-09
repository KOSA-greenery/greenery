function loadScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    document.head.appendChild(script);
}

function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", () => {
    loadHTML("../Header/header.html", "header");
    loadScript("../header/header.js");
    loadHTML("../Footer/footer.html", "footer");
});