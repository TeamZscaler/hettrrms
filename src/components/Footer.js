import React from 'react'
import './footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import hett_logo from '../assets/hett_logo.png'
import ph_logo from '../assets/itsmorefuninph.png'
import pata_logo from '../assets/pata_logo.png'
import dot_logo from '../assets/dot_logo.png'
import philtoa_logo from '../assets/philtoa_logo.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="secContainer container grid">

        {/* First Div - start */}
        <div className="logoDiv">
          <div className="footerLogo">
          <img src={hett_logo} alt="" className="logo flex" />
          </div>

        </div>
        {/* First Div - end */}
        
        <div className="accreditationDiv">
        <span className="dot-number">
            DOT Accreditation No.<br />RO5-TTA 00625-2022
            </span>
        <div className="accreditation flex">
            
              <Link to="/"> 
              {/* https://www.itsmorefuninthephilippines.com */}
                <img src={dot_logo} alt=""></img>
              </Link>
              <Link to="/">
              {/* https://www.pata.org/about-pata */}
              <img src={pata_logo} alt=""></img>
              </Link>
              <Link to="/">
              {/* https://beta.tourism.gov.ph/ */}
              <img src={ph_logo} alt=""></img>
              </Link>
              <Link to="/">
              {/* https://philtoa.com/about-us/ */}
              <img src={philtoa_logo} alt=""></img>
              </Link>
              {/* <Link to="/">
              https://itsmorefuninthephilippines.co.uk/bicol/
              <img src={excitingbicol_logo} alt=""></img>
              </Link> */}
            </div>
        </div>

        {/* <div className="footerLinks">
          <span className="linkTitle">
            Informations
          </span>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Explore</a>
          </li>
          <li>
            <a href="/">Travel</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
        </div> */}

        <div className="footerLinks">
          <span className="linkTitle">
            Links
          </span>
          <li>
            <a href="/">Destination</a>
          </li>
          <li>
            <a href="/">Support</a>
          </li>
          <li>
            <a href="/">Terms & Conditions</a>
          </li>
          <li>
            <a href="/">Data Privacy</a>
          </li>
        </div>

        <div className="footerLinks">
          <span className="linkTitle">
            Contact Us
          </span>
          <span className="phone">+63 917 623-0686 (Globe) <br /> +63 920 952-3436 (Smart)</span>
          <span className="email">humanexplore17@ymail.com</span>
          <span className="location">G/F Achacon Bldg, 658 Rizal St., <br />Legazpi City, Albay</span>
          
          <div className="socials flex">
          <FacebookIcon className="icon"/>
          <InstagramIcon className="icon"/>
          <EmailIcon className="icon"/>
        </div>
        </div>
        
      </div>
      <hr></hr>
      <p className="copyrightText flex">Copyright © 2023 All Rights Reserved by Human Explore Travel and Tours</p>
    </div>
  )
}

export default Footer