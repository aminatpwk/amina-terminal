$(document).ready(function(){
    const $output = $('#terminal-output');
    const $input = $('#command-input');
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = '01';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    const beep = document.getElementById('beep');

    function startIntro(){
        new Typed('#typed-output', {
            strings: [
                "Initializing system...",
                "Loading portfolio...",
                "Welcome to Amina's portfolio. Type `help` for commands."
            ],
            typeSpeed: 50,
            backSpeed: 20,
            backDelay: 1000,
            startDelay: 500,
            showCursor: true,
            cursorChar: '_',
            onComplete: function(self) {
                self.cursor.remove();
                $output.append('<p class="text-yellow-300">>> System ready.</p>');
                $input.prop('disabled', false);
                $input.attr('placeholder', 'Type a command...');
                $input.focus();
                $input[0].scrollIntoView();
            }
        });
    }

    startIntro();

    $input.on('keypress', function(e){
        if(e.key === 'Enter'){
            beep.play();
            const command = $input.val().trim().toLowerCase();
            processCommand(command);
            $input.val('');
        }
    });

    function processCommand(cmd){
        $output.append('<p class="text-yellow-300">>> ${cmd}</p>');
        switch(cmd){
            case 'help':
                $output.append(`
                    <p>>> Available commands:</p>
                    <p>>> <span class="text-yellow-300">about</span> - About me</p>
                    <p>>> <span class="text-yellow-300">resume</span> - Access my Resume</p>
                    <p>>> <span class="text-yellow-300">skills</span> - My Tech stack</p>
                    <p>>> <span class="text-yellow-300">projects</span> - My work</p>
                    <p>>> <span class="text-yellow-300">contact</span> - Get in touch</p>
                    <p>>> <span class="text-yellow-300">hack</span> - Try it...</p>
                    <p>>> <span class="text-yellow-300">clear</span> - Reset Terminal</p>
                `);
                break;
            case 'about':
                $output.append('<p>>> I\'m Amina, a Computer Engineering student. My interests are mainly focused in Java programming, Software Testing' +
                    ' and Computer Architecture. Type \'projects\' to see my work.</p>');
                break;
            case 'resume':
                $output.append('<p>>> <span id="resume-typing"></span></p>');
                new Typed('#resume-typing', {
                    strings: ["Accessing resume data..."],
                    typeSpeed: 50,
                    showCursor: true,
                    cursorChar: '_',
                    onComplete: function(self) {
                        self.cursor.remove();
                        $output.append(`
                        <p>>> <span class="text-yellow-300">Amina</span> - Junior Software Developer</p>
                        <p>>> Experience:</p>
                        <p>>> - <span class="text-yellow-300">Backend Development Intern</span> @ TiranaIT (Oct 2024 - Dec 2024)</p>
                        <p>>>   - Worked extensively with Java and mongoDB, contributed to the design and implementation of the backend architecture.</p>
                        <p>>>   - Enhanced my teamwork and problem-solving skills.</p>
                        <p>>> - <span class="text-yellow-300">IT Specialist and Networking</span> @ Mother Theresa Hospital (OCT 2023 - DEC 2023)</p>
                        <p>>>   - Maintained servers and troubleshooted network related issues</p>
                        <p>>> Skills:</p>
                        <p>>> - Java, PHP, Verilog, JIRA, JavaScript, MySQL, ORACLE</p>
                        <p>>> Education:</p>
                        <p>>> - <span class="text-yellow-300">Computer Engineering</span> - Polytechnic University of Tirana (2022-2025)</p>
                        <p>>> Download full resume: <a href="https://www.dropbox.com/scl/fi/6wioh78k8sxxyed14hirf/Amina-Sokoli-Resume.pdf?rlkey=i279qmy1sk9heo5b61si4vkcy&st=4u9qceva&dl=0" class="text-blue-300 underline" target="_blank">resume.pdf</a></p>
                    `);
                    }
                });
                break;
            case 'skills':
                $output.append(`
                    <p class="text-yellow-300">>> Loading skill matrix...</p>
                    <p>>> Technical: [JavaScript, PHP, Java, Tailwind, Verilog]</p>
                    <p>>> Tools: [Git, Jira, VS Code, IntelliJ]</p>
                    <p>>> Soft Skills: [Problem-solving, Team Collaboration, Team Leading]</p>
                    <p>>> See <span class="text-yellow-300">'resume'</span> for full details.</p>
                `);
                break;
            case 'projects':
                $output.append('<p>>> <span id="projects-typing"></span>')
                new Typed('#projects-typing', {
                    strings: ["Listing projects..."],
                    typeSpeed: 50,
                    showCursor: true,
                    cursorChar: '_',
                    onComplete: function(self) {
                        self.cursor.remove();
                        $output.append(`<p>>> 1. MeeA Community Platform - [A social platform for young developers] (Tech: HTML, CSS, JS, PHP, MySQL) <a href="https://github.com/aminatpwk/codding-community-platform" class="text-blue-400 underline" target="_blank">GitHub</a></p>
                                <p>>> 2. Calorie Tracker App - [A desktop app that keep track of daily consumed calories] (Tech: Java, JavaFX, MySQL) <a href="https://github.com/aminatpwk/calories-app" class="text-blue-400 underline" target="_blank">GitHub</a></p>
                                <p>>> 3. MoonOdyssey - [An informative website about Moon] (Tech: HTML, CSS, JS, PHP, MySQL, Tailwind, NodeJS) <a href="https://github.com/aminatpwk/Moon-Odyssey-Web" class="text-blue-400 underline" target="_blank">GitHub</a></p>
                        `);
                    }
                });
                break;
            case 'contact':
                $output.append(`<p>>> How to get in touch with me: E-mail: amina.sokoli@fti.edu.al | LinkedIn: Amina Sokoli</p>`);
                break;
            case 'clear':
                $output.html(`
                    <p class="text-yellow-300">>> Booting up...</p>
                    <p>>> <span id="typed-output"></span></p>
                `);
                $input.prop('disabled', true);
                startIntro();
                break;
            case 'hack':
                $output.append('<p class="text-yellow-300">>> Initiating hack sequence...</p>');
                $input.prop('disabled', true);
                let hackInterval = setInterval(() => {
                    $output.append(`<p>>> ${Math.random().toString(36).substring(2, 15)}</p>`);
                    $output.scrollTop($output[0].scrollHeight);
                }, 100);
                setTimeout(() => {
                    clearInterval(hackInterval);
                    $output.append('<p class="text-yellow-300">>> Access granted. Just kidding! System secure.</p>');
                    $input.prop('disabled', false);
                    $input.focus();
                }, 2000);
                break;
            default:
                $output.append(`<p>>> Command not found. Type 'help' for options.</p>`);
        }
        $output.scrollTop($output[0].scrollHeight);
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 33);
})