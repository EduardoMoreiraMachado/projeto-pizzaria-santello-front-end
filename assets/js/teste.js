// const teste = function() {
//     const email = document.getElementById('email').value
//     const senha = document.getElementById('senha').value

//     const userLoginJSON = {}

//     userLoginJSON.email = email
//     userLoginJSON.senha = senha

//     fetch("http://localhost:8080/v1/loginCliente", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             },
//         body: JSON.stringify(userLoginJSON)
//     });


// }

const validarLogin = async (login) => {
    const url = ''

    const options = {
        method: 'POST',
        body: JSON.stringify(login),
        headers: {
            'content-type': 'application/json',
        },
    };

    await fetch(url, options);
};

const button = document.getElementById('button__enter').addEventListener('click', validarLogin)