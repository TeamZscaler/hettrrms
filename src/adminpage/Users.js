import React, { useState, useEffect, useRef,  useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
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
import './users.css';
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
    minWidth: 275,
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

export default function Users() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idImage, setIdImage] = useState(null);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
 
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form inputs
    const newErrors = {};
    if (firstName.trim() === '') {
      newErrors.firstName = 'Please enter your first name';
    }
    if (lastName.trim() === '') {
      newErrors.lastName = 'Please enter your last name';
    }
    if (email.trim() === '') {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Please enter your phone number';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (gender.trim() === '') {
      newErrors.gender = 'Please select your gender';
    }
    if (username.trim() === '') {
      newErrors.username = 'Please enter your username';
    }
    if (password.trim() === '') {
      newErrors.password = 'Please enter your password';
    }
    if (confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!idImage) {
      newErrors.idImage = 'Please upload your ID image';
    }

    // Update the errors state
    setErrors(newErrors);

    // Submit the form if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('gender', gender);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('idImage', idImage);

      fetch('/api/register', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert('User registered successfully');
          } else {
            alert('Error registering user');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Error registering user');
        });
    }
  };
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 
   
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    fetch('/show')
      .then(response => response.json())
      .then(data => setUsers([...data]));
  }, []);
 
  
  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  // Delete a user with the specified ID
  function deleteUser(id) {
    axios.delete(`/api/users/${id}`)
      .then(response => {
        console.log(response.data.message); // Display a success message from the server
        // Update the list of users displayed in the table
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error(error));
  }


  //edit user details
  const [editingUser, setEditingUser] = useState(null);
  const handleEdit = (user) => {
    setEditingUser(user);
  };
  const updateUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingUser),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
        setEditingUser(null);
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error(error);
    }
  };

//search filtering
const [searchTerm, setSearchTerm] = useState("");
const [filteredUsers, setFilteredUsers] = useState([]);

const filterUsers = useCallback((users) => {
  const filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  setFilteredUsers(filteredUsers);
}, [searchTerm]);

useEffect(() => {
  filterUsers(users);
}, [users, filterUsers]);




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
      <input
        className="search"
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    
        <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Username</th>
            <th>Password</th>
            <th>ID Image</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.map((user) => (
  <tr key={user.id}>
    <td>{user.id}</td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
          type="text"
          value={editingUser.firstName}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              firstName: e.target.value,
            })
          }
        />
      ) : (
        user.firstName
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
          type="text"
          value={editingUser.lastName}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              lastName: e.target.value,
            })
          }
        />
      ) : (
        user.lastName
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
          type="text"
          value={editingUser.email}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              email: e.target.value,
            })
          }
        />
      ) : (
        user.email
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
          type="text"
          value={editingUser.phoneNumber}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              phoneNumber: e.target.value,
            })
          }
        />
      ) : (
        user.phoneNumber
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
          type="text"
          value={editingUser.gender}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              gender: e.target.value,
            })
          }
        />
      ) : (
        user.gender
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
          type="text"
          value={editingUser.username}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              username: e.target.value,
            })
          }
        />
      ) : (
        user.username
      )}
    </td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <input
          type="text"
          value={editingUser.password}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              password: e.target.value,
            })
          }
        />
      ) : (
        user.password
      )}
    </td>
    <td>
      {user.idImage && (
        <img src={`/uploads/${user.idImage}`} alt={`ID of ${user.firstName}`} />
      )}
    </td>
    <td>{user.role}</td>
    <td>
      {editingUser && editingUser.id === user.id ? (
        <button onClick={() => updateUser(user.id)}>Save</button>
      ) : (
        <button onClick={() => handleEdit(user)}>Edit</button>
      )}
      <button onClick={() => deleteUser(user.id)}>Delete</button>
    </td>
  </tr>
))}
        </tbody>
      </table>
      
      


    
    <div className="App">
      <button className="add" onClick={() => setShowForm(true)}>Add User</button>
      {showForm &&
        <div className="form-overlay">
          <div className="form-container" ref={formRef}>
           
          <form onSubmit={handleSubmit}>
      <label>
        First Name:
        {errors.firstName && <span style={{color:"red"}} className="error">{errors.firstName}</span>}
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </label>
      <label>
        Last Name:
        {errors.lastName && <span style={{color:"red"}} className="error">{errors.lastName}</span>}
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </label>
      <label>
        Email:
        {errors.email && <span style={{color:"red"}} className="error">{errors.email}</span>}
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Phone Number:
        {errors.phoneNumber && <span style={{color:"red"}} className="error">{errors.phoneNumber}</span>}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </label>
      <label>
        Gender:
        {errors.gender && <span style={{color:"red"}} className="error">{errors.gender}</span>}
        <select
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Username:
        <div id="error-message" class="hidden"></div>
        {errors.username && <span style={{color:"red"}} className="error">{errors.username}</span>}
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        {errors.password && <span style={{color:"red"}} className="error">{errors.password}</span>}
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label>
        Confirm Password:
        {errors.confirmPassword && <span style={{color:"red"}} className="error">{errors.confirmPassword}</span>}
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label>
      <label>
        Valid ID:
        {errors.idImage && <span style={{color:"red"}} className="error">{errors.idImage}</span>}
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setIdImage(event.target.files[0])}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
          </div>
        </div>
      }
    </div>

      </main>
    </div>
  );
}
