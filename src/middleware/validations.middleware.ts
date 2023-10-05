export function validateCard(cardNumber: string): boolean {
    const sanitizedCardNumber = cardNumber.replace(/\s|-/g, '');

    if (!/^\d{13,16}$/.test(sanitizedCardNumber)) {
        console.log("Invalid card number", sanitizedCardNumber);
        return false;
    }

    // Algoritmo de Luhn para validar la tarjeta
    let sum = 0;
    let alternate = false;
    for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedCardNumber.charAt(i), 10);
        if (alternate) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        alternate = !alternate;
    }

    if (sum % 10 !== 0) {
        return true;
    }

    return false;
}


export  function validateCVV(cvv: string): boolean {
    if (!/^\d{3,4}$/.test(cvv)) {
        return false;
    }

    return true;
}


export  function validateEmail(email: string): boolean {
    if (!/^[A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.es)$/.test(email)) {
        return false;
    }
    return true;
}

export function validateExpiration(month: string, year: string): boolean {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Los meses son 0-indexados

    if (
        !/^\d{1,2}$/.test(month) ||
        !/^\d{4}$/.test(year) ||
        parseInt(month, 10) < 1 ||
        parseInt(month, 10) > 12 ||
        parseInt(year, 10) < currentYear ||
        parseInt(year, 10) > currentYear + 5 // Año actual máximo + 5 años
    ) {
        return false;
    }

    return true;
}
