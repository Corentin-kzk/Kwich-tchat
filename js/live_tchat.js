function log(token, msg, user, id) {
    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/say/${token}/${id}/${encodeURI(msg)}`)
        .then((res) => res.json())
        .then((response) => {
        })
        .catch((error) => { console.error(error); });
}

function actualise_message(token) {
    var timestamp = localStorage.getItem('timestamp');
    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${token}/${timestamp}`)
        .then((res) => res.json())
        .then((response) => {
            user_message = document.getElementById("tchat_area");
            response.result.talk.forEach(e => {
                user_message.innerHTML += `<p> ${e.user_name} : ${e.content}</p>`;
            });
            if(response.result.last_timestamp) localStorage.setItem("timestamp", response.result.last_timestamp);
        })
        .catch((error) => { console.error(error); });

}

function draw_people_who_is_connect(token) {
    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${token}`)
        .then((res) => res.json())
        .then((response) => {
            number_conected = document.getElementById("number_of_player");
            number_conected.innerHTML += "En ligne : " + response.result.user.length + " personne";
            user_connected = document.getElementById("name");
            response.result.user.forEach(element => {
                user_connected.innerHTML += '<p>@' + element + "</p>";
            });
        })
        .catch((error) => { console.error(error); });
}

function draw_live_tchat(token) {
    fetch(`http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${token}/0`)
        .then((res) => res.json())
        .then((response) => {
            user_message = document.getElementById("tchat_area");
            response.result.talk.forEach(e => {
                user_message.innerHTML += `<p> ${e.user_name} : ${e.content}</p>`;
            });
            localStorage.setItem("timestamp", response.result.last_timestamp);
            
        })
        .catch((error) => { console.error(error); });

}

function live_start() {
    var token = localStorage.getItem('user');
    const my_token = token.split(",");
    const logout = document.getElementById("logout");
    draw_live_tchat(my_token[0]);
    draw_people_who_is_connect(my_token[0]);
    logout.addEventListener("click", () => {
        fetch(`http://greenvelvet.alwaysdata.net/kwick/api/logout/${my_token[0]}/${my_token[2]}`)
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                if (response.result.status === "done") {
                    document.location.href = "../index.html";
                }
            })
            .catch((error) => { console.log("error : " + error) });
    });
    const bt_send = document.getElementById("send");
    bt_send.addEventListener("click", (event) => {
        event.preventDefault();
        const data = document.getElementById("Textarea");
        if (data.value.length > 140) alert("La limite du message est de 140 caractères")
        else log(my_token[0], data.value, my_token[1], my_token[2]);
        data.value = "";
    });
    setInterval(() => { actualise_message(my_token[0]); }, 1500);
}

live_start();