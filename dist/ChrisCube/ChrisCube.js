import React, { PureComponent } from 'react';
import { initGl } from './gl';
export default class ChrisCube extends PureComponent {
    constructor(props) {
        super(props);
        const randomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        this.id = `chris-cube-${randomNumber}`;
    }
    componentDidMount() {
        setTimeout(() => initGl(this.id), 1);
    }
    render() {
        const { width, height } = this.props;
        return (React.createElement("canvas", { id: this.id, width: width, height: height }));
    }
}
