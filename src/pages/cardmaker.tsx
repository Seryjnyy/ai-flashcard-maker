import { Box, Button, Card, CardActions, CardContent, Container, Divider, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ChecklistIcon from '@mui/icons-material/Checklist';
import CloseIcon from '@mui/icons-material/Close';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Flashcard from '@/components/Flashcard';
import useSWR from 'swr';
import CardManager from '@/components/CardManager';
import FlashcardMaker from '@/components/FlashcardMaker';

export default function Cardmaker() {
  const [userInput, setUserInput] = useState("")

  const textInputPrompt = `They are hashed instead of encrypted
  - hash functions take in text and produced a fixed length hashed text
  - it is one way, therefore you can't get the original text from the hashed value
  - passwords are salted to prevent the hacker from using a cracked password to access other passwords
      - salting includes adding a string to the password
      - as hashing will produce the same hashed string for the same input, the salt randomises it 
  - brute force hacking and dictionary attacks
  - recommendations from experts
      - update software
          - they usually fix and exploits 
      - use a password manager
          - it will generate very strong passwords that you do not need to remember.
          - will probably also inform you if your password was involved in a breach 
      - strong password`;

  const [apiCalled, setApiCalled] = useState(false)

  const handleUserInput = (input : string) => {
    setUserInput(input);
  }

  const askAI = () => {
    // check user input

    setApiCalled(true)
  }

  return (
    <Container>


      {/* <Box sx={{display:"flex", justifyContent:"space-evenly", mt:4}}>
        <Button onClick={() => deselectAllCards()}><CloseIcon/></Button>
        <Typography>{selectedCards.size}/{resultArray.length} items selected</Typography>
        <Button onClick={() => selectAllCards()}><ChecklistIcon/></Button>
      </Box>

      <Box sx={{display:"flex", justifyContent:"space-evenly", mt:2}}>
        <Button
        disabled={selectedCards.size == 0}
        variant='contained'
        onClick={() => exports()}
        >Export Selected</Button>
      </Box> */}

      {/* <Box>
        {resultArray.map((result, index) => <Flashcard key={index} id={index} selected={selectedCards.has(index)} front={result.question} back={result.answer} onSelect={(id, selected) => onSelectCard(id, selected)}/>)}
      </Box> */}
    
       
      {/* <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", my:4}}>
        <Typography>Input your text</Typography>
        <TextField
          sx={{minWidth:500}}
          multiline
          rows={8}
          disabled={apiCalled}
          value={userInput}
          onChange={e => handleUserInput(e.target.value)}
          helperText={userInput.length + "/" + 1000}
        />
        <Button onClick={() => askAI()}>Generate</Button>
      </Box>
      {apiCalled ? <CardManager userInputPrompt={textInputPrompt}/> : <></>} */}
      <FlashcardMaker></FlashcardMaker>
    </Container>
  )
}
