import React from 'react'
import './AboutUs.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


function About() {
  return (
    <div>
      <Navbar />

      <div className='about-us'>
      <h1>About Us</h1>
      <p className='paragraph'>History here</p>
      {/* <p className='paragraph'>Our team consists of experienced travel advisors who work tirelessly to create custom travel itineraries that cater to your unique preferences and interests.</p> */}
      <h2>Mission & Vision</h2>
      <span className='sub-title'>MISSION</span>
      <p className='paragraph'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum pharetra erat, vitae tempor tortor mollis non. Donec et nibh at dui porttitor lobortis. Nulla tristique, tellus sit amet luctus eleifend, felis dui porta felis, et elementum lorem velit eu orci. Cras venenatis purus eget pulvinar venenatis.</p>

      <h2>Achievements</h2>
      <p className='paragraph'>Achievements here</p>
      {/* <ul>
        <li>John Doe - CEO</li>
        <li>Jane Smith - CTO</li>
        <li>Tom Jones - Senior Travel Advisor</li>
        <li>Sarah Johnson - Senior Travel Advisor</li>
        <li>Mary Brown - Marketing Manager</li>
      </ul> */}
    </div>
        <Footer />
    </div>
  )
}

export default About