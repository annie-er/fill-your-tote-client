import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const processImagePath = "/assets/process.png";

  const faqData = [
    {
      id: 1,
      question: "Where does your business run?",
      answer: "Fill your tote! is based in Richmond Hill and serves customers in the Greater Toronto Area."
    },
    {
      id: 2,
      question: "How long do commissions take?",
      answer: "It usually takes about 1.5-2 months."
    },
    {
      id: 3,
      question: "Where have your totes been seen?",
      answer: "Fill your tote! has been seen at the City of Richmond Hill's Fire and Emergency Services' Project Blaze, Cozy Grotto, Mr. Surprise, CNE, and the Church Assembly in Toronto."
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollProgress = Math.max(0, 100 - (scrollY / (window.innerHeight * 0.75)) * 100);
  const isImageVisible = scrollY > 200;

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  return (
    <div className="home-container">
      <div className="background-image" />
      
      <div 
        className="content-overlay"
        style={{ marginTop: `${scrollProgress}vh` }}
      >
        <div className="welcome-section">
          <div className="welcome-container">
            <div className="welcome-header">It's a pleasure to meet you</div>
            <div className="welcome-text">
              <p>
                Fill your tote! offers sustainable and artsy tote bags.
                Each tote is designed to the requirements of the client
                and are produced using eco-friendly canvas totes.
              </p>
            </div>
          </div>
        </div>

        {/* First Image Section */}
        <div className="materials-section">
          <div className="materials-container">
            <div className="materials-header">
              <h2 className="materials-title">What goes in</h2>
              <p className="materials-subtitle">A peak at the day-to-day goings on</p>
            </div>
            <div className="materials-image-container">
              <img
                src="/assets/materials.png"
                alt="Materials"
                className="materials-image"
              />
            </div>
          </div>
          
        </div>

        {/* Process Steps Section */}
        <div className="process-section">
          <div className="process-container">
            <div className="process-header">
              <h2 className="process-title">Process</h2>
              <p className="process-subtitle">How things flow at Fill your tote!</p>
            </div>
            
            <div 
              className={`process-image-container ${isImageVisible ? 'visible' : ''}`}
            >
              <img 
                src={processImagePath}
                alt="Process Steps"
                className="process-image"
              />
            </div>
          </div>
        </div>
        
        <div className="faq-section">
          <div className="faq-container">
            <h3 className="faq-title">Questions & Answers</h3>
            <div className="faq-list">
              {faqData.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <button 
                    className={`faq-question ${expandedQuestion === faq.id ? 'expanded' : ''}`}
                    onClick={() => toggleQuestion(faq.id)}
                    aria-expanded={expandedQuestion === faq.id}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">
                      {expandedQuestion === faq.id ? '−' : '+'}
                    </span>
                  </button>
                  <div className={`faq-answer ${expandedQuestion === faq.id ? 'expanded' : ''}`}>
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="faq-spacer"></div>

        <div className="memories-section">
          <div className="memories-image-container">
            <img
              src="/assets/memories.png"
              alt="Memories"
              className="memories-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;