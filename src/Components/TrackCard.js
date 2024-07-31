import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions, IconButton, Popover} from '@mui/material';
import { Link } from "react-router-dom";
import AlbumIcon from "@mui/icons-material/Album";
import Box from "@mui/material/Box";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditIcon from '@mui/icons-material/Edit';
import TrackForm from "./TrackForm";
import DeleteIcon from '@mui/icons-material/Delete';
const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta musica?")) return;

    try {
        await fetch(`http://127.0.0.1:8000/api/tracks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export default function TrackCard({ name, duration, album_id, albumName, track_id }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const initialFormState = {
        name: name,
        duration:duration,
        album_id:album_id,
        album_name:albumName,
        track_id:track_id,
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (<>
        <Card
            sx={{
                display: 'flex',
                maxWidth: 600,
                height: 100,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'black'
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flex: 1,
                }}
            >
                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                    {name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeFilledIcon sx={{ color: 'red', marginRight: '0.5rem' }} />
                    <Typography variant="body2" component="div" sx={{ color: 'white' }}>
                        Duração: {formatDuration(duration)}
                    </Typography>
                </Box>
                <Link to={`/album/${album_id}`} style={{ textDecoration: 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AlbumIcon sx={{ color: 'red', marginRight: '0.5rem' }} />
                        <Typography variant="body2" component="div" sx={{ color: 'white' }}>
                            Album: {albumName}
                        </Typography>
                    </Box>
                </Link>
            </CardContent>
            <CardActions
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    padding: '8px'
                }}
            >
                <IconButton aria-label="edit" size="small" onClick={handleClick}>
                    <EditIcon fontSize="inherit" sx={{ color: 'white' }}/>
                </IconButton>
                <IconButton aria-label="edit" size="small" onClick={() => handleDelete(track_id)}>
                    <DeleteIcon fontSize="inherit" sx={{ color: 'white' }}/>
                </IconButton>
            </CardActions>
        </Card>
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
            <TrackForm initialFormState={initialFormState} metodo="PUT" />
        </Popover>
    </>);
}
