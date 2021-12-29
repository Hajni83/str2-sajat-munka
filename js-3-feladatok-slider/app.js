let counter = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("images");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  counter++;
  if (counter > slides.length) {counter = 1}

 for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
   }
  slides[counter-1].style.display = "block";  
  dots[counter-1].className += " active";
  setTimeout(showSlides, 3000);
}
