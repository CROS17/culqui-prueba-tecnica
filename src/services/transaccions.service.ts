import {db} from "../settings/dbConnection";
import {Transaction} from '../models/transaction.model';

export async function getTransactionByToken(token: string): Promise<unknown> {
    try {
        await db.connect();

        const query = `SELECT email, card_number, expiration_month, expiration_year
                       FROM transaccion_card
                       WHERE ((expiration_year > YEAR (CURDATE()))
                          OR (expiration_year = YEAR (CURDATE()) AND expiration_month >= MONTH (CURDATE())))
                         AND expiration_time >= NOW()
                         AND token = ?;`;

        const transactions = await db.query(query, [token]);

        await db.end();

        return transactions;
    } catch (error) {
        throw new Error('Error al obtener las transacciones de la base de datos');
    }
}

export async function insertTransaction(transaction: Transaction): Promise<void> {
    try {
        await db.connect();

        await db.query('INSERT INTO transaccion_card (email, card_number, cvv, expiration_month, expiration_year, token, expiration_time) VALUES (?, ?, ?, ?, ?, ?, ?)', [transaction.email, transaction.card_number, transaction.cvv, transaction.expiration_month, transaction.expiration_year, transaction.token, transaction.expiration_time]);

        await db.end();
    } catch (error) {
        throw new Error('Error al obtener las transacciones de la base de datos');
    }
}