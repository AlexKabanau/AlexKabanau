const fs = require('fs');
const path = require('path');

function updateReadme() {
  const readmePath = path.join(process.cwd(), 'README.md');
  let content = fs.readFileSync(readmePath, 'utf8');

  // Заменяем URL карточек на локальные изображения
  content = content.replace(
    /!\[\]\(https:\/\/github-profile-summary-cards\.vercel\.app\/api\/cards\/profile-details\?username=AlexKabanau&theme=github_dark\)/g,
    '![](./stats/profile-details.png)'
  );

  content = content.replace(
    /!\[\]\(https:\/\/github-profile-summary-cards\.vercel\.app\/api\/cards\/most-commit-language\?username=AlexKabanau&theme=github_dark\)/g,
    '![](./stats/most-commit-language.png)'
  );

  content = content.replace(
    /!\[\]\(https:\/\/github-profile-summary-cards\.vercel\.app\/api\/cards\/repos-per-language\?username=AlexKabanau&theme=github_dark\)/g,
    '![](./stats/repos-per-language.png)'
  );

  content = content.replace(
    /!\[\]\(https:\/\/github-profile-summary-cards\.vercel\.app\/api\/cards\/stats\?username=AlexKabanau&theme=github_dark\)/g,
    '![](./stats/stats.png)'
  );

  content = content.replace(
    /!\[\]\(https:\/\/github-profile-summary-cards\.vercel\.app\/api\/cards\/productive-time\?username=AlexKabanau&theme=github_dark\)/g,
    '![](./stats/productive-time.png)'
  );

  fs.writeFileSync(readmePath, content);
  console.log('README.md updated successfully');
}

updateReadme();