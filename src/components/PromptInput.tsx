import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function PromptInput({ existingPrompt, generateCallback }) {
    const [userInput, setUserInput] = useState(existingPrompt)
    const [apiCalled, setApiCalled] = useState(false)

    const handleUserInput = (input : string) => {
        setUserInput(input);
    }

    const askAI = () => {
        setApiCalled(true);
        generateCallback(userInput);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", my: 4 }}>
            <Typography>Input your text</Typography>
            <TextField
                sx={{ minWidth: 500 }}
                multiline
                rows={8}
                disabled={apiCalled || (existingPrompt != null)} 
                value={userInput}
                onChange={e => handleUserInput(e.target.value)}
                helperText={userInput.length + "/" + 1000}
            />
            <Button onClick={() => askAI()} disabled={existingPrompt != null}>Generate</Button>
        </Box>
    )
}
