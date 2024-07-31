import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import TrackCard from "../../Components/TrackCard";
import Navbar from "../../Components/Navbar";
import {useAlert} from "../../Components/AlertContext";

export default function ViewAlbum() {

    const params = useParams();
    const id = params.id;

    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();

    useEffect(() => {
        const getAlbum = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/albums/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                });

                if (response.ok) {
                    const data = await response.json();
                    setAlbum(data);
                } else {
                    showAlert('Erro ao obter dados', 'error');
                    console.error(`Erro ao buscar dados: ${response.status}`);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getAlbum();
    }, [id]);

    if (loading) {
        return <p>Carregando</p>;
    }


    return (<>
        <Navbar/>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto',
            }}
        >
            <Paper
                elevation={9}
                sx={{
                    width: 800,
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop:'1rem',
                    padding: 2,
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h3" component="h3">
                    {album.name}
                </Typography>
                <Typography variant="h5" component="h5">
                    {album.release_year}
                </Typography>
                <div>
                    <Grid container spacing={{xs: 2, md: 3}} columns={12}>
                        {Array.isArray(album.tracks) && album.tracks.length > 0 ? (
                            album.tracks.map((track, index) => (
                                <Grid item xs={6}  key={index}>
                                    <TrackCard name={track.name} duration={track.duration}
                                               album_id={album.id} albumName={album.name} track_id={track.id}/>
                                </Grid>
                            ))
                        ) : (
                            <p>Nenhum album encontrado.</p>
                        )}
                    </Grid>
                </div>
            </Paper>
        </Box>
    </>);
}
