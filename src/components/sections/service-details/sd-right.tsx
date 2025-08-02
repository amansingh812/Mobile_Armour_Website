import React from 'react';

function SdRight({ }) {
  return (
    <div className="sidebar-wrap white-bg">
      <div className="contact-form">
        <h5>Get in Touch</h5>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input
            type="tel"
            placeholder="Number"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number"
            required
          />

          <textarea
            name="message"
            id="message"
            cols={10}
            rows={10}
            placeholder="Message"
          ></textarea>
          <input type="submit" value="Get In Touch" />



        </form>
      </div>
      <div className="contact-info">
        <h5>Contact Info</h5>
        <ul className="contact-list-item">
          <li>
            {" "}
            <i className="las la-map-marker"></i>
            Opening soon
            {/* Germany — <br />
            785 15h Street, Office 478 <br />
            Berlin, De 81566 */}
          </li>
          <li>
            {" "}
            <i className="las la-envelope"></i>
            Manager@mobilearmour.com.au
          </li>
          <li>
            {" "}
            <i className="las la-phone"></i>
            +1 0000000000
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SdRight;