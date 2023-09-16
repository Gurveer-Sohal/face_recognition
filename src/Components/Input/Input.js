import React from 'react';
import './Input.css'

const imageCountHtml = document.getElementsByClassName('welcome')

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageCounts: this.props.user.entries
        }
    }

    // PUT request to get image entered count 
    // Return image count, update imageCount state
    getImageCount = () => {
        fetch('http://localhost:3000/images', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id
            })
        })
        .then(response => response.json())
        .then(imageCount => {
                this.setState({imageCounts: imageCount})
        })
    }


    render() {
        const { user, onInputChange, onSubmit, url, box } = this.props;
        return (
            <div>
                <div className="userInfoContainer">
                    <h3 className='welcome'>Welcome {user.name}, you have entered {this.state.imageCounts} images!</h3>
                </div>
                <div className='InputContainer'>
                <input id='inputField' className='Input' type="text" placeholder='Enter an image link' onChange={onInputChange}/>
                <button className='Submit' onClick={() => {onSubmit(); this.getImageCount()}}>Submit</button>
                </div>
                <div className='image-container' >
                    <div className='image-container2'>
                        <img id='inputimage' className='Img' src={url} alt="" />
                        <div className='bounding-box' style={{left: box.leftCol , top: box.topRow, right: box.rightCol, bottom: box.bottomRow}}></div>
                    </div>
                   
                </div>
            </div>
        );
    }
  
}

export default Input;