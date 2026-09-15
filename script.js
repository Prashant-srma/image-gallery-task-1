const cards = [...document.querySelectorAll(".card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleCards = [...cards];
let currentIndex = 0;

// Category filters
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });

    visibleCards = cards.filter(card => !card.classList.contains("hidden"));
  });
});

// Open lightbox
cards.forEach(card => {
  card.addEventListener("click", () => {
    visibleCards = cards.filter(card => !card.classList.contains("hidden"));
    currentIndex = visibleCards.indexOf(card);
    showImage(currentIndex);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function showImage(index) {
  if (visibleCards.length === 0) return;

  currentIndex = (index + visibleCards.length) % visibleCards.length;

  const card = visibleCards[currentIndex];
  const image = card.querySelector("img");

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxTitle.textContent = card.querySelector("h2").textContent;
  lightboxCategory.textContent = card.querySelector("span").textContent;
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
closeBtn.addEventListener("click", closeLightbox);

// Close when clicking the dark background
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showImage(currentIndex - 1);
  if (event.key === "ArrowRight") showImage(currentIndex + 1);
});
