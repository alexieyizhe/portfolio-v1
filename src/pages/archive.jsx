import React from 'react';
import styled from 'styled-components';
import { isIOS } from 'react-device-detect';

import { mediaSize } from '../data/configOptions';
import TemplateWrapper from '../components/TemplateWrapper';
import Icon from '../components/Icon';
import { archiveSiteList, archiveHeader } from '../data/archiveData';

const Header = styled.div`
  display: inline-block;
  margin-bottom: 0.5em;
  font-size: 8vh;
  font-weight: bold;

  ${mediaSize.tablet`
    font-size: 4em;
    letter-spacing: ${isIOS ? '-0.05em' : 0};
    margin-bottom: 1em;
  `} ${mediaSize.phone`
    font-size: 3em;
  `};
`;

const PageLink = styled.a`
  display: block;
  color: inherit;
  line-height: 2;
  font-size: 2em;

  ${mediaSize.tablet`
    font-size: 2em;
  `} ${mediaSize.phone`
    font-size: 5vw;
  `};
`;

const Disclaimer = styled.div`
  margin-top: 5em;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  border: 2px dashed #e8a40d;
  padding: 2%;

  ${mediaSize.phone`
    padding: 5%;
  `} & h3 {
    margin: 0;
    padding: 0 0 5px 0;
  }
`;

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TemplateWrapper
        title="Archive"
        menu
        footer
        curPage="Archive"
        outerBounds={{ top: '7%', left: '15%', right: '15%', bottom: '0' }}
      >
        <Header className="navMenu">{archiveHeader}</Header>
        <div style={this.props.transition && this.props.transition.style}>
          {archiveSiteList.map((snapshot, i) => (
            <PageLink key={i} href={snapshot.url}>
              {snapshot.name}
            </PageLink>
          ))}
        </div>
        <Disclaimer>
          <Icon name="alertTriangle" size="2em" color="#E8A40D" /> <br />
          <h3>
            <b>Disclaimer</b>
          </h3>{' '}
          Projects and links in the archive may be horribly broken,
          non-functional, or just plain bad code. Alex assumes no responsibility
          for any emotional or physical trauma that may result from visiting
          these links. Proceed at your own risk. <br />
          ¯\_(ツ)_/¯
        </Disclaimer>
      </TemplateWrapper>
    );
  }
}

export default ArchivePage;
