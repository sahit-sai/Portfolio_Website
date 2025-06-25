import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Blogs from "@/components/Blogs";

const Index = () => {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blogs", href: "#blogs" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar navItems={navItems} scrollToSection={scrollToSection} />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Blogs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
