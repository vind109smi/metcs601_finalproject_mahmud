const f = document.forms.myform; // grabbing forms objects 

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

  if (phoneChkbox.checked || textMsgChkbox.checked) {
    phoneTxtField.style.display = 'block';
    phoneTxtField.setAttribute('required', '');
  } else {
    phoneTxtField.style.display = 'none';
    phoneTxtField.removeAttribute('required');
    phoneTxtField.value = '';
  }

  if (emailChkbox.checked) {
    emailTxtField.style.display = 'block';
    emailTxtField.setAttribute('required', '');
  } else {
    emailTxtField.style.display = 'none';
    emailTxtField.removeAttribute('required');
    emailTxtField.value = '';
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
f.fullName.addEventListener('input', validateFullName);
f.age.addEventListener('input', validateAge);

// Function to handle full name validation
function validateFullName() {
  const fullNameRegex = /^[A-Za-z]{4,}( [A-Za-z]{4,})?$/;

  if (!this.checkValidity()) {
    this.classList.add('error');
    document.getElementById(this.name + '-error').innerHTML = 'Expression does not match, please try again.';
  } else {
    if (!fullNameRegex.test(this.value)) {
      this.classList.add('error');
      document.getElementById(this.name + '-error').innerHTML = 'Please enter your full name (First name and Last name with a space in between).';
    } else {
      this.classList.remove('error');
      document.getElementById(this.name + '-error').innerHTML = '';
    }
  }

  validateContactForm();
}

// Function to handle age validation based on required in HTML
function validateAge() {
  if (!this.checkValidity()) {
    this.classList.add('error');
    document.getElementById(this.name + '-error').innerHTML = 'Please enter a valid age between 1 and 150.';
  } else {
    this.classList.remove('error');
    document.getElementById(this.name + '-error').innerHTML = '';
  }

  validateContactForm();
}

// Initial form validation
// Function to fix the enabling of the submit button upon page load once I finish filling all forms.
function validateFormOnLoad() {
  validateContactForm();
  validateContactMethodCheckbox();
}