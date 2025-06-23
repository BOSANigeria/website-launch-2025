"use client"
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
// import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  // const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: ""
    };
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters long";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await apiRequest("POST", "/api/contact", formData);
      
      toast.success("Message sent successfully! Thank you for your message. We will get back to you soon.",
        {
          position: "top-center"
        });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      console.error('Contact form error:', error);
      
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Banner Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-primary font-bold text-4xl md:text-5xl mb-4">Contact Us</h1>
            <div className="h-1 w-32 bg-[#D4AF37] mx-auto"></div>
            <p className="font-secondary text-white/80 mt-6 max-w-3xl mx-auto text-lg">
              Have questions about BOSAN? We're here to help. Reach out to us through any of the following channels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <div className="aspect-w-16 aspect-h-9 w-full h-96 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7537219455187!2d3.4193300751901594!3d6.423756934667084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53aec8c3e13%3A0xc96e9df38b6ef9ef!2sNigerian%20Law%20School%2C%20Lagos%20Campus!5e0!3m2!1sen!2sng!4v1681747537951!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Nigerian Law School Location"
              ></iframe>
            </div>
            <div className="bg-black text-white p-4">
              <div className="flex items-center">
                <div className="bg-[#D4AF37]/20 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-medium">Nigerian Law School Complex, Victoria Island, Lagos, Nigeria</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 bg-black text-white">
        <ToastContainer />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-primary font-bold text-3xl md:text-4xl mb-4">Get In Touch</h2>
            <div className="h-1 w-20 bg-[#D4AF37] mx-auto"></div>
            <p className="font-secondary text-white/80 mt-6 max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="font-secondary text-2xl font-bold mb-6">Send Us a Message</h3>
                
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="form-item">
                    <label className="text-sm font-medium block mb-2">Full Name</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-white placeholder-white/50" 
                      placeholder="Your name"
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="form-item">
                    <label className="text-sm font-medium block mb-2">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-white placeholder-white/50" 
                      placeholder="Your email"
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="form-item">
                    <label className="text-sm font-medium block mb-2">Subject</label>
                    <input 
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-white placeholder-white/50" 
                      placeholder="Subject of your message"
                      disabled={isSubmitting}
                    />
                    {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                  </div>
                  
                  <div className="form-item">
                    <label className="text-sm font-medium block mb-2">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4} 
                      className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-white placeholder-white/50" 
                      placeholder="Your message (minimum 20 characters)"
                      disabled={isSubmitting}
                    ></textarea>
                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#D4AF37] text-[#0F2C59] font-secondary font-medium py-3 px-6 rounded hover:bg-opacity-90 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {!isSubmitting && (
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm h-full">
                <h3 className="font-primary text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#D4AF37]/20 rounded-full p-3 mr-4">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-secondary font-semibold mb-1">Office Address</h4>
                      <p className="text-white/80">Nigerian Law School Complex, Victoria Island, Lagos, Nigeria</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#D4AF37]/20 rounded-full p-3 mr-4">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-secondary font-semibold mb-1">Phone Number</h4>
                      <p className="text-white/80">+234 704 444 4124</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#D4AF37]/20 rounded-full p-3 mr-4">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-secondary font-semibold mb-1">Email Address</h4>
                      <p className="text-white/80">bosanigeria@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#D4AF37]/20 rounded-full p-3 mr-4">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-secondary font-semibold mb-1">Office Hours</h4>
                      <p className="text-white/80">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-white/80">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-secondary font-semibold mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <motion.a 
                      href="https://www.youtube.com/channel/UCxz0mnWkMbPoc9B9H47mNtw" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-[#D4AF37]/50 transition duration-300 h-10 w-10 rounded-full flex items-center justify-center"
                      whileHover={{ y: -3 }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.499 6.203a3.008 3.008 0 00-2.089-2.089c-1.87-.501-9.4-.501-9.4-.501s-7.509-.01-9.399.501a3.008 3.008 0 00-2.088 2.09A31.258 31.258 0 000 12.01a31.258 31.258 0 00.523 5.785 3.008 3.008 0 002.088 2.089c1.869.502 9.4.502 9.4.502s7.508 0 9.399-.502a3.008 3.008 0 002.089-2.09 31.258 31.258 0 00.5-5.784 31.258 31.258 0 00-.5-5.808zm-13.891 9.4V8.407l6.266 3.604z"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;