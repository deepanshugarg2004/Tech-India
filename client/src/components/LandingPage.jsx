// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";
// import { Users, Presentation, MessageCircle } from "lucide-react";
// import { Award, Star } from "lucide-react";
// import img1 from "../assets/img1.png";
// import img2 from "../assets/img2.png";

// import img3 from "../assets/section1.png";
// import icon1 from "../assets/icon1.png";
// import icon2 from "../assets/icon2.png";
// const features = [
//   {
//     title: "For Student",
//     description: "Join Groups, ask doubts, chat with peers.",
//     icon: <Users className="w-10 h-10 text-purple-600" />,
//   },
//   {
//     title: "For Mentor",
//     description: "Create groups, guide students, provide resources.",
//     icon: <Presentation className="w-10 h-10 text-purple-600" />,
//   },
//   {
//     title: "Real-time Chat",
//     description: "Individuals & group communication with instant updates.",
//     icon: <MessageCircle className="w-10 h-10 text-purple-600" />,
//   },
// ];

// const faqs = [
//   {
//     question: "What is TechLearn Hub?",
//     answer:
//       "TechLearn Hub is an online learning platform connecting students with mentors to learn technology through structured content and community support.",
//   },
//   {
//     question: "Who is this platform for?",
//     answer:
//       "It’s for students, professionals, and anyone passionate about improving their technical skills with guidance from industry experts.",
//   },
//   {
//     question: "Who are the mentors on TechLearn Hub?",
//     answer:
//       "Our mentors are experienced professionals from various industries, carefully selected for their expertise and teaching ability.",
//   },
//   {
//     question: "How is content quality controlled on TechLearn Hub?",
//     answer:
//       "All content undergoes a strict review process by mentors and admins to ensure accuracy, clarity, and up-to-date information.",
//   },
//   {
//     question: "What features can students use?",
//     answer:
//       "Students can access courses, join community discussions, track progress, and interact with mentors directly through the platform.",
//   },
// ];

// const LandingPage = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <>

//    <section className="w-full h-[700px] flex relative overflow-hidden flex-row">
//   <div className="w-[68%] text-4xl lg:text-7xl p-20">
//     <img src={icon2} className="absolute w-[60px] left-[800px] top-[50px] h-[60px]" alt="iconimg" />
//     <p className=" font-['Montserrat'] font-bold">Connecting <span className="text-[#7638E8]">Students</span> and <span className="text-[#7638E8]">Mentors</span> for real time collaborative Learning <span><img className="inline-block w-[75px] h-[75px]" src={icon1} alt="iconimg" /></span></p>
//     <p className="text-[1rem] mt-10 lg:text-[1.4rem]">
// “Join a vibrant network where students, mentors, and admins connect in real-time groups and private chats. Collaborate, exchange knowledge, and build meaningful connections that inspire growth.”
// </p>
// <button className="bg-[#7638E8] text-[1rem] lg:text-[1.4rem] text-white p-3 rounded-lg">Get Started</button>
//   </div>
//   <div className="w-[50%] relative flex justify-center items-center">
//     <div className="absolute w-[750px] h-[750px] -top-[80px] right-[-160px] border-[12px] rounded-full border-[#7638E8] flex justify-center items-center">
//       <img className="w-[80%] h-[80%] mr-20" alt="section1Img" src={img3} />
//     </div>
//   </div>
// </section>

//     <section className="relative bg-[#F3F6FF] py-16 px-4 sm:px-8 overflow-hidden">
//       <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-14">
        
//         {/* ---------- MENTOR CARD ---------- */}
//         <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full sm:w-[300px] text-center">
//           <div className="bg-[#EAD9FF] rounded-xl flex items-center justify-center">
//             <img
//               src={img1}
//               alt="Mentor"
//               className="w-56 h-56 object-contain mx-auto"
//             />
//           </div>
//           <h3 className="text-xl font-semibold mt-3 text-gray-800">Raj Aryan</h3>
//           {/* <p className="text-sm text-gray-500">Best Mentor</p> */}
//           <div className="absolute mt-2 ml-20 transform -translate-x-1/2 bg-gradient-to-r from-purple-700 to-purple-500 text-white px-4 py-1 text-sm rounded-full shadow-md flex items-center gap-1">
//             <Award className="w-4 h-4" /> Best Mentor · 12 Awards
//           </div>
//         </div>

