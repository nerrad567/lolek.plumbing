"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

type Status = "idle" | "submitting" | "sending" | "success" | "error";

const stages: Record<string, { text: string; color: string }> = {
  submitting: { text: "Submitting...", color: "bg-blue" },
  sending: { text: "Sending...", color: "bg-blue" },
  success: { text: "", color: "bg-green" },
};

export default function ContactForm({ dict }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  // Animate through stages after server responds
  useEffect(() => {
    if (status === "sending") {
      const timer = setTimeout(() => setStatus("success"), 800);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

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
        setStatus("sending");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-solid p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
            >
              <CheckCircle size={48} className="mx-auto text-green mb-4" />
            </motion.div>
            <p className="text-light font-bold">{dict.success}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="card-solid p-6 space-y-4"
            exit={{ opacity: 0, y: -10 }}
          >
            <input type="text" name="_honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

            <input
              name="name"
              type="text"
              required
              placeholder={dict.name}
              disabled={status !== "idle" && status !== "error"}
              className="w-full bg-light/5 border border-light/8 rounded-sm px-4 py-3.5 text-light text-sm placeholder:text-light/25 focus:outline-none focus:border-blue/50 transition-all disabled:opacity-50"
            />
            <input
              name="email"
              type="email"
              required
              placeholder={dict.email}
              disabled={status !== "idle" && status !== "error"}
              className="w-full bg-light/5 border border-light/8 rounded-sm px-4 py-3.5 text-light text-sm placeholder:text-light/25 focus:outline-none focus:border-blue/50 transition-all disabled:opacity-50"
            />
            <input
              name="phone"
              type="tel"
              required
              placeholder={dict.phone}
              disabled={status !== "idle" && status !== "error"}
              className="w-full bg-light/5 border border-light/8 rounded-sm px-4 py-3.5 text-light text-sm placeholder:text-light/25 focus:outline-none focus:border-blue/50 transition-all disabled:opacity-50"
            />
            <textarea
              name="message"
              required
              rows={3}
              placeholder={dict.message}
              disabled={status !== "idle" && status !== "error"}
              className="w-full bg-light/5 border border-light/8 rounded-sm px-4 py-3.5 text-light text-sm placeholder:text-light/25 focus:outline-none focus:border-blue/50 transition-all resize-none disabled:opacity-50"
            />

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-red text-sm"
              >
                <AlertCircle size={14} />
                {dict.error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === "submitting" || status === "sending"}
              className="w-full relative overflow-hidden flex items-center justify-center gap-2.5 bg-blue hover:bg-blue-dark disabled:hover:bg-blue text-light font-bold py-4 rounded-sm transition-all"
            >
              <AnimatePresence mode="wait">
                {(status === "submitting" || status === "sending") ? (
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block"
                    >
                      <Send size={16} />
                    </motion.span>
                    {stages[status].text}
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Send size={16} />
                    {dict.send}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
