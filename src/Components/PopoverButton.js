import React from 'react';
import {Fab,Popover} from "@mui/material";
import Box from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import TrackForm from "./TrackForm";
import AlbumForm from "./AlbumForm";
export default function PopoverButton({type,initialFormState}) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (<>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            padding:'1rem',
        }}>
            <Fab color="secondary" aria-label="add" onClick={handleClick}>
                <AddIcon />
            </Fab>
        </Box>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            {type === 'track' ? (
                <TrackForm initialFormState={initialFormState} metodo="POST" />
            ) : (
                <AlbumForm initialFormState={initialFormState} metodo="POST" />
            )}
        </Popover>
    </>);
}