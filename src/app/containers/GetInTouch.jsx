"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, ExternalLink } from 'lucide-react';

const contactDetails = [
  { name: 'Email', icon: <Mail className="w-6 h-6 text-[#00d4aa]" />, value: 'akalankadamith2004@gmail.com', href: 'mailto:akalankadamith2004@gmail.com', ariaLabel: 'Email Damith Akalanka' },
  { name: 'WhatsApp', icon: <Phone className="w-6 h-6 text-[#00d4aa]" />, value: '+94 72 680 5029', href: 'https://wa.me/+94726805029', ariaLabel: 'Contact Damith Akalanka on WhatsApp' },
  { name: 'Location', icon: <MapPin className="w-6 h-6 text-[#00d4aa]" />, value: 'Colombo, Sri Lanka', href: '#', ariaLabel: 'Location: Colombo, Sri Lanka' },
  { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6 text-[#00d4aa]" />, value: 'Damith Akalanka', href: 'https://www.linkedin.com/in/damith-akalanka/', ariaLabel: 'Damith Akalanka\'s LinkedIn Profile' },
];

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Project details are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Submission to your email
      const formDataObj = new FormData();
      formDataObj.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'ca1ca930-03c4-4da2-9a5f-627f16cc2df3');
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('phone', formData.phone || 'Not provided');
      formDataObj.append('project_type', formData.projectType || 'Not specified');
      formDataObj.append('budget', formData.budget || 'Not specified');
      formDataObj.append('message', formData.message);
      formDataObj.append('subject', `New Contact Form Submission from ${formData.name}`);
      formDataObj.append('botcheck', '');
      formDataObj.append('redirect', 'false');

      // Confirmation to user's email
      const userFormDataObj = new FormData();
      userFormDataObj.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'ca1ca930-03c4-4da2-9a5f-627f16cc2df3');
      userFormDataObj.append('name', formData.name);
      userFormDataObj.append('email', formData.email); // This sets the reply-to email
      userFormDataObj.append('phone', formData.phone || 'Not provided');
      userFormDataObj.append('project_type', formData.projectType || 'Not specified');
      userFormDataObj.append('budget', formData.budget || 'Not specified');
      userFormDataObj.append('message', `Hi ${formData.name},

Thank you for submitting your project details! I've received your submission and will respond within 24 hours. Below are the details you provided:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Project Type: ${formData.projectType || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Message: ${formData.message}

Best regards,
Damith Akalanka
📧 akalankadamith2004@gmail.com
📱 +94 72 680 5029
🔗 linkedin.com/in/damith-akalanka`);
      userFormDataObj.append('subject', `Your Project Submission Confirmation`);
      userFormDataObj.append('botcheck', '');
      userFormDataObj.append('redirect', 'false');

      // Send to your email
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj,
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok || !(await response.json()).success) {
        throw new Error('Failed to send submission to your email');
      }

      // Send confirmation to user
      const userResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: userFormDataObj,
        headers: { 'Accept': 'application/json' }
      });

      if (!userResponse.ok || !(await userResponse.json()).success) {
        throw new Error('Failed to send confirmation to user');
      }

      // Success case
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrors({ form: 'Failed to send your message. Please try again or use the quick contact options.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendWhatsApp = () => {
    if (!formData.message.trim()) {
      setErrors({ message: 'Please provide project details before using WhatsApp.' });
      return;
    }
    const message = encodeURIComponent(`Hi Damith! I'm interested in discussing a project.

Project Type: ${formData.projectType || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Details: ${formData.message}`);
    window.open(`https://wa.me/+94726805029?text=${message}`, '_blank');
  };

  const sendEmail = () => {
    if (!formData.message.trim()) {
      setErrors({ message: 'Please provide project details before sending an email.' });
      return;
    }
    const subject = encodeURIComponent('Project Inquiry');
    const body = encodeURIComponent(`Hi Damith,

I'd like to discuss a project with you.

Details:
${formData.message}`);
    window.open(`mailto:akalankadamith2004@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="w-full px-4 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#0F0F23] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/5 left-1/5 w-2 h-2 bg-[#0070f3] rounded-full animate-pulse"></div>
        <div className="absolute top-2/5 right-1/4 w-1 h-1 bg-[#00d4aa] rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/5 left-2/5 w-1.5 h-1.5 bg-[#0070f3] rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-2/5 right-1/5 w-2 h-2 bg-[#00d4aa] rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto bg-[#1a1a2e]/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#0070f3]/30 shadow-xl transition-all duration-1000 opacity-100">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#00d4aa] mb-6 text-center">Get in Touch</h3>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 text-center max-w-3xl mx-auto">
          Ready to start your project? Let's discuss your requirements and create something amazing together.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 space-y-6">
            {contactDetails.map((detail) => (
              <a
                key={detail.name}
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-[#00d4aa] transition-all duration-300 transform hover:scale-105"
                aria-label={detail.ariaLabel}
              >
                {detail.icon}
                <span className="text-base sm:text-lg">{detail.value}</span>
              </a>
            ))}
            
            <div className="mt-8 space-y-3">
              <h4 className="text-lg font-semibold text-white mb-3">🚀 Quick Contact</h4>
              <button
                onClick={sendWhatsApp}
                className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                aria-label="Contact via WhatsApp"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp Direct</span>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </button>
              
              <button
                onClick={sendEmail}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                aria-label="Send an email"
              >
                <Mail className="w-5 h-5" />
                <span>Email Direct</span>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </button>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-2">⏰ Response Time</h4>
              <p className="text-gray-300">Within 24 hours</p>
              <p className="text-gray-300">Monday - Friday: 9AM - 6PM</p>
            </div>
          </div>

          <div className="flex-1 bg-[#1a1a2e]/50 p-6 sm:p-8 rounded-xl border border-[#0070f3]/20 shadow-lg">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-400">
                  ✅ Message sent successfully!
                  <br />📧 A confirmation email has been sent to your email.
                  <br />⏰ I'll respond within 24 hours.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400">
                  ❌ {errors.form || 'Failed to send your message. Please try again or use the quick contact options.'}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name * <span className="sr-only">(required)</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                  required
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="w-full bg-[#0F0F23]/50 border border-[#0070f3]/30 rounded-lg px-4 py-3 text-gray-300 focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/50 outline-none transition-all duration-300"
                />
                {errors.name && (
                  <p id="name-error" className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email * <span className="sr-only">(required)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full bg-[#0F0F23]/50 border border-[#0070f3]/30 rounded-lg px-4 py-3 text-gray-300 focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/50 outline-none transition-all duration-300"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone <span className="sr-only">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+94 70 123 4567"
                  className="w-full bg-[#0F0F23]/50 border border-[#0070f3]/30 rounded-lg px-4 py-3 text-gray-300 focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/50 outline-none transition-all duration-300"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full bg-[#0F0F23]/50 border border-[#0070f3]/30 rounded-lg px-4 py-3 text-gray-300 focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/50 outline-none transition-all duration-300"
                  >
                    <option value="">Select Type</option>
                    <option value="website">🌐 Website</option>
                    <option value="ecommerce">🛒 E-commerce</option>
                    <option value="webapp">⚡ Web App</option>
                    <option value="other">💡 Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">Budget (LKR)</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-[#0F0F23]/50 border border-[#0070f3]/30 rounded-lg px-4 py-3 text-gray-300 focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/50 outline-none transition-all duration-300"
                  >
                    <option value="">Select Budget</option>
                    <option value="25k-50k">25k - 50k</option>
                    <option value="50k-100k">50k - 100k</option>
                    <option value="100k-200k">100k - 200k</option>
                    <option value="200k+">200k+</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Details * <span className="sr-only">(required)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your project, timeline, and requirements..."
                  rows="4"
                  required
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="w-full bg-[#0F0F23]/50 border border-[#0070f3]/30 rounded-lg px-4 py-3 text-gray-300 focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/50 outline-none transition-all duration-300 resize-none"
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#0070f3] to-[#00d4aa] shadow-[0px_0px_20px_5px_rgba(0,212,170,0.3)] text-white px-6 py-4 font-bold text-lg rounded-2xl hover:shadow-[0px_0px_25px_8px_rgba(0,212,170,0.4)] transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
              
              <p className="text-center text-sm text-gray-400">
                🔒 Your information is secure • 24h response guaranteed
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;