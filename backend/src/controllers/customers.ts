import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import pg from 'pg';

dotenv.config();
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});



export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await prisma.customer.findMany({
            include: { invoices: true }
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
};

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const customer = await prisma.customer.create({
            data: { name, email }
        });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const customer = await prisma.customer.update({
            where: { id: parseInt(id) },
            data: { name, email }
        }); 
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    };
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.customer.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    };
};