// Adiciona rolagem suave para links de navegação
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Aplica efeito de fade-in ao rolar para as seções
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 } // Ativa o efeito quando 10% da seção estiver visível
  );
  
  sections.forEach(section => {
    section.classList.add('hidden'); // Inicialmente escondida
    observer.observe(section);
  });
  