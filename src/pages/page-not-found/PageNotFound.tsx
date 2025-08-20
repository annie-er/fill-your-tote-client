import React from "react";
import './PageNotFound.css'
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="pagenotfound">
      <h1>OOPS 404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p>Path: <code>{window.location.pathname}</code></p>
      <p>
        <Link to="/" className="home-link">
          ← Back to Home
        </Link>
      </p>
    </div>
  );
}