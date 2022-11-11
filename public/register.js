const email = document.getElementById("email")
const password = document.getElementById("password")
const form = document.querySelector(".form")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        await axios.post("/api/v1/auth/register", {email: email.value, password: password.value})
        await axios.get("/success")
        window.location.href = `/`
    } catch (error) {
        const {response: {data}} = error
        const err = document.querySelector(".error")
        console.log(data.msg);
        err.innerText = data.msg
    }
})