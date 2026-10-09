import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { topBarContact } from '../data/navigation';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-[#1B6B35] text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <span className="text-[#F5B83D] font-bold text-xs uppercase tracking-wider mb-2 block">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Contact MUISA
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3 font-normal">
            Have questions, sponsorship inquiries, partnership ideas, or need academic support? Reach out to our executive desk.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1B6B35] mb-3">
                We'd Love To Hear From You
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connect with the executive board for academic inquiries, guest speaker invitations, and technical collaborations.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-green-50 text-[#1B6B35] flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase">Official Phone</div>
                  <a href={topBarContact.phoneHref} className="font-bold text-gray-900 hover:text-[#1B6B35]">
                    {topBarContact.phone}
                  </a>
                  <div className="text-xs text-gray-500">Mon - Fri: 8:00 AM - 5:00 PM CAT</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#F5B83D] flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase">Official Email</div>
                  <a href={topBarContact.emailHref} className="font-bold text-gray-900 hover:text-[#1B6B35]">
                    {topBarContact.email}
                  </a>
                  <div className="text-xs text-gray-500">General & Academic Support Desk</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#1B6B35] flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase">Campus Office</div>
                  <p className="font-bold text-gray-900">Department of ICT, Faculty of STI</p>
                  <p className="text-xs text-gray-500">Mzuzu University Main Campus, Luwinga, P/Bag 201, Mzuzu 2, Malawi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-gray-50 p-6 sm:p-10 rounded-2xl border border-gray-200">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-100 text-[#1B6B35] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Message Received!</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  Thank you for reaching out. The MUISA Public Relations Officer will respond to your message shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="text-xs font-bold text-[#1B6B35] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Send a Direct Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Banda"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Partnership inquiry / Past papers access"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                  />
                </div>

                <Button type="submit" variant="green-filled" size="md" showArrow fullWidth>
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
