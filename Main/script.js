// const clientId = 'MvzGgkir2fzF50irbfTJ';
// const clientSecret = 'gz93UVQaV8';

// const query = 'IT';
// const display = '4';

// const url = `https://openapi.naver.com/v1/search/news.json?query=${query}&display=${display}&start=1&sort=sim`;

// fetch(url, {
//     method: 'POST',
//     headers: {
//         'X-Naver-Client-Id': clientId,
//         'X-Naver-Client-Secret': clientSecret
//     }
// })
//     .then(response => response.json())
//     .then(data => {
//         const articles = data.items;
//         const articlesList = document.getElementById('articles');
//         articlesList.innerHTML = '';

//         articles.forEach(article => {
//             const articleElement = document.createElement('div');
//             articleElement.innerHTML = `
//         <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
//         <p>${article.description}</p>
//         <small>작성일: ${article.pubDate}</small>
//         `;
//             articlesList.appendChild(articleElement);
//         });
//     })
//     .catch(error => {
//         console.error('API 호출 오류:', error);
//     });

// Main/index.html에서 Nav/index.html을 동적으로 불러오기
async function loadNavbar() {
    try {
        const response = await fetch('../Nav/index.html');
        const html = await response.text();
        document.getElementById('nav__container').innerHTML = html;
        console.log('fetch nav 완료');

        // fetch 완료 후 실행할 코드
        const scripts = document.querySelectorAll('#nav__container script');
        scripts.forEach((script) => {
            const newScript = document.createElement('script');
            console.log(newScript);
            if (script.src) {
                newScript.src = script.src; // 기존 src 복사
                newScript.type = script.type || 'text/javascript'; // type 복사
            } else {
                newScript.textContent = script.textContent; // 인라인 스크립트 복사
            }
            document.head.appendChild(newScript);
        });
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}


loadNavbar();