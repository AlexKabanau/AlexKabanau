const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const username = process.env.USERNAME;
const token = process.env.GITHUB_TOKEN;

async function downloadImage(url, outputPath) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    headers: {
      Authorization: `token ${token}`
    }
  });

  await sharp(response.data).toFile(outputPath);
  console.log(`Downloaded: ${outputPath}`);
}

async function generateStats() {
  const theme = 'github_dark';
  const statsDir = path.join(process.cwd(), 'stats');

  if (!fs.existsSync(statsDir)) {
    fs.mkdirSync(statsDir, { recursive: true });
  }

  // Список карточек для загрузки
  const cards = [
    {
      name: 'profile-details.png',
      url: `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=${theme}`
    },
    {
      name: 'most-commit-language.png',
      url: `https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=${theme}`
    },
    {
      name: 'repos-per-language.png',
      url: `https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${username}&theme=${theme}`
    },
    {
      name: 'stats.png',
      url: `https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${username}&theme=${theme}`
    },
    {
      name: 'productive-time.png',
      url: `https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${username}&theme=${theme}`
    }
  ];

  // Загрузка всех карточек
  for (const card of cards) {
    await downloadImage(card.url, path.join(statsDir, card.name));
  }
}

generateStats().catch(error => {
  console.error('Error generating stats:', error);
  process.exit(1);
});