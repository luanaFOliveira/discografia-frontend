import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, IconButton, Popover } from '@mui/material';
import { Link } from "react-router-dom";
import AlbumIcon from '@mui/icons-material/Album';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AlbumForm from "./AlbumForm";

const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta música?")) return;

    try {
        await fetch(`http://127.0.0.1:8000/api/albums/${id}`, {
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
};

export default function AlbumCard({ name, year, album_id }) {
    const initialFormState = {
        name: name,
        release_year: year,
        album_id:album_id,
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        handleDelete(album_id);
    };

    return (
        <>
            <Card sx={{ maxWidth: 345, backgroundColor: 'black', display: 'flex', alignItems: 'stretch', position: 'relative' }}>
                <Link to={`/album/${album_id}`} style={{ textDecoration: 'none', display: 'flex', width: '100%' }}>
                    <CardActionArea sx={{ display: 'flex', alignItems: 'stretch', flexDirection: 'row' }}>
                        <AlbumIcon sx={{ color: 'red', fontSize: 50, alignSelf: 'center', margin: '0 1rem' }} />
                        <CardContent sx={{ backgroundColor: 'black', flex: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                                {name}
                            </Typography>
                            <Typography gutterBottom variant="h7" component="div" sx={{ color: 'white' }}>
                                {year}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        padding: '8px'
                    }}
                >
                    <IconButton aria-label="edit" size="small" onClick={handleClick}>
                        <EditIcon fontSize="inherit" sx={{ color: 'white' }} />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={handleDeleteClick}>
                        <DeleteIcon fontSize="inherit" sx={{ color: 'white' }} />
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
                <AlbumForm initialFormState={initialFormState} metodo="PUT" />
            </Popover>
        </>
    );
}
