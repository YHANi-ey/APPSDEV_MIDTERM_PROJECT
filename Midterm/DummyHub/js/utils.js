export function escapeHTML(str) {
    return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
}

export function debounce(fn, delay=300) {
    let timerId = null;
    return (...args) => {
        if (timerId)clearTimeout(timerId); {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(... args);
        }, delay);
    };
    }

    export function validateUUsername(username) {
        return usernameRegex.test(username);
    }

    export function validatePassword(password) {
        return typeof password === 'string' && password.length >= 6;
    }