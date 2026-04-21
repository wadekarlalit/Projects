(function () {
    emailjs.init("jvVZvTRuGedUXkyM5");
})();

// ---- Page Scroll ------
function smoothScroll(navId, sectionId) {
    document.getElementById(navId).addEventListener("click", () => {
        window.scroll({
            top: document.getElementById(sectionId).offsetTop - 100,
            behavior: 'smooth'
        });
    });
}

smoothScroll("project_nav", "project_page");
smoothScroll("about_nav", "about_page");
smoothScroll("contact_nav", "contact_page");


// ---- contact form section ------
const form = document.getElementById("studentForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach(input => {
        const error = input.nextElementSibling.nextElementSibling;

        if (!input.value.trim()) {
            error.innerText = "This field is required";
            isValid = false;
            return;
        } else {
            error.innerText = "";
        }

        // Email validation
        if (input.type === "email") {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(input.value)) {
                error.innerText = "Invalid email";
                isValid = false;
            }
        }

        // Phone validation
        if (input.id === "phone") {
            if (input.value.length < 10) {
                error.innerText = "Invalid phone number";
                isValid = false;
            }
        }
    });

    // Only send email if valid
    if (isValid) {
        emailjs.send("service_zw60jn6", "template_n6zxtab", {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("detail").value
        })
            .then(() => {
                alert("Message sent successfully 🎉");
                form.reset();
            })
            .catch(() => {
                alert("Failed to send ❌");
            });
    }
});


