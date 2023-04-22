"use strict";

const contactModal = document.querySelector("#contact-form-modal");
const contactForm = document.querySelector("#contact-form");
const openFormBtn = document.querySelector("#open-form-button");
const closeFormBtn = document.querySelector("#close-form-button");
const sendFormBtn = document.querySelector("#send-form-button");
const formStatus = document.querySelector("#form-status");
const submitURL = "https://formspree.io/f/xqkoepkj";
const contactBusiness = document.querySelector("#contact-business");
const businessLabel = document.querySelector("#contact-business-label");
const contactName = document.querySelector("#contact-name");
const contactEmail = document.querySelector("#contact-email");
const contactMessage = document.querySelector("#contact-message");
const reg = new RegExp("^[a-zA-Z0-9 .@-]+$");

async function handleContactForm(event) {
    try {
        event.preventDefault();
        if (
            !reg.test(contactName.value) ||
            !reg.test(contactEmail.value) ||
            !reg.test(contactMessage.value)
        ) {
            throw new Error("Validation Error");
        }
        const data = new FormData(event.target);
        if (!contactBusiness.value) {
            const response = await fetch(submitURL, {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });
            if (response.ok) {
                contactForm.reset();
                sendFormBtn.disabled = true;
                formStatus.textContent =
                    "Thanks for reaching out, I will be in contact with you soon!";
                setTimeout(() => {
                    contactModal.close();
                    formStatus.textContent = "";
                    sendFormBtn.disabled = false;
                    contactForm.reset();
                    contactModal.close();
                }, 4000);
            } else {
                throw new Error(`Status error: ${response.status}`);
            }
        } else {
            contactForm.reset();
            contactModal.close();
        }
    } catch (err) {
        if (err.message === "Validation Error") {
            formStatus.textContent =
                "Please do not include special characters in your message";
        } else {
            formStatus.textContent =
                "There has been an error, please try again later.";
            sendFormBtn.disabled = true;
        }
        console.error(err);
    }
}

openFormBtn.addEventListener("click", () => {
    contactModal.showModal();
    contactName.focus();
});

closeFormBtn.addEventListener("click", () => {
    contactModal.close();
});

contactForm.addEventListener("submit", handleContactForm);

setTimeout(() => {
    contactBusiness.style.display = "none";
    businessLabel.style.display = "none";
}, 5000);
