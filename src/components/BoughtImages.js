import React, { Component } from 'react';
import StackGrid, { transitions, easings } from "react-stack-grid";
import {Link } from "react-router-dom";
import '../css/grid_style.css'
import '../css/normalize.css'

// import StackGrid, { transitions, easings } from '../../../src/';


const transition = transitions.scaleDown;

const images_src = [
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq5awRDOJvuFKk2mH2aWhCb0InqvLQ5yXylbuujXbTm-XcqIotPA&s', text : 'image 1'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2qolld84RI93_6EHatE3q80f1r7-bnDSEGcPgldWquqBE4aQ6Bg&s', text : 'image 2'},        
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDdP23eN4dlTp4XqbDPawFV75zsz6X65Fhe-9QI8xMdUobf3VNHA&s', text : 'image 3'},
        {src:'https://i.pinimg.com/originals/0d/d4/15/0dd415c0b4b3a5a51aa2f68faf1030fa.png', text : 'image 4'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2fFbKENtixKBRHjCQVpfixejCCN8F-5gnEVduwMjz3d8ukyBV&s', text : 'image 5'},
        {src:'https://i.pinimg.com/originals/f8/93/2f/f8932f4b00aac09a768c21097dd95e13.png', text : 'image 6'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK9HhXtX8Ty5ul4fMW8AFH2r6ZmKxQfhzOFzQ_hMtm0PI_E37k&s', text : 'image 7'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXvNznw7cf7MJylpyKDCw5zi1lhu0hQVpfYTw2e0neIxfkabZ&s', text : 'image 8'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJoSyfgBNG3lWbhLRycVO6Dgt0Q2CsmhTUZdr95998VpxS_ea&s', text : 'image 9'},
        {src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSutxiOqCMhtxOGbfHjoo8bzpDYPQMd2-YK6Fzlb7Wul_0_mcn3Gw&s', text: 'image 10'},
        {src:'https://images-na.ssl-images-amazon.com/images/I/4146UT14vTL.jpg', text: 'image 11'},
        {src:'https://66.media.tumblr.com/f0601355c52c71e6aa5da7b351f8e003/tumblr_nph04p5qzC1twe2yno1_1280.png', text: 'image 11'},
        {src:'https://pbs.twimg.com/media/Dy9y52lXgAAZ79H.jpg', text: 'image 12'},
        {src: 'https://i.pinimg.com/originals/b1/b1/28/b1b1288ef2d24d49bf592098732695ab.png', text: 'image 13'}        
        ]

class BoughtImages extends Component{
    constructor(props) {
        super(props);
        this.state = {
            posts_id : [
                0,1,2,3,4
            ]
        };
    }

    render(){

        return(
            <StackGrid
                monitorImagesLoaded
                columnWidth={300}
                duration={600}
                gutterWidth={15}
                gutterHeight={15}
                easing={easings.cubicOut}
                appearDelay={60}
                appear={transition.appear}
                appeared={transition.appeared}
                enter={transition.enter}
                entered={transition.entered}
                leaved={transition.leaved}
            >
                {images_src.map(
                    element => (
                        <figure key={element.src} className="image">
                            <Link to="/test">
                                <img src={element.src} alt={element.text}/>  
                                {/* <figcaption>{element.text}</figcaption> */}
                            </Link>
                        </figure>
                        
                    )
                )}
            </StackGrid>
        
        );
    }
    
}

export default BoughtImages;
