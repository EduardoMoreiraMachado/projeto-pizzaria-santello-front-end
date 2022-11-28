const teste = function() {
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const userLoginJSON = {}

    userLoginJSON.email = email
    userLoginJSON.senha = senha

    fetch("http://localhost:8080/v1/loginCliente", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(userLoginJSON)
    });


}

const button = document.getElementById('button__enter').addEventListener('click', teste)