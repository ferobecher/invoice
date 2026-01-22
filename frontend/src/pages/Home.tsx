import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Simple Invoicing Made Easy
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
          Create professional invoices in seconds. Manage your subjects, track
          payments, and grow your business effortlessly.
        </p>
        <Button
            size="lg"
            className="text-lg px-8 py-6 cursor-pointer"
            onClick={() => navigate('/invoice')}
        >
            Create Your First Invoice
        </Button>
      </div>
    </div>
  );
};

export default Home;
