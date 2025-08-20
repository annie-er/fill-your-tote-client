import React from "react";
import { Link } from "react-router-dom";
import { RestClient } from "../RestClient"

export default function Shop() {
  // Store all tote bags in React state
  let [toteBags, setToteBags] = React.useState<Array<any>>([])
  
  // Load all tote bags when component first renders
  React.useEffect(() => {
    RestClient.getToteBags()
      .then(toteBags => setToteBags(toteBags))
      .catch(err => alert(err))
  }, [])

  return (
    <div>
      <h1>Shop - Tote Bags</h1>
      {toteBags.map((tote: any, i: number) =>
        <Link to={`tote/${tote.id}`} key={i} className='blockLink'>
          {tote.name}
        </Link>
      )}
    </div>
  )
}