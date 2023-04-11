import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import swal from 'sweetalert';

const Book = () => {
  const location = useLocation();
  const name = new URLSearchParams(location.search).get('name');
  const [name1, setName1] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState(name);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [numTravelers, setNumTravelers] = useState("");
  const [travelers, setTravelers] = useState([]);

  const handleAddTraveler = () => {
    setTravelers([...travelers, { name: "", age: "" }]);
  };

  const handleRemoveTraveler = (index) => {
    const newTravelers = [...travelers];
    newTravelers.splice(index, 1);
    setTravelers(newTravelers);
  };

  const handleTravelerChange = (event, index) => {
    const { name, value } = event.target;
    const newTravelers = [...travelers];
    newTravelers[index][name] = value;
    setTravelers(newTravelers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name1,
          email: email,
          destination: destination,
          departureDate: departureDate,
          returnDate: returnDate,
          numTravelers: Number(numTravelers),
          travelers: travelers,
        }),
      });
      if (!response.ok) {
        swal("Booking not sent", "", "error");
        throw new Error("Failed to save booking");
       
      }
      // Clear form data on success
      setName1("");
      setEmail("");
      setDestination(name);
      setDepartureDate("");
      setReturnDate("");
      setNumTravelers("");
      setTravelers([]);
      swal("Booking sent successfully wait for the admin to accept your booking", "", "success");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100%', maxWidth:'500px', margin:'0 auto'}}>
    <h2 style={{fontSize:'2rem', marginBottom:'2rem'}}> Book your travel</h2>
    <form style={{display:'flex', flexDirection:'column',width:'100%'}} onSubmit={handleSubmit}>
    <div> 
          <label style={{fontSize:'1.2rem',marginBottom:'0.5rem'}}>Name:</label>
          <input style={{padding:'0.5rem',fontSize:'1rem',border:'1px solid #ccc',borderRadius:'3px',marginBottom:'1rem'}}
            type="text"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            required
          />
        </div>
      <div>
        <label  style={{fonstSize:'1.2rem',marginBottom:'0.5rem'}}>Email:</label>
        <input  style={{padding:'0.5rem',fontSize:'1rem',border:'1px solid #ccc',borderRadius:'3px',marginBottom:'1rem'}}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label  style={{fonstSize:'1.2rem',marginBottom:'0.5rem'}}>Destination:</label>
        <input  style={{padding:'0.5rem',fontSize:'1rem',border:'1px solid #ccc',borderRadius:'3px',marginBottom:'1rem'}}
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </div>
      <div>
        <label  style={{fonstSize:'1.2rem',marginBottom:'0.5rem'}}>Departure date:</label>
        <input  style={{padding:'0.5rem',fontSize:'1rem',border:'1px solid #ccc',borderRadius:'3px',marginBottom:'1rem'}}
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label  style={{fonstSize:'1.2rem',marginBottom:'0.5rem'}}>Return date:</label>
        <input  style={{padding:'0.5rem',fontSize:'1rem',border:'1px solid #ccc',borderRadius:'3px',marginBottom:'1rem'}}
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label  style={{fonstSize:'1.2rem',marginBottom:'0.5rem'}}>Number of travelers:</label>
        <input  style={{padding:'0.5rem',fontSize:'1rem',border:'1px solid #ccc',borderRadius:'3px',marginBottom:'1rem'}}
          type="number"
          value={numTravelers}
          onChange={(e) => setNumTravelers(e.target.value)}
          required
        />
      </div>
      <div>
        <button style={{padding:'10px',margin:'10px',backgroundColor:'#0077b6',color:'white',border:'none',borderRadius:'5px',cursor:'pointer'}}   type="button" onClick={handleAddTraveler}>
          Add traveler
        </button>
      </div>
      {travelers.map((traveler, index) => (
        <div key={index}>
          <h3>Traveler {index + 1}</h3>
          <div>
            <label  style={{fonstSize:'1.2rem',marginBottom:'0.5rem'}}>Name:</label>
            <input  style={{padding:'0.5rem',fontSize:'1rem',border:'1px solid #ccc',borderRadius:'3px',marginBottom:'1rem'}}
              type="text"
              name="name"
              value={traveler.name}
              onChange={(e) => handleTravelerChange(e, index)}
              required
            />
          </div>
          <div>
            <label  style={{fonstSize:'1.2rem',marginBottom:'0.5rem'}}>Age:</label>
            <input  style={{padding:'0.5rem',fontSize:'1rem',border:'1px solid #ccc',borderRadius:'3px',marginBottom:'1rem'}}
              type="number"
              name="age"
              value={traveler.age}
              onChange={(e) =>handleTravelerChange(e, index)}
              required
              /><br />
              <button style={{padding:'10px',margin:'10px',backgroundColor:'#0077b6',color:'white',border:'none',borderRadius:'5px',cursor:'pointer'}} type="button" onClick={() => handleRemoveTraveler(index)}>
              Remove traveler
              </button>
              </div>
              </div>
              ))}
              <div>
              <button type="submit">Submit</button>
              </div>
              </form>
              </div>
  )
}
export default Book