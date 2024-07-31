import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Autocomplete, Button, FormControl, FormHelperText, Grid, TextField} from "@mui/material";
import { useEffect, useState } from "react";
import { useAlert } from './AlertContext';

export default function TrackForm({ initialFormState, metodo }) {

    const [name, setName] = useState(initialFormState.name || '');
    const [duration, setDuration] = useState(initialFormState.duration || '');
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [albums, setAlbums] = useState([]);
    const { showAlert } = useAlert();

    const getAlbums = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/all-albums');
            const data = await response.json();
            setAlbums(data);
        } catch (error) {
            showAlert('Erro ao obter dados', 'error');
        }
    };

    useEffect(() => {
        getAlbums();
    }, []);

    useEffect(() => {
        if (initialFormState.album_id) {
            const album = albums.find(album => album.id === initialFormState.album_id);
            setSelectedAlbum(album);
        }
    }, [initialFormState.album_id, albums]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let url = 'http://127.0.0.1:8000/api/tracks';
        let message = "Musica criada com sucesso!";

        if (metodo === 'PUT' && initialFormState.track_id) {
            url = `${url}/${initialFormState.track_id}`;
            message = "Musica editada com sucesso!"
        }
        try {
            const response = await fetch(url, {
                method: metodo,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    duration,
                    album_id: selectedAlbum ? selectedAlbum.id : null
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }else{
                showAlert(message, 'success');
            }

        } catch (error) {
            showAlert('Erro ao realizar a operação', 'error');
            console.error('Error submitting data:', error);
        }
    };

    return (
        <Paper
            elevation={9}
            sx={{
                width: 600,
                height: 'auto',
                padding: '2rem',
                position: 'relative'
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="outlined-required-name"
                        label="Nome"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ marginBottom: '1rem' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="outlined-required-duration"
                        label="Duração"
                        fullWidth
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        sx={{ marginBottom: '1rem' }}
                    />
                    <FormHelperText>
                        Informe a duração em segundos.
                    </FormHelperText>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            disablePortal
                            id="autocomplete-albums"
                            options={albums}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => setSelectedAlbum(newValue)}
                            renderInput={(params) => <TextField {...params} label="Álbum" fullWidth />}
                            value={selectedAlbum}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                }}
            >
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    {metodo === 'PUT' ? 'Editar música' : 'Criar música'}
                </Button>
            </Box>
        </Paper>
    );
}
