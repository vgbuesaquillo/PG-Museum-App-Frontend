export default function validateLogin(user) {
    let errors = {};
    if (!user.username.trim()) {
        errors.username = "username is required"
    } else if (user.username.length < 4) {
        errors.username = "username need to be four characters or more"
    }

    if (!user.email) {
        errors.email = "Height min is required"
    } else if (!/^[0-9]+$/.test(user.email)) {
        errors.email = "Please only enter numeric characters"
    }

    if (!user.password) {
        errors.password = "Height max is required"
    } else if (!/^[0-9]+$/.test(user.password)) {
        errors.password = "Please only enter numeric characters"
    }

    if (!user.passwordbis) {
        errors.passwordbis = "passwordbis is required"
    } else if (!/^[0-9]+$/.test(user.passwordbis)) {
        errors.passwordbis = "Please only enter numeric characters"
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