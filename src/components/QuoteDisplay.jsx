import React from "react";

const QuoteDisplay = ({ quote }) => {
  return (
    <blockquote>
      {quote.previous && <p className="quote-context">{quote.previous}</p>}
      <p className="quote-main">"{quote.current}"</p>
      {quote.next && <p className="quote-context">{quote.next}</p>}
    </blockquote>
  );
};

export default QuoteDisplay;
