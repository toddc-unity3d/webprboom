import React, { Component } from 'react';
import BoomCarousel from './BoomCarousel.js'
import Loading from './Loading.js'

import titleImage from './images/title-large.png';
import footerImage from './images/footer-large.png';
import doom1Image from './images/doom1-1024.png';
import freedoom1Image from './images/freedoom1-1024.png';
import freedoom2Image from './images/freedoom2-1024.png';

import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.carouselRef = React.createRef();
        this.keyUpListener = this.createKeyUpListener();
        this.animationListener = this.createAnimationListener();
    }

    padDown = false;
    firstPoll = true;

    ModeEnum = { "menu": 1, "loading": 2, "loaded": 3 }

    state = {
        mode: this.ModeEnum["menu"],
        loadingPercent: 0
    }

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
            content: <img src={freedoom2Image} alt="3" />
        }
    ]

    componentDidMount() {
        document.addEventListener("keyup", this.keyUpListener);
        requestAnimationFrame(this.animationListener);
        let that = this;
        setTimeout(() => {document.getElementById('root').style.display = 'block'}, 100);
        setTimeout(() => {that.firstPoll = false;}, 200);        
    }

    componentDidUpdate() {
        if (this.state.mode !== this.ModeEnum["menu"]) {
            document.removeEventListener("keyup", this.keyUpListener);
        }
    }

    onGameSelected(key) {        
        let canvas = document.getElementById('GameCanvas');
        let reload = () => { setTimeout(() => {window.location.reload()}, 50); }; 
        window.Module = {
            canvas: canvas,           
            elementPointerLock: true,
            onAbort: (msg) => { alert(msg); reload(); },
            onExit: () => { reload(); },
            setWindowTitle: () => { return window.title; },
            locateFile: (path, prefix) => { return key + "/" + path; },
            setStatus: (status) => {
                let loading = status.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
                if (loading) {
                    let progress = loading[2] / loading[4] * 100;
                    this.setState({ loadingPercent: progress });
                    if (progress === 100) {
                        canvas.style.display = 'block';
                        this.setState({ mode: this.ModeEnum["loaded"] });
                    }
                }
            },
            preRun: [() => {
                const DB = '/idxdb';
                let FS = window.FS;            
                FS.mkdir(DB);            
                FS.mount(FS.filesystems.IDBFS, {}, DB);
                FS.syncfs(true, function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        const GPATH = DB + '/' + key;
                        let res = FS.analyzePath(GPATH, true);
                        if (!res.exists) {
                            FS.mkdir(GPATH);
                        }
                    }    
                });
            }]                    
        }

        var script = document.createElement('script');
        document.body.appendChild(script);
        script.type = 'text/javascript';
        script.src = key + '/' + key + '.js';

        this.setState({ mode: this.ModeEnum["loading"] });
    }

    pollGamepads(that) {
        let carousel = that.carouselRef.current;
        let padDown = that.padDown;
        let gamepads = navigator.getGamepads ?
            navigator.getGamepads() : (navigator.webkitGetGamepads ?
                navigator.webkitGetGamepads : []);
        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                let firstPoll = that.firstPoll;
                that.firstPoll = false;

                let pad = gamepads[i];
                let buttons = pad.buttons;
                if (buttons && buttons.length >= 16) {
                    let hit = true;
                    if (buttons[14].pressed) {
                        if (!padDown) carousel.moveLeft();
                    }
                    else if (buttons[15].pressed) {
                        if (!padDown) carousel.moveRight();
                    }
                    else if (buttons[0].pressed) {
                        if (!padDown && !firstPoll) carousel.select();
                    } else {
                        hit = false;
                    }
                    if (hit) {
                        that.padDown = true;
                        return;
                    }
                }

                let axes = pad.axes;
                if (axes && axes.length >= 1) {
                    let val = axes[0];
                    let hit = true;
                    if (val < -0.5) {
                        if (!padDown) carousel.moveLeft();
                    } else if (val > 0.5) {
                        if (!padDown) carousel.moveRight();
                    } else {
                        hit = false;
                    }
                    if (hit) {
                        that.padDown = true;
                        return;
                    }
                }
            }
        }
        that.padDown = false;
    }

    createAnimationListener() {
        let that = this;
        return () => {
            if (that.state.mode === this.ModeEnum["menu"]) {
                that.pollGamepads(that);
                requestAnimationFrame(that.animationListener);
            }
        }
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

    renderMenu() {
        return (
            <div className="Menu">
                <div className="Header">
                    <img src={titleImage} alt=""></img>
                </div>
                <div className="BoomCarousel-outer">
                    {this.state.mode === this.ModeEnum["loading"] ?
                        <Loading percent={this.state.loadingPercent} /> : null}
                    <BoomCarousel
                        slides={this.slides}
                        ref={this.carouselRef}
                        onSelected={(key) => { this.onGameSelected(key) }}
                    />
                </div>
                <div className="Footer">
                    <img src={footerImage} alt=""></img>
                </div>
            </div>
        );
    }

    render() {
        return (
            <React.StrictMode>
                <div>
                    <canvas id="GameCanvas"></canvas>
                    {this.state.mode !== this.ModeEnum["loaded"] ? this.renderMenu() : null}
                </div>
            </React.StrictMode>
        );
    }
}
