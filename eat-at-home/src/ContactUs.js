import React, { useState } from 'react';

const ContactUs = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission, e.g., sending the data to your server
    console.log(contact);
    alert('Thank you for contacting us!');
    // Reset form after submission
    setContact({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-us-container" style={styles.container}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message</label>
          <textarea
            name="message"
            value={contact.message}
            onChange={handleChange}
            required
            rows="4"
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </div>
  );
};

// Styles object for inline styling
const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '600px',
    margin: 'auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formGroup: {
    marginBottom: '1rem',
    width: '100%'
  },
  label: {
    display: 'block',
    marginBottom: '.5rem',
    textAlign: 'left'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem'
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem'
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '0.3rem',
    cursor: 'pointer'
  }
};

export default ContactUs;
