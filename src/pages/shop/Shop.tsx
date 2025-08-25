import React from "react";
import { Link } from "react-router-dom";
import { RestClient } from "../../RestClient"
import "./Shop.css"; 

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function Shop() {
  const [toteBags, setToteBags] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  
  React.useEffect(() => {
    RestClient.getToteBags()
      .then(toteBags => {
        setToteBags(toteBags)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading products...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="shop-container">
      <div className="products-grid">
        {toteBags.map((tote: Product) => (
          <Link to={`/shop/${tote.slug}`} key={tote.id} className="product-card">
            <div className="product-image">
              <img src={tote.imageUrl} alt={tote.name} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{tote.name}</h3>
              <p className="product-price">${tote.price}</p>
              {tote.description && (
                <p className="product-description">{tote.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}