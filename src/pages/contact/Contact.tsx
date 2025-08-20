import React, { useState } from 'react';
import './Contact.css';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
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
            />
          </div>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit-btn">
            SEND
          </button>
        </div>
      </form>

      <div className="decorative-element"></div>
    </div>
  );
};

export default Contact;