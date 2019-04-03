
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

document.getElementById("login_button").onclick = onLoginClick;
