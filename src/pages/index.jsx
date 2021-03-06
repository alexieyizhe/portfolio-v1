/*
  INDEX.JS
    The main page of the website.
    It exists at the root of the site and serves
    as the landing page for users.
*/

import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import Particles from 'react-particles-js';
import { isMobile, isIOS } from 'react-device-detect';
import {
  mediaSize,
  greetingOptions,
  particleConfig
} from '../data/configOptions';
import TemplateWrapper from '../components/TemplateWrapper';
import SVGDrawIcon from '../components/SVGDrawIcon';
import ScrambleText from '../components/ScrambleText';
import Icon from '../components/Icon';

// Style of the particles.js background container
const ParticlesStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  zIndex: '-2'
};

// React-pose configuration that provides a fade on enter transition
const fadeEnterConfig = {
  enter: {
    opacity: 0
  },
  normal: {
    opacity: 1,
    transition: { duration: 2500 }
  }
};

const Greeting = styled(posed.div(fadeEnterConfig))`
  font-size: 5vh;
  margin-top: 16%;
`;

const MainInfoText = styled(posed.div(fadeEnterConfig))`
  letter-spacing: 0;
  font-family: 'Expletus Sans', sans-serif;
  font-weight: bold;
  font-size: 13vh;
  text-shadow: 0 0 0;

  ${mediaSize.tablet`
    letter-spacing: ${isIOS ? '-0.05em' : 0};
    font-weight: 500;
    line-height: 1.1em;
    margin-top: 1vh;
  `};
`;

const BriefBioText = styled(posed.div(fadeEnterConfig))`
  font-size: 3vh;
  font-weight: 300;
  color: #656565;
  margin-top: -1em;

  ${mediaSize.phone`
    margin-top: 0;
  `};
`;

const ImportantInfo = styled(posed.div(fadeEnterConfig))`
  position: absolute;
  bottom: 10%;
  left: 0;

  ${mediaSize.tablet`
    position: relative;
    bottom: 0;
    margin-top: 2vh;
  `} ${mediaSize.phone`
    position: relative;
    bottom: 0;
    margin-top: 2vh;
  `}

  & a {
    color: inherit;
    margin-bottom: 2vh;
    margin-left: 1vh;
    margin-right: 1vh;
  }

  & a:first-child {
    margin-left: 0;
  }
`;

const MainPagePic = styled(posed.div(fadeEnterConfig))`
  position: absolute;
  bottom: 0;
  right: -10%;
  width: 70%;
  z-index: -1;

  ${mediaSize.phone`
    width: 105%;
  `};
`;

const Logo = posed.img({
  enter: {
    x: -200,
    opacity: 0
  },
  normal: {
    x: 0,
    opacity: 1,
    transition: { duration: 500 }
  }
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconAnimate: false,
      greeting:
        greetingOptions[Math.floor(Math.random() * greetingOptions.length)]
      // Load a new random greeting on every page load
    };
  }

  componentDidMount() {
    if (isMobile) {
      // Automatically animates the SVG icons after a set time
      // on devices with no hover capability (mobile devices)
      this.iconAnimateID = setTimeout(() => {
        this.setState({ iconAnimate: true });
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (this.iconAnimateID) {
      clearTimeout(this.iconAnimateID);
    }
  }

  render() {
    return (
      <div
        id="particleBgContainer"
        style={this.props.transition && this.props.transition.style}
      >
        <Particles params={particleConfig} style={ParticlesStyle} />
        <TemplateWrapper
          menu={{ default: true, prompt: true }}
          curPage="Home"
          outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}
          title="Alex Xie"
        >
          <Logo
            src="/img/misc/logo.png"
            initialPose={'enter'}
            pose={'normal'}
          />
          {/* NOTE: script font in logo is BarleyScript */}
          <Greeting initialPose="enter" pose="normal">
            {`${this.state.greeting} I'm`}
          </Greeting>
          <MainInfoText initialPose="enter" pose="normal">
            <ScrambleText
              text="Alex Xie."
              scramble="!<>-_\\/[]{}—=+*^?#_abiwxevpi"
              options={{ duration: 250, speed: 15 }}
            />
          </MainInfoText>
          <BriefBioText initialPose="enter" pose="normal">
            <div>web developer.</div>
            <div>opportunity pursuer.</div>
            <div>soccer fanatic.</div>
            <div>lover of bad puns.</div>
          </BriefBioText>
          <ImportantInfo initialPose="enter" pose="normal">
            <a
              href="mailto:alexieyizhe@gmail.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <SVGDrawIcon
                animate={this.state.iconAnimate}
                ignoreHover={isMobile}
              >
                <Icon name="paperPlane" size="3.5vh" color="#80D07F" />
              </SVGDrawIcon>
            </a>
            <Link to="/resume">
              <SVGDrawIcon
                animate={this.state.iconAnimate}
                ignoreHover={isMobile}
              >
                <Icon name="file" size="3.5vh" color="#DE7947" />
              </SVGDrawIcon>
            </Link>
            <a
              href="https://github.com/alexieyizhe"
              target="_blank"
              rel="noreferrer noopener"
            >
              <SVGDrawIcon
                animate={this.state.iconAnimate}
                ignoreHover={isMobile}
              >
                <Icon name="github" size="3.5vh" color="#5534AC" />
              </SVGDrawIcon>
            </a>
            <a
              href="https://www.linkedin.com/in/alexieyizhe/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <SVGDrawIcon
                animate={this.state.iconAnimate}
                ignoreHover={isMobile}
              >
                <Icon name="linkedin" size="3.5vh" color="#2381D9" />
              </SVGDrawIcon>
            </a>
          </ImportantInfo>
          <MainPagePic initialPose="enter" pose="normal">
            <Img sizes={this.props.data.mainImage.sizes} />
          </MainPagePic>
        </TemplateWrapper>
      </div>
    );
  }
}

export default HomePage;

// Loads main image on page
export const pageQuery = graphql`
  query HomeQuery {
    mainImage: imageSharp(id: { regex: "/index_main.png/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`;