//         {/* ---------- CENTER TEXT & CONNECTOR ---------- */}
//         <div className="relative flex flex-col items-center text-center max-w-xl px-2">
//           {/* Curved dotted line */}
//           <svg
//             viewBox="0 0 400 200"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="absolute hidden lg:block w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//           >
//             <path
//               d="M10 150 C150 50, 250 50, 390 150"
//               stroke="#C7A4FF"
//               strokeWidth="3"
//               strokeDasharray="8 10"
//             />
//           </svg>

//           {/* Top paragraph */}
//           <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
//             As a mentor, you have the power to inspire, guide, and shape the
//             future of eager learners. Our platform allows you to share knowledge,
//             connect with motivated students, and build meaningful relationships
//             that go beyond classrooms.
//           </p>

//           {/* Middle icon */}
//           <div className="mt-6 flex items-center justify-center">
//             <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-purple-300 bg-white shadow-sm">
//               <span className="text-2xl">🤝</span>
//             </div>
//           </div>

//           {/* Bottom paragraph */}
//           <p className="text-gray-700 text-base sm:text-lg mt-6 leading-relaxed">
//             Learning becomes more powerful when guided by the right mentor. Here,
//             students can connect with experienced teachers, gain practical skills,
//             and receive constant motivation to achieve milestones.
//           </p>
//         </div>

//         {/* ---------- STUDENT CARD ---------- */}
//         <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full sm:w-[300px] text-center">
//           <div className="bg-[#E6E8FF] rounded-xl flex items-center justify-center">
//             <img
//               src={img2}
//               alt="Student"
//               className="w-56 h-56 object-contain mx-auto"
//             />
//           </div>
//           <h3 className="text-xl font-semibold mt-3 text-gray-800">Sameer Roy</h3>
//           {/* <p className="text-sm text-gray-500">Best Student </p> */}
//           <div className="absolute ml-20 transform -translate-x-1/2 bg-gradient-to-r from-purple-700 to-purple-500 text-white px-4 py-1 mt-2 text-sm rounded-full shadow-md flex items-center gap-1">
//             <Star className="w-4 h-4" /> Best Student· 80 Points
//           </div>
//         </div>
//       </div>
//     </section>


// {/* //    why join us section starts here */}

//  <section className="bg-[#F3F6FF] py-16 px-4 sm:px-8">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
//           Why <span className="text-purple-600">Join Us</span>
//         </h2>
//         <div className="w-24 h-1 bg-purple-400 mx-auto mt-2 rounded-full"></div>
//       </div>

//       {/* Card Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {features.map((feature, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center p-8 border border-gray-100"
//           >
//             <div className="mb-4 bg-purple-100 p-4 rounded-full">
//               {feature.icon}
//             </div>
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">
//               {feature.title}
//             </h3>
//             <p className="text-gray-600 text-sm sm:text-base">
//               {feature.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>

// {/* // why join ussection ends here */}




//     <section className="flex flex-col items-center bg-[#F3F6FF] py-12 px-4 sm:px-8">
//       <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
//         <span className="text-purple-600">Frequently</span> Ask Questions
//       </h2>

//       <div className="w-full max-w-3xl space-y-4">
//         {faqs.map((faq, index) => (
//           <div
//             key={index}
//             className="bg-purple-200 rounded-xl shadow-md transition-all"
//           >
//             <button
//               className="w-full flex justify-between items-center text-left p-4 sm:p-5 font-medium text-gray-900"
//               onClick={() => toggleFAQ(index)}
//             >
//               <span className="text-base sm:text-lg">
//                 {index + 1}. {faq.question}
//               </span>
//               <ChevronDown
//                 className={`w-5 h-5 transition-transform duration-300 ${
//                   openIndex === index ? "rotate-180 text-purple-600" : "text-gray-600"
//                 }`}
//               />
//             </button>

