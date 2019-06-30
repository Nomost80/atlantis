import React, { Component } from 'react';
import { getDevices } from '../api';

export default class DeviceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: []
        };
    }

    async componentDidMount() {
        const devices = await getDevices();
        this.setState({ devices });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.devices.map(device => <li>{device.macAddress}</li>)}
                </ul>
            </div>
        )
    }
}