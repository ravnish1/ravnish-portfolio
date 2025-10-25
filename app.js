// Terminal Commands
const terminalCommands = {
  help: "Available commands: help, about, skills, projects, contact, clear, whoami, ls, cat",
  about:
    "Hi! I'm a pre-final year B.Tech Computer Science student with hands-on experience in Machine Learning, Robotics & IoT, and Web Development.",
  skills:
    "Python, JavaScript, C++, Machine Learning, Cloud Computing, Embedded Systems",
  projects:
    "Check out my projects at /projects or type 'ls projects/' for more details",
  contact: "Email: ravnishkumar583@gmail.com | LinkedIn: /in/ravnish-kumar/",
  whoami:
    "Student, Machine Learning Enthusiast, Web Developer, Robotics & IoT Specialist ",
  clear: "CLEAR_TERMINAL",
  ls: "projects/  skills.txt  about.md  contact.txt",
  "ls projects/": "portfolio/ oh-my-foodie/ ai-text-gen/ workflows/",
  "cat skills.txt":
    "Python, JavaScript, C++, Postman, MySQL, \n Machine Learning, AI, Cloud Computing, Embedded Systems",
  "cat about.md":
    "# Ravnish Kumar,\n passionate about creating innovative solutions to real-world problems.",
  "cat contact.txt":
    "Email: ravnishkumar583@gmail.com\nGitHub: github.com/ravnish1\nLinkedIn: linkedin.com/in/ravnish-kumar/",
};

function initTerminal() {
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");

  if (!terminalInput || !terminalOutput) return;

  terminalInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const command = this.value.trim().toLowerCase();

      // Add command to output
      const commandLine = document.createElement("div");
      commandLine.className = "terminal-line";
      commandLine.innerHTML = `<span class="prompt">ravnish@portfolio:~$</span> ${this.value}`;
      terminalOutput.appendChild(commandLine);

      // Process command
      const response = document.createElement("div");
      response.className = "terminal-response";

      if (command === "clear") {
        terminalOutput.innerHTML = "";
      } else if (terminalCommands[command]) {
        if (terminalCommands[command] === "CLEAR_TERMINAL") {
          terminalOutput.innerHTML = "";
        } else {
          response.innerHTML = terminalCommands[command];
          terminalOutput.appendChild(response);
        }
      } else if (command === "") {
        // Do nothing for empty command
      } else {
        response.innerHTML = `Command not found: ${command}. Type 'help' for available commands.`;
        terminalOutput.appendChild(response);
      }

      // Clear input and scroll to bottom
      this.value = "";
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  // Focus on terminal input when clicking anywhere in terminal
  document.querySelector(".terminal").addEventListener("click", function () {
    terminalInput.focus();
  });
}

// Typewriter Effect
function initTypewriter() {
  const texts = [
    "Passionate about Web Development,",
    "Machine Learning,",
    "and Intelligent Robotics Systems :)",
  ];

  const typedTextElement = document.querySelector(".typed-text");
  if (!typedTextElement) return;

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  };

  // Intersection Observer for counter animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Parallax Effect
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".tech-element");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initTypewriter();
  initCounters();
  initSmoothScroll();
  initTerminal();

  // Add smooth page load
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in-out";
    document.body.style.opacity = "1";
  }, 100);
});
