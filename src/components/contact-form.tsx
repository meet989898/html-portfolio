"use client";

import { type FormEvent, useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setState("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(body.message || "The form could not be sent.");
      }

      setState("sent");
      setMessage("Message sent. I will reply as soon as I can.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please email me directly instead.");
    }
  }

  return (
    <form
      className="space-y-4 rounded-[1.8rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
      data-testid="contact-form"
      onSubmit={onSubmit}
    >
      <input autoComplete="off" className="hidden" name="company" tabIndex={-1} type="text" />
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input className="border-white/20 bg-white/10 text-white placeholder:text-white/40" id="name" name="name" placeholder="Your name" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input className="border-white/20 bg-white/10 text-white placeholder:text-white/40" id="email" name="email" placeholder="you@example.com" required type="email" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          className="min-h-32 border-white/20 bg-white/10 text-white placeholder:text-white/40"
          id="message"
          name="message"
          placeholder="What should we talk about?"
          required
        />
      </div>
      <Button className="w-full rounded-full bg-white text-black hover:bg-white/90" disabled={state === "sending"} type="submit">
        {state === "sending" ? "Sending..." : "Send message"}
        <Send className="size-4" />
      </Button>
      {message ? (
        <p className={`text-sm ${state === "sent" ? "text-emerald-200" : "text-amber-200"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
