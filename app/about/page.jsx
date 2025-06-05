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
          <h2 className="text-black font-bold text-3xl md:text-4xl mb-4">About BOSAN</h2>
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
              <h3 className="text-2xl font-bold text-black mb-4 relative">
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
              <h3 className="text-2xl font-bold text-black mb-4 relative">
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
              src="/hero/bosan4.jpg" 
              alt="BOSAN gathering" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <section className="bg-white py-28 px-6 sm:px-12 lg:px-20 text-slate-900">
  <div className="max-w-7xl mx-auto">
    {/* Heading */}
    <header className="text-center mb-24">
      <h2 className="text-5xl font-primary font-semibold tracking-tight">BOSAN Leadership</h2>
      <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
        The visionary leaders entrusted with guiding BOSAN’s mission and values.
      </p>
    </header>

    {/* Featured Leaders Grid */}
    <div className="grid gap-16 lg:grid-cols-2 mb-32">
      {[
        {
          name: "Prince Lateef Fagbemi, SAN",
          title: "Attorney General of the Federation",
          role: "Chairman, BOSAN",
          note: "As stipulated in Article 7 of the BOSAN Constitution.",
          img: "/assets/BOSAN/prince-Lateef-fagbemi.jpg"
        },
        {
          name: "Professor Alfred Bandele Kasunmu, SAN",
          title: "Most Senior SAN (since 1979)",
          role: "Vice-Chairman, BOSAN",
          note: "Succeeded Professor Ben Nwabueze, SAN (late).",
          img: "/assets/BOSAN/prof-alfred-bandele.jpg"
        }
      ].map((leader, i) => (
        <div key={i} className="p-8 rounded-2xl transition group">
          <img
            src={leader.img}
            alt={leader.name}
            className="w-full h-[360px] object-contain rounded-xl mb-6"
          />
          <div className="text-center font-primary">
            <h3 className="text-2xl font-semibold mb-1 group-hover:text-blue-700 transition">{leader.name}</h3>
            <p className="text-sm text-slate-500 mb-1">{leader.title}</p>
            <p className="text-sm italic text-slate-600 mb-3">{leader.role}</p>
            <p className="text-sm text-slate-700">{leader.note}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Committee Chair */}
    <div className="text-center mb-32">
      <img
        src="/assets/BOSAN/paul-usoro.png"
        alt="Paul Usoro, SAN"
        className="w-32 h-32 object-cover rounded-full mx-auto mb-5 shadow"
      />
      <h4 className="text-2xl font-primary font-semibold">Paul Usoro, SAN</h4>
      <p className="text-slate-500">Chairman, BOSAN Leadership Committee</p>
    </div>

    {/* Officers */}
    <section>
      <h4 className="text-3xl font-primary font-semibold mb-12 text-center">BOSAN Officers</h4>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          <div key={i} className="text-center bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <img
              src={officer.img}
              alt={officer.name}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />
            <h5 className="text-lg font-semibold">{officer.name}</h5>
            <p className="text-sm text-slate-500">{officer.role}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
</section>


        {/* Aims and Objectives Section */}
        <motion.div
          className="mt-16 text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h3 className="font-primary text-2xl font-bold text-[#0F2C59] mb-6 relative">
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
            <Button className="bg-transparent border border-[#0F2C59] text-[#0F2C59] text-lg font-secondary font-medium py-8 px-8 rounded-md hover:bg-[#0F2C59] hover:text-white transition duration-300">
              Our Disinguished Members
            </Button>
          </Link>
        </motion.div>


      </div>
    </section>
  );
};

export default About;