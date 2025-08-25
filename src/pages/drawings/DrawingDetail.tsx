import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RestClient } from '../../RestClient';
import './DrawingDetail.css';

interface Drawing {
  id: number;
  name: string;
  slug?: string;
  description: string;
  imageUrl: string;
}

const DrawingDetail: React.FC = () => {
  const { identifier } = useParams<{ identifier: string }>();
  const navigate = useNavigate();
  const [drawing, setDrawing] = useState<Drawing | null>(null);
  const [allDrawings, setAllDrawings] = useState<Drawing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const current = await RestClient.getDrawing(identifier!);
        setDrawing(current);
        const drawings = await RestClient.getDrawings();
        setAllDrawings(drawings);
      } catch (err) {
        console.error("Error loading drawing:", err);
        setDrawing(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [identifier]);

  if (loading) {
    return <div className="drawing-detail-overlay"><p>Loading...</p></div>;
  }

  if (!drawing) {
    return (
      <div className="drawing-detail-overlay">
        <p>Drawing not found.</p>
        <button onClick={() => navigate('/drawings')} className="close-button">
          ×
        </button>
      </div>
    );
  }

  // figure out current index for prev/next
  const currentIndex = allDrawings.findIndex(
    d => d.id === drawing.id || d.slug === drawing.slug
  );
  const prevDrawing = currentIndex > 0 ? allDrawings[currentIndex - 1] : null;
  const nextDrawing = currentIndex < allDrawings.length - 1 ? allDrawings[currentIndex + 1] : null;

  return (
    <div className="drawing-detail-overlay">
      <button className="close-button" onClick={() => navigate('/drawings')}>
        ×
      </button>
      
      <div className="drawing-content">
        <div className="drawing-image-container">
          <img src={drawing.imageUrl} alt={drawing.name} />
        </div>
        <div className="drawing-info">
          <h1>{drawing.name}</h1>
          <p>{drawing.description}</p>
        </div>
      </div>

      <div className="navigation-container">
        <button
          className={`nav-arrow ${!prevDrawing ? 'invisible' : ''}`}
          onClick={() => prevDrawing && navigate(`/drawings/${prevDrawing.slug || prevDrawing.id}`)}
          disabled={!prevDrawing}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        
        <button
          className={`nav-arrow ${!nextDrawing ? 'invisible' : ''}`}
          onClick={() => nextDrawing && navigate(`/drawings/${nextDrawing.slug || nextDrawing.id}`)}
          disabled={!nextDrawing}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default DrawingDetail;