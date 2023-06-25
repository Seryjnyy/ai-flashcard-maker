import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "red" }}>
      <AppBar position='static'>
        <Toolbar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
