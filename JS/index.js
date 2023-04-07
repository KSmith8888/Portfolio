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

async function handleContactForm(event) {
    try {
        event.preventDefault();
        const data = new FormData(event.target);
        if (!contactBusiness.value) {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                {
                    method: "POST",
                    body: data,
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            if (response.ok) {
                contactForm.reset();
                sendFormBtn.disabled = true;
                formStatus.textContent =
                    "Thanks for reaching out, I will be in contact with you soon!";
                setTimeout(() => {
                    contactModal.close();
                    formStatus.textContent = "";
                    sendFormBtn.disabled = false;
                }, 4000);
            } else {
                throw new Error(`Status error: ${response.status}`);
            }
        } else {
            contactForm.reset();
            contactModal.close();
        }
    } catch (err) {
        formStatus.textContent =
            "There has been an error, please try again later.";
        console.error(err);
        sendFormBtn.disabled = true;
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
