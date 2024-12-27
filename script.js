// For scrollbar visibility
document.addEventListener("scroll", () => {
  document.body.style.overflowY = "auto"; // Ensure the scrollbar is visible when scrolling
});
//typing at home
const typingHeadlines = [
  "Web Developer Extraordinaire",
  "Creative Problem Solver",
  "Innovator in Code",
  "Designer of Digital Experiences"
];

let typingIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const pauseTime = 2000;
const typingElement = document.getElementById("dynamic-headline");

function typeHeadline() {
  if (charIndex < typingHeadlines[typingIndex].length) {
      typingElement.textContent += typingHeadlines[typingIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeHeadline, typingSpeed);
  } else {
      setTimeout(eraseHeadline, pauseTime);
  }
}

function eraseHeadline() {
  if (charIndex > 0) {
      typingElement.textContent = typingHeadlines[typingIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseHeadline, erasingSpeed);
  } else {
      typingIndex = (typingIndex + 1) % typingHeadlines.length;
      setTimeout(typeHeadline, typingSpeed);
  }
}

// Start the typing effect
typeHeadline();



// Skill Levels for Progress Bars (in percentage)
const skillLevels = {
  html: 98,
  css: 97,
  js: 95,
  react: 85,
  bootstrap: 80,
  angular: 85,
  vue: 82,
  wordpress: 98,
  woocommerce: 93,
  python: 96,
  php: 91,
  db: 92,
  others: 50,
  // Add more skills as needed
};

// Function to animate progress bars when they are in view
function animateProgressBars(entries, observer) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          const skill = entry.target;
          const bar = skill.querySelector('.bar');
          const skillName = skill.id.toLowerCase(); // Use the id of the skill as the key
          const skillLevel = skillLevels[skillName] || 0; // Fallback to 0 if skill level is undefined

          // Set the width of the progress bar and show the skill percentage
          bar.style.width = skillLevel + '%';
          bar.textContent = `${skillLevel}%`; // Display skill level in the bar

          // Add smooth animation for the progress bar
          bar.style.transition = 'width 5s ease-out';

          // Stop observing once the animation is triggered
          observer.unobserve(entry.target);
      }
  });
}

// Create IntersectionObserver instance
const observer = new IntersectionObserver(animateProgressBars, {
  threshold: 1 // Trigger animation when 50% of the element is in view
});

// Select all skill elements to observe
const skills = document.querySelectorAll('.skill');
skills.forEach(skill => observer.observe(skill));

// Dynamic Form Submission with Fetch API
document.getElementById('dynamicContactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Thank you for your message!');
        form.reset();
      } else {
        response.json().then(data => {
          alert(data.error || 'Oops! There was a problem submitting your form.');
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Oops! Something went wrong. Please try again later.');
    });
  });
  // Newsletter Subscribe Form Submission
  const subscribeForm = document.querySelector(".footer-newsletter form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = subscribeForm.querySelector("input[type='email']");
      if (emailInput && emailInput.value.trim() !== "") {
        animateThankYouMessage("Thank you for subscribing!");
        subscribeForm.reset();
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }
  // Contact Form Submission
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const message = formData.get("message").trim();

      if (name && email && message) {
        animateThankYouMessage("Thank you for submitting the form!");
        contactForm.reset();
      } else {
        alert("Please fill out all required fields.");
      }
    });
  }
  

  document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'x' || event.key === 'v' ||event.key === 's')) {
      event.preventDefault();
    }
   });
   
   // Disable right-click context menu to prevent copying
   document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
   });
   
   // Disable text selection
   document.addEventListener('selectstart', function(event) {
    event.preventDefault();
   });
   
   // Disable drag and drop to prevent image saving
   document.addEventListener('dragstart', function(event) {
    event.preventDefault();
   });
   
   // Disable copying via clipboard API
   document.addEventListener('copy', function(event) {
    event.preventDefault();
   });
   document.addEventListener('cut', function(event) {
    event.preventDefault();
   });
   document.addEventListener('paste', function(event) {
    event.preventDefault();
   });
   
   // Disable saving images by dragging them to the desktop
   document.addEventListener('mousedown', function(event) {
    if (event.target.tagName === 'IMG') {
      event.preventDefault();
    }
   });
   
   // Disable saving images by right-clicking and selecting "Save image as"
   document.addEventListener('contextmenu', function(event) {
    if (event.target.tagName === 'IMG') {
      event.preventDefault();
    }
   });

    // Function to animate the BG//
    