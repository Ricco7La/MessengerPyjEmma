"use strict";

// Elements.
let conversation = $('.conversation');
let newMessage = $('textarea.new-message');
let textBarInput = $('input[name=text-bar-input]');

/**
 * Fill new-message textarea.
 */
textBarInput.keyup(function () {
    newMessage.val($(this).val());
});

/**
 * Remove last message.
 */
$('button.remove-last-message').click(function () {
    // Get last messages wrapper.
    let lastMessages = conversation.children().last();

    if (0 !== lastMessages.length) {
        if (1 === lastMessages.children().length) {
            // Remove entire wrapper.
            lastMessages.remove();
        } else {
            // Remove last message.
            lastMessages.children().last().remove();
        }
    }
});

/**
 * Clear Conversation.
 */
$('button.clear-chat').click(function () {
    conversation.html(null);
});



/**
 * Send new message.
 *
 * @param from Sender person (1/2).
 */
function sendNewMessage(from, msgText, isEmoji = false) {

    if (msgText === '' || msgText === null) {
        return;
    }

    let messagesClass;
    if (from === 1) {
        messagesClass = 'messages-received';
    } else if (from === 2) {
        messagesClass = 'messages-sent';
    }

    // Create new message wrapper.
    let messageWrapper;

    if (isEmoji) {
        messageWrapper = $(' <div class="message message--emoji">'+msgText+'</div>');
    } else {
        messageWrapper = $(' <div class="message"></div>');
        // Add message text to message wrapper.
        messageWrapper.text(msgText);
    }

    // Add message text to message wrapper.
    //messageWrapper.text(msgText);

    // Get last conversation box.
    let lastConversation = conversation.children().last();

    if (lastConversation.hasClass(messagesClass)) {
        // Append to existing messages wrapper.
        lastConversation.append(messageWrapper);
    } else {
        // Create new messages wrapper.
        let messagesWrapper = $(' <div class="messages"></div>');
        // Add class.
        messagesWrapper.addClass(messagesClass);
        // Append message.
        messagesWrapper.append(messageWrapper);

        // Add new message to conversation.
        conversation.append(messagesWrapper);
    }

    // Scroll to bottom
    conversation[0].scrollTop = conversation[0].scrollHeight
    
    // Make message input empty.
    newMessage.val(null);
    textBarInput.val(null);
    document.getElementById("validerBtn").className = "thumb";
}


// Custom Script

//Button
document.getElementById("validerBtn").addEventListener('click', sendBtn);
function sendBtn() {
    //alert(document.getElementById("textArea").value); 
    //console.log(document.getElementById("textArea").value);
    if (document.getElementById("validerBtn").className == "send") {
        sendNewMessage(2,document.getElementById("textArea").value);       
    } else {
        sendNewMessage(2,'&#x1F61D', true);
        //console.log("emoji");
    }
    

}

//Update text area
document.getElementById("textArea").addEventListener('input', updateValue);
function updateValue(e) {
    //console.log(e.target.value);
    if(e.target.value === "" && document.getElementById("validerBtn").className == "send"){
        if (document.getElementById("validerBtn").className == "send") {
            document.getElementById("validerBtn").className = "thumb";
        }

    } else {
        if (document.getElementById("validerBtn").className == "thumb") {
            document.getElementById("validerBtn").className = "send";
        }
    }
}

// Submit Event
document.getElementById("msgForm").addEventListener('submit', submitedMsg);
function submitedMsg(e) {
    e.preventDefault();
    sendNewMessage(2,document.getElementById("textArea").value)
    return false;
}