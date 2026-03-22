"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface ContactFormProps {
  dict: {
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("_honeypot")) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-strong rounded-2xl p-10 text-center border-green/20">
        <CheckCircle size={48} className="mx-auto text-green mb-4" />
        <p className="text-white font-medium">{dict.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-6 space-y-4">
      <input type="text" name="_honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

      <input
        name="name"
        type="text"
        required
        placeholder={dict.name}
        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue/50 focus:ring-1 focus:ring-blue/20 transition-all"
      />
      <input
        name="email"
        type="email"
        required
        placeholder={dict.email}
        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue/50 focus:ring-1 focus:ring-blue/20 transition-all"
      />
      <input
        name="phone"
        type="tel"
        placeholder={dict.phone}
        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue/50 focus:ring-1 focus:ring-blue/20 transition-all"
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder={dict.message}
        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue/50 focus:ring-1 focus:ring-blue/20 transition-all resize-none"
      />

      {status === "error" && (
        <div className="flex items-center gap-2 text-red text-sm">
          <AlertCircle size={14} />
          {dict.error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full flex items-center justify-center gap-2.5 bg-blue hover:bg-blue-dark disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue/20"
      >
        <Send size={16} />
        {status === "sending" ? dict.sending : dict.send}
      </button>
    </form>
  );
}
