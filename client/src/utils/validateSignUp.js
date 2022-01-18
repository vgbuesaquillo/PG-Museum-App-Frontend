export default function validateLogin(user) {
    let errors = {};
    if (!user.username.trim()) {
        errors.username = "Username is required"
    } else if (!/^[a-zA-Z0-9]{4,15}$/.test(user.username)) {
        errors.username = "Username need to be four characters or more, only numeric or alphabetic characters"
    }

    if (!user.email) {
        errors.email = "Email is required"
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(user.email)) {
        errors.email = "Please enter a valid email"
    }

    if (!user.password) {
        errors.password = "Password is required"
    } else if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(user.password)) {
        errors.password = "Password need to be eight characters or more; must have at least one digit, one special symbol or one uppercase character"
    }

    if (!user.passwordbis) {
        errors.passwordbis = "Password is required"
    } else if (user.password !== user.passwordbis) {
        errors.passwordbis = "Passwords are not the same"
    }

    if (!user.gender) {
        errors.gender = "gender is required"
    } else if (!/^[0-9]+$/.test(user.gender)) {
        errors.gender = "Please only enter numeric characters"
    }

    if (!user.status) {
        errors.status = "Life_span min is required"
    } else if (!/^[0-9]+$/.test(user.status)) {
        errors.status = "Please only enter numeric characters"
    }

    return errors;
}