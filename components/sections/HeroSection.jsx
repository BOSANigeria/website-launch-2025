"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  // Carousel images with proper dimensions for aspect ratio calculation
  const carouselImages = [
    {
      src: "/hero/bosan1.jpg",
      alt: "Legal professionals in courtroom",
      width: 1920,
      height: 1280
    },
    {
      src: "/hero/bosan2.jpg",
      alt: "Nigerian legal library",
      width: 1920,
      height: 1280
    },
    {
      src: "/hero/bosan3.jpg",
      alt: "Senior advocates meeting",
      width: 1920,
      height: 1280
    },
    // {
    //   src: "/hero/bosan4.jpg",
    //   alt: "Legal consultation",
    //   width: 1920,
    //   height: 1280
    // },
    // {
    //   src: "/hero/bosan6.jpg",
    //   alt: "Justice and law books",
    //   width: 1000,
    //   height: 80
    // }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());

  // Preload all images for smooth transitions
  useEffect(() => {
    carouselImages.forEach((image, index) => {
      const img = new window.Image();
      img.onload = () => {
        setImagesLoaded(prev => new Set([...prev, index]));
      };
      img.src = image.src;
    });
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, carouselImages.length, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % carouselImages.length;
    goToSlide(newIndex);
  }, [currentIndex, carouselImages.length, goToSlide]);

  return (
    <section className="relative h-[700px] overflow-hidden">
      {/* Carousel Container */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0   }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={carouselImages[currentIndex].src}
              alt={carouselImages[currentIndex].alt}
              fill
              priority={currentIndex === 0} // Prioritize first image for LCP
              sizes="110vw"
              quality={85}
              className="object-cover"
              style={{
                objectPosition: "center   ",
              }}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(rgba(15, 44, 89, 0.4), rgba(15, 44, 89, 0.4))",
        }}
      />

      {/* Navigation Arrows */}
      {/* <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button> */}

      {/* Dots Indicator */}
      {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-[#D4AF37] scale-110" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex flex-col justify-center">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-white font-primary text-4xl md:text-6xl font-bold mb-4">
            The Body of Senior Advocates of Nigeria
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl">
            Promoting professional responsibility amongst members and maintaining the dignity of the rank of Senior Advocate
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.div 
              whileHover={{ y: -5 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/about">
                <Button className="w-full sm:w-auto bg-[#D4AF37] text-[#0F2C59] text-lg font-secondary font-medium py-6 px-6 rounded-md hover:bg-opacity-90 transition duration-300 flex items-center justify-center space-x-2">
                  <span>Learn About BOSAN</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/events">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white text-[#0F2C59] textmd md:text-lg font-secondary font-medium py-6 px-6 rounded-md hover:bg-opacity-90 transition duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Upcoming Events</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;