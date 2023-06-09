const appElement = document.getElementById('app');

// Function to fetch NBA game scores
async function getNBAGameScores() {
  try {
    const response = await fetch('https://api.example.com/nba/scores'); // Replace with your API endpoint for NBA game scores
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching NBA game scores:', error);
    return [];
  }
}

// Function to render NBA game scores
function renderNBAGameScores(scores) {
  const scoresHTML = scores.map(score => `
    <div class="game-score">
      <div class="team">${score.homeTeam}</div>
      <div class="score">${score.homeScore}</div>
      <div class="team">${score.awayTeam}</div>
      <div class="score">${score.awayScore}</div>
    </div>
  `).join('');

  appElement.innerHTML = `
    <div class="scores-container">
      ${scoresHTML}
    </div>
  `;
}

// Fetch NBA game scores and render them
getNBAGameScores()
  .then(scores => renderNBAGameScores(scores))
  .catch(error => console.log('Error:', error));
