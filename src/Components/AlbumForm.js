import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useAlert } from './AlertContext';

export default function AlbumForm({ initialFormState, metodo }) {
    const [name, setName] = useState(initialFormState.name || '');
    const [release_year, setReleaseYear] = useState(initialFormState.release_year || '');
    const { showAlert } = useAlert();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const releaseYearInt = parseInt(release_year, 10);

        let url = 'http://127.0.0.1:8000/api/albums';
        let message = "Album criado com sucesso!";
        if (metodo === 'PUT' && initialFormState.album_id) {
            url = `${url}/${initialFormState.album_id}`;
            message = "Album editado com sucesso!"
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
                    release_year: releaseYearInt
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            } else {
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
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="outlined-required-name"
                        label="Nome"
                        defaultValue={initialFormState.name}
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
                        label="Ano de lançamento"
                        defaultValue={initialFormState.duration}
                        fullWidth
                        value={release_year}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        sx={{ marginBottom: '1rem' }}
                    />
                </Grid>
            </Grid>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '0.5rem',
                    right: '1rem',
                }}
            >
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    {metodo === 'PUT' ? 'Editar álbum' : 'Criar álbum'}
                </Button>
            </Box>
        </Paper>
    );
}
