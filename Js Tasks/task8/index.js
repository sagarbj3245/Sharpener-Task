function handleFormSubmit(event) {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const phone = event.target.elements.phone.value;

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    
    // You can optionally log the stored values to the console
    console.log("Username stored:", localStorage.getItem("username"));
    console.log("Email stored:", localStorage.getItem("email"));
    console.log("Phone stored:", localStorage.getItem("phone"));

    // Prevent the default form submission that would cause a page reload
    return false;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = handleFormSubmit;
}
