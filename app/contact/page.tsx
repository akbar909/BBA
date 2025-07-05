import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
  return (
    <main>
      <Header />
      <div className="pt-16">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}