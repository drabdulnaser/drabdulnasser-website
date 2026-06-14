import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { RehabSections } from './components/RehabSections';
import { InteractiveBodyMap } from './components/InteractiveBodyMap';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServiceArea } from './components/ServiceArea';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-bg-light text-text-light dark:bg-bg-dark dark:text-text-dark">
      {/* Navigation */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* Specialized Rehab (Auto Accident & Work Injuries) */}
      <RehabSections />

      {/* Interactive Anatomy / Conditions Map */}
      <InteractiveBodyMap />

      {/* About Doctor */}
      <About />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Service Area Reach */}
      <ServiceArea />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Instant WhatsApp Booking Form */}
      <BookingForm />

      {/* Floating WhatsApp Quick Chat */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
