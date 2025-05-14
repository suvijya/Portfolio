// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // SUPABASE INTEGRATION - Initialize Supabase client
    // IMPORTANT: Replace with your actual Supabase URL and Anon Key
    const SUPABASE_URL = 'https://dlhldbsvrrcwshndjxbw.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsaGxkYnN2cnJjd3NobmRqeGJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTEyNjksImV4cCI6MjA2MjcyNzI2OX0.bslf92lZ8xAMB14eqTtN2kZP5Y4Fzu-SvU0Tx2lwUaI';
    let supabaseClient = null; 
    try {
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            const { createClient } = window.supabase;
            supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase client initialized.');
        } else {
            console.error('Supabase library not loaded or createClient is not a function.');
            alert('Supabase library not loaded. Contact form may not work. Check console.');
        }
    } catch (error) { 
        console.error('Error initializing Supabase client (during createClient):', error.message);
        alert('Error initializing Supabase. Contact form may not work. Check console for details.');
    }

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
                typingDelay = 1000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingDelay = 500;
            }
            setTimeout(type, typingDelay);
        }
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
            // Send the form data to Supabase
            if (!supabaseClient) {
                alert('Supabase is not initialized. Cannot send message.');
                return;
            }
            supabaseClient.from('contact_messages').insert([
                { name, email, subject, message }
            ]).then(response => {
                if (response.error) {
                    alert('Error sending message: ' + response.error.message);
                } else {
                    alert('Message sent successfully!');
                    contactForm.reset();
                }
            });
        });
    }

    // --- Terminal Command & AI Chatbot Logic ---
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const initialCommands = [
        { text: 'Booting SuvijyaOS v1.3.37...', delay: 100, isCommand: false },
        { text: 'Kernel loaded successfully.', delay: 50, isCommand: false },
        { text: 'Initializing cyberpunk interface...', delay: 150, isCommand: false },
        { text: 'Welcome to Suvijya\'s AI Assistant!', delay: 100, isCommand: false },
        { text: 'Type `help` for available commands or ask me anything.', delay: 0, isCommand: false, prompt: true },
    ];
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
    setTimeout(typeTerminalText, 1000);
});