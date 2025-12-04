import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../constants';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = `Portfolio Contact from ${formState.name}`;
    const body = `${formState.message}%0D%0A%0D%0AFrom: ${formState.name}`;
    
    // Open email client
    window.location.href = `mailto:${PORTFOLIO_DATA.email}?subject=${subject}&body=${body}`;
    
    setFormState({ name: '', message: '' });
  };

  return (
    <section id="contact" className="py-8 relative overflow-hidden scroll-mt-24">
      {/* Decorative bg elements */}
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-[95%] mx-auto px-4">
        <div className="mb-10 text-center">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 transition-colors">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                />
              </div>
              
              <div className="group">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 transition-colors">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Hi Saron, I'd like to talk about..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 resize-none"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                ></textarea>
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