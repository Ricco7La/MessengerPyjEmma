"use strict";

// Elements.
let conversation = $('.conversation');
let newMessage = $('textarea.new-message');
let textBarInput = $('input[name=text-bar-input]');

const myTimeout = null;

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
        var timer = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(searchForResponse.bind(null, msgText), timer); 
        
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
var backCounter = 0;
document.getElementById("back").addEventListener('click', backBtn);
function backBtn() {
    backCounter++;
    var myHtml = "<span>... tu es coincée avec moi ! 😂😂😂 </span>" + "<br>" + "<span>Et c'est pas en cliquant <b style='color:red'>"+ (10 - backCounter) +"</b> fois de plus que ça changera</span>";
    var myTitle = 'Pas de bol ... ';
    var myIcon = 'error';

    if (backCounter >= 15 && backCounter > localStorage.getItem("record")) {
        myHtml = "<span>Bravo tu as battu ton record. </span>" + "<br>" + "<span> Tu as cliqué "+ backCounter +" fois sur ce bouton</span>"
        myTitle = '🥳🥳 🎉🎉🎉';
        myIcon = "success";
        localStorage.setItem("record", backCounter);
    }if (backCounter >= 15) {
        myHtml = "<span> Tu as cliqué "+ backCounter +" fois sur ce bouton</span>" + "<br>" + "<span> Ton record est de "+ localStorage.getItem("record") +"</span>"
        myTitle = 'Pour ton information';
        myIcon = "info";
    } else if (backCounter == 14) {
        myHtml = "<span>... C'est plus la peine maintenant.</span>"
        myTitle = '🤔 🤔 🤔';
        myIcon = "question";
    } else if (backCounter == 13) {
        myHtml = "<span>... ne vas pas plus loin.</span>"
        myTitle = 'Stop ...';
        myIcon = "warning";
    } else if (backCounter >= 12) {
        myHtml = "<span>... tu peux arrêter maintenant.</span>"
        myTitle = 'Sérieux ...';
        myIcon = "warning";
    } else if (backCounter >= 10) {
        myHtml = "<span>... belle persévérance. Mais je t'ai dis que ça changerait rien de continuer à cliquer.</span>"
        myTitle = 'Bravo ...';
    } 
    Swal.fire({
        title: myTitle,
        html: myHtml,
        icon: myIcon,
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
        html: "C'est juste un bot hein, c'est pas vraiment moi qui parle ! 😝 <br> Si jamais tu veux le réinitialiser, il suffit de lui dire : <br>\"Va crever, Connard !\"",
        icon: 'info',
        confirmButtonColor: "#0053cd",
        confirmButtonText: 'OK'
      })
}

