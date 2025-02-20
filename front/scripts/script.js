const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function showToast(text, fromColor, toColor) {
    Toastify({
        text,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: `linear-gradient(to right, ${fromColor}, ${toColor})`,
        style: { width: "200px" }
    }).showToast();
}
