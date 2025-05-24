"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-[#0F2C59] font-playfair font-bold text-3xl md:text-4xl mb-4">About BOSAN</h2>
          <div className="h-1 w-20 bg-[#D4AF37] mx-auto"></div>
          <p className="text-[#343A40]/80 text-lg mt-6 max-w-2xl mx-auto text-justify md:text-center">
            The Body of Senior Advocates of Nigeria (BOSAN) is an independent organization comprising highly 
            distinguished practitioners in the legal profession. Its main objective is to advocate for leadership
            in the legal domain while upholding professional ethics, integrity, and a superior level of legal 
            practice within the Inner Bar and the legal profession in Nigeria.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeIn}>
              <h3 className="font-playfair text-2xl font-bold text-[#0F2C59] mb-4 relative">
                The Body
                <span className="absolute bottom-[-10px] left-0 w-20 h-[3px] bg-[#D4AF37]"></span>
              </h3>
              <p className="text-[#343A40]/80 text-lg mb-4 text-justify">
                The Body comprises 899 distinguished practitioners, with 147 members now of blessed memories. 
                Its membership includes advocates and academics, and it operates under a well-defined constitution.
              </p>
              <p className="text-[#343A40]/80 text-justify text-lg">
                BOSAN fosters collaboration and is governed by a clear constitution. BOSAN promotes a cooperative 
                and lively atmosphere among its members through quarterly meetings and annual gatherings. If the 
                Attorney General of the Federation (where he is a Senior Advocate) is unavailable, the Vice-Chairman 
                or, in his absence, the most senior member of BOSAN assumes the role of Chair, ensuring continuity 
                in leadership.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mt-8">
              <h3 className="font-playfair text-2xl font-bold text-[#0F2C59] mb-4 relative">
                Membership
                <span className="absolute bottom-[-10px] left-0 w-20 h-[3px] bg-[#D4AF37]"></span>
              </h3>
              <p className="text-[#343A40]/80 mb-4 text-justify text-lg">
                Any legal practitioner who has been conferred the rank of Senior Advocate of Nigeria and 
                sworn in as such becomes a member of BOSAN subject to meeting the requirements of financial 
                membership.
              </p>
              <p className="text-[#343A40]/80 text-justify text-lg">
                The Body's constitution governs membership and aims to promote good administration based on 
                the principles of freedom, equity, and justice. The constitution takes precedence over any 
                Rules and Regulations. Members of the Body are committed to being a social, non-political, 
                non-governmental entity representing the interests of the youth, the less privileged, and 
                the aspirations of society.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=800&q=80" 
              alt="BOSAN gathering" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <motion.section
          className="py-24 sm:px-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
  <h3 className="text-4xl md:text-5xl font-bold font-playfair text-center text-[#0F2C59] mb-12 relative">
    Leadership
    <span className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 w-28 h-[4px] bg-[#D4AF37] rounded-full"></span>
  </h3>

  {/* Chairman and Vice-Chairman */}
  <div className="grid md:grid-cols-2 gap-12 mb-16">
    {[
      {
        name: "Prince Lateef Fagbemi, SAN",
        title: "Attorney General of the Federation",
        role: "Chairman, BOSAN",
        note: "As stipulated in Article 7 of the BOSAN Constitution.",
        img: "/assets/BOSAN/prince-Lateef-fagbemi.jpg",
      },
      {
        name: "Professor Alfred Bandele Kasunmu, SAN",
        title: "Most Senior SAN (since 1979)",
        role: "Vice-Chairman, BOSAN",
        note: "Succeeded Professor Ben Nwabueze, SAN (late).",
        img: "/assets/BOSAN/prof-alfred-bandele.jpg",
      },
    ].map((person, i) => (
      <motion.div
        key={i}
        className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-2xl transition duration-300 p-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + i * 0.15 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-36 h-36 rounded-full border-4 border-[#D4AF37] overflow-hidden mb-5 hover:scale-105 transition-transform duration-300">
            <img src={person.img} alt={person.name} className="w-full h-full object-cover object-center" />
          </div>
          <h4 className="text-xl font-semibold text-[#0F2C59]">{person.name}</h4>
          <p className="text-lg text-[#D4AF37] mt-1 font-medium">{person.title}</p>
          <p className="text-gray-700 mt-1 italic">{person.role}</p>
          <p className="text-md text-gray-500 mt-4 max-w-sm">{person.note}</p>
        </div>
      </motion.div>
    ))}
  </div>

  {/* Committee Chair */}
  <motion.div
    className="bg-white rounded-3xl border border-gray-200 shadow-md p-10 max-w-xl mx-auto text-center mb-16"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.5 }}
  >
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 mb-5 rounded-full border-4 border-[#0F2C59] overflow-hidden hover:scale-105 transition-transform duration-300">
        <img src="/assets/BOSAN/paul-usoro.png" alt="Paul Usoro, SAN" className="w-full h-full object-cover" />
      </div>
      <h4 className="text-xl font-semibold text-[#0F2C59]">Paul Usoro, SAN</h4>
      <p className="text-gray-700 mt-1 italic">Chairman, BOSAN Leadership Committee</p>
    </div>
  </motion.div>

  {/* BOSAN Officers */}
  <h4 className="font-playfair text-2xl md:text-3xl font-bold text-[#0F2C59] text-center mb-10">BOSAN Officers</h4>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
    {[
      {
        name: "Olumide Sofowora, SAN, CArb",
        role: "Secretary",
        img: "/assets/BOSAN/olumide-sofowora.jpg"
      },
      {
        name: "Oladipo Olasope, SAN",
        role: "Assistant Secretary",
        img: "/assets/BOSAN/oladipo-olasope.jpg"
      },
      {
        name: "Abimbola Akeredolu, SAN, FCIArb",
        role: "Treasurer",
        img: "/assets/BOSAN/abimbola-akeredolu.png"
      },
      {
        name: "Jean Chiazor Anishere, SAN, FCIArb",
        role: "Financial Secretary",
        img: "/assets/BOSAN/jean.jpg"
      }
    ].map((officer, i) => (
      <motion.div
        key={i}
        className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + i * 0.1 }}
      >
        <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#D4AF37] hover:scale-105 transition-transform duration-300">
          <img src={officer.img} alt={officer.name} className="w-full h-full object-cover" />
        </div>
        <h5 className="text-lg font-medium text-[#0F2C59]">{officer.name}</h5>
        <p className="text-md text-gray-600 mt-1">{officer.role}</p>
      </motion.div>
    ))}
  </div>
  <motion.div
    className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-lg mx-auto text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 1 }}
  >
    <div className="flex flex-col items-center">
      <div className="w-28 h-28 mb-4 rounded-full border-2 border-[#0F2C59] overflow-hidden hover:scale-105 transition-transform duration-300">
        <img src="/assets/BOSAN/abdul.jpg" alt="Abdul Mohammed, SAN, FCIArb" className="w-full h-full object-cover" />
      </div>
      <h5 className="text-xl font-bold text-[#0F2C59]">Abdul Mohammed, SAN, FCIArb</h5>
      <p className="text-[#343A40]/80 mt-1">Programming and Publicity Secretary</p>
    </div>
  </motion.div>
