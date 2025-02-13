document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("userInput");

    input.focus();

    document.addEventListener("click", function() {
        input.focus();
    });

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") { // Detect 'Enter' key press
            event.preventDefault(); // Prevent form submission (if any)
            handleCommand(input.value.trim()); // Process the command
            input.value = ""; // Clear input field after execution
        }
    });

    function handleCommand(command) {
        switch (command.toLowerCase()) { 
            case "help":
                displayOutput("Available commands:\nhelp\nhello\nwhois\ncontact\nprojects\neducation\nclear");
                break;
            case "hello":
                displayOutput("Hello, user! How can I assist you?");
                break;
            case "clear":
                clearOutput(); 
                break;
            default:
                displayOutput(`Command not recognized: ${command}`);
        }
    }

    function displayOutput(message, type = "default") {
        const outputContainer = document.querySelector(".output-container");
        const output = document.createElement("div");
        output.classList.add("terminal-output");
        typewriterDOM(message, output, 50);
        outputContainer.prepend(output);
    }
    
    
    function clearOutput() {
        const outputs = document.querySelectorAll(".terminal-output");
        outputs.forEach(output => output.remove()); // Remove only command outputs
    }
    
});

function typewriterNormal(message, elementSelector, speed) {
    let textPosition = 0;

    function type() {
        let displayedText = message.substring(0, textPosition);

        displayedText = displayedText.replace(/help/g, '<span class="highlight">help</span>');

        document.querySelector(elementSelector).innerHTML = 
            displayedText + (textPosition < message.length ? "<span>|</span>" : "");

        if (textPosition++ < message.length) {
            setTimeout(type, speed);
        }
    }

    type();
}

function typewriterDOM(message, element, speed) {
    let textPosition = 0;

    function type() {
        let displayedText = message.substring(0, textPosition);

        displayedText = displayedText.replace(/help/g, '<span class="highlight">help</span>');
        element.innerHTML = displayedText + (textPosition < message.length ? "<span>|</span>" : "");

        if (textPosition++ < message.length) {
            setTimeout(type, speed);
        }
    }

    type();
}



// Example Usage:
window.addEventListener("load", function() {
    typewriterNormal("Welcome to the terminal of", ".top-text", 50);
    
    setTimeout(() => {
        typewriterNormal("Type 'help' to see available commands.", ".btm-text", 50);
    }, 2000);
});
