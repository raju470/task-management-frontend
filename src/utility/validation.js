const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{4,}$/; // At least 4 characters, including lowercase, uppercase, number, special character
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateForm = (formData, isLogin = false) => {
    const errors = {};

    if (!formData.username) {
        errors.username = 'Username is required';
    } else if (formData.username.length < 4) {
        errors.username = 'Username must be at least 4 characters long';
    }

    if (!isLogin) {
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
    }

    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
        const passwordErrors = [];
        if (formData.password.length < 4) {
            passwordErrors.push('Password must be at least 4 characters long');
        }
        else if (!/[a-z]/.test(formData.password)) {
            passwordErrors.push('Password must include at least one lowercase letter');
        }
        else if (!/[A-Z]/.test(formData.password)) {
            passwordErrors.push('Password must include at least one uppercase letter');
        }
        else if (!/\d/.test(formData.password)) {
            passwordErrors.push('Password must include at least one number');
        }
        else if (!/[\W_]/.test(formData.password)) {
            passwordErrors.push('Password must include at least one special character');
        }

        errors.password = passwordErrors.join('\n');
    }

    return errors;
};
