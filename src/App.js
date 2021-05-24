import './App.css';
import { TextField, Button } from '@material-ui/core';
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function getTextWidth(text, font) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  context.font = font || getComputedStyle(document.body).font;

  return context.measureText(text).width;
}

const getLongest = (verses) => {
  var longest = 0
  for (var verse of verses) {
    var width = getTextWidth(verse)
    // console.log(verse, width)
    if (width > longest) {
      longest = width
    }
  }
  return longest
}
const verify = (verses) => {
  var widthOfSpace = getTextWidth(' ')
  const longest = getLongest(verses)
  for (var verse of verses) {
    const width = getTextWidth(verse)
    const diff = longest - width
    const spacesNeeded = Math.ceil(diff / widthOfSpace)
    console.log(verse, ' needs ', spacesNeeded, ' spaces ')
  }
}
const adjustWidths = (text) => {
  var widthOfSpace = getTextWidth(' ')
  const verses = text.split('\n')
  const longest = getLongest(verses)
  var poem = []
  for (var verse of verses) {
    const width = getTextWidth(verse)
    const diff = longest - width
    const spacesNeeded = Math.round(diff / widthOfSpace)
    // console.log(verse, ' needs ', spacesNeeded, ' spaces ')
    const words = verse.split(' ')
    var spaceCounter = 0
    var doCounter = 0
    if (words.length > 0) {
      do {
        for (var i = 1; i < words.length; i++) {
          words[i] = words[i] + ' '
          spaceCounter++
          console.log(spaceCounter)
          if (spaceCounter >= spacesNeeded) {
            break
          }
        }
        console.log(spaceCounter, spacesNeeded)
        doCounter++
        if (doCounter > 3) {
          break
        }
      } while (spaceCounter < spacesNeeded)
    }
  
    poem.push(words.join(' '))

  }
  console.log(poem)
  verify(poem)
  return poem
  // console.log(longest, lonVerse)
}

function App() {
  //یہ ترا شہر بھی ہے شہرِ زلیخا جاناں 
  //وہ مسیحا ہے جو دامن کو بچا لے جائے
  const [verse, saveVerse] = useState('This is it')
  const [arz, getArz] = useState(getTextWidth('This is it'))
  const [poem, setPoem] = useState([])
  return (
    <div className="App">
      <div>
        {verse.split('\n').map(aVerse => {
          return <div key={uuidv4()}>{aVerse}</div>
        })}
      </div>
      <TextField multiline
        defaultValue="یہاں شعر لکھئے"
        variant="outlined"
        rows={4}
        onChange={(event) => {
          saveVerse(event.target.value)
          getArz(getTextWidth(event.target.value))
        }}
      >



      </TextField>
      
      <Button color="primary" variant="contained" onClick={() => setPoem(adjustWidths(verse))}>سطور</Button>
      <div>{poem.map(verse => {
        return <div key={uuidv4()}>{verse}</div>
      })}</div>
    </div>
  );
}

export default App;
