import React from "react";
import "./Feedback.css";
const FeedbackShare = ({ feedback }) => {
  const currentURL = window.location.href; // URL of the current page

  // Share URLs for different platforms
  const socialPlatforms = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${currentURL}&quote=${encodeURIComponent(
        feedback
      )}`,
      icon: "📘", // Replace with an actual icon
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        feedback
      )}&url=${currentURL}`,
      icon: "🐦",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${currentURL}`,
      icon: "🔗",
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        feedback
      )} ${currentURL}`,
      icon: "💬",
    },
  ];

  return (
    <div className="feedback-share-container">
      <h3>Share Your Feedback</h3>
      <p>{feedback}</p>
      <div className="social-icons">
        {socialPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-icon ${platform.name.toLowerCase()}`}
          >
            {platform.icon} {platform.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeedbackShare;
