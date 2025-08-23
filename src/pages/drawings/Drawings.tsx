import React, { useEffect, useState } from "react";
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
  const [layout, setLayout] = useState<"grid" | "masonry">("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="layout-buttons">
        <button onClick={() => setLayout("grid")}>Grid (equal size)</button>
        <button onClick={() => setLayout("masonry")}>Masonry (original size)</button>
      </div>

      <p>Found {drawings.length} drawings</p>

      {layout === "grid" ? (
        <div className="grid-layout">
          {drawings.map(d => (
            <img key={d.id} src={d.imageUrl} alt={d.name} className="grid-image" />
          ))}
        </div>
      ) : (
        <div className="masonry-layout">
          {drawings.map(d => (
            <img key={d.id} src={d.imageUrl} alt={d.name} className="masonry-image" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Drawings;