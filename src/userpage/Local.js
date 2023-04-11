import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Card, CardContent, CardMedia,Typography, Button,  Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Userapp from '../components/Userapp';

const PackageCard = ({ id, name, description, price, imageUrl, onViewDetails }) => {
  const handleViewDetailsClick = () => {
    onViewDetails(id, name, description, imageUrl);
  };

  return (
    <Card>
      <CardMedia component="img" image={imageUrl} height="200" />
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="h6" component="p">
          ${price}
        </Typography>
        <Button onClick={handleViewDetailsClick}>View Details</Button>
      </CardContent>
    </Card>
  );
};
const Local = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/packages')
      .then(response => {
        setPackages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const handleViewDetails = (id, name, description) => {
    const packageData = packages[id];
    
    navigate(`/packages/${id}`, { state: { packageData } });
    navigate(`/packages/${id}`, {
      state: { imageUrl: packages[id].imageUrl, name: name, description: description },
    });
  };
  const image1 = 'http://localhost:3000/uploads/image1.jpg';

  return (
   
    <div>
        <Userapp />
        <img style={{width:'100vw', height:'50vh'}} src={image1} alt="Localimg" />
        
         <Grid container spacing={2} style={{position:"absolute", top:"600px"}}>
                {packages.map((pkg, index) => (
  <Grid item xs={12} md={2} key={index}>
   <PackageCard {...pkg} id={index} onViewDetails={handleViewDetails} imageUrl={pkg.imageUrl} />
    
  </Grid>
))}
      </Grid>                                                                                
    </div>
  );
};

export default Local;