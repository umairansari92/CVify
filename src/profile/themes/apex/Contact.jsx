import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { tokens } from "./tokens";

const schema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().required("Email is required").email("Enter a valid email address"),
  subject: yup.string().optional(),
  message: yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
});

const Contact = ({ user, handleContactSubmit, isSending }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (data) => {
    handleContactSubmit?.(data);
    reset();
  };

  const email = user?.email || user?.contact?.email || "";

  const inputStyle = {
    backgroundColor: tokens.colors.bg,
    borderColor: tokens.colors.border,
    color: tokens.colors.primary,
  };

  const focusStyle =
    "outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500";

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="max-w-3xl mx-auto px-6 w-full relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
          >
            Contact Us
          </h2>
          <p className="text-sm font-medium uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
            Let's Build Something Amazing
          </p>
          <div className="h-1 w-20 rounded-full mx-auto" style={{ backgroundColor: tokens.colors.accent }}></div>
          <p className="text-base pt-2" style={{ color: tokens.colors.secondary }}>
            Feel free to reach out for collaborations, opportunities, or just a hello!
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl border p-8 space-y-6"
          style={{
            backgroundColor: tokens.colors.surface,
            borderColor: tokens.colors.border,
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: tokens.colors.accent }}>
                Name
              </label>
              <input
                id="apex-contact-name"
                type="text"
                placeholder="Your name"
                {...register("name")}
                className={`w-full rounded-xl px-4 py-3 text-sm border transition-all duration-200 ${focusStyle}`}
                style={inputStyle}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: tokens.colors.accent }}>
                Email
              </label>
              <input
                id="apex-contact-email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className={`w-full rounded-xl px-4 py-3 text-sm border transition-all duration-200 ${focusStyle}`}
                style={inputStyle}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: tokens.colors.accent }}>
              Subject <span style={{ color: tokens.colors.secondary }}>(Optional)</span>
            </label>
            <input
              id="apex-contact-subject"
              type="text"
              placeholder="Subject of your message"
              {...register("subject")}
              className={`w-full rounded-xl px-4 py-3 text-sm border transition-all duration-200 ${focusStyle}`}
              style={inputStyle}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: tokens.colors.accent }}>
              Message
            </label>
            <textarea
              id="apex-contact-message"
              rows={5}
              placeholder="Write your message here..."
              {...register("message")}
              className={`w-full rounded-xl px-4 py-3 text-sm border transition-all duration-200 resize-none ${focusStyle}`}
              style={inputStyle}
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending}
            className="w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-teal-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: tokens.colors.accent }}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>

          {/* Contact Email Info */}
          {email && (
            <p className="text-center text-sm" style={{ color: tokens.colors.secondary }}>
              Or email directly:{" "}
              <a
                href={`mailto:${email}`}
                className="underline transition-colors"
                style={{ color: tokens.colors.accent }}
              >
                {email}
              </a>
            </p>
          )}
        </form>

      </div>
    </section>
  );
};

export default Contact;
