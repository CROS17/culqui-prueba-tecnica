import { APIGatewayProxyHandler } from 'aws-lambda';
import { getTransactionsHandler, createTransactionHandler } from './controllers/transaccions.controller';

export const handler: APIGatewayProxyHandler = async (event) => {

    const getTransactions = getTransactionsHandler;
    const createTransaction = createTransactionHandler;
    const path = event.path;
    const method = event.httpMethod;

    if (method === 'GET' && path === '/tokens') {
        return getTransactions(event);
    } else if (method === 'POST' && path === '/tokens') {
        return createTransaction(event);
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Ruta no encontrada' }),
        };
    }
};
