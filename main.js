document.addEventListener("DOMContentLoaded", () => {
  const logos = document.querySelectorAll(".logo");
  const container = document.querySelector(".logos");

  // Circle properties
  const radius = 180; // Radius of the circular path
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;
  const totalLogos = logos.length;

  // Initialize logo states
  logos.forEach((logo, index) => {
      const angle = (index / totalLogos) * 2 * Math.PI; // Initial angle based on index
      logo.dataset.angle = angle; // Store the angle for each logo
      logo.dataset.speed = 0.01; // Same speed for all
      logo.dataset.paused = "false";
  });

  function animateLogos() {
      logos.forEach((logo) => {
          let angle = parseFloat(logo.dataset.angle);
          let speed = parseFloat(logo.dataset.speed);
          let paused = logo.dataset.paused === "true";

          if (!paused) {
              angle += speed; // Update angle
              logo.dataset.angle = angle;

              // Calculate position based on the angle
              const x = centerX + radius * Math.cos(angle) - logo.offsetWidth / 2;
              const y = centerY + radius * Math.sin(angle) - logo.offsetHeight / 2;

              // Apply transform to position logos
              logo.style.transform = `translate(${x}px, ${y}px)`;
          }
      });

      requestAnimationFrame(animateLogos);
  }

  // Pause and scale on hover
  logos.forEach((logo) => {
      logo.addEventListener("mouseenter", () => {
          logo.dataset.paused = "true";
          logo.style.transform += " scale(1.5)"; // Scale up
      });

      logo.addEventListener("mouseleave", () => {
          logo.dataset.paused = "false";
          logo.style.transform = logo.style.transform.replace(" scale(1.5)", ""); // Reset scale
      });

      logo.addEventListener("click", () => {
          logo.dataset.paused = "true";
          logo.style.transform += " scale(1.5)"; // Scale up on click

          setTimeout(() => {
              logo.dataset.paused = "false";
              logo.style.transform = logo.style.transform.replace(" scale(1.5)", "");
          }, 5); // Resume after 1 second
      });
  });

  // Start animation
  animateLogos();
});



//ads script//
const ads = [
    {
        icon: "fas fa-code",
        color: "orange",
        title: "Web Development",
        description: "Creating responsive and dynamic websites.",
        link: "#contact"
    },
    {
        icon: "fas fa-pencil-alt",
        color: "#000",
        title: "UI/UX Design",
        description: "Designing user-friendly interfaces.",
        link: "#contact"
    },
    {
        icon: "fas fa-chart-line",
        color: "#f7df1e",
        title: "Search Engeen Optimization",
        
        description: "Improving website visibility.",
        link: "#contact"
    },
    
    {
        icon: "fas fa-lock",
        color: "greenyellow",
        title: "Backend Support",
        description: "Improving website security.",
        link: "#contact"
    },
    {
        icon: "fas fa-lightbulb",
        color: "wheat",
        title: "Website Improvement",
        description: "Old website redesign and security improvements.",
        link: "#contact"
    }
];

const adDisplay = document.getElementById("ad-display");
let currentAdIndex = 0;

function showAd(index) {
    // Clear existing content
    adDisplay.innerHTML = "";

    // Create ad element
    const ad = document.createElement("div");
    ad.className = "ad-card";
    ad.style.position = "absolute";
    ad.style.width = "100%";
    ad.style.height = "100%";
    ad.style.display = "flex";
    ad.style.flexDirection = "column";
    ad.style.justifyContent = "center";
    ad.style.alignItems = "center";
    ad.style.background = "#fff";
    ad.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.9)";
    ad.style.borderRadius = "10px";
    ad.style.cursor = "pointer";

    ad.setAttribute("data-link", ads[index].link);

    ad.innerHTML = `
        <i class="${ads[index].icon}" style="color: ${ads[index].color}; font-size: 50px; margin-bottom: 20px;"></i>
        <h3 style="margin: 0; font-size: 50px; color: #333;">${ads[index].title}</h3>
        <p style="margin: 10px 0; font-size:30px; color: #555; text-align: center;">${ads[index].description}</p>
    `;

    ad.addEventListener("click", () => {
        const link = ad.getAttribute("data-link");
        if (link) {
            window.location.href = link;
        }
    });

    adDisplay.appendChild(ad);

    // Animate the ad card
    gsap.fromTo(
        ad,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );
}

function cycleAds() {
    showAd(currentAdIndex);
    currentAdIndex = (currentAdIndex + 1) % ads.length;
    setTimeout(() => {
        gsap.to(".ad-card", {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "power2.in",
            onComplete: cycleAds
        });
    }, 3000); // Display each ad for 3 seconds
}

// Start the ad cycle
cycleAds();

// Canvas script//
