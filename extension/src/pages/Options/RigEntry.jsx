import React from 'react';
import Box from '@mui/material/Box';
import {TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const RigEntry = (props) => {
    return (
        <div>
            <h1>Rig Configuration</h1>
            <TextField
                required
                id="rig-name"
                label="Name"
            />

            <h2>Connection Settings</h2>
            <FormControl>
                <InputLabel id="rig-type-label">Connection Type</InputLabel>
                <Select
                    labelId="rig-type-label"
                    id="rig-type"
                    label="Type"
                >
                    <MenuItem value="rigctld">Rigctld</MenuItem>
                    <MenuItem value="gqrx">Gqrx or legacy Rigctld</MenuItem>
                </Select>
            </FormControl>

            <TextField
                required
                id="rig-connection-host"
                label="Host"
            />
            <TextField
                required
                id="rig-connection-port"
                label="Port"
            />

        </div>
    );
};

export default RigEntry;