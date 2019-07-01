import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export default class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newDevice: {
                macAddress: ''
            }
        };
    }

    handleSelectChange = ({ target }) => {
        const device = { macAddress: target.value };
        this.setState({ newDevice: device });
    }

    onAddDeviceClick = () => {
        this.props.onClick(this.props.user.id, this.state.newDevice);
        this.setState({ newDevice: { macAddress: '' } });
    }

    render() {
        const { user, devices } = this.props;

        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{user.givenName} {user.familyName}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="age-simple">Device</InputLabel>
                                <Select value={this.state.newDevice.macAddress} onChange={this.handleSelectChange} inputProps={{ name: 'macAddress', id: 'macAddress' }}>
                                    {devices.map(device => (
                                        <MenuItem key={device.macAddress} value={device.macAddress}>{device.macAddress}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={this.onAddDeviceClick}>Add device</Button>
                            <List>
                                {user.devices.map(device => (
                                    <ListItem key={device.macAddress}>
                                        <Icon>settings_input_antenna</Icon>
                                        <ListItemText>{device.macAddress}</ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}