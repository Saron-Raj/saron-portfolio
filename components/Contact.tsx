import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { PORTFOLIO_DATA } from '../constants';

// --- EMAILJS CONFIGURATION ---
const SERVICE_ID = "service_349zwf7"; 
const TEMPLATE_ID = "template_bpzjl83";
const PUBLIC_KEY = "JPxXCiYN0RM03jDQg";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isTouched, setIsTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = (values: typeof formState) => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    
    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (values.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!values.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (values.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
    
    // Clear error for this field if user is typing
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id } = e.target;
    setIsTouched(prev => ({ ...prev, [id]: true }));
    const validationErrors = validate(formState);
    if (validationErrors[id as keyof typeof validationErrors]) {
      setErrors(prev => ({ ...prev, [id]: validationErrors[id as keyof typeof validationErrors] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const validationErrors = validate(formState);
    setErrors(validationErrors);
    setIsTouched({ name: true, email: true, message: true });

    if (Object.keys(validationErrors).length === 0) {
      setStatus('sending');

      try {
        // Prepare template parameters
        // We include user_*, from_*, and reply_to to ensure compatibility with most EmailJS template configurations
        const templateParams = {
          user_name: formState.name,
          user_email: formState.email,
          message: formState.message,
          to_name: PORTFOLIO_DATA.name,
          // Aliases to ensure it works regardless of template variable naming
          from_name: formState.name,
          from_email: formState.email,
          reply_to: formState.email, 
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setIsTouched({ name: false, email: false, message: false });

        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);

      } catch (error) {
        console.error("EmailJS Error:", error);
        setStatus('error');
      }
    }
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col pt-[33px] pb-[33px] relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Let's Connect</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            I'm currently available for freelance work and open to new opportunities. 
            If you have a project in mind or just want to say hi, send me a message!
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-xl h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Fill out the form to send an email directly to my inbox. I'll get back to you as soon as possible!
              </p>
              
              <div className="space-y-6">
                <a href={`mailto:${PORTFOLIO_DATA.email}`} className="flex items-center gap-4 hover:bg-white/10 p-3 rounded-lg transition-colors">
                  <div className="p-2 bg-white/20 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <span className="font-medium">{PORTFOLIO_DATA.email}</span>
                </a>
                
                <div className="flex items-center gap-4 p-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <span className="font-medium">{PORTFOLIO_DATA.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="md:col-span-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span className="font-medium">Message sent successfully! I'll reply soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span className="font-medium">Failed to send. Please check the API keys or try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 transition-colors">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-white focus:ring-2 outline-none transition-all placeholder-gray-400 ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  value={formState.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === 'sending'}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field - Added for auto-sending */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 transition-colors">Your Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-white focus:ring-2 outline-none transition-all placeholder-gray-400 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  value={formState.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === 'sending'}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errors.email}
                  </p>
                )}
              </div>
              
              {/* Message Field */}
              <div className="group">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 transition-colors">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Hi Saron, I'd like to talk about..."
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-white focus:ring-2 outline-none transition-all placeholder-gray-400 resize-none ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  value={formState.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === 'sending'}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errors.message}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 px-6 rounded-xl font-bold shadow-lg transition-all flex justify-center items-center gap-2 ${
                  status === 'sending'
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 text-white shadow-blue-500/20 hover:-translate-y-1 hover:shadow-xl'
                }`}
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;