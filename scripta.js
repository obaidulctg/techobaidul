const chatContainer = document.getElementById("chat-container");
const toggleBtn = document.getElementById("chat-toggle-btn");
const closeBtn = document.getElementById("close-btn");
const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let responses = {};
let multimediaResponses = {};
let specialDays = {};
let suggestedQuestions = [];
let greetings = {};
let lastResponses = {};

// Fetch data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        responses = data.responses;
        multimediaResponses = data.multimediaResponses;
        specialDays = data.specialDays;
        suggestedQuestions = data.suggestedQuestions;
        greetings = data.greetings;
        displaySuggestions();
    })
    .catch(error => console.error('Error fetching data:', error));

// Levenshtein Distance function to calculate similarity
function getLevenshteinDistance(a, b) {
    const tmp = [];
    let i, j, alen = a.length, blen = b.length, res;
    for (i = 0; i <= alen; i++) {
        tmp[i] = [i];
    }
    for (j = 0; j <= blen; j++) {
        tmp[0][j] = j;
    }
    for (i = 1; i <= alen; i++) {
        for (j = 1; j <= blen; j++) {
            res = a[i - 1] === b[j - 1] ? 0 : 1;
            tmp[i][j] = Math.min(tmp[i - 1][j] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j - 1] + res);
        }
    }
    return tmp[alen][blen];
}

// Fuzzy match function to find the closest match
function fuzzyMatch(query, responses) {
    let minDistance = Infinity;
    let bestMatch = "default"; // default fallback in case no close match is found

    for (let key in responses) {
        if (responses.hasOwnProperty(key)) {
            let distance = getLevenshteinDistance(query.toLowerCase(), key.toLowerCase());
            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = key;
            }
        }
    }

    return bestMatch;
}

// Prevent download attribute on anchor tags
document.addEventListener('click', function(e) {
    if (e.target.matches('a[download]')) {
        e.preventDefault();
    }
});

// Toggle chat visibility
toggleBtn.addEventListener("click", () => {
    chatContainer.classList.toggle("hidden");
    if (!chatContainer.classList.contains("hidden")) {
        sendGreeting();
    }
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
      chatContainer.classList.add("hidden");
  });
}

// Scroll to bottom function
function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Display message with typing effect and multimedia
function displayMessage(message, sender = "bot", isHTML = false, multimedia = "") {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message", sender);

    const textElement = document.createElement("div");
    textElement.classList.add("text");

    messageContainer.appendChild(textElement);
    chatBody.appendChild(messageContainer);

    if (multimedia) {
        const multimediaElement = document.createElement("div");
        multimediaElement.innerHTML = multimedia;
        messageContainer.appendChild(multimediaElement);
    }

    // Ensure autoscroll before typing starts
    scrollToBottom();

    if (sender === "bot") {
        typeMessage(textElement, message, isHTML);
    } else {
        textElement.textContent = message;
        scrollToBottom(); // Ensure autoscroll immediately for user messages
    }
}

// Typing effect function
function typeMessage(element, message, isHTML = false) {
    let index = 0;
    const typingSpeed = 10; // milliseconds per character
    const specialChars = ['<', '>', '&', ';', '/', '=', '"', "'",'-','.','html','body','!DOCTYPE','head','meta','title','lang','en','charset','UTF-8','color','margin','padding','border','solid','radius','box','shadow','rgba','background','text-align','font','family','sans','serif','title','style','animation','container','height','width','min','max','@','keyframe','fade','in','out','from','to','h','1','2','3','4','5','6','p','button','hover','style','div','function','var','let','const','document','add','Event','Listener','click','matches','prevent','default','target','document','display','block','none','hidden','toggle','classList','add','remove','scroll','top','height','body','scroll','client','offset','bottom','scrollTop','scroll','Height'];

    // Create and append the blinking emoji
    const emojiElement = document.createElement("span");
    emojiElement.innerHTML = "&#129302;";
    emojiElement.classList.add("typing-emoji");
    element.appendChild(emojiElement);

    function typeNextChar() {
        if (index < message.length) {
            const nextChar = message[index];
            if (specialChars.includes(nextChar)) {
                element.innerHTML = message.substring(0, index + 1) + emojiElement.outerHTML;
                index++;
                typeNextChar(); // Immediately type next character if it's a special character
            } else {
                if (isHTML) {
                    element.innerHTML = message.substring(0, index) + emojiElement.outerHTML;
                } else {
                    element.textContent = message.substring(0, index + 1) + emojiElement.outerHTML;
                }
                index++;
                setTimeout(typeNextChar, typingSpeed);
            }
        } else {
            emojiElement.remove();
            if (isHTML) {
                element.innerHTML = message; // Ensure the final message does not include the emoji
            } else {
                element.textContent = message; // Ensure the final message does not include the emoji
            }
            scrollToBottom();
        }
    }

    typeNextChar();
}

// Get local time and send a greeting
function sendGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting = "";

    if (hours < 12) {
        greeting = greetings.morning;
    } else if (hours < 18) {
        greeting = greetings.afternoon;
    } else {
        if (hours < 22) {
            greeting = greetings.evening;
        } else if (hours < 24) {
            greeting = greetings.night;
        } else {
            greeting = greetings.midnight;
        }
    }

    const today = `${now.getMonth() + 1}-${now.getDate()}`;
    if (specialDays[today]) {
        greeting += `
            <h2 style="color:#FF00FF;"><span style="color: blue;">Special Greeting:</span> ${specialDays[today]}</h2>
        `;
    }

    displayMessage(greeting, "bot", true);
}

// Display suggested questions
function displaySuggestions() {
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.classList.add("suggestions");

    suggestedQuestions.forEach(question => {
        const suggestionElement = document.createElement("div");
        suggestionElement.classList.add("suggestion");
        suggestionElement.textContent = question;
        suggestionElement.addEventListener("click", () => {
            userInput.value = question;
            handleInput();
        });
        suggestionsContainer.appendChild(suggestionElement);
    });

    chatBody.appendChild(suggestionsContainer);
    scrollToBottom();
}

// Handle input
function handleInput() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    displayMessage(userMessage, "user");

    const matchedQuestion = fuzzyMatch(userMessage, responses);
    const possibleAnswers = responses[matchedQuestion];
    
    if (!possibleAnswers || possibleAnswers.length === 0) {
        displayMessage("I'm sorry, I don't understand that. Please try a different question.", "bot");
        return;
    }

    let botResponse;
    if (lastResponses[matchedQuestion] === undefined) {
        botResponse = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
    } else {
        const remainingAnswers = possibleAnswers.filter(answer => answer !== lastResponses[matchedQuestion]);
        if (remainingAnswers.length === 0) {
            botResponse = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
        } else {
            botResponse = remainingAnswers[Math.floor(Math.random() * remainingAnswers.length)];
        }
    }

    lastResponses[matchedQuestion] = botResponse;

    // Check for multimedia response
    const multimedia = multimediaResponses[userMessage.toLowerCase()]?.multimedia || "";

    displayMessage(botResponse, "bot", true, multimedia);

    userInput.value = "";
}

sendBtn.addEventListener("click", handleInput);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleInput();
});