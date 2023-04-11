import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {  Card, CardContent, CardMedia,Typography, Button,  Grid } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EventIcon from '@material-ui/icons/Event';
import EventNoteIcon from '@material-ui/icons/EventNote';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { useNavigate } from 'react-router-dom';
import './AddPackage.css'; 
import axios from 'axios';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  card: {
    minWidth: 200,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
export const PackageCard =({ id, name, description, price, imageUrl, onViewDetails }) => {
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
export default function Addpack() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  
  //the add pack function
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [image, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);
const [showForm, setShowForm] = useState(false);
const [document, setDocument] = useState(null);
const [packages, setPackages] = useState([]);
  
  useEffect(() => {
    axios.get('/api/packages')
      .then((response) => {
        setPackages(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);
  const handleViewDetails = (id, name, description) => {
    const packageData = packages[id];
    
    navigate(`/packages/${id}`, { state: { packageData} });
    navigate(`/packages/${id}`, {
      state: { imageUrl: packages[id].imageUrl,documentUrl:packages[id].documentUrl, name: name, description: description },
    });
  };

const handleHideForm = () => {
  setShowForm(false);
};
const handleImageChange = (event) => {
  const selectedFile = event.target.files[0];
  setImage(selectedFile);
  setImagePreview(URL.createObjectURL(selectedFile));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("image", image);
  formData.append("document", document); 
  axios
    .post("/api/packages", formData)
    .then((response) => {
      console.log(response.data);
      const newPackage = {
        id: response.data.id,
        name: name,
        description: description,
        price: price,
        imageUrl: response.data.imageUrl, // update imageUrl with the URL returned by the server
        documentUrl: response.data.documentUrl, 
      };
      navigate(`/Book?packageName=${name}`);
      setPackages([...packages, newPackage]);
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setImagePreview(null);
      setDocument(null);
    })
    .catch((error) => {
      console.log(error);
    });
};
 
  const handleDocumentChange = (event) => {
    const selectedFile = event.target.files[0];
    setDocument(selectedFile);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{background:'#3C4048'}}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
  <ListItem button key="Dashboard" onClick={() => {navigate('/admin')}}>
    <ListItemIcon>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItem>
  <ListItem button key="User" onClick={() => {navigate('/Showuser')}}>
    <ListItemIcon>
      <PeopleIcon />
    </ListItemIcon>
    <ListItemText primary="User" />
  </ListItem>
  <ListItem button key="Add Package" onClick={() => {navigate('/AddPackages')}}>
    <ListItemIcon>
      <AddBoxIcon />
    </ListItemIcon>
    <ListItemText primary="Add Package" />
  </ListItem>
  <ListItem button key="Reservation" onClick={() => {navigate('/PackageList')}}>
    <ListItemIcon>
      <EventNoteIcon />
    </ListItemIcon>
    <ListItemText primary="Reservation" />
  </ListItem>
  <ListItem button key="Notification" onClick={() => {}}>
    <ListItemIcon>
      <NotificationsIcon/>
    </ListItemIcon>
    <ListItemText primary="Notification" />
  </ListItem>
  <ListItem button key="Travel/Tour Schedule" onClick={() => {}}>
    <ListItemIcon>
      <EventIcon />
    </ListItemIcon>
    <ListItemText primary="Travel/Tour Schedule"/>
  </ListItem>
  <ListItem button key="Accept and Decline" onClick={() => {}}>
    <ListItemIcon>
      <VerifiedUserIcon />
    </ListItemIcon>
    <ListItemText primary="Accept and Decline"/>
  </ListItem>
  <ListItem button key="Business Partner Record" onClick={() => {}}>
    <ListItemIcon>
      <BusinessCenterIcon />
    </ListItemIcon>
    <ListItemText primary="Business Partner Record"/>
  </ListItem>
  <ListItem button key="Account" onClick={() => {}}>
    <ListItemIcon>
      <AccountCircleIcon/>
    </ListItemIcon>
    <ListItemText primary="Account" />
  </ListItem>
</List>
      </Drawer>

      <main style={{backgroundColor:'#E1E1EB', height:'100vh'}}  className={classes.content}>
        <div className={classes.toolbar} />
        <div>
        <button  onClick={() => handleButtonClick("Local")}>Local</button>
        <button onClick={() => handleButtonClick("National")}>National</button>
        <button onClick={() => handleButtonClick("International")}>
          International
        </button>
      </div>
       {/* Local */}
        {selectedButton === "Local" && <div>
          
                <button style={{padding:"8px", position:"absolute", top:"130px"}} onClick={() => setShowForm(true)}>Add Package</button>
                <h1 style={{position:"absolute", top:"150px"}}>Local Travel & Tour Packages</h1>
                <Grid container spacing={2} style={{position:"absolute", top:"220px"}}>
                {packages.map((pkg, index) => (
  <Grid item xs={12} md={2} key={index}>
    <PackageCard {...pkg} id={index} onViewDetails={handleViewDetails} />
    
  </Grid>
))}
      </Grid>
                {showForm && (
                <div className="form-overlay">
       <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Package Inclusion:
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <br />
            <label> 
              Image:
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <br />
            {imagePreview && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200px",
                  height: "200px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Package Preview"
                  style={{ maxWidth: "300px" }}
                />
              </div>

            )}
            <label>
  Document:
  <input
    type="file"
    name="document"
    accept="application/pdf"
    onChange={handleDocumentChange}
  />
</label>
     
      <br />
          <button type="submit">Submit</button>
          <button type="button" onClick={handleHideForm}>
            Cancel
          </button>
        </form>
        </div>
      )}
      </div>
        
        }
         {/* National */}
        {selectedButton === "National" &&  
        <button style={{padding:"8px", position:"fixed", top:"130px"}} onClick={() => setShowForm(true)}>Add Package</button>
        }
        {/* International */}
        {selectedButton === "International" && (
           <button style={{padding:"8px", position:"fixed", top:"130px"}} onClick={() => setShowForm(true)}>Add Package</button>
        )}

   

      </main>
    </div>
  );
}
