
function onLoginClick() {


    fetch("api/users/login", {
        method: 'put',
        body: `{ "userName":"${document.getElementById("userNameInput").value}" }`,
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        window.location.href = `users.html?currentUser=${document.getElementById("userNameInput").value}`;
    }).catch(reason => {
        alert("Cannot log in...\nYou are only able to read Messages!");
        window.location.href = 'users.html?currentUser=Readonly';
        console.log(reason)
    })
}

let installPrompt;

window.addEventListener("beforeinstallprompt", event => {
    console.log("Install event called");
    event.preventDefault();
    installPrompt = event;
    document.getElementById("install_button").style.visibility = 'visible';
});

function install() {
    installPrompt.prompt();

    installPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        installPrompt = null;
    });
}


document.getElementById("install_button").onclick = install;

document.getElementById("login_button").onclick = onLoginClick;