//             {/* Answer Section */}
//             <div
//               className={`overflow-hidden transition-all duration-300 ${
//                 openIndex === index ? "max-h-40 p-4 sm:p-5" : "max-h-0"
//               }`}
//             >
//               <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
//                 {faq.answer}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Contact Section */}
//       <div className="text-center mt-10">
//         <p className="text-gray-800 font-semibold">Still Have Questions?</p>
//         <p className="text-gray-600 mt-1">
//           Reach out to us at{" "}
//           <span className="text-purple-600 font-medium">tech@solution.com</span>{" "}
//           or call at{" "}
//           <span className="text-purple-600 font-medium">1800-123-5678</span>
//         </p>
//         <button className="mt-4 text-purple-700 hover:underline font-medium">
//           View All
//         </button>
//       </div>
//     </section>
//     </>
//   );
// };

// export default LandingPage;
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   ChevronDown,
//   Users,
//   Presentation,
//   MessageCircle,
//   Award,
//   Star,
// } from "lucide-react";
// import img1 from "../assets/img1.png";
// import img2 from "../assets/img2.png";
// import img3 from "../assets/section1.png";
// import icon1 from "../assets/icon1.png";
// import icon2 from "../assets/icon2.png";

// const features = [
//   {
//     title: "For Students",
//     description:
//       "Join groups, ask doubts, and connect instantly with mentors and peers.",
//     icon: <Users className="w-10 h-10 text-purple-500" />,
//   },
//   {
//     title: "For Mentors",
//     description:
//       "Create communities, share knowledge, and guide students toward excellence.",
//     icon: <Presentation className="w-10 h-10 text-purple-500" />,
//   },
//   {
//     title: "Real-Time Chat",
//     description:
//       "Seamless one-to-one and group communication — anytime, anywhere.",
//     icon: <MessageCircle className="w-10 h-10 text-purple-500" />,
//   },
// ];

// const faqs = [
//   {
//     question: "What is TechLearn Hub?",
//     answer:
//       "TechLearn Hub connects students and mentors for interactive, skill-based learning and community collaboration.",
//   },
//   {
//     question: "Who can use this platform?",
//     answer:
//       "Students, professionals, and tech enthusiasts eager to learn and grow together with expert mentors.",
//   },
//   {
//     question: "How are mentors selected?",
//     answer:
//       "Our mentors are verified professionals with proven industry experience and a passion for teaching.",
//   },
//   {
//     question: "Is TechLearn Hub free?",
//     answer:
//       "Yes! Basic community access is free. Mentorship sessions and premium learning modules are optional.",
//   },
// ];

// const LandingPage = () => {
//   const [openIndex, setOpenIndex] = useState(null);
//   const toggleFAQ = (i) => setOpenIndex(openIndex === i ? null : i);

//   return (
//     <div className="font-['Poppins'] relative overflow-hidden bg-[#F8F7FF] text-gray-900">
//       {/* 🔮 Floating gradient blobs for aura effect */}
//       <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-purple-400 opacity-30 blur-[160px] -z-10 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-400 opacity-30 blur-[160px] -z-10 animate-pulse delay-700"></div>

//       {/* 🌟 HERO SECTION */}
//       <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-20">
//         {/* Left Side */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="lg:w-1/2 space-y-6 mt-10 lg:mt-0"
//         >
//           <div className="flex items-center gap-2">
//             <img src={icon2} alt="icon" className="w-10 h-10 animate-spin-slow" />
//             <p className="text-purple-600 font-semibold tracking-widest text-sm uppercase">
//               Empower. Learn. Connect.
//             </p>
//           </div>

//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
//               Connecting Students
//             </span>{" "}
//             & Mentors for{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
//               Real-Time Learning
//             </span>
//           </h1>

//           <p className="text-gray-600 text-lg">
//             Collaborate, chat, and grow with an engaging network of learners and
//             mentors designed to elevate your tech journey.
//           </p>

//           <motion.button
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.95 }}
//             className="relative px-7 py-3 text-lg rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg hover:shadow-purple-300/40 transition-all"
//           >
//             Get Started →
//             <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 blur-xl opacity-50 -z-10"></span>
//           </motion.button>
//         </motion.div>

