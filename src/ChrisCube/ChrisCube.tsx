import React, { PureComponent } from 'react';

import { initGl } from './gl';

interface Props {
  width: number;
  height: number;
}

export default class ChrisCube extends PureComponent<Props> {
  private id: string;

  constructor(props: Props) {
    super(props);
    const randomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    this.id = `chris-cube-${randomNumber}`;
  }

  componentDidMount() {
    initGl(this.id);
  }

  render() {
    const { width, height } = this.props;

    return (
      <canvas id={this.id} width={width} height={height}></canvas>
    )
  }
}
