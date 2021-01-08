function get_form_data(id_form) {
    const data = document.getElementById(id_form);
    return (data.value);
}

function same_password(passw, passw_second) {
    if (passw.localeCompare(passw_second) == 0)
        return true;
    else
        return false;
}

function change_bg_color_alert(passw_id_1, passw_id_2) {
    const passw_1 = document.getElementById(passw_id_1);
    const passw_2 = document.getElementById(passw_id_2);

    passw_1.style.backgroundColor = "red";
    passw_2.style.backgroundColor = "red"
    alert("pas le même mot de passe");
}

function launch() {
    const data = [];
    var form_id = [];
    const el = document.getElementById("connection");
    el.addEventListener("click", (event) => {
        event.preventDefault();
        Array.from(document.querySelectorAll('form input')).forEach(e => {
            data.push(get_form_data(e.id));
            form_id.push(e.id);
        })
        console.log(data[1] + ' \\' + data[2]);
        if (data[1] != "" && data[2] != "" && same_password(data[1], data[2]) == false) {
            change_bg_color_alert(form_id[1], form_id[2]);
        } else {
            console.log(`http://greenvelvet.alwaysdata.net/kwick/api/signup/${data[0]}/${data[1]}`);
            fetch(`http://greenvelvet.alwaysdata.net/kwick/api/signup/${data[0]}/${data[1]}`).then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    if (response.result.status === "done") document.location.href = "../index.html";
                })
                .catch((error) => {console.log("error : " + error)});
        };
    });

}

launch();