//         {/* Right Side Image */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//           className="lg:w-1/2 flex justify-center"
//         >
//           <div className="relative w-[320px] sm:w-[450px] lg:w-[550px] aspect-square rounded-full bg-gradient-to-tr from-purple-200 to-pink-100 flex justify-center items-center shadow-xl">
//             <img
//               src={img3}
//               alt="hero"
//               className="w-[80%] object-contain drop-shadow-[0_0_20px_rgba(118,56,232,0.4)]"
//             />
//             <div className="absolute inset-0 rounded-full border-[6px] border-dashed border-purple-300 animate-spin-slow"></div>
//           </div>
//         </motion.div>
//       </section>

//       {/* ✨ MENTOR-STUDENT CONNECTION */}
//       <section className="bg-white/70 backdrop-blur-md py-20 px-6">
//         <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
//           {/* Mentor */}
//           <motion.div
//             whileHover={{ y: -10 }}
//             className="relative bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-6 w-full sm:w-[300px] text-center"
//           >
//             <img src={img1} alt="mentor" className="w-48 h-48 mx-auto" />
//             <h3 className="text-xl font-semibold mt-3">Raj Aryan</h3>
//             <div className="absolute -top-3 right-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-1 text-xs rounded-full flex items-center gap-1 shadow-lg">
//               <Award className="w-3 h-3" /> Best Mentor
//             </div>
//           </motion.div>

//           {/* Connection Text */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="text-center max-w-md"
//           >
//             <p className="text-gray-700 text-lg leading-relaxed">
//               <span className="font-semibold text-purple-600">Mentorship</span>{" "}
//               turns potential into excellence. Build connections that transform
//               learning into lifelong growth.
//             </p>
//             <div className="text-4xl my-6 animate-bounce">🤝</div>
//             <p className="text-gray-700 text-lg">
//               <span className="text-pink-600 font-semibold">Students</span> gain
//               wisdom, motivation, and clarity from mentors who truly care.
//             </p>
//           </motion.div>

//           {/* Student */}
//           <motion.div
//             whileHover={{ y: -10 }}
//             className="relative bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-6 w-full sm:w-[300px] text-center"
//           >
//             <img src={img2} alt="student" className="w-48 h-48 mx-auto" />
//             <h3 className="text-xl font-semibold mt-3">Sameer Roy</h3>
//             <div className="absolute -top-3 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 text-xs rounded-full flex items-center gap-1 shadow-lg">
//               <Star className="w-3 h-3" /> Top Student
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* 🌈 WHY JOIN US */}
//       <section className="py-20 px-6 bg-gradient-to-b from-[#F9F7FF] to-[#F3F6FF]">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900">
//             Why <span className="text-purple-600">Join Us?</span>
//           </h2>
//           <div className="w-24 h-1 bg-purple-400 mx-auto mt-2 rounded-full"></div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
//           {features.map((f, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="relative p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-purple-100 shadow-lg hover:shadow-purple-300/50 transition-all text-center"
//             >
//               <div className="mb-4 bg-purple-100 p-4 rounded-full mx-auto w-fit">
//                 {f.icon}
//               </div>
//               <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
//               <p className="text-gray-600 text-sm">{f.description}</p>
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-500/10 to-pink-400/10 opacity-0 hover:opacity-100 transition-all"></div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ❓ FAQ Section */}
//       <section className="bg-[#F3F6FF] py-20 px-6 flex flex-col items-center">
//         <h2 className="text-4xl font-bold text-center mb-10">
//           <span className="text-purple-600">Frequently</span> Asked Questions
//         </h2>

