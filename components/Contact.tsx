import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../constants';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [isTouched, setIsTouched] = useState({ name: false, message: false });

  const validate = (values: typeof formState) => {
    const newErrors: { name?: string; message?: string } = {};
    
    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (values.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const validationErrors = validate(formState);
    setErrors(validationErrors);
    setIsTouched({ name: true, message: true });

    if (Object.keys(validationErrors).length === 0) {
      // Create mailto link
      const subject = `Portfolio Contact from ${formState.name}`;
      const body = `${formState.message}%0D%0A%0D%0AFrom: ${formState.name}`;
      
      // Open email client
      window.location.href = `mailto:${PORTFOLIO_DATA.email}?subject=${subject}&body=${body}`;
      
      setFormState({ name: '', message: '' });
      setErrors({});
      setIsTouched({ name: false, message: false });
    }
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col pt-28 pb-16 relative overflow-hidden">
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
                Fill out the form and I will click on the "Send Message" button to open your default email client.
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
            
            <div className="mt-12 flex gap-4">
               {/* Social placeholders could go here */}
            </div>
          </div>

          {/* Form Card */}
          <div className="md:col-span-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errors.name}
                  </p>
                )}
              </div>
              
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
                className="w-full py-4 px-6 rounded-xl bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 hover:shadow-xl flex justify-center items-center gap-2"
              >
                Send Message
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;