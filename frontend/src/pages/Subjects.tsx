import React from "react";
import { useEffect, useState } from "react";
import AddSubjectForm from "@/components/AddSubjectForm";

interface Subject {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  invoicesAsCustomer: [];
  invoicesAsSupplier: [];
}

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = () => {
    fetch("http://localhost:3000/api/subjects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        return response.json();
      })
      .then((data) => {
        setSubjects(data);
        setLoading(false);
      })
      .then((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Subjects</h1>
        <AddSubjectForm onSubjectAdded={fetchSubjects} />
      </div>

      <div className="grid gap-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold">{subject.name}</h2>
            <h2 className="text-xl font-semibold">{subject.email}</h2>
          </div>
        ))}

        {subjects.length === 0 && (
          <p className="text-muted-foreground">No subjects found.</p>
        )}
      </div>
    </div>
  );
};

export default Subjects;
