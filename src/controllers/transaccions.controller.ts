import {Transaction} from '../models/transaction.model';
import {getTransactionByToken, insertTransaction} from '../services/transaccions.service';
import {HTTP_RESPONSE} from '../middleware/http-response.middleware';
import {validateCard, validateCVV, validateEmail, validateExpiration} from "../middleware/validations.middleware";
import {generateRandomToken} from '../middleware/generate-token.middleware';


export const getTransactionsHandler = async (event) => {
    try {

        const {token} = event.queryStringParameters;

        if (!token) {
            throw new Error('Token no proporcionado');
        }

        const transactions = await getTransactionByToken(token);

        if (!transactions || !transactions.length) {
            return {
                statusCode: HTTP_RESPONSE.BAD_REQUEST,
                body: JSON.stringify({message: 'El token no existe o ha caducado'}),
            };
        }

        return {
            statusCode: HTTP_RESPONSE.OK,
            body: JSON.stringify(transactions),
        };
    } catch (error) {
        return {
            statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
            body: JSON.stringify({error: error.message}),
        };
    }
};

export const createTransactionHandler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        const token = generateRandomToken(16);

        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 15);

        const transaction: Transaction = {
            email: body.email,
            card_number: body.card_number,
            cvv: body.cvv,
            expiration_month: body.expiration_month,
            expiration_year: body.expiration_year,
            token,
            expiration_time: expirationTime,
        };

        if (
            !validateCard(transaction.card_number) ||
            !validateCVV(transaction.cvv) ||
            !validateEmail(transaction.email) ||
            !validateExpiration(transaction.expiration_month, transaction.expiration_year)
        ) {
            throw new Error('Datos de pago no válidos');
        }

        await insertTransaction(transaction);

        return {
            statusCode: HTTP_RESPONSE.CREATED,
            body: JSON.stringify({message: 'Transacción registrada con éxito'}),
        };
    } catch (error) {
        return {
            statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
            body: JSON.stringify({error: error.message}),
        };
    }
};
