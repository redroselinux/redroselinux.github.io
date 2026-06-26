document.querySelector('.nav-toggle')?.addEventListener('click', function() {
    this.classList.toggle('open');
    document.getElementById('nav-links').classList.toggle('open');
});

const NEWS_API = "https://api.github.com/repos/redroselinux/news-reader/contents/news";
const NEWS_RAW = "https://raw.githubusercontent.com/redroselinux/news-reader/refs/heads/master/news";

(async function() {
    const container = document.getElementById("news-items");
    try {
        const r = await fetch(NEWS_API);
        if (!r.ok) throw new Error("HTTP " + r.status);
        const files = await r.json();
        const articles = files
            .filter(f => f.name !== "latest" && f.type === "file")
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 5);

        if (articles.length === 0) {
            container.innerHTML = '<span class="error">No news</span>';
            return;
        }

        const items = await Promise.all(articles.map(async (f) => {
            try {
                const text = await (await fetch(f.download_url)).text();
                const title = text.startsWith("TITLE: ") ? text.split("\n")[0].slice(7) : f.name;
                const url = NEWS_RAW + "/" + encodeURIComponent(f.name);
                return `<a href="${url}" target="_blank" class="news-item">
                    <div class="news-date">${f.name}</div>
                    <div class="news-title">${title}</div>
                </a>`;
            } catch {
                const url = NEWS_RAW + "/" + encodeURIComponent(f.name);
                return `<a href="${url}" target="_blank" class="news-item">
                    <div class="news-date">${f.name}</div>
                    <div class="news-title">${f.name}</div>
                </a>`;
            }
        }));

        container.innerHTML = items.join("");
    } catch (e) {
        container.innerHTML = '<span class="error">Failed to load news</span>';
    }
})();
