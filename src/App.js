import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Input from './Components/Input/Input'
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/Signup';
import './App.css';


// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'b7cd7788c735460d85feec4aaf70074b';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'sohal777';       
const APP_ID = 'Face-Detector';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'login',
      input: '',
      url: '',
      box: {},
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }

  // Load user, set user states 
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name, 
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  // Calculate face border 
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // Update state of face coordinates 
  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(box);
  }

  // update url state when input changes
  onInputChange = (event) => this.setState({input: event.target.value});
  resetUrl = () => {
    this.setState({url: ''})
  }
  // Submit request to Clarafi API 
  onSubmit = (event) => {
    this.setState({url: this.state.input});
    const IMAGE_URL = this.state.input;
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log(error));
    
    // this.calculateFaceLocation(fetchRegions());
  }

  render() {
    if(this.state.route === 'login') {
      return (
        <Login resetUrl= {this.resetUrl}loadUser= {this.loadUser} signup={() => this.setState({route: 'signup'})} login={() => this.setState({route: 'homepage'})}/>
      );
    }
    else if(this.state.route === 'signup') {
      return (
        <Signup loadUser= {this.loadUser} login={() => this.setState({route: 'login'})} signup={() => this.setState({route: 'homepage'})}/>
      );
    }
    else if (this.state.route === 'homepage') {
      return (
        <div>
        <Navigation login={() => this.setState({route: 'login'})}/>
        <Input user = {this.state.user}box={this.state.box} onInputChange={this.onInputChange} onSubmit={this.onSubmit} url={this.state.url}/>
        </div>
      );
    }    
  }
}

export default App;
