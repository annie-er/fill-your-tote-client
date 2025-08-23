import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RestClient } from '../../RestClient';
import './DrawingDetail.css';

interface Drawing {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

const DrawingDetail: React.FC = () => {
  const { identifier } = useParams<{ identifier: string }>();
  const navigate = useNavigate();
  const [drawing, setDrawing] = useState<Drawing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrawing = async () => {
      if (!identifier) return;
      
      try {
        setLoading(true);
        const data = await RestClient.getDrawing(identifier);
        setDrawing(data);
      } catch (err) {
        setError('Drawing not found');
        console.error('Error fetching drawing:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawing();
  }, [identifier]);

  if (loading) {
    return (
      <div className="drawing-detail-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error || !drawing) {
    return (
      <div className="drawing-detail-container">
        <div className="error">
          <h2>Drawing Not Found</h2>
          <p>{error || 'The drawing you\'re looking for doesn\'t exist.'}</p>
          <button onClick={() => navigate('/drawings')} className="back-button">
            Back to Drawings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="drawing-detail-container">
      <button onClick={() => navigate('/drawings')} className="back-button">
        ← Back to Drawings
      </button>
      
      <div className="drawing-detail">
        <div className="drawing-image">
          <img src={drawing.imageUrl} alt={drawing.name} />
        </div>
        
        <div className="drawing-info">
          <h1 className="drawing-title">{drawing.name}</h1>
          <p className="drawing-description">{drawing.description}</p>
          
          <div className="drawing-actions">
            <button
              className="contact-button"
              onClick={() => navigate('/contact')}
            >
              Commission Similar Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingDetail;