"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletterSubscription = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
    } else {
      toast({
        title: "Subscription failed",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-[#343A40] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <Link href="/">
              <div className="flex items-center space-x-3 mb-4 cursor-pointer">
                <div className="h-[60px] w-[60px] flex items-center justify-center overflow-hidden rounded-full bg-[#0F2C59]">
                  <Image
                    src="/assets/BOSAN-logo.png"
                    alt="BOSAN Logo"
                    width={60}
                    height={60}
                    style={{ objectFit: "contain", height: "100%", width: "100%" }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-playfair font-bold text-lg sm:text-xl">BOSAN</h3>
                  <p className="text-xs text-gray-400">Body of Senior Advocates of Nigeria</p>
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              The prestigious association of Senior Advocates committed to upholding the rule of law and excellence in legal practice.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4">Subscribe to our Newsletter</h4>
            <form onSubmit={handleNewsletterSubscription} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 text-black"
              />
              <Button type="submit" className="bg-[#D4AF37] hover:bg-[#b8972e] text-black">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/members">Members</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.linkedin.com/company/body-of-senior-advocates-of-nigeria-bosan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#D4AF37] transition duration-300"
                whileHover={{ y: -3 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>

              <motion.a
                href="https://wa.me/2347044444124"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#25D366] transition duration-300"
                whileHover={{ y: -3 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16.003 2.988a13.005 13.005 0 0 0-11.232 19.54L2 30l7.687-2.683a13.005 13.005 0 1 0 6.316-24.33zm0 23.748c-2.076 0-4.106-.541-5.895-1.567l-.422-.248-4.567 1.594 1.548-4.446-.275-.46a10.78 10.78 0 1 1 9.611 5.127z"/>
                  <path d="M22.3 19.45c-.375-.188-2.219-1.094-2.563-1.219-.344-.125-.594-.188-.844.188s-.969 1.219-1.188 1.469c-.219.25-.438.281-.812.094-.375-.188-1.594-.588-3.031-1.875-1.12-1.003-1.875-2.25-2.094-2.625-.219-.375-.023-.578.164-.766.172-.171.375-.437.563-.656.188-.219.25-.375.375-.625.125-.25.063-.469-.031-.656-.094-.188-.844-2.031-1.156-2.781-.3-.719-.609-.625-.844-.625h-.719c-.219 0-.563.094-.859.438-.297.344-1.125 1.094-1.125 2.656 0 1.563 1.156 3.063 1.313 3.281.156.219 2.281 3.5 5.531 4.906.773.333 1.375.531 1.844.688.775.25 1.481.215 2.031.131.625-.094 2.219-.906 2.531-1.781.313-.875.313-1.625.219-1.781-.094-.156-.344-.25-.719-.438z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
          &copy; {new Date().getFullYear()} BOSAN. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
