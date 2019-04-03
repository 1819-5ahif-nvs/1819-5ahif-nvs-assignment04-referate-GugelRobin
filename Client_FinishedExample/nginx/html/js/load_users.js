
let currentUserQueryParam = {
    name: "currentUser",
    value: "unknown"
};

function initPage() {
    let queryParams = decodeURIComponent(window.location.search).substring(1).split('&');

    queryParams.forEach(it => {
       if (it.startsWith(currentUserQueryParam.name + '=')) {
           currentUserQueryParam.value = it.substring(currentUserQueryParam.name.length + 1)
       }
    });
    document.getElementById("username_placeholder").innerText = currentUserQueryParam.value;

    loadUsers()
}

function loadUsers() {
    fetch("api/users/getAllUsers")
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response.json()
        }).then(response => {
            response.forEach(it => {
                if (it.userName === currentUserQueryParam.value) {
                    return;
                }

                let element = document.createElement("div");
                element.innerText = it.userName;
                element.onclick = () => {
                    window.location.href = `chat.html?currentUser=${currentUserQueryParam.value}&partner=${it.userName}`
                };
                document.getElementById('users_container').append(element);
            });
        }).catch(reason => {
            console.log(reason)
        })
}

initPage();