import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

export default function Contact() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("idle");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("submitting");
		setTimeout(() => {
			setStatus("success");
			setName("");
			setEmail("");
			setMessage("");
			setTimeout(() => setStatus("idle"), 2000);
		}, 900);
	};

	return (
		<div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#F8F7FF] to-white overflow-hidden">
			{/* ambient gradient blobs */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 opacity-30 blur-3xl animate-blob" />
				<div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-300 to-cyan-300 opacity-25 blur-3xl animate-blob animation-delay-2000" />
			</div>

			<div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2 items-start">
				{/* Left: Heading and info */}
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
					<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">Get in touch</span>
					</h1>
					<p className="mt-4 text-gray-600 max-w-md">We'd love to hear from you. Share feedback, ask questions, or just say hello — we usually respond within 24 hours.</p>

					<div className="mt-8 space-y-4 text-gray-700">
						<div className="flex items-center gap-3"><Mail className="w-5 h-5 text-purple-600"/> hello@techlearnhub.com</div>
						<div className="flex items-center gap-3"><Phone className="w-5 h-5 text-purple-600"/> +91-800-123-5678</div>
						<div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-purple-600"/> India • Remote-first</div>
					</div>

					<div className="mt-8 flex items-center gap-4 text-gray-700">
						<a className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow hover:shadow-md transition" href="#"><Github className="w-4 h-4"/> GitHub</a>
						<a className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow hover:shadow-md transition" href="#"><Linkedin className="w-4 h-4"/> LinkedIn</a>
					</div>
				</motion.div>

				{/* Right: Contact form card */}
				<motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative rounded-3xl bg-white/70 backdrop-blur-md border border-purple-100 shadow-xl p-6 sm:p-8">
					<div className="absolute -inset-x-6 -inset-y-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-[2rem] -z-10" />
					<div className="grid gap-5">
						<div>
							<label className="block text-sm font-medium text-gray-800 mb-2">Full name</label>
							<input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Jane Doe" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-500/20" required />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-800 mb-2">Email</label>
							<input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="jane@example.com" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-500/20" required />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-800 mb-2">Message</label>
							<textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={5} placeholder="How can we help?" className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-500/20 resize-y" required />
						</div>
						<button disabled={status === "submitting"} className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg transition disabled:opacity-60">
							<Send className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
							{status === "submitting" ? "Sending…" : status === "success" ? "Sent!" : "Send message"}
						</button>
					</div>

					{/* subtle decoration */}
					<div className="pointer-events-none absolute -z-10 -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400/60 to-pink-400/60 blur-2xl" />
				</motion.form>
			</div>

			<style>{`
				@keyframes blob { 0% { transform: translateY(0px) } 50% { transform: translateY(16px) } 100% { transform: translateY(0px) } }
				.animate-blob { animation: blob 7s ease-in-out infinite }
				.animation-delay-2000 { animation-delay: 2s }
			`}</style>
		</div>
	);
}