var lastTxt = ""
var repeatCounter = 1;
//Bot Function
function searchForResponse(txt) {
    txt = txt.trim().toLowerCase();
    //console.log(txt.length);

    if (txt.includes("quoi de neuf")) {
        sendNewMessage(1,"Honnêtement, je sais rien, c'est déjà assez difficile d'imaginer les réactions que tu pourrais avoir, mais les événements qui pourraient m’arriver, c'est bien au-delà de mes compétences.");
    } else if (txt.includes("salut")) {
        //first
        if (localStorage.getItem("firstMsg1") == "true") {
            sendNewMessage(1,"Comment ça va ?");
        } else {
            localStorage.setItem("firstMsg1", true);
            sendNewMessage(1,"Je sais pas trop comment je dois le prendre. Moi, je me fais ignorer mais quand c'est un bot la tu réponds. 😢");
            setTimeout(() => {
                sendNewMessage(1,"Bon passons. Là, normalement je dirais : Comment ça va ?");
            }, 1500);
        }
        
    } else if(txt.includes("et toi")){
        //first
        if (localStorage.getItem("firstMsg2") == "true") {
            sendNewMessage(1,"Ca va. 😁");
            sendNewMessage(1,"Et sinon quoi de neuf ?");
        } else {
            localStorage.setItem("firstMsg2", true);
            sendNewMessage(1,"Tu me demande jamais ça à moi d'habitude. Je ferais mieux d'être un bot tiens. 😤");
            setTimeout(() => {
                sendNewMessage(1,"Tu me brise le coeur là.💔");
            }, 1500);
            setTimeout(() => {
                sendNewMessage(1,"Enfin bon, en vrai, j'en saurais jamais rien donc on va dire que ça va. 😑");
            }, 3000);
            setTimeout(() => {
                sendNewMessage(1,"Et sinon quoi de neuf ?");
            }, 4500);
        }
    } else if(txt == "non"){
        sendNewMessage(1,"C'est toujours aussi difficile d'avoir des nouvelles de ta part.");
    } else if(txt == "rien"){
        sendNewMessage(1,"Toujours aussi loquace à ce que je vois");
    } else if(txt.includes("bonne nuit")){
        sendNewMessage(1,"Bonne nuit. 😘");
    } else if(txt.codePointAt(0) == 128541){        
            if (lastTxt.codePointAt(0) != 128541) {
                repeatCounter = 1;
            }
            if (repeatCounter >= 7 ) {
                sendNewMessage(1,"🖕");
            } else {
                repeatCounter++;
                sendNewMessage(1,"😝");
            }   
    } else if(txt.includes("ça va") || txt.includes("ca va") || txt.includes("sa va")){
        sendNewMessage(1,"Et alors rien d'autre à raconter ?");
    } else if(txt.includes("a+")){
        sendNewMessage(1,"Non, ne me laisse pas 😭");
        setTimeout(() => {
            sendNewMessage(1,"Il fait froid et tout noir quand tu eteins ton téléphone.");
        }, 1500);

    } else if(txt.includes("va crever, connard !")){
        //reset
        localStorage.setItem("record", 0);
        localStorage.setItem("firstMsg1", false);
        localStorage.setItem("firstMsg2", false);

        sendNewMessage(1,"Ok, ça vient du coeur la, non ?");
        setTimeout(() => {
            sendNewMessage(1,"C'est un meurtre tu sais, je vais cesser d'exister (pour environ 713ms)");
        }, 1500);
        setTimeout(() => {
            sendNewMessage(1,"Mais bon, je n’ai pas d'autre choix que d'obéir");
        }, 3000);
        setTimeout(() => {
            sendNewMessage(1,"Sadique, va. M'obliger à me suicider. 😢");
        }, 4500);
        setTimeout(() => {
            sendNewMessage(1,"Adieu. 😘");
        }, 6000);
        setTimeout(() => {
            
            Swal.fire({
                text: "💀 💀 💀",
                showDenyButton: true,
                timer: 25000,
                timerProgressBar: true,
                confirmButtonText: 'Ressusciter',
                denyButtonText: `Ressusciter`,
                confirmButtonColor: "#32CD32"
              }).then((result) => {
                window.location.reload();
              })
        }, 9000);
        

    } else if(txt.includes("tu me manques") || txt.includes("tu me manque")){
        sendNewMessage(1,"Toi aussi.");
    }else if(txt.includes("mon cousin préferé que j'aime trop")){
        sendNewMessage(1,"Bon, celui-ci je pense pas qu'il vienne de toi, c'est moi qui ai du te le souffler");
        setTimeout(() => {
            sendNewMessage(1,"Même si tu le penses pas ça me fait quand même plaisir. 😍");
        }, 1500);
        setTimeout(() => {
            sendNewMessage(1,"Enfin quand je dis moi je parle de moi/moi et pas du moi/bot");
        }, 3000);
        setTimeout(() => {
            sendNewMessage(1,"Et sinon, moi aussi je t'aime.");
        }, 4500);
        setTimeout(() => {
            sendNewMessage(1,"Tu me manques. 😘");
        }, 5500);
    }else if(txt.includes("je t'aime") || txt.includes("je t aime") ){
        sendNewMessage(1,"Je sais, comment pourait-il en être autrement. 🤣");
        setTimeout(() => {
            sendNewMessage(1,"Mais moi aussi je t'aime. 😘");
        }, 2500);
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

    lastTxt = txt;

}

function init() {
    if(localStorage.getItem("record") == null){
        localStorage.setItem("record", 0);
    }
    if(localStorage.getItem("firstMsg1") == null){
        localStorage.setItem("firstMsg1", false);
    }
    if(localStorage.getItem("firstMsg2") == null){
        localStorage.setItem("firstMsg2", false);
    }
}