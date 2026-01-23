import { useState, useEffect } from "react";
import InvoiceList from "@/components/invoice/InvoiceList";
import InvoiceView from "@/components/invoice/InvoiceView";
import InvoiceEdit from "@/components/invoice/InvoiceEdit";

export interface Invoice {
  id: number;
  invoiceNumber: string;
  supplierId: number;
  customerId: number;
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  createdAt: string;
  status: string;
}

type Mode = "view" | "edit" | "create" | null;

const InvoicePage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>(null);

  const fetchInvoices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/invoices");
      if (!response.ok) throw new Error("Failed to fetch invoices");
      const data = await response.json();
      setInvoices(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSelectInvoice = async (invoiceId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/invoices/${invoiceId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch invoice");
      const data = await response.json();
      setSelectedInvoice(data);
      setMode('view');
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  const handleCreateNew = () => {
    setSelectedInvoice(null);
    setMode("create");
  };

  const handleEdit = () => {
    setMode("edit");
  };

  const handleSave = async (invoiceData: Partial<Invoice>) => {
    try {
      if (mode === "create") {
        const response = await fetch("http://localhost:3000/api/invoices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(invoiceData),
        });
        if (!response.ok) throw new Error("Failed to create invoice");
        const newInvoice = await response.json();
        setInvoices([...invoices, newInvoice]);
        setSelectedInvoice(newInvoice);
        setMode("view");
      } else if (mode === "edit" && selectedInvoice) {
        const response = await fetch(
          `http://localhost:3000/api/invoices/${selectedInvoice.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(invoiceData),
          },
        );
        if (!response.ok) throw new Error("Failed to update invoice");
        const updatedInvoice = await response.json();
        setInvoices(
          invoices.map((inv) =>
            inv.id === updatedInvoice.id ? updatedInvoice : inv,
          ),
        );
        setSelectedInvoice(updatedInvoice);
        setMode("view");
      }
      fetchInvoices();
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Failed to save invoice");
    }
  };

  const handleCancel = () => {
    if (mode === "create") {
      setMode(null);
      setSelectedInvoice(null);
    } else {
      setMode("view");
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <div className="w-80 border-r bg-background overflow-y-auto">
        <InvoiceList
          invoices={invoices}
          selectedInvoiceId={selectedInvoice?.id}
          onSelectInvoice={handleSelectInvoice}
          onCreateNew={handleCreateNew}
          loading={loading}
        />
      </div>

      <div className="flex-1 overflow-y-auto bg-muted/10">
        {mode === null && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Select an invoice or create a new one</p>
          </div>
        )}

        {mode === 'view' && selectedInvoice && (
            <InvoiceView 
                invoice={selectedInvoice}
                onEdit={handleEdit}
            />
        )}

        {(mode === 'edit' || mode === 'create') && (
            <InvoiceEdit 
                invoice={selectedInvoice}
                mode={mode}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        )}
      </div>
    </div>
  );
};

export default InvoicePage;
