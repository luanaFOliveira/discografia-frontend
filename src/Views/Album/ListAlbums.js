import React,{useState,useEffect} from 'react';
import {CircularProgress, Grid, IconButton, InputBase, Pagination} from "@mui/material";
import Box from "@mui/material/Box";
import AlbumCard from "../../Components/AlbumCard";
import SearchIcon from '@mui/icons-material/Search';
import Paper from "@mui/material/Paper";
import Navbar from "../../Components/Navbar";
import PopoverButton from "../../Components/PopoverButton";
import {useAlert} from "../../Components/AlertContext";
import Typography from "@mui/material/Typography";

export default function ListAlbums() {

    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const { showAlert } = useAlert();

    const initialFormState = {
        name: '',
        release_year:'',
    }
    const getAlbums = async (page = 1) => {
        setLoading(true);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/albums?page=${page}&name=${searchName}`);
            const data = await response.json();

            setAlbums(data.data);
            setLastPage(data.last_page);
            setCurrentPage(page);
        } catch (error) {
            showAlert('Erro ao obter dados', 'error');
            console.error('Erro ao obter dados:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAlbums();
        // eslint-disable-next-line
    }, [searchName]);

    const handlePageChange = (event,page) => {
        getAlbums(page);
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
                Albuns
            </Typography>
            <Paper
                elevation={9}
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 340 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Busque pelo nome do album"
                    inputProps={{ 'aria-label': 'busque nome' }}
                    value={searchName}
                    onChange={handleInputChange}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <PopoverButton type="album" initialFormState={initialFormState} />
        </Box>
        <Box sx={{
            padding:'2rem',
        }}>
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.isArray(albums) && albums.length > 0 ? (
                    albums.map((album, index) => (
                        <Grid item xs={2} sm={2} md={3} key={index}>
                            <AlbumCard name={album.name} year={album.release_year} album_id={album.id}/>
                        </Grid>
                    ))
                ) : (
                    <p>Nenhum album encontrado.</p>
                )}
            </Grid>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Pagination
                    count={lastPage}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Box>
        </Box>
    </>);
}