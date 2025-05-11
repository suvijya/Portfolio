// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links ul li a');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#navLinks');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Active link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Typing effect
    const typingElement = document.getElementById('typing');
    // Check if the typing element exists before starting the animation
    if (typingElement) {
        const words = ['IoT Hardware Developer', 'AI Specialist', 'Embedded Systems Engineer', 'AI Agent Developer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 200;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 100;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 200;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingDelay = 1000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingDelay = 500; // Pause before typing next word
            }

            setTimeout(type, typingDelay);
        }

        // Start typing effect
        setTimeout(type, 1000);
    } else {
        console.error("Element with ID 'typing' not found. Typing animation will not start.");
    }

    // Animate skill bars when in viewport
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
        });
    };

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animate elements when scrolled into view
    function checkScroll() {
        const skillsSection = document.querySelector('.skills');
        if (isInViewport(skillsSection)) {
            animateSkills();
            // Remove event listener after animation is triggered
            window.removeEventListener('scroll', checkScroll);
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);
    // Check on initial load
    checkScroll();

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scrolling for navigation links

// Enhanced Terminal with AI Chatbot
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const initialCommands = [
    { text: 'Booting SuvijyaOS v1.3.37...', delay: 100, isCommand: false },
    { text: 'Kernel loaded successfully.', delay: 50, isCommand: false },
    { text: 'Initializing cyberpunk interface...', delay: 150, isCommand: false },
    { text: 'Welcome to Suvijya\'s AI Assistant!', delay: 100, isCommand: false },
    { text: 'Type `help` for available commands or ask me anything.', delay: 0, isCommand: false, prompt: true },
];

// Enhanced AI Knowledge Base
const aiKnowledge = {
    "who are you": "I\'m Suvijya Arya, an IoT hardware developer and AI specialist.",
    "background": "I have expertise in embedded systems, AI/ML, and hardware design with experience in smart home automation and industrial IoT.",
    "skills": "My technical skills include:\n- Embedded C/C++\n- Python & AI/ML\n- IoT Protocols\n- PCB Design\n- Edge Computing",
    "projects": "Notable projects:\n1. Smart Home Automation System\n2. Industrial Sensor Network\n3. Edge AI Vision System",
    "contact": "You can reach me at:\nEmail: your.email@example.com\nLinkedIn: suvijya-arya-564404325\nGitHub: suvijya",
    "help": "Available commands:\n- about\n- skills\n- projects\n- contact\n- clear\n- ask [your question]"
};

// Enhanced Response System with Gemini API
async function getAIResponse(input) {
    const lowerInput = input.trim().toLowerCase();
    
    // Direct command matches
    if (aiKnowledge[lowerInput]) {
        return aiKnowledge[lowerInput];
    }
    
    // 'ask' command processing
    if (lowerInput.startsWith('ask ')) {
        const question = lowerInput.substring(4).trim();
        
        // Try local knowledge first
        for (const [key, value] of Object.entries(aiKnowledge)) {
            if (question.includes(key)) {
                return value;
            }
        }
        
        // If not found, query Gemini API
        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB5iSf3DMGu4MS8GAuLxkeL3KuTEq1OfHI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: question
                        }]
                    }]
                })
            });
            
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
            
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            return "I couldn't connect to the AI service. Please try again later.";
        }
    }
    
    // Default response
    return "Command not recognized. Type 'help' for available commands.";
}

let commandIndex = 0;
let charIndex = 0;

function typeTerminalText() {
    if (commandIndex < initialCommands.length) {
        const currentCommand = initialCommands[commandIndex];
        const textToType = currentCommand.text;

        if (charIndex < textToType.length) {
            if (currentCommand.isCommand) {
                terminalInput.textContent += textToType.charAt(charIndex);
            } else {
                if (charIndex === 0 && !currentCommand.prompt) {
                    const p = document.createElement('p');
                    terminalOutput.appendChild(p);
                }
                if (terminalOutput.lastChild && terminalOutput.lastChild.tagName === 'P') {
                    terminalOutput.lastChild.textContent += textToType.charAt(charIndex);
                }
            }
            charIndex++;
            setTimeout(typeTerminalText, currentCommand.delay || 50);
        } else {
            if (currentCommand.prompt) {
                 // Wait for user input or next auto-command
            } else if (!currentCommand.isCommand && terminalOutput.lastChild) {
                 // Move to next line if it was an output line
            }
            commandIndex++;
            charIndex = 0;
            // Scroll to bottom
            const terminalBody = document.querySelector('.terminal-body');
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
            setTimeout(typeTerminalText, 500); // Delay before typing next command/line
        }
    }
}

