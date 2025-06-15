document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const terminal = document.getElementById('terminal');
    const commandInput = document.getElementById('command-input');
    const helpWindow = document.getElementById('help-window');
    const commandsList = document.getElementById('commands-list');
    
    // System State
    let commandHistory = [];
    let historyIndex = -1;
    
    // Command Definitions
    const commands = {
        help: {
            description: "Show all available commands",
            execute: showHelp,
            hidden: false
        },
        scan: {
            description: "Scan network devices",
            execute: () => simulateLoading('Scanning network...', showScanResults),
            hidden: false
        },
        clear: {
            description: "Clear terminal screen",
            execute: clearTerminal,
            hidden: false
        },
        connect: {
            description: "Establish TOR connection",
            execute: () => simulateLoading('Connecting via TOR...', showTorConnection),
            hidden: false
        },
        encrypt: {
            description: "Run encryption protocol",
            execute: () => simulateLoading('Encrypting data...', showEncryptionResult),
            hidden: false
        },
        decode: {
            description: "Decode data",
            execute: () => simulateLoading('Decoding data...', showDecodingResult),
            hidden: false
        },
        sysinfo: {
            description: "Show system information",
            execute: showSystemInfo,
            hidden: false
        },
        blood: {
            description: "Activate blood protocol (WARNING)",
            execute: activateBloodProtocol,
            hidden: false
        },
        scream: {
            description: "Emergency signal",
            execute: activateScream,
            hidden: false
        },
        hack: {
            description: "Enable hack mode",
            execute: enableHackMode,
            hidden: false
        },
        panic: {
            description: "Emergency mode",
            execute: enablePanicMode,
            hidden: false
        },
        ghost: {
            description: "Summon a ghost",
            execute: spawnGhost,
            hidden: false
        },
        bitcoin: {
            description: "Mine bitcoins",
            execute: () => simulateLoading('Mining bitcoins...', showBitcoinResult),
            hidden: false
        },
        ddos: {
            description: "DDOS attack",
            execute: () => simulateLoading('Launching DDOS attack...', showDdosResult),
            hidden: false
        },
        destroy: {
            description: "ACTIVATE DESTRUCTION MODE",
            execute: startDestruction,
            hidden: false
        }
    };
    
    // Initialize System
    initBinaryRain();
    setupEventListeners();
    addLine('> System initialized');
    addLine('> Type "help" for available commands');
    updateDateTime();
    showHelp(); // Show help panel by default
    
    // Main Functions
    function initBinaryRain() {
        const container = document.querySelector('.matrix-effect');
        if (!container) return;
        
        container.innerHTML = '';
        const columns = Math.min(150, Math.floor(window.innerWidth / 15));
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'binary-column';
            column.style.left = `${i * 15}px`;
            column.style.animationDuration = `${3 + Math.random() * 7}s`;
            column.style.animationDelay = `${Math.random() * 2}s`;
            
            let binaryString = '';
            const length = 15 + Math.floor(Math.random() * 20);
            for (let j = 0; j < length; j++) {
                binaryString += Math.random() > 0.5 ? '1' : '0';
            }
            column.textContent = binaryString;
            
            container.appendChild(column);
        }
    }
    
    function setupEventListeners() {
        if (commandInput) {
            commandInput.addEventListener('keydown', handleCommandInput);
        }
        
        window.addEventListener('resize', initBinaryRain);
        
        document.addEventListener('click', () => {
            if (commandInput) {
                commandInput.focus();
            }
        });
    }
    
    function handleCommandInput(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.textContent.trim();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                processCommand(command);
            }
            this.textContent = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex > 0) {
                historyIndex--;
                this.textContent = commandHistory[historyIndex];
                moveCursorToEnd(this);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.textContent = commandHistory[historyIndex];
                moveCursorToEnd(this);
            } else {
                historyIndex = commandHistory.length;
                this.textContent = '';
            }
        }
    }
    
    function processCommand(command) {
        if (!terminal) return;
        
        addLine(`root@h4ck3r:~$ ${command}`);
        
        const cmd = command.toLowerCase();
        if (commands[cmd]) {
            commands[cmd].execute();
        } else {
            addLine(`> Command not found: ${command}`);
            addLine('> Type "help" for available commands');
        }
    }
    
    // Command Functions
    function showHelp() {
        commandsList.innerHTML = Object.entries(commands)
            .filter(([_, cmd]) => !cmd.hidden)
            .map(([name, cmd]) => `
                <div class="command-item">
                    <span class="command-name">${name}</span>
                    <span class="command-desc">${cmd.description}</span>
                </div>`
            ).join('');
    }
    
    function showScanResults() {
        addLine('> Found 3 devices:');
        addLine('> 192.168.1.1 - Router');
        addLine('> 192.168.1.2 - Workstation');
        addLine('> 192.168.1.3 - Printer');
    }
    
    function showTorConnection() {
        addLine('> Connection established: 7F3A...D9C4.onion');
        addLine('> Anonymity: High');
        addLine('> Encryption: AES-256');
    }
    
    function showEncryptionResult() {
        addLine('> Data encrypted: 89F3...C2A1');
        addLine('> Algorithm: AES-256-GCM');
        addLine('> Key strength: 256 bits');
    }
    
    function showDecodingResult() {
        addLine('> Data decoded successfully');
        addLine('> Content: [REDACTED]');
    }
    
    function showSystemInfo() {
        addLine('> SYSTEM INFORMATION:');
        addLine('> OS: HACS v3.2.1');
        addLine('> CPU: 8 cores @ 3.6GHz');
        addLine('> RAM: 32GB DDR4');
        addLine('> Storage: 1TB SSD');
    }
    
    function spawnGhost() {
        const ghost = document.createElement('div');
        ghost.className = 'ghost';
        ghost.textContent = '👻';
        ghost.style.top = `${Math.random() * 70 + 10}vh`;
        ghost.style.left = `${Math.random() * 80 + 10}vw`;
        ghost.style.animationDuration = `${10 + Math.random() * 10}s`;
        
        document.body.appendChild(ghost);
        
        setTimeout(() => {
            ghost.style.opacity = '0.9';
            setTimeout(() => {
                ghost.style.opacity = '0';
                setTimeout(() => ghost.remove(), 2000);
            }, 8000);
        }, 100);
    }
    
    function activateBloodProtocol() {
        const blood = document.createElement('div');
        blood.className = 'blood-effect';
        document.body.appendChild(blood);
        
        addLine("> WARNING: BLOOD PROTOCOL INITIATED", "error");
        setTimeout(() => {
            addLine("> CRITICAL ERROR: SYSTEM CORRUPTION DETECTED", "error");
        }, 1000);
        
        setTimeout(() => blood.remove(), 5000);
    }
    
    function activateScream() {
        addLine("> EMERGENCY SIGNAL SENT TO ALL UNITS", "error");
        document.body.classList.add('scream-mode');
        setTimeout(() => {
            document.body.classList.remove('scream-mode');
        }, 3000);
    }
    
    function enableHackMode() {
        addLine("> HACK MODE ACTIVATED", "warning");
        document.title = "HACK MODE ACTIVE - HACS";
        document.querySelector('.terminal-header').style.backgroundColor = "#300";
    }
    
    function enablePanicMode() {
        addLine("> PANIC MODE ACTIVATED - ALL SYSTEMS OVERRIDE", "error");
        document.body.classList.add('panic-mode');
        setTimeout(() => {
            document.body.classList.remove('panic-mode');
        }, 5000);
    }
    
    function showBitcoinResult() {
        addLine("> MINED 0.000034 BTC");
        addLine("> WALLET: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
    }
    
    function showDdosResult() {
        addLine("> DDOS ATTACK SUCCESSFUL");
        addLine("> TARGET: 93.184.216.34 DOWN FOR 8 MINUTES");
    }
    
    function startDestruction() {
        document.body.classList.add('destruction-mode');
        addLine("> DESTRUCTION SEQUENCE ACTIVATED", "error");
        
        setTimeout(() => {
            const skull = document.createElement('div');
            skull.className = 'skull-screen';
            skull.innerHTML = `
                <pre style="color: red; font-size: 24px; margin: 0;">
          ⠀⠀⢀⣤⣶⣾⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀
⢻⣆⠀⠀⠀⠀⠀⠀⠀⢸⣿⡿⠛⠿⣿⡿⠟⠿⡟⣿⠀⠀⠀⠀⠀⠀⠀⠀⣰⡟
⠈⢻⣷⣄⠀⠀⠀⠀⠀⠈⢻⣇⢀⣠⡟⢧⣀⣀⣿⡏⠀⠀⠀⠀⠀⠀⣠⣾⡟⠁
⠀⠀⠹⣿⣷⣄⠀⠀⠀⠀⠙⣏⢹⣿⣤⣼⣿⢏⡝⠁⠀⠀⠀⠀⣠⣾⣿⠏⠀⠀
⠀⠀⠀⠈⠻⣿⣷⣤⡀⠀⠀⢸⡆⠿⠿⠏⠇⣾⠁⠀⠀⢀⣤⣾⣿⠗⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠛⢷⣿⣶⣄⡈⠻⣿⣿⣿⡿⠋⢀⣠⣶⣿⡿⠛⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣀⠀⠉⠛⠿⣯⣷⣦⣤⣠⣶⣺⣽⠿⠛⠁⠀⣀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢿⡿⣷⣄⣠⣤⡾⣟⣻⡿⣭⣟⣷⢦⣤⣀⣠⡾⢿⠇⠀⠀⠀⠀⠀
⠀⠀⣶⣶⢶⣾⣶⣾⣿⡶⠾⠛⠋⠉⠀⠀⠉⠛⠻⠷⠖⣿⣷⣶⣷⡖⣶⡆⠀⠀
⠀⠀⠉⠋⠀⠀⠀⠀⢹⣦⣦⠀⠀⠀⠀⠀⠀⠀⠀⣦⣴⠇⠀⠀⠀⠈⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀
                </pre>
                <div class="skull-text">
                  ----SYSTEM DESTROYED----
                </div>
            `;
            document.body.appendChild(skull);
            
            setTimeout(() => {
                skull.remove();
                document.body.classList.remove('destruction-mode');
                addLine("> DESTRUCTION SEQUENCE COMPLETED", "error");
            }, 3000);
        }, 2000);
    }
    
    // Utility Functions
    function addLine(text, className = '') {
        if (!terminal) return;
        
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        terminal.appendChild(line);
        scrollToBottom();
    }
    
    function scrollToBottom() {
        if (terminal) terminal.scrollTop = terminal.scrollHeight;
    }
    
    function clearTerminal() {
        if (!terminal) return;
        terminal.innerHTML = '';
        addPrompt();
    }
    
    function addPrompt() {
        if (!terminal) return;
        
        const promptLine = document.createElement('div');
        promptLine.className = 'terminal-line';
        promptLine.innerHTML = `
            <span class="prompt">root@h4ck3r:~$</span>
            <span class="input" id="command-input" contenteditable="true" spellcheck="false"></span>
            <span class="cursor blink">|</span>
        `;
        terminal.appendChild(promptLine);
        
        const newInput = promptLine.querySelector('.input');
        if (newInput) {
            newInput.focus();
            newInput.addEventListener('keydown', handleCommandInput);
            commandInput = newInput;
        }
    }
    
    function simulateLoading(text, callback) {
        const dots = ['.', '..', '...'];
        let i = 0;
        const loadingLine = document.createElement('div');
        loadingLine.className = 'terminal-line';
        loadingLine.textContent = `> ${text}`;
        terminal.appendChild(loadingLine);
        
        const interval = setInterval(() => {
            loadingLine.textContent = `> ${text}${dots[i % dots.length]}`;
            i++;
        }, 300);
        
        setTimeout(() => {
            clearInterval(interval);
            callback();
        }, 1500 + Math.random() * 1000);
    }
    
    function moveCursorToEnd(element) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    
    function updateDateTime() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            dateElement.textContent = new Date().toLocaleString();
        }
    }
});