# Project 3 - Interactive Form

## Project Details
* This project takes a basic registration form and uses 
  Javascript to enhance user experience
* When the page first loads, the first input field (name) 
  receives a *focus* state so the user can start typing
  right away
* The dropdown menus like the "Job Role" and "T-Shirt"
  sections display/hide an extra dropdown menu, depending on the option selected
* In the activities section, each single activity has
  it's own price. As they are checked/unchecked by the user, the total price is shown and dynamically updated
* In the "Payment Info" section, the credit card payment 
  method is automatically chosen once the page laods/reloads, because it is usually the most common preferred
  way of payment. As different payment methods are selected, the UI is updated to display the proper fields
* Before the form can be officially submitted, if the 
  user fails to complete each field fully, and with the
  correct formatting, the submission is omitted and error 
  indications along with messages are shown.
* For example, in the *Name* field, the user is updated 
  with a validation error as they type: If the field is empty, they will be guided with a validation message saying the field cannot be blank. This is really 
  helpful so that the information can be entered correctly
  before submitting the form
* The same is used for the *Email* field. In addition to
  displaying a "this field cannot be blank" message, a different message is displayed instead, for when the user has typed in a value, but that value is not in the proper format that it needs to be

