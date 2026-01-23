import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Invoice } from "@/pages/Invoice";
import type { Subject } from "@/pages/Subjects";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface InvoiceEditProps {
  invoice: Invoice | null;
  mode: "create" | "edit";
  onSave: (data: Partial<Invoice>) => void;
  onCancel: () => void;
}

const InvoiceEdit = ({ invoice, mode, onSave, onCancel }: InvoiceEditProps) => {
  const [subjects, setSubjects] = useState<[]>([]);
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    issueDate: "",
    dueDate: "",
    customerId: "",
    supplierId: "",
    totalAmount: "",
    status: "pending",
  });

  useEffect(() => {
    if (invoice && mode === "edit") {
      setFormData({
        invoiceNumber: invoice.invoiceNumber,
        issueDate: new Date(invoice.issueDate).toISOString().split("T")[0],
        dueDate: new Date(invoice.dueDate).toISOString().split("T")[0],
        customerId: invoice.customerId.toString(),
        supplierId: invoice.supplierId.toString(),
        totalAmount: invoice.totalAmount.toString(),
        status: invoice.status,
      });
    }
  }, [invoice, mode]);

  const fetchSubjects = () => {
    fetch("http://localhost:3000/api/subjects/names")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        return response.json();
      })
      .then((data) => {
        setSubjects(data);
      });
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const invoiceData = {
      invoiceNumber: formData.invoiceNumber,
      issueDate: new Date(formData.issueDate).toISOString(),
      dueDate: new Date(formData.dueDate).toISOString(),
      customerId: parseInt(formData.customerId),
      supplierId: parseInt(formData.supplierId),
      totalAmount: parseFloat(formData.totalAmount),
      status: formData.status,
    };

    onSave(invoiceData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectSelect = (
    subjectId: number,
    field: "customerId" | "supplierId",
  ) => {
    setFormData((prev) => ({ ...prev, [field]: subjectId.toString() }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {mode === "create" ? "Create New Invoice" : "Edit Invoice"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {mode === "create"
            ? "Fill in the details to create a new invoice"
            : "Update the invoice details below"}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-background border rounded-lg p-6 space-y-6"
      >
        {/* Invoice Number */}
        <div className="grid gap-2">
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            placeholder="INV-001"
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              name="issueDate"
              type="date"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Customer and Supplier */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="customer">Customer</Label>
            <Combobox
              items={subjects}
              required
              onValueChange={(value) => {
                const subject = subjects.find((s) => s.name === value);
                if (subject) {
                  handleSubjectSelect(subject.id, "customerId");
                }
              }}
            >
              <ComboboxInput placeholder="Select a customer" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(subject) => (
                    <ComboboxItem key={subject.id} value={subject}>
                      {subject.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Combobox
              items={subjects}
              required
              onValueChange={(value) => {
                const subject = subjects.find((s) => s.name === value);
                if (subject) {
                  handleSubjectSelect(subject.id, "supplierId");
                }
              }}
            >
              <ComboboxInput placeholder="Select a supplier" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(subject) => (
                    <ComboboxItem key={subject.id} value={subject}>
                      {subject.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        {/* Total Amount and Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="totalAmount">Total Amount</Label>
            <Input
              id="totalAmount"
              name="totalAmount"
              type="number"
              step="0.01"
              value={formData.totalAmount}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Items Section - Placeholder */}
        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-3">Invoice Items</h3>
          <div className="text-muted-foreground text-sm">
            Item management will be added here (add/remove line items)
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {mode === "create" ? "Create Invoice" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceEdit;
