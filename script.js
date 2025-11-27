const button = document.getElementById("clickMe");
const message = document.getElementById("message");

button.addEventListener("click", () => {
    const now = new Date().toLocaleTimeString();
    message.textContent = `Setup complete. First click at ${now}.`;
});
