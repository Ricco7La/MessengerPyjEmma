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
function sendNewMessage(from, msgText) {

    var isEmoji = msgText.codePointAt(0) > 120000 && msgText.codePointAt(0) < 150000

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

    
    if (from === 2) {
        //random delay for response
        var timer = Math.floor(Math.random() * 3000) + 1500;
        const myTimeout = setTimeout(searchForResponse.bind(null, msgText), timer); 
        
        // Make message input empty.
        newMessage.val(null);
        textBarInput.val(null);
        document.getElementById("validerBtn").className = "thumb";
    }
    
    
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
        sendNewMessage(2,'😝');
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

//Header Buttons
document.getElementById("back").addEventListener('click', backBtn);
function backBtn() {
    //alert("Pas de bol ... tu es coincée avec moi. 😂");
    Swal.fire({
        title: 'Pas de bol ... ',
        text: "... tu es coincée avec moi ! 😂😂😂",
        icon: 'error',
        confirmButtonColor: "#0053cd",
        confirmButtonText: 'OK'
      })
}

document.getElementById("phone").addEventListener('click', phoneBtn);
function phoneBtn() {
    //alert("phone");
    Swal.fire({
        title: 'Dring ... Dring ... Dring ',
        text: "Il n'y a personne. ",
        icon: 'warning',
        confirmButtonColor: "#0053cd",
        confirmButtonText: "OK"
      })
}

document.getElementById("cam").addEventListener('click', camBtn);
function camBtn() {
Swal.fire({
    text: "C'est quand tu veux pour un appel vidéo mais là ça va pas être possible",
    icon: 'warning',
    confirmButtonColor: "#0053cd",
    confirmButtonText: "Promis, je t'appele bientôt."
  })
}

document.getElementById("info").addEventListener('click', infoBtn);
function infoBtn() {
    Swal.fire({
        text: "C'est juste un bot hein, c'est pas vraiment moi qui parle ! 😝",
        icon: 'info',
        confirmButtonColor: "#0053cd",
        confirmButtonText: 'OK'
      })
}


//Bot Function
function searchForResponse(txt) {
    txt = txt.trim().toLowerCase();
    console.log(txt.length);

    if (txt.includes("salut")) {
        //first
        sendNewMessage(1,"Comment ça va ?");
    //  } else if(txt.includes("aaaaaaaaaaaaaaaaaaaaaaaaa")){
    } else if(txt.includes("et toi")){
        //first
        sendNewMessage(1,"Ca va. 😁");
        sendNewMessage(1,"Et sinon quoi de neuf ?");
    } else if(txt.includes("ça va") || txt.includes("ca va") || txt.includes("sa va")){
        sendNewMessage(1,"Et alors rien d'autre à raconter ?");
    } else if(txt.includes("a+")){
        sendNewMessage(1,"Non, ne me laisse pas 😭");
        sendNewMessage(1,"Il fait froid et tout noir quand tu eteins ton téléphone.");
    } else if(txt.includes("va crever, connard")){
        sendNewMessage(1,"Effacement");
    } else if(txt.includes("Non")){
        sendNewMessage(1,"C'est toujours aussi difficile d'avoir des nouvelles de ta part.");
    } else if(txt.includes("Rien")){
        sendNewMessage(1,"Toujours aussi loquace à ce que je vois");
    } else if(txt.includes("bonne nuit")){
        sendNewMessage(1,"Bonne nuit. 😘");
    }else if(txt.includes("je t'aime") || txt.includes("je t aime") ){
        sendNewMessage(1,"Je sais, comment pourait-il en être autrement. 🤣");
        setTimeout(() => {
            sendNewMessage(1,"Mais moi aussi je t'aime. 😘");
        }, 3000);
    }else if(txt.includes("aaaaaaaaaaaaaaaaaaaaaaaaa")){

    } else if(txt.codePointAt(0) == 128405){
        sendNewMessage(1,"T'inquiète, moi aussi je t'aime. 😘");
    } else if(txt.codePointAt(0) == 129318){
        sendNewMessage(1,"Tu l'aimes vraiment beaucoup cet emoji, non ?");
        sendNewMessage(1,"😝");
    } else if(txt.codePointAt(0) > 120000 && txt.codePointAt(0) < 150000){
        sendNewMessage(1,txt);        
    }else {
        var rnd = Math.floor(Math.random() * 10 + 1);
        
        if (rnd == 1 || rnd == 2) { 
            sendNewMessage(1,"Je suis pas sur de comprendre.");
        } else if (rnd == 3 || rnd == 4) {  
            sendNewMessage(1,"D'accord avec toi.");
        } else if (rnd == 5) {  
            sendNewMessage(1,"Ouais, si tu le dis.");
        } else if (rnd == 6) {  
            sendNewMessage(1,"Tu as totalement raison");
        } else if (rnd == 7) { 
            sendNewMessage(1,"Essaie encore");
        } else if (rnd == 8) { 
            sendNewMessage(1,"🤦🏻‍♂");
        } else if (rnd == 9) { 
            sendNewMessage(1,"🤔");
        } else {
            sendNewMessage(1,"...");
        }  
    }
}