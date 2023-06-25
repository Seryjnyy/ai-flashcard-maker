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

export default function Cardmaker() {
  const [userInput, setUserInput] = useState("")

  const [resultArray, setResultArray] = useState([

  ])
  const [selectedCards, setSelectedCards] = useState(new Set());

  const fetcher = () => fetch("/api/flashcard/create").then(res => res.json());

  const onSelectCard = (id : number, selected : boolean) => {
    setSelectedCards(prevState => {
      let temp = new Set();

      prevState.forEach(value => {
        temp.add(value);
      });

      if(selected){
        temp.add(id);
      }else{
        temp.delete(id);
      }

      return temp;
    })
  }

  // const { data, error, isLoading } = useSWR(false ? '/api/flashcard/create' : null, fetcher)

  useEffect(() => {
    console.log(selectedCards)
  }, [selectedCards])


  const selectAllCards = () => {
    setSelectedCards(new Set(resultArray.map((result, index) => index)));
  }

  const deselectAllCards = () => {
    setSelectedCards(new Set());
  }

  const exports = () => {
    let newStuff :string[] = []
    resultArray.forEach(value => {
      newStuff.push(value.question + ";")
      newStuff.push(value.answer + ";")
      newStuff.push("\n");
    });

    console.log(newStuff)

    var file = new Blob(newStuff, { type: "text/plain" });
    const nav = (window.navigator as any);

    if (nav.msSaveOrOpenBlob) // IE10+
       nav.msSaveOrOpenBlob(file, "stuff.txt");
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = "stuff.txt";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
  }

  const askAI = () => {
    setTimeout(() =>  {
      fetch("/api/flashcard/create").then(res => res.json()).then(res => setResultArray(res));
  
    }, 3000);

  }

  const handleUserInput = (input : string) => {
    setUserInput(input);
  }

  return (
    <Container>
      <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", my:4}}>
        <TextField
          sx={{minWidth:500}}
          multiline
          rows={8}
          value={userInput}
          onChange={e => handleUserInput(e.target.value)}
          helperText={userInput.length + "/" + 1000}
        />
        <Button onClick={() => askAI()}>Generate</Button>
      </Box>

      <Box sx={{display:"flex", justifyContent:"space-evenly", mt:4}}>
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
      </Box>

      <Box>
        {resultArray.map((result, index) => <Flashcard key={index} id={index} selected={selectedCards.has(index)} front={result.question} back={result.answer} onSelect={(id, selected) => onSelectCard(id, selected)}/>)}
      </Box>
    
      <CardManager/>
    </Container>
  )
}
