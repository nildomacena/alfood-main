import { AppBar, Toolbar, Container, Typography, Box, Link, Button } from "@mui/material";
import { Link as RouterLink, Outlet } from 'react-router-dom';

export default function PaginaBaseAdmin() {
    return (
        <>
            <AppBar position='static'>
                <Container maxWidth='xl' >
                    <Toolbar>
                        <Typography variant='h6'>
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }} >
                            <Link component={RouterLink} to="/admin/restaurantes" >
                                <Button sx={{ my: 2, color: 'white' }} >Restaurantes</Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, color: 'white' }} >Novo restaurante</Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos">
                                <Button sx={{ my: 2, color: 'white' }} >Pratos</Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/novo">
                                <Button sx={{ my: 2, color: 'white' }} >Novo prato</Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet></Outlet>
        </>
    );
}