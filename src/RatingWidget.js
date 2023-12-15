// RatingWidget.js
import React, { useState } from 'react';
import './RatingWidget.css';

const RatingWidget = () => {
  const [rating, setRating] = useState(0);
  const [percent, setPercent] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setPercent(newRating * 20);
  };

  const handleSubmit = () => {
    // Fetch to send the rating to the server-side endpoint
    fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Sent-By': 'React',
      },
      body: new URLSearchParams({
        sentBy: 'react',
        question: "How satisfied are you?",
        rating: rating,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        if (percent >= 80) {
          setFeedback(`Thanks for ${rating} stars rating!`);
        } else {
          setFeedback(`Thanks for your feedback of ${rating} stars. We'll try to do better!`);
        }
        setSubmitted(true);
      })
      .catch(error => {
        console.error('Error sending rating:', error);
      });
  };

  return (
    <div className="rating-container">
      <h1>Rating Widget</h1>
      {submitted ? (
        <p className="star-value">{feedback}</p>
      ) : (
        <>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <React.Fragment key={index}>
                <input
                  type="radio"
                  id={`star${index + 1}`}
                  name="rating"
                  value={5 - index}
                  onChange={() => handleRatingChange(5 - index)}
                />
                <label htmlFor={`star${index + 1}`} title={`${5 - index} stars`}></label>
              </React.Fragment>
            ))}
          </div>
          <button onClick={handleSubmit}>Submit Rating</button>
        </>
      )}
    </div>
  );
};

export default RatingWidget;
