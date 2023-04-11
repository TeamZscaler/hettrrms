import { useLocation } from "react-router-dom";
import "./PackageDetails.css";
import { useNavigate } from 'react-router-dom';

const PackageDetails = () => {
  const location = useLocation();
  const { name, imageUrl, description, documentUrl } = location.state;
  const descriptionItems = (description ?? '').split('\n');

  const navigate = useNavigate();
  return (
    <div>
      {imageUrl && (
        <div >
          <img className="heading" src={imageUrl} alt="Package" />
          <h1>{name}</h1>
          <button className="but1"  onClick={() => navigate(`/Book?name=${encodeURIComponent(name)}`)}>BOOK NOW</button>
          <div className="box1">
          <h2 style={{textAlign:'center', position:'relative'}}>Package Inclusion</h2>
          <ul style={{justifyContent:'center', position:'relative', left:'300px'}}>
          {descriptionItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        </div>
        <h3 style={{margin:'auto',position:'relative', left:'190px'}}>Note: "WE ARE FOR GOOD QUALITY SERVICES!"</h3>
        <h3 style={{margin:'auto',position:'relative', left:'190px'}}>CONDITIONS:</h3>
        <div className="box2">
          <ul>
            <li>Contracting Service of tour must be made one month before the tour.</li>
            <li>List of the participants with b-day shall be given to the agency two months before the tour.</li>
            <li>50% of payments shall be done 1 month for airline reservation and the rest shall be pay <br /> 2weeks before the tour.</li>
            <li>Tour Operator has the right to alter the itineraries as maybe deemed necessary through<br />  unavoidable circumstances.</li>
            <li>Any unused services cannot be refunded.</li>
          </ul>
        </div>
        <br />
        <div className="box3">
        <h2 style={{textAlign:'center', position:'relative'}}>Itineraries</h2>
        <iframe src={documentUrl} title={name} style={{margin:'auto',position:'relative', left:'70px'}} width="89%" height="800"></iframe>
        </div>
        </div>
      )}
   
    </div>
  );
};

export default PackageDetails;