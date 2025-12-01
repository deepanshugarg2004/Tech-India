import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Rocket, Target, Sparkles } from "lucide-react";
import img1 from "../assets/mentor.png";
import img2 from "../assets/s2.jpg";
import img3 from "../assets/s3.jpg";

export default function About() {
	return (
		<div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#F8F7FF] to-white overflow-hidden text-gray-900">
			{/* ambient blobs */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 opacity-30 blur-3xl animate-blob" />
				<div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-300 to-cyan-300 opacity-25 blur-3xl animate-blob animation-delay-2000" />
			</div>

			{/* HERO */}
			<section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
				<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
					<p className="text-xs uppercase font-semibold text-purple-600 tracking-widest">About Us</p>
					<h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight">
						Building learners into <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">builders</span>
					</h1>
					<p className="mt-4 text-gray-600 max-w-xl">We are a mentor-led learning community. Our mission is to connect passionate students with experienced mentors to ship real projects, together.</p>
					<div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-600"><Sparkles className="w-4 h-4 text-purple-600"/> Trusted by 1,000+ learners</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex justify-center">
					<div className="relative w-[320px] sm:w-[420px]">
						<img src={img1} alt="team" className="rounded-2xl shadow-2xl" />
						<div className="absolute -left-4 -top-4 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs shadow">Mentor-led</div>
						<div className="absolute right-2 -bottom-4 bg-white/80 px-3 py-2 rounded-lg shadow text-sm">Live cohorts • Projects</div>
					</div>
				</motion.div>
			</section>

			{/* MISSION */}
			<section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
				<div className="rounded-2xl bg-white p-6 shadow border border-purple-50">
					<Heart className="w-6 h-6 text-pink-500"/>
					<h3 className="mt-3 font-semibold text-lg">Our mission</h3>
					<p className="mt-2 text-gray-600 text-sm">Make high-quality mentorship accessible to every motivated learner through community, collaboration, and shipping.</p>
				</div>
				<div className="rounded-2xl bg-white p-6 shadow border border-purple-50">
					<Target className="w-6 h-6 text-purple-600"/>
					<h3 className="mt-3 font-semibold text-lg">What we value</h3>
					<p className="mt-2 text-gray-600 text-sm">Clarity, kindness, and momentum. We focus on real outcomes and steady progress, not vanity metrics.</p>
				</div>
				<div className="rounded-2xl bg-white p-6 shadow border border-purple-50">
					<Rocket className="w-6 h-6 text-indigo-600"/>
					<h3 className="mt-3 font-semibold text-lg">How we work</h3>
					<p className="mt-2 text-gray-600 text-sm">Live sessions, async feedback, and peer groups. Learn by building with guidance from people who’ve done it.</p>
				</div>
			</section>

			{/* TEAM */}
			<section className="max-w-7xl mx-auto px-6 py-10">
				<h2 className="text-2xl font-bold text-center">Meet the team</h2>
				<p className="text-center text-gray-600">A small team with a big heart.</p>
				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					<div className="bg-white rounded-2xl p-6 shadow">
						<img src={img2} alt="member" className="w-24 h-24 rounded-full object-cover mx-auto shadow" />
						<h4 className="mt-4 font-semibold text-center">Aarav Gupta</h4>
						<p className="text-sm text-gray-600 text-center">Founder • Mentor</p>
					</div>
					<div className="bg-white rounded-2xl p-6 shadow">
						<img src={img3} alt="member" className="w-24 h-24 rounded-full object-cover mx-auto shadow" />
						<h4 className="mt-4 font-semibold text-center">Meera Shah</h4>
						<p className="text-sm text-gray-600 text-center">Program Lead</p>
					</div>
					<div className="bg-white rounded-2xl p-6 shadow">
						<img src={img1} alt="member" className="w-24 h-24 rounded-full object-cover mx-auto shadow" />
						<h4 className="mt-4 font-semibold text-center">Dev Mentor</h4>
						<p className="text-sm text-gray-600 text-center">Senior Mentor</p>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="max-w-7xl mx-auto px-6 pb-16 pt-4">
				<div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
					<div>
						<h3 className="text-2xl font-bold">Join the community</h3>
						<p className="mt-1 opacity-90">Learn with mentors, ship projects, and grow faster.</p>
					</div>
					<div className="flex gap-3">
						<a href="/role" className="px-5 py-3 rounded-lg bg-white text-purple-600 font-semibold">Become a member</a>
						<a href="/contact" className="px-5 py-3 rounded-lg bg-white/20 backdrop-blur">Contact us</a>
					</div>
				</div>
			</section>

			<style>{`
				@keyframes blob { 0% { transform: translateY(0px) } 50% { transform: translateY(16px) } 100% { transform: translateY(0px) } }
				.animate-blob { animation: blob 7s ease-in-out infinite }
				.animation-delay-2000 { animation-delay: 2s }
			`}</style>
		</div>
	);
}






