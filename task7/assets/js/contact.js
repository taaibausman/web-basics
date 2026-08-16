/* ======================================================
   CONTACT FORM VALIDATION
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

	const form = document.getElementById("contact-form");
	if (!form) return;

	const nameField = form.querySelector("#name");
	const emailField = form.querySelector("#email");
	const messageField = form.querySelector("#message");
	const success = document.getElementById("form-success");

	const showError = (input, msg) => {
		const group = input.closest('.form-group');
		const small = group.querySelector('.error');
		small.textContent = msg;
		small.style.color = 'var(--primary)';
		input.setAttribute('aria-invalid', 'true');
	};

	const clearError = (input) => {
		const group = input.closest('.form-group');
		const small = group.querySelector('.error');
		small.textContent = '';
		input.removeAttribute('aria-invalid');
	};

	const isEmail = (value) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	};

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let valid = true;

		// Name
		if (!nameField.value.trim()) {
			showError(nameField, 'Please enter your name');
			valid = false;
		} else {
			clearError(nameField);
		}

		// Email
		if (!emailField.value.trim()) {
			showError(emailField, 'Please enter your email');
			valid = false;
		} else if (!isEmail(emailField.value.trim())) {
			showError(emailField, 'Please enter a valid email');
			valid = false;
		} else {
			clearError(emailField);
		}

		// Message
		if (!messageField.value.trim() || messageField.value.trim().length < 10) {
			showError(messageField, 'Please enter a message (10+ characters)');
			valid = false;
		} else {
			clearError(messageField);
		}

		if (valid) {
			success.style.display = 'block';
			form.reset();
			setTimeout(() => success.style.display = 'none', 5000);
		}

	});

});