</motion.section>

        {/* Aims and Objectives Section */}
        <motion.div
          className="mt-16 text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h3 className="font-playfair text-2xl font-bold text-[#0F2C59] mb-6 relative">
            Aims and Objectives
            <span className="absolute bottom-[-10px] left-0 w-20 h-[3px] bg-[#D4AF37]"></span>
          </h3>
          
          <div className="grid grid-cols-1 gap-6 mt-8">
            <motion.div 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.ul className="space-y-4" variants={staggerChildren}>
                <motion.li className="flex items-start" variants={fadeIn}>
                  <svg className="w-5 h-5 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>To promote professional responsibility amongst members and to maintain and defend the professional integrity of the members of the Body.</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeIn}>
                  <svg className="w-5 h-5 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>To promote the independence of the judiciary, the rule of law, the highest professional standards of legal practice, legal education, and the advancement of advocacy and jurisprudence.</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeIn}>
                  <svg className="w-5 h-5 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>To maintain the highest standards of professional ethics, conduct, etiquette, and discipline.</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeIn}>
                  <svg className="w-5 h-5 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>To establish supportive relationships with the Nigerian Bar Association, the Body of Benchers, the Council of Legal Education, the National Judicial Council, the Legal Practitioners' Privileges Committee, and the Disciplinary Committee of the Legal Profession and with International Bodies sharing similar objectives of the Body.</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeIn}>
                  <svg className="w-5 h-5 text-[#D4AF37] mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>To ensure and maintain the dignity of the rank of Senior Advocate of Nigeria.</span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/members">
            <Button className="bg-transparent border border-[#0F2C59] text-[#0F2C59] text-lg font-montserrat font-medium py-8 px-8 rounded-md hover:bg-[#0F2C59] hover:text-white transition duration-300">
              Our Disinguished Members
            </Button>
          </Link>
        </motion.div>


      </div>
    </section>
  );
};

export default About;