const contactForm = document.getElementById('accreditio-contact');
const formStatus = document.getElementById('form-status');

contactForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonContent = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    formStatus.textContent = 'Sending your inquiry securely.';
    formStatus.className = 'form-status';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(new FormData(contactForm)).toString()
        });

        if (!response.ok) {
            throw new Error('Form submission failed');
        }

        contactForm.reset();
        formStatus.textContent = 'Thank you. Your inquiry has been sent to Accreditio.';
        formStatus.className = 'form-status is-success';
    } catch (error) {
        formStatus.innerHTML = 'Something went wrong. Please email <a href="mailto:Contact@accreditio.com">Contact@accreditio.com</a>.';
        formStatus.className = 'form-status is-error';
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonContent;
    }
});
