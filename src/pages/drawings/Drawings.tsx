import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RestClient } from "../../RestClient";
import "./Drawings.css";

type Drawing = {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
};

const Drawings: React.FC = () => {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching drawings...");
    setLoading(true);
    RestClient.getDrawings()
      .then(data => {
        console.log("Drawings received:", data);
        setDrawings(data);
        setError(null);
      })
      .catch(err => {
        console.error("Error fetching drawings:", err);
        setError(err.message || "Failed to load drawings");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDrawingClick = (drawing: Drawing) => {
    navigate(`/drawings/${drawing.slug || drawing.id}`);
  };

  if (loading) {
    return <div className="drawings-container">Loading drawings...</div>;
  }

  if (error) {
    return (
      <div className="drawings-container">
        <p>Error: {error}</p>
        <p>Make sure your backend server is running on http://localhost:8080</p>
      </div>
    );
  }

  if (drawings.length === 0) {
    return (
      <div className="drawings-container">
        <p>No drawings found.</p>
        <p>Check that your backend has drawings data and the endpoint is working.</p>
      </div>
    );
  }

  return (
    <div className="drawings-container">
      <div className="masonry-layout">
        {drawings.map(drawing => (
          <div 
            key={drawing.id} 
            className="drawing-item"
            onClick={() => handleDrawingClick(drawing)}
          >
            <img 
              src={drawing.imageUrl} 
              alt={drawing.name} 
              className="drawing-image" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drawings;