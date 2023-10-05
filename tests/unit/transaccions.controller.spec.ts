// transaccions.controller.spec.ts
import { createTransactionHandler } from '../../src/controllers/transaccions.controller';

describe('createTransactionHandler', () => {
    it('debe retornar un mensaje de éxito', async () => {
        const event = {
            // Simula el objeto event que pasa AWS Lambda
            body: JSON.stringify({
                email: 'jorge@hotmail.com',
                card_number: '1234567890123456',
                cvv: '123',
                expiration_month: '12',
                expiration_year: '2025',
            }),
        };

        const response = await createTransactionHandler(event);

        expect(response.statusCode).toBe(201);
        expect(response.body).toContain('Transacción registrada con éxito');
    });

    it('debe manejar errores', async () => {
        const event = {
            // Simula el objeto event que pasa AWS Lambda
            body: JSON.stringify({
                // Proporciona datos incorrectos para provocar un error
                email: 'jorgehotmail.com', // Email inválido
                card_number: '1234567890', // Número de tarjeta inválido
            }),
        };

        const response = await createTransactionHandler(event);

        expect(response.statusCode).toBe(500);
        expect(response.body).toContain('Error');
    });
});