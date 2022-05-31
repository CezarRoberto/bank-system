import { IClientRepository } from '@modules/clients/repositories/IClientRepository';
import { ClientRepository } from '@modules/clients/repositories/implementations/ClientRepository';
import { ICompanyRepository } from '@modules/companies/repositories/ICompaniesRepository';
import { CompanyRepository } from '@modules/companies/repositories/implementation/CompaniesRepository';
import { TransactionRepository } from '@modules/transactions/repository/implementation/TransactionRepository';
import { ITransactionRepository } from '@modules/transactions/repository/ITransactionRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICompanyRepository>(
    'CompanyRepository',
    CompanyRepository,
);

container.registerSingleton<IClientRepository>(
    'ClientRepository',
    ClientRepository,
)

container.registerSingleton<ITransactionRepository>(
    'TransactionRepository',
    TransactionRepository
)