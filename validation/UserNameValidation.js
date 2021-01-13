

export const validateUsername = (userName) => {

    if (userName.length < 3 || userName.length > 25) {
        return true;
    }
    else if (userName.trim() === '') {
        return true;
    }
    else if (/^\d+$/.test(userName)) {
        // if full numric
        return true;
    }
    else if (!isNaN(userName.charAt(0))) {
        // if starts with number
        return true;
    }
    else {
        for (let i = 0; i < userName.length; i++) {
            let asci = userName.charCodeAt(i);
            let char = userName.charAt(i);
            if (char === ' ' || char === '-' || char === '_') {
                continue;
            }
            if ((asci < 48) || (asci > 57 && asci < 65) || (asci > 90 && asci < 97) || (asci > 122)) {
                return true;
            }
        }
        return false;
    }
};