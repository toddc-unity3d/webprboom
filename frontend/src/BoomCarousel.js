import React, { Component } from 'react';
import { config } from "react-spring";
import Carousel from 'react-spring-3d-carousel';

import doom1Image from './images/doom1.png';
import freedoom1Image from './images/freedoom1.png';

import './BoomCarousel.css';

export default class BoomCarousel extends Component {
    state = {
        goToSlide: 0,
    };

    slides = [
        {
            key: "doom1",
            content: <img src={doom1Image} alt="1" />
        },
        {
            key: "freedoom1",
            content: <img src={freedoom1Image} alt="2" />
        },
        {
            key: "freedoom2",
            content: <img src={freedoom1Image} alt="3" />
        }
    ].map((slide, index) => {
        return { 
            ...slide, 
            onClick: () => {
                if (this.state.goToSlide === index) {
                    this.onSelected(slide.key);
                }
                this.setState({ goToSlide: index });
            }
        };
    });

    onSelected(key) {
        if (this.props.onSelected) {
            this.props.onSelected(key);
        }
    }

    moveRight() {
        let slide = this.state.goToSlide;
        slide++;
        if (slide === this.slides.length) {
            slide = 0;
        }
        this.setState({ goToSlide: slide });
    }

    moveLeft() {
        let slide = this.state.goToSlide;
        slide--;
        if (slide < 0) {
            slide =  this.slides.length - 1;
        }
        this.setState({ goToSlide: slide });
    }

    select() {
        this.onSelected(this.slides[this.state.goToSlide].key);        
    }

    render() {
        return (        
            <Carousel
                slides={this.slides}
                offsetRadius={2}
                animationConfig={config.gentle}
                goToSlide={this.state.goToSlide}                
            />            
        )
    }    
}
