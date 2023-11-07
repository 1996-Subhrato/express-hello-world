function contactUs() {
    let email = document.getElementById("email").value;
    let fullName = document.getElementById("fullName").value;
    let message = document.getElementById("message").value;

    let url = "/api/contact";
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, fullName, message}),
    })
        .then((res) => res.json())
        .then((data) => {
            //   console.log(data);
            let {code, message} = data;
            document.getElementById("response").innerText = message;
            document.getElementById("response").style.marginTop = "20px";
            document.getElementById("response").style.fontWeight = "600";
            if (code === 1) {
                document.getElementById("response").style.color = "red";
            } else {
                document.getElementById("contactForm").reset();
                document.getElementById("response").style.color = "green";
                setTimeout(() => {
                    document.getElementById("response").innerText = "";
                    document.getElementById("response").style.color = "";
                    document.getElementById("response").style.fontWeight = "";
                }, 2500);
            }
        })
        .catch((e) => {
            console.log(e);
        });
}

function userLogin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let url = "/api/login";
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    })
        .then((res) => res.json())
        .then((data) => {
            //   console.log(data);
            let {code, message} = data;
            document.getElementById("response").innerText = message;
            document.getElementById("response").style.marginTop = "20px";
            document.getElementById("response").style.fontWeight = "600";
            if (code === 1) {
                document.getElementById("response").style.color = "red";
            } else {
                document.getElementById("response").style.color = "green";
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 500)
            }
        })
        .catch((e) => {
            console.log(e);
        });
}

function registerNow() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let url = "/api/register";
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({firstName, lastName, email, password}),
    })
        .then((res) => res.json())
        .then((data) => {
            //   console.log(data);
            let {code, message} = data;
            document.getElementById("response").innerText = message;
            document.getElementById("response").style.marginTop = "20px";
            document.getElementById("response").style.fontWeight = "600";
            if (code === 1) {
                document.getElementById("response").style.color = "red";
            } else {
                document.getElementById("registerForm").reset();
                document.getElementById("response").style.color = "green";
                setTimeout(() => {
                    document.getElementById("response").innerText = "";
                    document.getElementById("response").style.color = "";
                }, 2500);
            }
        })
        .catch((e) => {
            console.log(e);
        });
}
