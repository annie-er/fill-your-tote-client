import React, { useState, useEffect } from 'react';
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
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // update bckaground when form is successfully submitted
  useEffect(() => {
    if (submitStatus === 'success') {
      document.body.classList.add('form-submitted');
      setIsFormSubmitted(true);
    }
  }, [submitStatus]);

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

  // if form submitted, don't render again
  if (isFormSubmitted) {
    return (
      <div className={`contact-page ${isFormSubmitted ? 'form-submitted' : ''}`}>
        {!isFormSubmitted ? (
          <form className="form-container" onSubmit={handleSubmit}>
            {/* form fields + submit button */}
          </form>
        ) : (
          <div className="success-content">
            <h1>Thank you!</h1>
            <p>I’ll be in touch soon!</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="contact-page">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-content">
          {submitStatus === 'error' && (
            <div className="error-message">
              Sorry, there was an error sending your message. Please try again.
            </div>
          )}

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

          <div className="form-group">
            <label htmlFor="website">Website/Social Media Handle</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                disabled={isSubmitting}
              >
                <option value="">Select budget range</option>
                <option value="<200">&lt;$200</option>
                <option value="200-350">$200 - $350</option>
                <option value="350-500">$350 - $500</option>
                <option value="500+">$500+</option>
                <option value="discuss">Let's discuss</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Approx. Project Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              <div className="helper-text">typical engagements are 2 months+</div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">I'd Like to Chat About</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="submit-container">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;