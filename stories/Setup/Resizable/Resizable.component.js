import React from 'react';
import Resizable from 're-resizable';
import styled from 'styled-components';

import { renderWithPaperScope, PaperContainer, Circle } from 'src';

import { ref } from '../../shared';
import * as styles from './Resizable.style';

const Container = styled(Resizable)`
  ${styles.container}
`;

export default class extends React.Component {
  state = {
    width: styles.canvas.width,
    height: styles.canvas.height,
  }

  onResizeStop = (event, direction, refToElement) => {
    const width = refToElement.clientWidth;
    const height = refToElement.clientHeight;
    Object.assign(this.container.paper.view.viewSize, { width, height });
  }

  setContainer = container => { this.container = container; };

  render() {
    return (
      <Container defaultSize={{ width: 'calc(100% - 10px)' }} onResizeStop={this.onResizeStop}>
        <PaperContainer
          ref={this.setContainer}
          canvasProps={{
            resize: 'true',
            style: {
              width: this.state.width,
              height: this.state.height,
            },
          }}
          viewProps={container => ({
            onResize: () => {
              const { width, height } = container.paper.view.viewSize;
              this.setState({ width: `${width}px`, height: `${height}px` });
            },
          })}
        >
          {renderWithPaperScope(paper => {
            const { x, y } = paper.view.center;
            return (
              <Circle
                ref={ref}
                radius={30}
                center={[x, y]}
                strokeColor="black"
              />
            );
          })}
        </PaperContainer>
      </Container>
    );
  }
}
