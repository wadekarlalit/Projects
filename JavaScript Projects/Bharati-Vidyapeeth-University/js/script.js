document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registrationForm");

    if (!form) return;

    /*=== ELEMENTS ===*/
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");
    const education = document.getElementById("education");
    const city = document.getElementById("city");
    const captcha = document.getElementById("captcha");
    const verifyButton = document.querySelector(".hero__verify-button");
    const refreshButton = document.querySelector(".hero__captcha-refresh");

    /*=== REGEX ===*/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    /*=== CAPTCHA ===*/
    let generatedCaptcha = "";

    function createCaptcha() {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

        generatedCaptcha = "";

        for (let i = 0; i < 5; i++) {
            generatedCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        captcha.placeholder = generatedCaptcha;
        captcha.value = "";
    }

    createCaptcha();

    refreshButton.addEventListener("click", createCaptcha);

    /*=== Helper Functions ===*/
    function showError(input, message) {

        removeError(input);

        const error = document.createElement("small");

        error.className = "hero__error";
        error.textContent = message;

        input.parentElement.appendChild(error);
        input.style.borderColor = "#e53935";
    }

    function removeError(input) {
        const old = input.parentElement.querySelector(".hero__error");

        if (old) {
            old.remove();
        }

        input.style.borderColor = "";
    }

    function isChecked(name) {
        const checkbox = form.querySelector(`input[name="${name}"]`);
        return checkbox.checked;
    }

    /*=== VALIDATION ===*/
    function validateForm() {

        let valid = true;

        removeError(fullName);
        removeError(email);
        removeError(mobile);
        removeError(education);
        removeError(city);
        removeError(captcha);

        if (fullName.value.trim() === "") {
            showError(fullName, "Full name is required");
            valid = false;
        }

        if (!emailRegex.test(email.value.trim())) {
            showError(email, "Enter valid email");
            valid = false;
        }

        if (!mobileRegex.test(mobile.value.trim())) {
            showError(mobile, "Enter valid mobile number");
            valid = false;
        }

        if (education.value === "") {
            showError(education, "Select educational level");
            valid = false;
        }

        if (city.value === "") {
            showError(city, "Select city");
            valid = false;
        }

        // if (captcha.value.trim().toUpperCase() !== generatedCaptcha) {
        //     showError(captcha, "Invalid captcha");
        //     valid = false;
        // }

        if (!isChecked("graduate")) {
            valid = false;
        }

        if (!isChecked("terms")) {
            valid = false;
        }
        return valid;
    }

    /*=== Form Submit here ===*/

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!validateForm()) return;

        showSuccessPopup();

        form.reset();

        createCaptcha();
    });

    /*==== SUCCESS POPUP ====*/
    function showSuccessPopup() {
        const overlay = document.createElement("div");

        overlay.className = "hero__popup-overlay";

        overlay.innerHTML = `
            <div class="hero__popup">
                <h2>
                    Registration Successful
                </h2>
                <p>
                    Thank you for registering.
                </p>
                <button class="hero__popup-button">
                    OK
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.querySelector(".hero__popup-button").addEventListener("click", () => {
            overlay.remove();
        });
    }

    /*=== Live Validation ===*/
    [
        fullName,
        email,
        mobile,
        education,
        city,
        captcha

    ].forEach((field) => {
        field.addEventListener("input", () => {
            removeError(field);
        });

        field.addEventListener("change", () => {
            removeError(field);
        });
    });
});


/*==== Show Why Choose Cards =====*/
const whyChooseCards = document.querySelector("#whyChooseCards");

whyChooseData.forEach((item) => {

    whyChooseCards.innerHTML += `
        <article class="why-choose__card">
            <span class="why-choose__number"> ${item.number} </span>
            <h3 class="why-choose__card-title"> ${item.title} </h3>
        </article>
    `;
});


/*==== Show Steps Cards =====*/
const stepsWrapper = document.querySelector("#stepsWrapper");

stepsData.forEach((step, index) => {
    stepsWrapper.innerHTML += `
        <article class="steps__card ${step.active ? "steps__card--active" : ""}">
            <span class="steps__number">
                ${step.number}
            </span>

            <h3 class="steps__card-title">
                ${step.title}
            </h3>

            <p class="steps__card-description">
                ${step.description}
            </p>
        </article>
        ${index !== stepsData.length - 1 ? '<span class="steps__connector"></span>' : ''}
    `;
});


/*===== Steps Card Animation =====*/
const stepsSection = document.querySelector(".steps");
const stepCards = document.querySelectorAll(".steps__card");

if (stepsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            stepCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add("steps__card--show");
                }, index * 200);
            });
            observer.unobserve(stepsSection);
        });
    }, {
        threshold: .35
    });
    observer.observe(stepsSection);
}


/*==== Show FAQ Data ======*/
const faqList = document.querySelector("#faqList");

faqData.forEach((item, index) => {

    faqList.innerHTML += `
        <article class="faq__item ${index === 0 ? "faq__item--active" : ""}">
            <button class="faq__question" type="button" aria-expanded="true">
                <div class="faq__question-left">
                    <span class="faq__number">
                        ${(index + 1).toString().padStart(2, "0")}.
                    </span>

                    <span class="faq__text">
                        ${item.question}
                    </span>
                </div>
                <span class="faq__icon"> </span>
            </button>

            <div class="faq__answer">
                <div class="faq__answer-content">
                    <p> ${item.answer}</p>
                </div>
            </div>
        </article>
    `;
});


/*==== FAQ Accordian Logic Here ======*/
document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq__item");

    if (!faqItems.length) return;

    faqItems.forEach((item) => {
        const button = item.querySelector(".faq__question");
        button.addEventListener("click", () => {
            const isActive = item.classList.contains("faq__item--active");

            // Close all items
            faqItems.forEach((faq) => {
                faq.classList.remove("faq__item--active");
                const faqButton = faq.querySelector(".faq__question");
                faqButton.setAttribute("aria-expanded", "false");
            });

            // Open current item if it was previously closed
            if (!isActive) {
                item.classList.add("faq__item--active");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });
});


/*==== Stats Counter Animation ====*/
const counters = document.querySelectorAll(".stats__title");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";
        let current = 0;

        // Animation duration
        const duration = 2000;
        const frameRate = 1000 / 60;
        const totalFrames = duration / frameRate;
        const increment = target / totalFrames;

        function updateCounter() {
            current += increment;

            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString() + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + suffix;
            }
        }

        updateCounter();
        observer.unobserve(counter);
    });

}, {
    threshold: 0.5
});

counters.forEach((counter) => {
    observer.observe(counter);
});


/*==== Show Footer Data ======*/
const footerLinks = document.querySelector("#footerLinks");

footerData.forEach((item, index) => {
    footerLinks.innerHTML += `<a href="${item.link}"> ${item.text} </a>`;
});