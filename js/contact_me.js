const f = document.forms.myform; // grabbing forms objects to display all accessible variables

// Event listener for the checkbox loading.
f.addEventListener('change', validateContactMethodCheckbox);
document.addEventListener('DOMContentLoaded', validateFormOnLoad); // this will render the contents of DOM to be loaded upon page start.

// Function to handle checkbox change based on the inputs we provide such as checking in phone or email.
function validateContactMethodCheckbox() {
  const phoneChkbox = f.querySelector('input[name="phone"]');
  const textMsgChkbox = f.querySelector('input[name="txtmsg"]');
  const emailChkbox = f.querySelector('input[name="email"]');
  const phoneTxtField = document.getElementById('phoneInput');
  const emailTxtField = document.getElementById('emailInput');
  const phoneLabel = document.querySelector('label[for="phoneInput"]');
  const emailLabel = document.querySelector('label[for="emailInput"]');

  if (phoneChkbox.checked || textMsgChkbox.checked) {
    phoneTxtField.style.display = 'block';
    phoneTxtField.setAttribute('required', '');
    phoneLabel.style.display = 'block';
  } else {
    phoneTxtField.style.display = 'none';
    phoneTxtField.removeAttribute('required');
    phoneTxtField.value = '';
    phoneLabel.style.display = 'none';
  }

  if (emailChkbox.checked) {
    emailTxtField.style.display = 'block';
    emailTxtField.setAttribute('required', '');
    emailLabel.style.display = 'block';
  } else {
    emailTxtField.style.display = 'none';
    emailTxtField.removeAttribute('required');
    emailTxtField.value = '';
    emailLabel.style.display = 'none';
  }

  f.reportValidity(); // This helps solve the still stuck disable submit button before a browser refresh.
  validateContactForm(); // Call the form validation function
}

// Function to ensure form validations for everything.
function validateContactForm() {
  const submitBtn = f.querySelector('button[type="submit"]');

  if (f.checkValidity()) {
    submitBtn.disabled = false;
    submitBtn.classList.remove('inactive');
    return true;
  }

  submitBtn.disabled = true;
  submitBtn.classList.add('inactive');
  return false;
}

// Event listeners for full name based on regex
f.fullName.addEventListener('input', () => validateFullName(f.fullName));
f.age.addEventListener('input', () => validateAge(f.age));

// Function to handle full name validation
function validateFullName(input) {
  const fullNameRegex = /^[A-Za-z]{4,}( [A-Za-z]{4,})?$/;

  if (!input.checkValidity()) {
    input.classList.add('error');
    document.getElementById(input.name + '-error').innerHTML = 'Expression does not match, please try again.';
  } else {
    if (!fullNameRegex.test(input.value)) {
      input.classList.add('error');
      document.getElementById(input.name + '-error').innerHTML = 'Please enter your full name (First name and Last name with a space in between).';
    } else {
      input.classList.remove('error');
      document.getElementById(input.name + '-error').innerHTML = '';
    }
  }

  validateContactForm();
}

// Function to handle age validation based on required in HTML
function validateAge(input) {
  if (!input.checkValidity()) {
    input.classList.add('error');
    document.getElementById(input.name + '-error').innerHTML = 'Please enter a valid age between 1 and 150.';
  } else {
    input.classList.remove('error');
    document.getElementById(input.name + '-error').innerHTML = '';
  }

  validateContactForm();
}

// Initial form validation
// Function to fix the enabling of the submit button upon page load once I finish filling all forms.
function validateFormOnLoad() {
  validateContactForm();
  validateContactMethodCheckbox();
}

// Add event listener for form submission
f.addEventListener('submit', handleSubmission);

// Function to handle form submission
function handleSubmission(event) {
  event.preventDefault(); // Prevent the form from being submitted to the server

  // Call the form validation functions
  validateContactForm();
  validateFullName(f.fullName);
  validateAge(f.age);

  // Check if all validations pass
  if (f.checkValidity()) {
    // Display success message
    alert('Thanks for submitting your contact info. I will reach out to you soon');

    // Reset the form
   // f.reset();
  }
}