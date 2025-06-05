"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ExternalLink, Users, Video, Ticket } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const events = [
  {
    title: "BOSAN Annual General Meeting",
    date: "2025-06-15", // Use ISO format for proper date handling
    location: "Ibadan, Nigeria",
    venue: "International Conference Center",
    img: "/assets/events/agm.jpeg",
    desc: "An elegant evening celebrating legal excellence, legacy, and community.",
    status: "upcoming", // upcoming, live, past, cancelled
    capacity: 500,
    registrationRequired: true,
    price: "Free for members",
    links: [
      { title: "Register Now", url: "#register", type: "registration" },
      { title: "Event Details", url: "#details", type: "info" }
    ],
    tags: ["Annual", "Networking", "Members Only"]
  },
  {
    title: "50 Years Celebration of the Rank of Senior Advocates of Nigeria",
    date: "TBD",
    location: "TBD",
    venue: "Transcorp Hilton",
    img: "/assets/events/50.jpg",
    desc: "Top legal minds gather to discuss transformative reforms and justice trends.",
    status: "upcoming",
    capacity: 1000,
    registrationRequired: true,
    price: "₦50,000",
    links: [
      { title: "Book Tickets", url: "#tickets", type: "ticket" },
      { title: "Program Schedule", url: "#program", type: "info" }
    ],
    tags: ["Milestone", "Celebration", "Historic"]
  },
  {
    title: "2025 BOSAN Scholarship Awards for Law Students",
    date: "TBD", // To Be Determined
    location: "TBD",
    venue: "Oriental Hotel, VI",
    img: "/assets/events/scholarship.webp",
    desc: "A vibrant morning of mentorship and intergenerational dialogue in the legal field.",
    status: "upcoming",
    capacity: "TBD",
    registrationRequired: true,
    price: "Coming Soon",
    links: [
      { title: "Expression of Interest", url: "#interest", type: "info" }
    ],
    tags: ["Scholarship", "Students", "Awards"]
  },
  {
    title: "Mandatory Induction Programme for new Senior Advocates of Nigeria",
    date: "TBD",
    location: "TBD",
    venue: "Oriental Hotel, VI",
    img: "/assets/events/member.jpg",
    desc: "A vibrant morning of mentorship and intergenerational dialogue in the legal field.",
    status: "live", // Currently happening
    capacity: 200,
    registrationRequired: true,
    price: "₦25,000",
    links: [
      { title: "Join Live Stream", url: "#stream", type: "live" },
      { title: "Download Materials", url: "#materials", type: "resource" }
    ],
    tags: ["Induction", "Mandatory", "New SANs"]
  },
  {
    title: "BOSAN 2025 Annual Dinner,",
    date: "TBD", // Past event
    location: "TBD",
    venue: "TBD",
    img: "/assets/events/dinner.jpg",
    desc: "Exploring the future of legal practice with technology integration.",
    status: "past",
    capacity: "TBD",
    registrationRequired: false,
    price: "Free",
    links: [
      { title: "View Recordings", url: "#recordings", type: "resource" },
      { title: "Download Presentations", url: "#presentations", type: "resource" }
    ],
    tags: ["Technology", "Innovation", "Future"]
  }
];

const getEventStatus = (dateStr, currentStatus) => {
  if (dateStr === "TBD" || dateStr === "Coming Soon") return "upcoming";
  if (currentStatus === "live" || currentStatus === "cancelled") return currentStatus;
  
  const eventDate = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  
  if (eventDay < today) return "past";
  if (eventDay.getTime() === today.getTime()) return "live";
  return "upcoming";
};

const getStatusIcon = (status) => {
  switch (status) {
    case "live":
      return <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>;
    case "upcoming":
      return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
    case "past":
      return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
    case "cancelled":
      return <div className="w-3 h-3 bg-red-600 rounded-full"></div>;
    default:
      return <div className="w-3 h-3 bg-blue-500 rounded-full"></div>;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "live": return "Live Now";
    case "upcoming": return "Upcoming";
    case "past": return "Past Event";
    case "cancelled": return "Cancelled";
    default: return "Event";
  }
};

const formatDate = (dateStr) => {
  if (dateStr === "TBD" || dateStr === "Coming Soon") {
    return { day: "TBD", month: "" };
  }
  
  const date = new Date(dateStr);
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return { day, month };
};

const getLinkIcon = (type) => {
  switch (type) {
    case "registration": return <Users className="w-4 h-4" />;
    case "ticket": return <Ticket className="w-4 h-4" />;
    case "live": return <Video className="w-4 h-4" />;
    case "resource": return <ExternalLink className="w-4 h-4" />;
    default: return <ExternalLink className="w-4 h-4" />;
  }
};

export default function UpcomingEvents() {
  return (
    <motion.section
      className="py-12 px-4 md:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <h3 className="font-primary text-3xl font-bold text-black text-center relative mb-12">
        Events
        <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-[3px] bg-[#D4AF37]"></span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event, index) => {
          const { day, month } = formatDate(event.date);
          const status = getEventStatus(event.date, event.status);
          
          return (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                  {getStatusIcon(status)}
                  <span className="text-xs font-semibold text-gray-700">{getStatusText(status)}</span>
                </div>

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white shadow-md rounded-lg text-center min-w-[50px]">
                  {month && (
                    <div className="bg-[#D4AF37] text-white text-xs font-bold py-1 rounded-t-lg px-2">
                      {month.toUpperCase()}
                    </div>
                  )}
                  <div className="text-black font-bold text-lg py-2 px-2">
                    {day}
                  </div>
                </div>

                {/* Live Streaming Indicator */}
                {status === "live" && (
                  <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    🔴 LIVE
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* <div className="flex flex-wrap gap-2 mb-3">
                  {event.tags?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div> */}

                <h4 className="font-primary text-xl font-bold text-black mb-3 line-clamp-2">{event.title}</h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-lg font-secondary">{event.location}</span>
                  </div>
                  
                  {/* {event.venue !== "TBD" && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-4 h-4 flex items-center justify-center">📍</span>
                      <span>{event.venue}</span>
                    </div>
                  )} */}

                  {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Capacity: {event.capacity}</span>
                  </div> */}
{/* 
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-4 h-4 flex items-center justify-center">💰</span>
                    <span>{event.price}</span>
                  </div> */}
                </div>

                {/* <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{event.desc}</p> */}

                {/* Action Links */}
                {/* {event.links && event.links.length > 0 && (
                  <div className="space-y-2">
                    {event.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors hover:underline ${
                          link.type === "live" 
                            ? "text-red-600 hover:text-red-700" 
                            : link.type === "registration" || link.type === "ticket"
                            ? "text-[#D4AF37] hover:text-[#b6952f]"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        {getLinkIcon(link.type)}
                        {link.title}
                      </a>
                    ))}
                  </div>
                )} */}

                {/* Registration Status */}
                {/* {event.registrationRequired && status === "upcoming" && (
                  <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                    <p className="text-sm text-yellow-700 font-medium">
                      ⚠️ Registration Required
                    </p>
                  </div>
                )} */}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <a 
          href="/events" 
          className="bg-black hover:bg-[#b6952f] transition-colors text-white text-lg font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl inline-flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          View All Events
        </a>
      </div>
    </motion.section>
  );
}