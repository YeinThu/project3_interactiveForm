// DOM elements
const form = document.querySelector('form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const creditCardNumber = document.querySelector('#cc-num');
const cvvNumber = document.querySelector('#cvv');
const zipcode = document.querySelector('#zip');
const jobRole = document.querySelector('#title');
const jobRoleOptions = document.querySelector('#title option');
const otherJobRole = document.querySelector('#other-job-role');
const design = document.querySelector('#design');
const color = document.querySelector('#color');
const colorOptions = color.children;
const activities = document.querySelector('#activities');
const activitiesCost = document.querySelector('#activities-cost');
let totalActivitiesCost = 0;
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

// Initial state when the page first loads
document.addEventListener('DOMContentLoaded', () => {
  // Set 'Name' field into 'focus' state
  name.focus();

  // Hide 'Other Job Role' field
  otherJobRole.hidden = true;

  // Disable 'Color' menu
  color.disabled = true;

  // Hide 'Paypal' and 'Bitcoin' sections
  paypal.hidden = true;
  bitcoin.hidden = true;

  // Set 'Credit Card' option to 'selected' as default
  const crediCardOption = payment.querySelector('option[value="credit-card"]');
  crediCardOption.setAttribute('selected', 'true');
})

/* -------------------------------------------------------------------------------- */

// Events
// 'Job Roles' event
jobRole.addEventListener('change', (e) => {
  const target = e.target;

  if (target.value === 'other') {
    otherJobRole.hidden = false;
  }
  else {
    otherJobRole.hidden = true;
  }
});

// 'T-Shirt' section
design.addEventListener('change', (e) => {
  const target = e.target

  // Enable 'Color' menu
  color.disabled = false;

  for (let i = 0; i < colorOptions.length; i++) {
    const dataTheme = colorOptions[i].getAttribute('data-theme');

    
    if (target.value === dataTheme) {
      colorOptions[i].hidden = false;
    } else {
      colorOptions[i].hidden = true;
    }
  }
});

// 'Register for Activities' event
activities.addEventListener('change', (e) => {
  const dataCost = +e.target.getAttribute('data-cost');
  const target = e.target;
  
  if (target.checked) {
    totalActivitiesCost += dataCost;
  }
  else {
    totalActivitiesCost -= dataCost;
  }

  activitiesCost.innerHTML = `Total: $${totalActivitiesCost}`;

  activityFilter(target);

});

// 'Payment' event
payment.addEventListener('change', (e) => {
  const target = e.target;
  const paymentMethods = [creditCard, paypal, bitcoin];

  for (let i = 0; i < paymentMethods.length; i++) {
    const paymentId = paymentMethods[i].getAttribute('id');

    if (target.value === paymentId) {
      paymentMethods[i].hidden = false;
    }
    else {
      paymentMethods[i].hidden = true;
    }
  }
  
});

/* -------------------------------------------------------------------------------- */

// Validation functions
// Name validator
function nameValidation() {
  // Name validation
  const nameValue = name.value;
  const nameValidator = /[a-zA-z]+/.test(nameValue);

  return nameValidator;
}

// Email validator
function emailValidation() {
  const emailValue = email.value;
  const emailValidator = /^[a-z]+@[a-z]+\.com$/.test(emailValue);

  return emailValidator;
}

// Activities validator
function activitiesValidation() {
  const activitiesValidator = totalActivitiesCost > 0;

  return activitiesValidator;
}

// Credit card validator
function creditCardValidation() {
  const isCardNumberValid = /^\d{13,16}$/.test(parseInt(creditCardNumber.value));

  return isCardNumberValid;
}

// Zipcode validator
function zipCodeValidation() {
  const isZipValid = /^\d{5}$/.test(parseInt(zipcode.value));

  return isZipValid;
}

//  CVV validator
function cvvValidation() {
  const isCvvValid = /^\d{3}$/.test(parseInt(cvvNumber.value));

  return isCvvValid;
}

/* -------------------------------------------------------------------------------- */

// Function to control validation message display
function validationMessage(isElementValid, element, e) {
  const elementId = e.target.getAttribute('id');
  const elementIdCap = elementId.charAt(0).toUpperCase() + elementId.slice(1);

  if (e.target.value.length !== 0) {
    if (!isElementValid) {
      e.preventDefault();
      element.parentElement.className = 'not-valid';
      element.parentElement.lastElementChild.style.display = "inline";
      element.parentElement.lastElementChild.textContent = `${elementIdCap} must be formatted correctly`;
    }
    else {
      element.parentElement.className = 'valid';
      element.parentElement.lastElementChild.style.display = "none";
    }
  }
  else {
    element.parentElement.lastElementChild.style.display = "inline";
    element.parentElement.lastElementChild.textContent = `${elementIdCap} cannot be blank`;
  }

}

/* -------------------------------------------------------------------------------- */

// Extra Credit steps
// Check to see if whether or not activies conflict with each other's day and time
function activityFilter(targetElement) {
  const activitiesAll = activities.querySelectorAll('input[data-day-and-time]');
  
  if (targetElement.checked) {
    activitiesAll.forEach(activity => {
      if (activity !== targetElement && activity.getAttribute('data-day-and-time') === targetElement.getAttribute('data-day-and-time')) {
        activity.disabled = true;
        activity.parentElement.classList.add('disabled');
      }
    })
  }
  else {
    activitiesAll.forEach(activity => {
      if (activity !== targetElement && activity.getAttribute('data-day-and-time') === targetElement.getAttribute('data-day-and-time')) {
        activity.disabled = false;
        activity.parentElement.classList.remove('disabled');
      }
    })
  }
}

// Real-time error message (name field)
name.addEventListener('keyup', (e) => {
  // Validate Name
  validationMessage(nameValidation(), name, e);
})

// Conditional error message (email field)
email.addEventListener('keyup', (e) => {
  // Validate Email
  validationMessage(emailValidation(), email, e);

})

/* -------------------------------------------------------------------------------- */

// 'Form' submission event
form.addEventListener('submit', (e) => {

  // Validate Name
  validationMessage(nameValidation(), name, e);

  // Validate Email
  validationMessage(emailValidation(), email, e);

  // Validate Activities
  if (!activitiesValidation()) {
    e.preventDefault();
    activities.classList.add('not-valid');
    activities.classList.remove('valid');
    activities.lastElementChild.style.display = "inline";
  }
  else {
    activities.classList.remove('not-valid');
    activities.classList.add('valid');
    activities.lastElementChild.style.display = "none";
  }

  // Call credit card validation function if payment value is credit-card
  if (payment.value === 'credit-card') {
    // Validate credit card fields
    validationMessage(creditCardValidation(), creditCardNumber, e);
    validationMessage(zipCodeValidation(), zipcode, e);
    validationMessage(cvvValidation(), cvvNumber, e);
  }
});

// Add focus and blur states to activity checkboxes
const activityInputs = activities.querySelectorAll('input[type="checkbox"]');

activityInputs.forEach(activity => {
  // Focus
  activity.addEventListener('focus', (e) => {
    const target = e.target

    target.parentElement.classList.add('focus');
  });

  // Blur
  activity.addEventListener('blur', (e) => {
    const target = e.target

    target.parentElement.classList.remove('focus');
  });
});