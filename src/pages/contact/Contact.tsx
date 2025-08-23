import React, { useState } from 'react';
import { RestClient } from '../../RestClient';
import './Contact.css';

// for backend api
interface ContactMessage {
  fullName: string;
  pronouns?: string;
  email: string;
  company?: string;
  websiteOrProfile?: string;
  dueDate?: string;
  budget?: string;
  message: string;
}

// for react form state
interface FormData { 
  fullName: string;
  pronouns: string;
  email: string;
  company: string;
  website: string;
  dueDate: string;
  budget: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    pronouns: '',
    email: '',
    company: '',
    website: '',
    dueDate: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const contactData: ContactMessage = {
        fullName: formData.fullName,
        pronouns: formData.pronouns || undefined,
        email: formData.email,
        company: formData.company || undefined,
        websiteOrProfile: formData.website || undefined,
        dueDate: formData.dueDate || undefined,
        budget: formData.budget || undefined,
        message: formData.message
      };

      await RestClient.submitContactForm(contactData);
      setSubmitStatus('success');
      
      // reset form once submitted
      setFormData({
        fullName: '',
        pronouns: '',
        email: '',
        company: '',
        website: '',
        dueDate: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>CONTACT</h1>
        <p>
          Say hi, ask a question, or email me<br />
          directly at <a href="mailto:annierong302@gmail.com" className="email-link">annierong302@gmail.com</a>
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="success-message">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="error-message">
          Sorry, there was an error sending your message. Please try again or email directly.
        </div>
      )}

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pronouns">Pronouns</label>
            <input
              type="text"
              id="pronouns"
              name="pronouns"
              value={formData.pronouns}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            <div className="helper-text">if applicable</div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="website">Website/Social Media Platform</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dueDate">Approximate Project Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
            <div className="helper-text">typical engagements are 3 months+</div>
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value="">$20K+</option>
              <option value="20k-50k">$20K - $50K</option>
              <option value="50k-100k">$50K - $100K</option>
              <option value="100k+">$100K+</option>
              <option value="discuss">Let's discuss</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'SENDING...' : 'SEND'}
          </button>
        </div>
      </form>

      <div className="decorative-element"></div>
    </div>
  );
};

export default Contact;