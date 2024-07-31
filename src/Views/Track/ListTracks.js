import React,{useState,useEffect} from 'react';
import {
    CircularProgress,
    Grid,
    IconButton,
    InputBase,
    Pagination
} from "@mui/material";
import Box from "@mui/material/Box";
import TrackCard from "../../Components/TrackCard";
import Navbar from "../../Components/Navbar";
import PopoverButton from "../../Components/PopoverButton";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { useAlert } from '../../Components/AlertContext';
import Typography from "@mui/material/Typography";

export default function ListTracks() {

    const [tracks, setTracks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const { showAlert } = useAlert();

    const initialFormState = {
        name: '',
        duration:'',
        album_id:'',
    }
    const getTracks = async (page = 1) => {
        setLoading(true);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tracks?page=${page}&name=${searchName}`);
            const data = await response.json();

            setTracks(data.data || []);
            setCurrentPage(data.current_page || 1);
            setLastPage(data.last_page || 1);
        } catch (error) {
            showAlert('Erro ao obter dados', 'error');
            console.error('Erro ao obter dados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTracks();
        // eslint-disable-next-line
    }, [searchName]);

    const handlePageChange = (event,page) => {
        getTracks(page);
    };
    const handleInputChange = (event) => {
        setSearchName(event.target.value);
    };


    return (<>
        <Navbar/>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {loading && <CircularProgress/>}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
            <Typography variant="h3" component="div" sx={{ display: 'flex'}}>
                Faixas
            </Typography>
            <Paper
                elevation={9}
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 340 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Busque pelo nome da musica"
                    inputProps={{ 'aria-label': 'busque nome' }}
                    value={searchName}
                    onChange={handleInputChange}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <PopoverButton type="track" initialFormState={initialFormState} />
        </Box>
        <div>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.isArray(tracks) && tracks.length > 0 ? (
                    tracks.map((track, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <TrackCard name={track.name} duration={track.duration}
                                       album_id={track.album_id} track_id={track.id} albumName={track.album_name}/>
                        </Grid>
                    ))
                ) : (
                    <p>Nenhum album encontrado.</p>
                )}
            </Grid>
        </div>
        <div>
            <Pagination
                count={lastPage}
                page={currentPage}
                onChange={handlePageChange}
            />
        </div>

    </>);
}