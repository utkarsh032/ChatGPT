const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
