interface ICreateClientDTO {
    id?: string
    name: string
    cpf: string
    email: string
    password: string
    company_id: string
    credits: string,
    amount: number
}

export {ICreateClientDTO}