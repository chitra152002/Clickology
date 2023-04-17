const baseUrl = "http://localhost:3000"

document.getElementById('btn-signup').addEventListener('click', handleLoginAction);


async function handleLoginAction() {
    debugger
    const name = document.getElementById("name").value
    const userName = document.getElementById("userName").value
    const userEmail = document.getElementById("userEmail").value
    const userphone = document.getElementById("userphone").value
    const password = document.getElementById("exampleInputPassword1").value
    const confirmPassword = document.getElementById("exampleInputPassword2").value

    if (name == null || name == "") {
        alert("Enter the Name.")
        return null;
    }
    else if (userName == null || userName == "") {
        alert("Enter the Username.")
        return null;
    }else if (userEmail == null || userEmail == "") {
        alert("Enter the Email.")
        return null;
    }else if (userphone == null || userphone == "") {
        alert("Enter the Phone.")
        return null;
    }
    else if (password == null || password == "") {
        alert("Enter the Password.")
        return null;
    }
    else if (confirmPassword == null || confirmPassword == "") {
        alert("Re-Enter the Password in the Confirm Password.")
        return null;
    }
    else if (confirmPassword != password) {
        alert("Password and Confirm Password does not match!")
        return null;
    }
    else {
        fetch(`${baseUrl}/api/UserDetails/exists?`, {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                Username: userName
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
                if (json.message == "User Exists.") {
                    alert("User already exists please enter a unique Username.")
                }
                else if (json.message == "User do not exists.") {
                    // POST request using fetch()
                    fetch(`${baseUrl}/api/UserDetails/store`, {

                        // Adding method type
                        method: "POST",

                        // Adding body or contents to send
                        body: JSON.stringify({
                            Name: name,
                            Username: userName,
                            Email: userEmail,
                            Phone: Number(userphone),
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
                            alert("User successfully saved.")
                            window.location.href = "./login.html"
                        })
                        .catch(error => {
                            alert("Something went wrong")
                            // window.location.href="./login.html"
                            console.log("error", error)
                        })
                }
            })
            .catch(error => {
                alert("Something went wrong")
                // window.location.href="./login.html"
                console.log("error", error)
            })

    }

}