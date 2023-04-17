const baseUrl = "http://localhost:3000"

document.getElementById("btn-login").addEventListener("click", handleLoginAction);


async function handleLoginAction() {
    debugger
    const userName = document.getElementById("userName").value
    const password = document.getElementById("exampleInputPassword1").value

    if (userName == null || userName == "") {
        alert("Enter the Username")
        return null;
    }
    else if (password == null || password == "") {
        alert("Enter the Password")
        return null;
    }
    else {
        // POST request using fetch()
        fetch(`${baseUrl}/api/UserDetails/login`, {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                Username: userName,
                Password: password,
            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })

            // Displaying results to console
            .then(json => {
                if (json.message == "Logged in Successfully.") {
                        alert("Signin successfully.")
                        window.location.href = "./index.html"
                }
                else if(json.message == "User do not exists."){
                    alert("Username and password does not match!")
                }
            })
            .catch(error => {
                alert("Something went wrong")
                // window.location.href="./login.html"
                console.log("error", error)
            })
    }



}