import { Box, Button, Card, CardActions, CardContent, Divider, TextField, Typography } from '@mui/material'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';

type FlashcardProps = {
    id : number,
    selected: boolean,
    front: string,
    back: string,
    onSelect: (id : number, selected : boolean) => void;
  };

export default function Flashcard({id, selected, front, back, onSelect} : FlashcardProps){

    const handleSelect = () => {
        onSelect(id, !selected);
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                <CardContent>
                    <Typography variant='h6'>Front</Typography>
                    <Typography>{front}</Typography>
                    {/* <TextField
                        label=""
                        value={front}
                        multiline={true}
                        rows={4}
                        id="standard-size-normal"
                        variant="standard"
                        fullWidth
                    /> */}
                    <Divider sx={{my:2}}/>
                    <Typography variant='h6'>Back</Typography>
                    <Typography>{back}</Typography>
                    {/* <TextField
                        label=""
                        value={back}
                        multiline={true}
                        rows={4}
                        id="standard-size-normal"
                        variant="standard"
                        fullWidth
                    /> */}
                </CardContent>
                <CardActions>
                    <Button onClick={handleSelect}>{selected ? <CheckCircleIcon /> : <PanoramaFishEyeIcon />}</Button>
                </CardActions>

            </Card>
        </Box>
    )
}
