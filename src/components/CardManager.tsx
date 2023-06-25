import { Box, Button, Card, CardActions, CardContent, Container, Divider, TextField, Typography } from '@mui/material'
import Flashcard from '@/components/Flashcard';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CloseIcon from '@mui/icons-material/Close';
import useSWR, { mutate } from 'swr';

export default function CardManager() {
    const fetcher = () => fetch("/api/flashcard/create").then(res => res.json());
    
    // for testing, clears the cache
    mutate(/* match all keys */() => true, undefined, false)
    const { data, error, isLoading } = useSWR("/api/flashcard/create", fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <>
        <Box>data</Box>
            {/* <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 4 }}>
                <Button onClick={() => deselectAllCards()}><CloseIcon /></Button>
                <Typography>{selectedCards.size}/{resultArray.length} items selected</Typography>
                <Button onClick={() => selectAllCards()}><ChecklistIcon /></Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 2 }}>
                <Button
                    disabled={selectedCards.size == 0}
                    variant='contained'
                    onClick={() => exports()}
                >Export Selected</Button>
            </Box>

            <Box>
                {resultArray.map((result, index) => <Flashcard key={index} id={index} selected={selectedCards.has(index)} front={result.question} back={result.answer} onSelect={(id, selected) => onSelectCard(id, selected)} />)}
            </Box> */}

        </>
    )
}
