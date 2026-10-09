import React, { useState } from 'react';
import { CheckCircle2, Laptop, Users, Briefcase, BookOpen } from 'lucide-react';
import { Button } from '../components/common/Button';

export const JoinPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    regNumber: '',
    year: 'Year 1',
    programme: 'BSc in Information & Communication Technology',
    email: '',
    phone: '',
    interests: '',
  });

  const benefits = [
    {
      icon: <Laptop size={20} className="text-[#1B6B35]" />,
      title: 'Practical Coding Bootcamps',
      desc: 'Free access to hands-on workshops covering modern web, mobile, cloud, AI, and cybersecurity stacks.',
    },
    {
      icon: <BookOpen size={20} className="text-[#1B6B35]" />,
      title: 'Exclusive Academic Archives',
      desc: 'Access verified past exams, solutions, lecture summaries, and textbook vaults.',
    },
    {
      icon: <Briefcase size={20} className="text-[#1B6B35]" />,
      title: 'Internship & Job Linkages',
      desc: 'Direct recommendations and placement connections with top tech employers and startups across Malawi.',
    },
    {
      icon: <Users size={20} className="text-[#1B6B35]" />,
      title: 'Vibrant Tech Community',
      desc: 'Collaborate with passionate peers on real software projects, open source, and national hackathons.',
    },
  ];

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
            Membership
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Join MUISA Today
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-3 font-normal">
            Become part of the official student tech community at Mzuzu University and unlock your digital potential.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Benefits (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1B6B35] mb-2">
                Why Join MUISA?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                MUISA is your launchpad to becoming a skilled, confident, and employable software engineer or tech leader.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="p-2.5 rounded-lg bg-white shadow-2xs shrink-0 self-start">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{b.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Registration Form (7 cols) */}
          <div className="lg:col-span-7 bg-gray-50 p-6 sm:p-10 rounded-2xl border border-gray-200">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-[#1B6B35] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Application Submitted!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Welcome to MUISA, <strong>{formData.fullName}</strong>! Your registration details have been recorded. You will receive a confirmation email and invitation to the official MUISA WhatsApp & Discord student channels.
                </p>
                <div className="pt-4">
                  <Button to="/" variant="gold-filled" size="md">
                    Return to Home
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-gray-200 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Student Membership Registration</h3>
                  <p className="text-xs text-gray-500">Please fill in your authentic student details.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Kondwani Chirwa"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Registration / Student ID *</label>
                    <input
                      type="text"
                      required
                      value={formData.regNumber}
                      onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                      placeholder="e.g. BIT/24/001"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Year of Study *</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                    >
                      <option value="Year 1">Year 1 (Freshman)</option>
                      <option value="Year 2">Year 2 (Sophomore)</option>
                      <option value="Year 3">Year 3 (Junior)</option>
                      <option value="Year 4">Year 4 (Senior)</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Study Programme *</label>
                    <input
                      type="text"
                      required
                      value={formData.programme}
                      onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. k.chirwa@mzuni.ac.mw"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+265 88X XXX XXX"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Technical Interests (Optional)</label>
                  <input
                    type="text"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    placeholder="e.g. Full-Stack Web, Flutter, Cybersecurity, Machine Learning"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B6B35]"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="gold-filled" size="md" showArrow fullWidth>
                    Complete Registration
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
