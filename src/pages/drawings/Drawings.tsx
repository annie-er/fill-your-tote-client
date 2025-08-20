import React, { useEffect, useState } from "react";
import { RestClient } from "../RestClient";
import "./Drawings.css";

type Drawing = {
  id: number;
  title: string;
  url: string;
};

const Drawings: React.FC = () => {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [layout, setLayout] = useState<"grid" | "masonry">("grid");

  useEffect(() => {
    RestClient.getDrawings()
      .then(setDrawings)
      .catch(err => console.error("Error fetching drawings:", err));
  }, []);

  return (
    <div className="drawings-container">
      <div className="layout-buttons">
        <button onClick={() => setLayout("grid")}>Grid (equal size)</button>
        <button onClick={() => setLayout("masonry")}>Masonry (original size)</button>
      </div>

      {layout === "grid" ? (
        <div className="grid-layout">
          {drawings.map(d => (
            <img key={d.id} src={d.url} alt={d.title} className="grid-image" />
          ))}
        </div>
      ) : (
        <div className="masonry-layout">
          {drawings.map(d => (
            <img key={d.id} src={d.url} alt={d.title} className="masonry-image" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Drawings;