document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.toLowerCase();

        if (email.includes('admin')) {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'player-dashboard.html';
        }
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Account created successfully! Please log in.');
        toggleAuthForms('login');
    });

});

function toggleAuthForms(targetForm) {
    const loginBlock = document.getElementById('loginFormBlock');
    const registerBlock = document.getElementById('registerFormBlock');

    if (targetForm === 'register') {
        loginBlock.classList.remove('active');
        setTimeout(() => {
            registerBlock.classList.add('active');
        }, 200);
    } else {
        registerBlock.classList.remove('active');
        setTimeout(() => {
            loginBlock.classList.add('active');
        }, 200);
    }
}

function togglePasswordVisibility(fieldId, iconNode) {
    const passwordInput = document.getElementById(fieldId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        iconNode.classList.remove('fa-eye');
        iconNode.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        iconNode.classList.remove('fa-eye-slash');
        iconNode.classList.add('fa-eye');
    }
}