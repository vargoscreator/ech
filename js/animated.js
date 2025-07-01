document.addEventListener("DOMContentLoaded", function() {
  const eventsBlocks = document.querySelectorAll('.events__block, .article__box, .news__content');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, 200);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  eventsBlocks.forEach(block => {
    observer.observe(block);
  });
});
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  const eventsItems = document.querySelectorAll(".events__item, .article__block");
  eventsItems.forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  });
} 