import { Clients } from "@prisma/client";

interface ICreateCompanyDTO {
    id?: string;
    name: string;
    cnpj: string;
    code: string;
    clients: Clients[];
    created_at?: Date;
}

export { ICreateCompanyDTO };
