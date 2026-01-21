import { useState, useEffect } from "react";
import CustomerForm from "@/components/CustomerForm";
import { Button } from '@/components/ui/button';
import Error from '@/components/shadcn-studio/blocks/error-page-01/error-page-01';
import Navbar from '@/components/shadcn-studio/blocks/navbar-component-01/navbar-component-01';
import Footer from '@/components/shadcn-studio/blocks/footer-component-01/footer-component-01';

interface Customer {
  id: number;
  name: string;
  email: string;
}

const navigationData = [
  {
    title: 'Home',
    href: '#'
  },
  {
    title: 'Products',
    href: '#'
  },
  {
    title: 'About Us',
    href: '#'
  },
  {
    title: 'Contacts',
    href: '#'
  }
]

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    const res = await fetch("http://localhost:3000/api/customers");
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = async (name: string, email: string) => {
    await fetch("http://localhost:3000/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    fetchCustomers();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/api/customers/${id}`, {
      method: "DELETE",
    });
    fetchCustomers();
  };

  return (
    <div className="min-h-screen">
      <Navbar navigationData={navigationData}/>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Invoice App</h1>

        <div className="bg-gray-700 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Add Customer</h2>
          <CustomerForm onSubmit={handleAddCustomer} />
        </div>

        <div className="bg-gray-700 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Customers</h2>
          <div className="space-y-2">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-gray-200">{customer.email}</div>
                </div>
                <Button
                  onClick={() => handleDelete(customer.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
       <Error/>
       <Footer/>
    </div>
  );
}

export default App;
