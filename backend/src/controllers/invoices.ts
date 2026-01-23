import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { Request, Response } from "express";
import pg from "pg";

dotenv.config();
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoice.findMany();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};

export const getInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.findFirst({
      where: { id: parseInt(id) },
    });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch invoice" });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const {
      invoiceNumber,
      supplierId,
      customerId,
      status,
      totalAmount,
      dueDate,
      issueDate,
    } = req.body;
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        supplierId,
        customerId,
        status,
        totalAmount,
        dueDate: new Date(dueDate),
        issueDate: new Date(issueDate),
      },
    });
    res.json(invoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Failed to create invoice" });
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      invoiceNumber,
      supplierId,
      customerId,
      status,
      totalAmount,
      dueDate,
      issueDate,
    } = req.body;
    const invoice = await prisma.invoice.update({
      where: { id: parseInt(id) },
      data: {
        invoiceNumber,
        supplierId,
        customerId,
        status,
        totalAmount,
        dueDate: new Date(dueDate),
        issueDate: new Date(issueDate),
      },
    });
    res.json(invoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Failed to update invoice" });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.invoice.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Invoice deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete invoice" });
  }
};
