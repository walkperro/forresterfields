import ClientContactForm from "./ClientContactForm";

export default function Contact() {
  return (
    <main className="container py-12">
      <h1 className="font-display text-4xl">Schedule a Tour / Check Your Date</h1>
      <p className="text-gray-600 mt-2">We’ll reply quickly with availability and next steps.</p>
      <ClientContactForm />
    </main>
  );
}
