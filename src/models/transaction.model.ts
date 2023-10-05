export interface Transaction {
    email: string;
    card_number: string;
    cvv: string;
    expiration_month: string;
    expiration_year: string;
    token: string;
    expiration_time: Date;
}
