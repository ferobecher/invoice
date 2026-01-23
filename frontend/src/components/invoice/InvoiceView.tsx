import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import type { Invoice } from "@/pages/Invoice";

interface InvoiceViewProps {
  invoice: Invoice;
  onEdit: () => void;
}

const InvoiceView = ({ invoice, onEdit }: InvoiceViewProps) => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invoice Details</h1>
        <Button onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Invoice
        </Button>
      </div>

      <div className="bg-background border rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{invoice.invoiceNumber}</h2>
            <p className="text-muted-foreground">Invoice #{invoice.id}</p>
          </div>
          <div>
            <span
              className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                invoice.status === "paid"
                  ? "bg-green-100 text-green-800"
                  : invoice.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {invoice.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Issue Date</p>
            <p className="font-medium">
              {new Date(invoice.issueDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Due Date</p>
            <p className="font-medium">
              {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Customer</p>
            <p className="font-medium">Customer ID: {invoice.customerId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Supplier</p>
            <p className="font-medium">Supplier ID: {invoice.supplierId}</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-3">Items</h3>
          <div className="text-muted-foreground text-sm">
            Item details will be displayed here
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-3xl font-bold">
                ${invoice.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;