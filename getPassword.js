const baseUrl = "http://localhost:3000"

document.getElementById('btn-pass').addEventListener('click', handleLoginAction);


async function handleLoginAction() {
    const emailData = document.getElementById("emailid").value
    fetch(`${baseUrl}/api/UserDetails/password-get`, {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            email: emailData
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
            if (json.message == "Password sent to your email account") {
                alert("Please check your Email.")
                window.location.href = "./login.html"
            } else {
                alert(json.message)
            }
        })
        .catch(error => {
            alert("Something went wrong")
            // window.location.href="./login.html"
            console.log("error", error)
        })
}