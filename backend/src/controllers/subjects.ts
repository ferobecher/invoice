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



export const getSubjects = async (req: Request, res: Response) => {
    try {
        const subjects = await prisma.subject.findMany({
            include: { invoicesAsSupplier: true, invoicesAsCustomer: true }
        });
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subjects' });
    }
};

export const createSubject = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const subject = await prisma.subject.create({
            data: { name, email }
        });
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create subject' });
    }
};

export const updateSubject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const subject = await prisma.subject.update({
            where: { id: parseInt(id) },
            data: { name, email }
        }); 
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update subject' });
    };
};

export const deleteSubject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.subject.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'subject deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete subject' });
    };
};