//         <div className="w-full max-w-3xl space-y-4">
//           {faqs.map((faq, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//               className="bg-white rounded-xl shadow-md overflow-hidden"
//             >
//               <button
//                 onClick={() => toggleFAQ(i)}
//                 className="w-full flex justify-between items-center text-left p-5 font-medium text-gray-900"
//               >
//                 {i + 1}. {faq.question}
//                 <ChevronDown
//                   className={`w-5 h-5 transition-transform duration-300 ${
//                     openIndex === i ? "rotate-180 text-purple-600" : ""
//                   }`}
//                 />
//               </button>
//               <div
//                 className={`transition-all duration-500 overflow-hidden ${
//                   openIndex === i ? "max-h-40 p-5 pt-0" : "max-h-0"
//                 }`}
//               >
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {faq.answer}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="text-center mt-10">
//           <p className="text-gray-800 font-semibold">Still Have Questions?</p>
//           <p className="text-gray-600 mt-1">
//             Reach us at{" "}
//             <span className="text-purple-600 font-medium">
//               tech@solution.com
//             </span>{" "}
//             or call{" "}
//             <span className="text-purple-600 font-medium">1800-123-5678</span>
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Users,
  Presentation,
  MessageCircle,
  Award,
  Star,
  Check,
  Github,
  Mail,
} from "lucide-react";
// Import images - if they don't exist, the app will show errors in console
// but we'll handle it gracefully in the component
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/section1.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";

// Modern, single-file landing page component for TechLearn Hub
// Requires: tailwindcss, framer-motion, lucide-react

const features = [
  {
    title: "Groups & Communities",
    description: "Create or join focussed study groups and mentorship channels.",
    icon: <Users className="w-7 h-7" />,
  },
  {
    title: "Live Sessions",
    description: "Schedule live mentor sessions and interactive workshops.",
    icon: <Presentation className="w-7 h-7" />,
  },
  {
    title: "Real-time Chat",
    description: "1:1 and group chat with file sharing and code snippets.",
    icon: <MessageCircle className="w-7 h-7" />,
  },
  {
    title: "Verified Mentors",
    description: "Hand-picked industry mentors with proven track records.",
    icon: <Award className="w-7 h-7" />,
  },
  {
    title: "Track Progress",
    description: "Track learning milestones and earn badges.",
    icon: <Star className="w-7 h-7" />,
  },
];

