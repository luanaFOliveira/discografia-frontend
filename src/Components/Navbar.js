import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import AlbumIcon from '@mui/icons-material/Album';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, display: 'flex', gap: 2}}>
                        <Button
                            variant="outlined"
                            startIcon={<AlbumIcon sx={{color: 'red'}}/>}
                            sx={{borderColor: 'red', color: 'white', marginRight: 2}}
                        >
                            <Link to={`/albums`} style={{textDecoration: 'none', color: 'white'}}>Albuns</Link>
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<LibraryMusicIcon sx={{color: 'red'}}/>}
                            sx={{borderColor: 'red', color: 'white'}}
                        >
                            <Link to={`/tracks`} style={{textDecoration: 'none', color: 'white'}}>Musicas</Link>
                        </Button>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', gap: 2}}>
                        Discografia dupla caipira Tiao Carreiro e Pardinho
                    </Typography>
                    <Avatar alt="Remy Sharp"
                            src="https://d3alv7ekdacjys.cloudfront.net/Custom/Content/Products/11/01/1101870_tiao-carreiro-e-pardinho-golpe-de-mestre-cd-sertanejo-ms_m1_637383509900618818.jpg"/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
