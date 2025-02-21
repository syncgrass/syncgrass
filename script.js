document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    let name = document.getElementById("name").value.trim();
    let contact = document.getElementById("contact").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let responseMessage = document.getElementById("responseMessage");

    // Validation
    if (name === "" || contact === "" || email === "" || message === "") {
        responseMessage.style.color = "red";
        responseMessage.textContent = "All fields are required!";
        return;
    }

    if (!/^\d{10,15}$/.test(contact)) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "Invalid contact number!";
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "Invalid email format!";
        return;
    }

    // Simulating successful form submission
    setTimeout(() => {
        responseMessage.style.color = "green";
        responseMessage.textContent = "Message sent successfully!";
        document.getElementById("contactForm").reset(); // Reset form
    }, 1000);
});
