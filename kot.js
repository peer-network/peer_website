// Funktion, um die Mutation auszuführen, ohne Apollo Client
function graphGL(apiUrl, name, email, message) {
  const query = `
    mutation Contactus {
      contactus(name: "${name}", email: "${email}", message: "${message}") {
        status
        ResponseCode
        affectedRows
      }
    }
  `;

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.data.contactus.status === "success") {
        console.log("Form successfully submitted:", result.data.contactus);
        return true;
      } else {
        throw new Error("Error submitting the form: " + result.data.contactus.ResponseCode);
      }
    })
    .catch((error) => {
      console.error("Network or server error:", error);
    });
}

// Funktion zur Validierung des Namens
function validateName(name) {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: "Name cannot be empty." };
  }
  if (name.length > 100) {
    return { valid: false, error: "Name cannot exceed 100 characters." };
  }
  return { valid: true, error: null };
}

// Funktion zur Validierung der E-Mail
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim().length === 0) {
    return { valid: false, error: "Email cannot be empty." };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email address." };
  }
  return { valid: true, error: null };
}

// Funktion zur Validierung der Nachricht
function validateMessage(message) {
  if (!message || message.trim().length === 0) {
    return { valid: false, error: "Message cannot be empty." };
  }
  if (message.length > 500) {
    return { valid: false, error: "Message cannot exceed 500 characters." };
  }
  return { valid: true, error: null };
}

// Event Listener für die Eingabefelder und den Submit-Button

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitButton = document.getElementById("submit");
const errorDisplay = document.getElementById("error-display");

function validateInputs() {
  let valid = true;
  let errors = [];

  const nameValidation = validateName(nameInput.value);
  if (!nameValidation.valid) {
    valid = false;
    errors.push(nameValidation.error);
    nameInput.classList.add("invalid");
    nameInput.classList.remove("valid");
  } else {
    nameInput.classList.add("valid");
    nameInput.classList.remove("invalid");
  }

  const emailValidation = validateEmail(emailInput.value);
  if (!emailValidation.valid) {
    valid = false;
    errors.push(emailValidation.error);
    emailInput.classList.add("invalid");
    emailInput.classList.remove("valid");
  } else {
    emailInput.classList.add("valid");
    emailInput.classList.remove("invalid");
  }

  const messageValidation = validateMessage(messageInput.value);
  if (!messageValidation.valid) {
    valid = false;
    errors.push(messageValidation.error);
    messageInput.classList.add("invalid");
    messageInput.classList.remove("valid");
  } else {
    messageInput.classList.add("valid");
    messageInput.classList.remove("invalid");
  }

  errorDisplay.innerHTML = errors.join("<br>");
  return valid;
}

async function submitContactForm() {
  if (validateInputs()) {
    try {
      if (await graphGL("https://peer-network.eu/graphql", nameInput.value, emailInput.value, messageInput.value)) {
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
        alert("We have received your message, thank you very much for your feedback, and wishing you much success with Peernetwork.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again later.");
    }
  }
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  submitContactForm();
});

nameInput.addEventListener("input", validateInputs);
emailInput.addEventListener("input", validateInputs);
messageInput.addEventListener("input", validateInputs);


// Adding Event Listener for the Mobile Menu

const mobileMenu = document.querySelector(".mobile-menu");
const mobileList = document.querySelector(".mobile-list");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  mobileList.classList.toggle("active");
})

document.querySelectorAll("#mobile").forEach(n => n.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  mobileList.classList.remove("active");
}))