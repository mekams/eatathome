import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us-container" style={styles.container}>
      <h1 style={styles.header}>About Eat@Home</h1>
      <p style={styles.text}>
        Welcome to Eat@Home, the ultimate destination for food lovers seeking the convenience of delicious meals delivered straight to their doorstep. At Eat@Home, we believe that enjoying a restaurant-quality meal should be as simple as clicking a button, no matter where you are.
      </p>
      <p style={styles.text}>
        Our journey began with a passion for great food and a vision to make it accessible to everyone. With a diverse menu that caters to all tastes, we take pride in sourcing fresh ingredients, celebrating local produce, and crafting dishes that inspire and delight.
      </p>
      <p style={styles.text}>
        As a team of food enthusiasts, chefs, and technologists, we're dedicated to providing a seamless ordering experience from the comfort of your home. From our kitchen to your dining table, Eat@Home is here to transform how you experience food.
      </p>
      <p style={styles.text}>
        Thank you for choosing us. We're excited to serve you and look forward to bringing joy to your meal times.
      </p>
    </div>
  );
};

// Styles object for inline styling
const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center'
  },
  header: {
    marginBottom: '1.5rem'
  },
  text: {
    marginBottom: '1rem',
    lineHeight: '1.6'
  }
};

export default AboutUs;