const faqs = [
  { q: "Is TechLearn Hub free?", a: "Basic community features are free. Premium mentorship and bootcamps are paid." },
  { q: "How do I become a mentor?", a: "Apply through the mentor form and pass a short verification process." },
  { q: "Can I host paid workshops?", a: "Yes — mentors can create paid workshops and collect fees via integrated payments." },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen font-[Poppins] bg-gradient-to-b from-[#F8F7FF] to-white text-gray-900">
      {/* Top blobs */}
      <div className="pointer-events-none -z-10">
        <div className="absolute top-[-120px] left-[-120px] w-96 h-96 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 opacity-30 blur-3xl animate-blob" />
        <div className="absolute right-[-100px] bottom-[-120px] w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-300 to-cyan-300 opacity-25 blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon1 ? (
            <img src={icon1} alt="logo" className="w-12 h-12 rounded-lg shadow-md" />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 shadow-md" />
          )}
          <div>
            <h3 className="font-bold text-lg">TechLearn Hub</h3>
            <p className="text-xs text-gray-600 -mt-1">Learn • Connect • Grow</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a className="text-sm font-medium hover:text-purple-600" href="#features">Features</a>
          <a className="text-sm font-medium hover:text-purple-600" href="#mentors">Mentors</a>
          <a className="text-sm font-medium hover:text-purple-600" href="#faq">FAQ</a>
          <button onClick={() => navigate('/role')} className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">Sign In</button>
        </div>

        {/* Mobile menu placeholder */}
        <div className="md:hidden">
          <button className="p-2 rounded-lg bg-white/60 shadow">Menu</button>
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-12">
        <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
          <p className="text-sm uppercase text-purple-600 font-semibold">New · Live cohorts</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
            Build real projects with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">mentors</span> who care
          </h1>

          <p className="mt-5 text-gray-600 max-w-xl">Join a community of learners and mentors — get doubt support, live sessions, and hands-on projects. Perfect for interview prep and real-world skills.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button onClick={() => navigate('/role')} whileHover={{ scale: 1.03 }} className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg">Get Started</motion.button>
            <a href="#features" className="px-6 py-3 rounded-lg border border-gray-200">Explore Features</a>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg shadow">
              <Github className="w-5 h-5" />
              <div className="text-sm">Open-source projects</div>
            </div>
            <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg shadow">
              <Check className="w-5 h-5 text-green-500" />
              <div className="text-sm">Verified mentors</div>
            </div>
          </div>

          {/* Newsletter form */}
          <form className="mt-8 flex gap-3" onSubmit={(e)=>{e.preventDefault(); alert('Thanks — we will invite you on launch!'); setEmail('');}}>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your best email" className="px-4 py-3 rounded-lg border w-full max-w-sm focus:outline-none" required />
            <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white">Request Invite</button>
          </form>
        </motion.div>

        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="flex justify-center lg:justify-end">
          <div className="relative w-[360px] sm:w-[420px] lg:w-[520px]">
            <div className="rounded-2xl bg-white shadow-2xl p-6">
              {img3 ? (
                <img src={img3} alt="app" className="w-full rounded-lg" />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-gray-500">
                  App Preview
                </div>
              )}
            </div>
            <div className="absolute -left-6 -top-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg">Live Now</div>
            <div className="absolute right-2 bottom-4 bg-white/80 p-3 rounded-lg shadow">Preview • Community chat</div>
          </div>
        </motion.div>
      </header>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center">Why TechLearn Hub?</h2>
        <p className="text-center text-gray-600 mt-2">Tools and experiences tailored to turn practice into expertise.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((f, idx) => (
            <motion.div whileHover={{ y: -6 }} key={idx} className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-4 text-purple-600">{f.icon}</div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MENTOR-STUDENT CARDS */}
      <section id="mentors" className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-xl text-center">
            {img1 ? (
              <img src={img1} alt="mentor" className="mx-auto w-36 h-36 rounded-full object-cover shadow-lg" />
            ) : (
              <div className="mx-auto w-36 h-36 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg flex items-center justify-center text-white text-2xl font-bold">
                RA
              </div>
            )}
            <h4 className="mt-4 font-semibold">Raj Aryan</h4>
            <p className="text-sm text-gray-600 mt-2">Frontend Mentor • UI/UX</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white p-2 rounded-full shadow">Top Rated <Star className="w-4 h-4 text-yellow-400" /></div>
          </div>

          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold">What students say</h3>
            <p className="mt-3 text-gray-600">"The community helped me crack interviews — live mock sessions with mentors were a game changer."</p>
            <div className="mt-4 flex items-center gap-3">
              {img2 ? (
                <img src={img2} alt="student" className="w-16 h-16 rounded-full" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                  SR
                </div>
              )}
              <div>
                <div className="font-semibold">Sameer Roy</div>
                <div className="text-sm text-gray-600">Fullstack Student</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{f.q}</div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180 text-purple-600' : ''}`} />
              </button>
              <div className={`${open === i ? 'max-h-60 p-6' : 'max-h-0'} transition-all duration-300`}> 
                <p className="text-gray-600">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">Ready to level up?</h3>
            <p className="mt-2 opacity-90">Join TechLearn Hub and start building with mentors today.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 rounded-lg bg-white/20 backdrop-blur">Request Invite</button>
            <button onClick={() => navigate('/role')} className="px-5 py-3 rounded-lg bg-white text-purple-600 font-semibold">Get Started</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            {icon2 ? (
              <img src={icon2} alt="brand" className="w-12 h-12 rounded-lg" />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500" />
            )}
            <p className="mt-3 text-gray-600">TechLearn Hub — building learners into builders.</p>
          </div>
          <div className="text-sm text-gray-600">
            <div>Contact</div>
            <div className="mt-2 flex items-center gap-2"><Mail className="w-4 h-4"/> hello@techlearnhub.com</div>
            <div className="mt-1">Phone: 1800-123-5678</div>
          </div>
          <div className="text-sm text-gray-600">
            <div>Follow</div>
            <div className="mt-2 flex gap-3">
              <a className="hover:underline">Twitter</a>
              <a className="hover:underline">LinkedIn</a>
              <a className="hover:underline">GitHub</a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} TechLearn Hub. All rights reserved.</div>
      </footer>

      {/* small animation classes */}
      <style>{`
        @keyframes blob { 0% { transform: translateY(0px) } 50% { transform: translateY(18px) } 100% { transform: translateY(0px) } }
        .animate-blob{ animation: blob 6s ease-in-out infinite }
        .animation-delay-2000{ animation-delay: 2s }
      `}</style>
    </div>
  );
};

export default LandingPage;

