import { Box, Button, Card, CardActions, CardContent, Container, Divider, TextField, Typography } from '@mui/material'
import Flashcard from '@/components/Flashcard';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CloseIcon from '@mui/icons-material/Close';
import useSWR, { mutate } from 'swr';
import { useEffect, useState } from 'react';

type CardManagerProps = {
    userInputPrompt : string
}

export default function CardManager({userInputPrompt} : CardManagerProps) {
    const [selectedCards, setSelectedCards] = useState(new Set());


    const fetcher = () => fetch("/api/flashcard/create").then(res => res.json()).then(ar => {
        // console.log(ar);
        return ar;
    });


    // for testing, clears the cache
    // mutate(/* match all keys */() => true, undefined, false)
    const { data, error, isLoading } = useSWR("/api/flashcard/create", fetcher)
    
    const selectAllCards = () => {
        setSelectedCards(new Set(data.cards.map((result, index) => index)));
      }
    
      const deselectAllCards = () => {
        setSelectedCards(new Set());
      }

      useEffect(() => {
        // console.log(selectedCards)
      }, [selectedCards])




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

    
      const exports = () => {
        let newStuff :string[] = []
        data.cards.forEach((value, index) => {
          if(selectedCards.has(index)){
            newStuff.push(value.question + ";")
            newStuff.push(value.answer + ";")
            newStuff.push("\n");
          }
        });
    
        // console.log(newStuff)
    
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

      


    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    console.log("data")
    console.log(data)

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 4 }}>
                <Button onClick={() => deselectAllCards()}><CloseIcon /></Button>
                <Typography>{selectedCards.size}/{data.cards.length} items selected</Typography>
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
                {data.cards.map((result, index) => <Flashcard key={index} id={index} selected={selectedCards.has(index)} front={result.question} back={result.answer} onSelect={(id, selected) => onSelectCard(id, selected)} />)}
            </Box>
            <Typography>{data.prompt}</Typography>

        </>
    )
}
