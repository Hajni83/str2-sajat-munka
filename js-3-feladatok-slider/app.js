let counter = 1;

let arrSlides = (n) => {
  return showSlides((counter += n));
};

let currentSlide = (n) => {
  return showSlides((counter = n));
};

let showSlides = (n) => {
  let i;
  let slides = document.getElementsByClassName("images");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    counter = 1;
  }
  if (n < 1) {
    counter = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[counter - 1].style.display = "block";
  dots[counter - 1].className += " active";
};

showSlides(counter);
