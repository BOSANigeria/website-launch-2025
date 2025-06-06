"use client"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });

  // Letter animation variants
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      scale: 0.8
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    })
  };

  // Enhanced fade in variants
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const fadeInScale = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: { 
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardHover = {
    rest: { 
      scale: 1,
      y: 0,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.02,
      y: -8,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const AnimatedText = ({ text, className }) => {
    return (
      <div className={className}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div ref={titleRef}>
          <AnimatedText 
            text="About BOSAN"
            className="text-black font-bold text-4xl md:text-4xl mb-2 font-primary"
          />
          </div>
          
          <motion.div 
            className="h-1.5 w-24 bg-gradient-to-r from-[#D4AF37] to-yellow-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          />
          
          <motion.p 
            className="text-gray-700 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-relaxed font-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            The Body of Senior Advocates of Nigeria (BOSAN) is an independent organization comprising highly 
            distinguished practitioners in the legal profession. Its main objective is to advocate for leadership
            in the legal domain while upholding professional ethics, integrity, and a superior level of legal 
            practice within the Inner Bar and the legal profession in Nigeria.
          </motion.p>
        </motion.div>
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerChildren}
            className="space-y-12"
          >
            {/* The Body Section */}
            <motion.div 
              variants={fadeInUp}
              className="group"
            >
              <div className="relative mb-6">
                <h3 className="text-3xl font-bold text-black mb-2 relative inline-block">
                  The Body
                </h3>
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#D4AF37] to-yellow-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </div>
              
              <motion.div 
                className="space-y-4 text-gray-700 text-lg leading-relaxed text-justify"
                variants={staggerChildren}
              >
                <motion.p variants={fadeInUp}>
                  The Body comprises <span className="font-semibold text-black">899 distinguished practitioners</span>, 
                  with 147 members now of blessed memories. Its membership includes advocates and academics, 
                  and it operates under a well-defined constitution.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  BOSAN fosters collaboration and is governed by a clear constitution. BOSAN promotes a cooperative 
                  and lively atmosphere among its members through quarterly meetings and annual gatherings. If the 
                  Attorney General of the Federation (where he is a Senior Advocate) is unavailable, the Vice-Chairman 
                  or, in his absence, the most senior member of BOSAN assumes the role of Chair, ensuring continuity 
                  in leadership.
                </motion.p>
              </motion.div>
            </motion.div>
            
            {/* Membership Section */}
            <motion.div 
              variants={fadeInUp}
              className="group"
            >
              <div className="relative mb-6">
                <h1 className="text-3xl font-bold text-black mb-2 relative inline-block">
                  Membership
                </h1>
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#D4AF37] to-yellow-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </div>
              
              <motion.div 
                className="space-y-4 text-gray-700 leading-relaxed text-lg text-justify"
                variants={staggerChildren}
              >
                <motion.p variants={fadeInUp}>
                  Any legal practitioner who has been conferred the rank of Senior Advocate of Nigeria and 
                  sworn in as such becomes a member of BOSAN subject to meeting the requirements of financial 
                  membership.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  The Body's constitution governs membership and aims to promote good administration based on 
                  the principles of <span className="font-semibold text-black">freedom, equity, and justice</span>. 
                  The constitution takes precedence over any Rules and Regulations. Members of the Body are 
                  committed to being a social, non-political, non-governmental entity representing the interests 
                  of the youth, the less privileged, and the aspirations of society.
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Image Section */}
          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInScale}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              <Image
                src="/hero/bosan6.jpg"
                alt="BOSAN gathering"
                width={800}
                height={600}
                className="w-full h-[700px] object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <motion.div 
                className="absolute bottom-6 left-6 text-white z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm font-medium">7th Annual Induction</p>
                <p className="text-xs opacity-90">Distinguished members in session</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/about">
              <Button className="bg-transparent border-2 border-black text-black text-lg font-secondary font-semibold py-8 px-8 hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn More About BOSAN
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;