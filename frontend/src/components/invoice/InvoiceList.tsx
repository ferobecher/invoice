import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Invoice } from "@/pages/Invoice";

interface InvoiceListProps {
  invoices: Invoice[];
  selectedInvoiceId?: number;
  onSelectInvoice: (id: number) => void;
  onCreateNew: () => void;
  loading: boolean;
}

const InvoiceList = ({
  invoices,
  selectedInvoiceId,
  onSelectInvoice,
  onCreateNew,
  loading,
}: InvoiceListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button className="w-full" onClick={onCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Invoice
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-muted-foreground">
            Loading invoices...
          </div>
        ) : invoices.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No invoices yet. Create your first one!
          </div>
        ) : (
          <div className="divide-y">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                onClick={() => onSelectInvoice(invoice.id)}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedInvoiceId === invoice.id ? "bg-muted" : ""
                }`}
              >
                <div className="font-semibold">{invoice.invoiceNumber}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {new Date(invoice.issueDate).toLocaleDateString()}
                </div>
                <div className="text-sm font-medium mt-1">
                  ${invoice.totalAmount.toFixed(2)}
                </div>
                <div className="text-xs mt-1">
                  <span
                    className={`inline-block px-2 py-0.5 rounded ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceList;
