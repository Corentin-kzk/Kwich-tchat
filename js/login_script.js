function get_form_data(id_form) {
    const data = document.getElementById(id_form);
    return (data.value);
}

function catch_error(error_message) {
    const id_el = document.getElementById("alerte");
    id_el.textContent = error_message;
    console.log(error_message);
}

function launch() {
    const data = [];
    var form_id = [];
    const el = document.getElementById("submit");
    el.addEventListener("click", (event) => {
        event.preventDefault();
        Array.from(document.querySelectorAll('form input')).forEach(e => {
            data.push(get_form_data(e.id));
        })
        fetch(`http://greenvelvet.alwaysdata.net/kwick/api/login/${data[0]}/${data[1]}`)
            .then((res) => res.json())
            .then((response) => {
                if (response.result.status === "done") {
                    form_id[0] = response.result.token;
                    form_id[1] = data[0];
                    form_id[2] = response.result.id;
                    localStorage.setItem('user',form_id);
                    document.location.href = "../pages/live_tchat.html";
                }
                else {
                    catch_error(response.result.message);
                }
            })
            .catch((error) =>{ console.error("error : " + error)});
    });

}

launch();