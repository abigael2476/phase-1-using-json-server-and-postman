const form = document.querySelector("#article-form");
const list = document.querySelector("#articles-list");
const API_URL = "http://localhost:3000/articles";

// Fetch and display all articles
function loadArticles() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((articles) => {
      list.innerHTML = ""; // clear list
      articles.forEach((article) => {
        const li = document.createElement("li");
        li.textContent = `${article.title}: ${article.content}`;
        list.appendChild(li);
      });
    });
}

// Handle form submit (POST new article)
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const newArticle = {
    title: document.querySelector("#title").value,
    content: document.querySelector("#content").value,
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newArticle),
  })
    .then((res) => res.json())
    .then((article) => {
      console.log("New article added:", article);
      loadArticles(); // refresh list
      form.reset(); // clear form
    });
});

// Load articles when page first opens
loadArticles();
