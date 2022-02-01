export default function validatePassword(user) {
    let errors = {};
    if (!user.password) {
        errors.password = "Password is required"
    } else if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-_:|/])(?=.{8,})/.test(user.password)) {
        errors.password = "Password need to be eight characters or more; must have at least one digit, one special symbol or one uppercase character"
    }

    if (!user.passwordbis) {
        errors.passwordbis = "Password is required"
    } else if (user.password !== user.passwordbis) {
        errors.passwordbis = "Passwords are not the same"
    }

    return errors;

}