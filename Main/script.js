const clientId = 'MvzGgkir2fzF50irbfTJ';
const clientSecret = 'gz93UVQaV8';

const query = 'IT';
const display = '4';

const url = `https://openapi.naver.com/v1/search/news.json?query=${query}&display=${display}&start=1&sort=sim`;

fetch(url, {
    method: 'GET',
    headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret
    }
})
    .then(response => response.json())
    .then(data => {
        const articles = data.items;
        const articlesList = document.getElementById('articles');
        articlesList.innerHTML = '';

        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.innerHTML = `
        <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
        <p>${article.description}</p>
        <small>작성일: ${article.pubDate}</small>
        `;
            articlesList.appendChild(articleElement);
        });
    })
    .catch(error => {
        console.error('API 호출 오류:', error);
    });