// Start terminal boot sequence
if (terminalOutput && terminalInput) {
    typeTerminalText();
}

// --- Terminal Command & AI Chatbot Logic ---
const aiAnswers = {
    "who are you": "I'm Suvijya Arya, an IoT hardware developer and AI specialist.",
    "what is your background": "I have experience in embedded systems, AI, and hardware design.",
    "what projects have you worked on": "I've worked on smart home automation, industrial sensor networks, and edge AI vision systems.",
    "what skills do you have": "My skills include IoT, embedded C/C++, Python, AI/ML, and hardware prototyping.",
    "how can i contact you": "You can contact me via the Contact section below or email your.email@example.com.",
    "help": "Available commands: help, about, skills, projects, contact, clear, ask [your question]",
    "about": "I'm passionate about building intelligent hardware and AI solutions.",
    "skills": "IoT, Embedded Systems, AI/ML, Python, C/C++, PCB Design, Edge Computing.",
    "projects": "Smart Home Automation, Industrial Sensor Network, Edge AI Vision System.",
    "contact": "Email: your.email@example.com | LinkedIn: suvijya-arya-564404325 | GitHub: suvijya"
};

function getAIResponse(input) {
    const lower = input.trim().toLowerCase();
    if (lower.startsWith('ask ')) {
        const question = lower.replace('ask ', '').trim();
        // Try to match question to known answers
        for (const key in aiAnswers) {
            if (question.includes(key)) {
                return aiAnswers[key];
            }
        }
        return "I'm happy to answer questions about me! Try: 'ask who are you', 'ask what skills do you have', etc.";
    }
    if (aiAnswers[lower]) {
        return aiAnswers[lower];
    }
    return "Command not found. Type 'help' for available commands.";
}

function appendTerminalOutput(text, isCommand = false) {
    const p = document.createElement('p');
    p.textContent = text;
    if (isCommand) p.classList.add('terminal-command');
    terminalOutput.appendChild(p);
    // Scroll to bottom
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}

function handleTerminalCommand(e) {
    if (e.key === 'Enter') {
        const inputValue = terminalInput.value.trim();
        if (inputValue) {
            // Display user input with prompt
            appendTerminalOutput('user@suvijya:~$ ' + inputValue, true);
            
            // Process command
            if (inputValue.toLowerCase() === 'clear') {
                terminalOutput.innerHTML = '';
            } else {
                const response = getAIResponse(inputValue);
                // Format AI response with indentation
                const formattedResponse = response.split('\n').map(line => 
                    line ? '    ' + line : line
                ).join('\n');
                appendTerminalOutput(formattedResponse);
            }
            
            // Clear input and maintain focus
            terminalInput.value = '';
            terminalInput.focus();
            
            // Auto-scroll to bottom
            const terminalBody = document.querySelector('.terminal-body');
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        }
    }
}

if (terminalInput) {
    terminalInput.addEventListener('keydown', handleTerminalCommand);
}

// Start terminal typing animation when the terminal section is in view or after a delay
document.addEventListener('DOMContentLoaded', () => {
    // Optional: Use Intersection Observer to start when terminal is visible
    // For simplicity, starting after a short delay here
    setTimeout(typeTerminalText, 1000);
});


// Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just log it and show an alert
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.about-content, .skills-content, .projects-container, .contact-content');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('revealed')) {
                element.classList.add('revealed');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
    });
    
    // Add scroll event listener for reveal animations
    window.addEventListener('scroll', revealOnScroll);
    // Check on initial load
    revealOnScroll();
});