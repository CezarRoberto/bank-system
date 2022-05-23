
interface ICreateCompanyDTO {
    id?: string;
    name: string;
    cnpj: string;
    code: string;
    created_at?: Date;
}

export { ICreateCompanyDTO };
