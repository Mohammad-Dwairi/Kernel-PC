
export const validatePassword = (password) => {
    if (/^(?=.*[0-9])(?=.*[A-Z])(?=.{5,})/.test(password)) {
        return true;
    }
    return false;
};

export const validateConfirmationPassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
        return true;
    }
    return false;
};