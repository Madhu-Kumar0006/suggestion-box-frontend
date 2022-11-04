export const roleId = {
  SUPER_ADMIN_USER: 1,
  ADMIN_USER: 2,
  TEAM_MEMBER: 3,
  USER: 4
}

export const loginError = {
  INVALID_ROLE: "Invalid user role",
}

export const emailErrors = {
    EMAIL : "Please enter your Email address",
    INVALID_EMAIL : "Email is invalid",
 }

 export const passwordErrors = {
    PASSWORD : "Please enter your Password",
    CONFIRM_PASSWORD : 'Please Confirm your Password',
    PASSWORD_INVALID : "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
    PASSWORDS_UNMATCHED : "Password and Confirm Password doesn't match",
    OLD_NEW_SAME : "Old Password and New Password must not be same",
 }

 export const userSuggestionErrors = {
   TEXT_SUGGESTION_REQUIRED: "Field cannot be empty, please provide the suggestion",
   RADIO_SUGGESTION_REQUIRED: "Please select anyone option",
   CHECKBOX_SUGGESTION_REQUIRED: "Please select the option/s",
   SUGGESTION_BOX_CLOSED: "Suggestion link is expired, Please contact the admin for more information"
 }

 export const suggestionModalErrors = {
   QUESTION_TITLE:'Please Provide Question Title',
   SUGGESTION_TYPE:'Please Select suggestion type',
   ANSWER_TYPE:'Please select Answer type',
   OPTION:'Please Provide option'
 }

 export const nameErrors = {
  FIRST_NAME:'Please enter your firstname',
  LAST_NAME:'Please enter your lastname'
 }

 export const addTeamMemberModalErrors = {
  FIRST_NAME: "Please enter First Name",
  LAST_NAME: "Please enter Last Name",
  EMAIL: "Please enter Team Member's Email address",
  INVALID_EMAIL : "Email is invalid",
 }

 export const openSuggestionBoxConfirmMessage = {
  HEADING: "Open",
  DESCRIPTION: "Are you sure? do you want to open suggestion box"
 }

 export const closeSuggestionBoxConfirmMessage = {
  HEADING: "Close",
  DESCRIPTION: "Are you sure? do you want to close suggestion box"
 }