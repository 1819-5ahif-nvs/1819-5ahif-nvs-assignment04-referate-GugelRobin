let currentUserQueryParam = {
    name: "currentUser",
    value: "unknown"
};
let conversationPartnerQueryParam = {
    name: "partner",
    value: "unknown"
};

function initPage() {
    decodeQueryParams([currentUserQueryParam, conversationPartnerQueryParam]);
    document.getElementById("username_placeholder").innerText = currentUserQueryParam.value;

    document.getElementById("send_message_button").onclick = () => {
        let textElement = document.getElementById("message_input");
        let message = {
            from: {
                userName: currentUserQueryParam.value
            },
            to: {
                userName: conversationPartnerQueryParam.value
            },
            text: textElement.value
        };
        textElement.value = "";
        fetch('api/messages/addMessageToConversation', {
            method: "post",
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            addMessage(message);
        }).catch(reason => {
            alert("Cannot send Message...");
            console.log(reason);
        });
    };

    loadChat();
}

function decodeQueryParams(requiredQueryParams) {
    let queryParams = decodeURIComponent(window.location.search).substring(1).split('&');
    queryParams.forEach(it => {
        requiredQueryParams.forEach( param => {
            if (it.startsWith(param.name + '=')) {
                param.value = it.substring(param.name.length + 1);
            }
        });
    });
}

function loadChat() {
    fetch(`api/messages/getConversationOfUsers/${currentUserQueryParam.value}/${conversationPartnerQueryParam.value}`)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response.json()
        }).then(response => {
        response.forEach(it => {
           addMessage(it);
        });
    }).catch(reason => {
        console.log(reason)
    })
}

function addMessage(message) {
    let element = document.createElement("div");
    let userNameParagraph = document.createElement("p");
    let textParagraph = document.createElement("p");

    if (message.from.userName === currentUserQueryParam.value) {
        element.classList.add("sent_message");
    } else {
        element.classList.add("received_message");
    }
    userNameParagraph.classList.add("user_name");
    textParagraph.classList.add("message_text");
    userNameParagraph.innerText = message.from.userName;
    textParagraph.innerText = message.text;
    element.append(userNameParagraph, textParagraph);


    document.getElementById('chat_container').append(element);
}

initPage();
