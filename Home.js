// Zodiac compatibility matrix (simplified)
const zodiacCompatibility = {
  aries: {
      aries: 70, taurus: 60, gemini: 85, cancer: 65, leo: 90, virgo: 45,
      libra: 75, scorpio: 55, sagittarius: 95, capricorn: 50, aquarius: 80, pisces: 65
  },
  taurus: {
      aries: 60, taurus: 90, gemini: 50, cancer: 85, leo: 70, virgo: 95,
      libra: 75, scorpio: 90, sagittarius: 45, capricorn: 95, aquarius: 40, pisces: 85
  },
  // Add similar compatibility scores for other signs
  // This is a simplified version, you can add more detailed compatibility scores
};

function calculateLove() {
  const name1 = document.getElementById('name1').value.trim();
  const name2 = document.getElementById('name2').value.trim();
  const zodiac1 = document.getElementById('zodiac1').value;
  const zodiac2 = document.getElementById('zodiac2').value;

  if (!name1 || !name2) {
      alert('Please enter both names!');
      return;
  }

  // Calculate name compatibility (50% of total)
  let nameScore = calculateNameCompatibility(name1, name2);

  // Calculate zodiac compatibility (50% of total)
  let zodiacScore = calculateZodiacCompatibility(zodiac1, zodiac2);

  // Calculate final score (average of name and zodiac scores)
  let finalScore = Math.round((nameScore + zodiacScore) / 2);

  // Display result
  displayResult(finalScore);
}

function calculateNameCompatibility(name1, name2) {
  // Simple algorithm based on names
  const combinedNames = (name1 + name2).toLowerCase();
  let score = 0;

  // Count matching letters
  const letterCount = {};
  for (let char of combinedNames) {
      if (char.match(/[a-z]/)) {
          letterCount[char] = (letterCount[char] || 0) + 1;
      }
  }

  // Calculate score based on letter patterns
  score = Object.values(letterCount).reduce((acc, curr) => acc + curr, 0);
  
  // Normalize score to 0-100 range
  return Math.min(Math.max(Math.round((score * 7) % 100), 40), 100);
}

function calculateZodiacCompatibility(sign1, sign2) {
  // Use zodiac compatibility matrix
  // For simplicity, returning a default value if not defined
  return zodiacCompatibility[sign1]?.[sign2] || 70;
}

function displayResult(score) {
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    let message = '';
    let color = '';

    if (score >= 80) {
        message = '<span class="heart-beat">❤️</span> Perfect Match! <span class="heart-beat">❤️</span>';
        color = '#ff4d7c';
    } else if (score >= 60) {
        message = '💕 Great Potential! 💕';
        color = '#ff758c';
    } else if (score >= 40) {
        message = '💫 There\'s a Chance! 💫';
        color = '#ff9eaa';
    } else {
        message = '🌟 Keep Looking! 🌟';
        color = '#666666';
    }

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="couple-names">
            ${name1} 
            <span style="color: #ff758c;">♥</span> 
            ${name2}
        </div>
        
        <div class="heart-result-container">
            <div class="heart-bg">❤️</div>
            <div class="score-display">
                <div class="compatibility-score">${score}%</div>
                <div class="score-label">Match</div>
            </div>
        </div>

        <div class="result-divider"></div>
        
        <div class="result-message" style="color: ${color}">${message}</div>
        <p class="result-description">${getDescription(score, name1, name2)}</p>
    `;

    showModal();
}

function showModal() {
    const modal = document.getElementById('resultModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal() {
    const modal = document.getElementById('resultModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('resultModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Add escape key listener to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Add this new function for personalized descriptions
function getDescription(score, name1, name2) {
    if (score >= 80) {
        return `${name1} and ${name2}, you have an extraordinary connection! Your hearts beat as one. ❤️`;
    } else if (score >= 60) {
        return `${name1} and ${name2}, your love has amazing potential to grow into something beautiful! 💕`;
    } else if (score >= 40) {
        return `${name1} and ${name2}, with time and understanding, your connection can flourish! ✨`;
    } else {
        return `${name1} and ${name2}, sometimes the best relationships need time to develop. Keep believing! 🌟`;
    }
}