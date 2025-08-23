// import React from "react";
// import { useParams } from "react-router-dom";
// import { RestClient } from "./RestClient";
// import "./Tote.css";

// export default function Tote() {
//   const { id }: any = useParams();
//   const [tote, setTote] = React.useState<any>(undefined);
  
//   React.useEffect(() => {
//     RestClient.getTote(id)
//       .then(tote => setTote(tote))
//       .catch(err => alert(err));
//   }, [id]);

//   if (tote) {
//     return (
//       <div className="product-page">
//         <Breadcrumb tote={tote} />
//         <div className="product-container">
//           <ProductImage tote={tote} />
//           <ProductDetails tote={tote} />
//         </div>
//       </div>
//     );
//   } else {
//     return <div className="loading">Please wait...</div>;
//   }
// }

// function Breadcrumb({ tote }: { tote: any }) {
//   return (
//     <nav className="breadcrumb">
//       <span>Shop All</span>
//       <span> • </span>
//       <span>{tote.category || 'Tote Bags'}</span>
//       <span> • </span>
//       <span>{tote.name}</span>
//     </nav>
//   );
// }

// function ProductImage({ tote }: { tote: any }) {
//   return (
//     <div className="product-image-container">
//       <img 
//         src={RestClient.baseUrl + "/" + tote.image} 
//         alt={tote.name}
//         className="product-image"
//       />
//     </div>
//   );
// }

// function ProductDetails({ tote }: { tote: any }) {
//   const [quantity, setQuantity] = React.useState(1);
//   const [showSpecs, setShowSpecs] = React.useState(false);
//   const [showDetails, setShowDetails] = React.useState(false);

//   const handleAddToCart = () => {
//     RestClient.addToCart(tote.id, quantity)
//       .then(() => {
//         alert(`Added ${quantity} ${tote.name}(s) to cart!`);
//       })
//       .catch(err => {
//         alert('Error adding to cart: ' + err);
//       });
//   };

//   const increaseQuantity = () => {
//     if (quantity < tote.stockQuantity) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   return (
//     <div className="product-details">
//       <h1 className="product-title">{tote.name}</h1>
      
//       <p className="product-description">{tote.description}</p>
      
//       <div className="product-materials">
//         <p>{tote.materialDescription || `Made from premium ${tote.material} with durable construction and eco-friendly materials, resulting in a sustainable yet sophisticated accessory perfect for everyday use.`}</p>
//       </div>

//       <hr className="divider" />

//       <div className="price-section">
//         <span className="price-label">PRICE:</span>
//         <span className="price-value">${tote.price}</span>
//       </div>

//       <div className="quantity-section">
//         <span className="quantity-label">QUANTITY:</span>
//         <div className="quantity-controls">
//           <button 
//             className="quantity-btn" 
//             onClick={decreaseQuantity}
//             disabled={quantity <= 1}
//           >
//             −
//           </button>
//           <span className="quantity-value">{quantity}</span>
//           <button 
//             className="quantity-btn" 
//             onClick={increaseQuantity}
//             disabled={quantity >= tote.stockQuantity}
//           >
//             +
//           </button>
//         </div>
//       </div>

//       <button className="add-to-cart-btn" onClick={handleAddToCart}>
//         ADD TO CART
//       </button>

//       <hr className="divider" />

//       <div className="expandable-sections">
//         <div className="expandable-section">
//           <button 
//             className="section-header"
//             onClick={() => setShowSpecs(!showSpecs)}
//           >
//             <span>PRODUCT SPECIFICATIONS</span>
//             <span className="expand-icon">{showSpecs ? '−' : '+'}</span>
//           </button>
//           {showSpecs && (
//             <div className="section-content">
//               <p><strong>Material:</strong> {tote.material}</p>
//               <p><strong>Dimensions:</strong> {tote.dimensions || `${tote.width || 16}" W x ${tote.height || 12}" H x ${tote.depth || 4}" D`}</p>
//               <p><strong>Color:</strong> {tote.color}</p>
//               <p><strong>Weight:</strong> {tote.weight || '0.8 lbs'}</p>
//               <p><strong>Care Instructions:</strong> {tote.careInstructions || 'Spot clean with damp cloth. Air dry only.'}</p>
//               <p><strong>Handle Length:</strong> {tote.handleLength || '22 inches'}</p>
//               <p><strong>Closure:</strong> {tote.closure || 'Open top with magnetic snap'}</p>
//             </div>
//           )}
//         </div>

//         <div className="expandable-section">
//           <button 
//             className="section-header"
//             onClick={() => setShowDetails(!showDetails)}
//           >
//             <span>ADDITIONAL DETAILS</span>
//             <span className="expand-icon">{showDetails ? '−' : '+'}</span>
//           </button>
//           {showDetails && (
//             <div className="section-content">
//               <p><strong>Stock:</strong> {tote.stockQuantity} available</p>
//               <p><strong>SKU:</strong> {tote.sku || `TB-${tote.id}`}</p>
//               <p><strong>Sustainability:</strong> {tote.sustainabilityInfo || 'Made with eco-friendly materials and sustainable manufacturing processes.'}</p>
//               <p><strong>Origin:</strong> {tote.origin || 'Designed and crafted with care'}</p>
//               <p><strong>Warranty:</strong> {tote.warranty || '1-year limited warranty against manufacturing defects'}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }