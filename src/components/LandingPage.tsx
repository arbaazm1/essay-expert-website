import React, { useState, useEffect } from 'react';
import { Calendar, Edit, GraduationCap, BookOpen, Clock, Star, X, Menu, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Logo Ticker Component
const LogoTicker = () => {
  const universityLogos = [
    { name: "Harvard", color: "#A51C30" },
    { name: "Stanford", color: "#8C1515" },
    { name: "Yale", color: "#00356B" },
    { name: "MIT", color: "#A31F34" },
    { name: "Princeton", color: "#EE7F2D" },
    { name: "Columbia", color: "#B9D9EB" },
    { name: "Penn", color: "#011F5B" },
    { name: "Johns Hopkins", color: "#68ACE5" }
  ];

  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="relative overflow-hidden">
        <style>
          {`
            .ticker-container {
              overflow: hidden;
              width: 100%;
              position: relative;
            }
            
            @keyframes ticker {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            
            .ticker-wrapper {
              display: flex;
              width: fit-content;
              animation: ticker 40s linear infinite;
            }
            
            .ticker-wrapper:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        <div className="ticker-container">
          <div className="ticker-wrapper">
            {universityLogos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="inline-flex items-center justify-center w-24 h-24 rounded shadow-md mx-6"
                style={{ backgroundColor: logo.color }}
              >
                <span className="text-white font-bold text-sm px-2 text-center">
                  {logo.name}
                </span>
              </div>
            ))}
            {universityLogos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="inline-flex items-center justify-center w-24 h-24 rounded shadow-md mx-6"
                style={{ backgroundColor: logo.color }}
              >
                <span className="text-white font-bold text-sm px-2 text-center">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleNavigation = (section) => {
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">Essay Expert</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a 
              onClick={() => handleNavigation('services')}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Services
            </a>
            <a 
              onClick={() => handleNavigation('testimonials')}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Success Stories
            </a>
            <a 
              onClick={() => handleNavigation('calendar')}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Book Consultation
            </a>
            <a 
              href="/blog"
              className="text-gray-600 hover:text-gray-900"
            >
              Blog
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          
            onClick={() => handleNavigation('services')}
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
          >
            Services
          </a>
          
            onClick={() => handleNavigation('testimonials')}
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
          >
            Success Stories
          </a>
          
            onClick={() => handleNavigation('calendar')}
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
          >
            Book Consultation
          </a>
          
            href="/blog"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            Blog
          </a>
        </div>
      </div>
    </nav>
  );
};

// Embedded Calendly Component
const CalendlyEmbed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="calendar" className="h-screen pt-16">
      <div 
        className="calendly-inline-widget w-full h-full"
        data-url="https://calendly.com/YOUR_USERNAME/15min"
      />
    </div>
  );
};

// Main Landing Page Component
export const LandingPage = () => {
  const services = [
    {
      title: "Undergraduate Admissions",
      icon: GraduationCap,
      description: "Stand out with a compelling personal statement that showcases your unique story and potential."
    },
    {
      title: "Medical School Applications",
      icon: BookOpen,
      description: "Craft powerful personal statements and secondary essays that demonstrate your commitment to medicine."
    },
    {
      title: "Graduate School Essays",
      icon: Edit,
      description: "Develop clear, focused statements of purpose that align your experience with your academic goals."
    }
  ];

  const testimonials = [
    {
      text: "The feedback I received was invaluable. My essay went from good to extraordinary, and I got into my dream school!",
      author: "Sarah M.",
      school: "Stanford University"
    },
    {
      text: "The editor helped me tell my story in a way that really connected with admissions officers. Highly recommend!",
      author: "James L.",
      school: "Johns Hopkins Medical School"
    },
    {
      text: "Professional, insightful, and truly transformative. Worth every penny.",
      author: "Emily R.",
      school: "Harvard Law School"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-white pt-16">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Expert Admissions Essay Editing
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Transform your application essays with professional guidance
            </p>
            <div className="mt-8">
              <button 
                onClick={() => document.getElementById('calendar').scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Ticker */}
      <LogoTicker />

      {/* Services Section */}
      <div id="services" className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4">
                  <service.icon className="w-full h-full text-blue-600" />
                </div>
                <CardTitle className="text-center">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="text-sm">
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-blue-600">{testimonial.school}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Calendly Section */}
      <CalendlyEmbed />
    </div>
  );
};