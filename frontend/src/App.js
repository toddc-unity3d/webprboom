import React, { Component } from 'react';
import BoomCarousel from './BoomCarousel.js'
import Loading from './Loading.js'

import titleImage from './images/title.png';
import footerImage from './images/footer.png';

import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.carouselRef = React.createRef();
        this.keyUpListener = this.createKeyUpListener();

        document.addEventListener("keyup", this.keyUpListener);
    }

    ModeEnum = {"menu":1, "loading":2, "loaded":3}

    state = {
        mode: this.ModeEnum["menu"]
    }

    componentDidUpdate() {
        if (this.state.mode !== this.ModeEnum["menu"]) {
            document.removeEventListener("keyup", this.keyUpListener);
        }
    }

    onSelected(key) {
        this.setState({ mode: this.ModeEnum["loading"] });
    }

    createKeyUpListener() {
        let carouselRef = this.carouselRef;
        return (e) => {
            let carousel = carouselRef.current;
            switch (e.code) {
                case 'ArrowRight':
                    carousel.moveRight();
                    break;
                case 'ArrowLeft':
                    carousel.moveLeft();
                    break;
                case 'Enter':
                    carousel.select();
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        const statusBar = `
        <div
            class="ldBar label-center"
            data-value="35"
            data-preset="circle"
        ></div>
        `;        

         return (
            <React.StrictMode>
                <div>                    
                    <div className="header">
                        <img src={titleImage} alt=""></img>
                    </div>
                    <div
                     className="BoomCarousel-outer">
                        {this.state.mode === this.ModeEnum["loading"] ? <Loading /> : null}
                        <BoomCarousel 
                            ref={this.carouselRef} 
                            onSelected={(key) => { this.onSelected(key) }}                            
                        />
                    </div>
                    <div className="footer">
                        <img src={footerImage} alt=""></img>
                    </div>                    
                </div>                
            </React.StrictMode>            
        );
    }
}



