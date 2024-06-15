document.addEventListener('DOMContentLoaded', () => {
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    const chapterTitle = document.getElementById('chapter-title');
    const novelDiv = document.getElementById('novel');
  
    let currentChapter = 1;
  
    function loadChapter(chapterNumber) {
      fetch(`chapter${chapterNumber}.json`)
        .then(response => response.json())
        .then(data => {
          novelDiv.innerHTML = ''; // Clear existing content
          const chapterContent = data[`chapter${chapterNumber}`];
          chapterContent.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            novelDiv.appendChild(p);
          });
          chapterTitle.textContent = `Chapter ${chapterNumber}`;
        })
        .catch(error => {
          console.error('Error fetching novel content:', error);
          novelDiv.innerHTML = '<p>Error loading novel content.</p>';
        });
    }
  
    previousButton.addEventListener('click', () => {
      if (currentChapter > 1) {
        currentChapter--;
        loadChapter(currentChapter);
      }
    });
  
    nextButton.addEventListener('click', () => {
      currentChapter++;
      loadChapter(currentChapter);
    });
  
    // Initial load
    loadChapter(currentChapter);
  });
  