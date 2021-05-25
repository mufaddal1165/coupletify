import './App.css';
import { TextField, Button, Box } from '@material-ui/core';
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      fontFamily: "Mehr"
    },
  },
}));

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
    const spacesNeeded = Math.floor(diff / widthOfSpace)
    if (spacesNeeded > 0) {
      console.log(verse, ' needs ', spacesNeeded, ' spaces ', 'width', width)

    }
  }
}

const makeAdjustments = (verses) => {
  const longest = getLongest(verses)
  var widthOfSpace = getTextWidth(' ')
  var poem = []
  for (var verse of verses) {
    const width = getTextWidth(verse)
    const diff = longest - width
    const spacesNeeded = Math.floor(diff / widthOfSpace)
    console.log(verse, ' needs ', spacesNeeded, ' spaces ')
    const words = verse.trim().split(' ')
    var spaceCounter = 0
    var doCounter = 0
    if (words.length > 0 && spacesNeeded > 0) {
      console.debug(words)
      do {
        for (var i = 1; i < words.length - 1; i++) {
          words[i] = words[i] + ' '
          spaceCounter++
          if (spaceCounter >= spacesNeeded) {
            break
          }
        }
        // console.log(spaceCounter, spacesNeeded)

        // try to equalize length for a fixed number of times then give up
        // works well for 99% cases
        doCounter++
        if (doCounter > 5) {
          break
        }
      } while (spaceCounter < spacesNeeded)
    }
    console.debug(words)
    poem.push(words.join(' '))

  }
  return poem
}

const adjustWidths = (text) => {
  const verses = text.split('\n')

  var poem = makeAdjustments(verses)
  // poem = makeAdjustments(poem)
  console.debug(poem)
  verify(poem)
  return poem
  // console.log(longest, lonVerse)
}

function App() {
  // یہ ترا شہر بھی ہے شہرِ زلیخا جاناں 
  // وہ مسیحا ہے جو دامن کو بچا لے جائے
  const [verse, saveVerse] = useState('This is it')
  const [poem, setPoem] = useState([])
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row">
      <Box display="flex" flexDirection="column" p={1} flexGrow={1}>
        {/* <div>
        {verse.split('\n').map(aVerse => {
          return <div key={uuidv4()}>{aVerse}</div>
        })}
      </div> */}
        <Button color="primary" variant="contained" onClick={() => setPoem(adjustWidths(verse))} className={classes.root}>کن</Button>

        <TextField multiline
          placeholder="یہاں نظم لکھئے"
          variant="outlined"
          rows={15}
          inputProps={{ style: { fontFamily: 'Mehr', textAlign: 'right', wordSpacing: '0.25rem', lineHeight: '3rem' } }}
          onChange={(event) => {
            saveVerse(event.target.value)
          }}
        >



        </TextField>



      </Box>
      <Box display="flex" p={1} flexGrow={1} alignItems="center" overflow="scroll">
        <div className="Justified">{poem.map(verse => {
          return <div key={uuidv4()}>{verse}</div>
        })}</div>
      </Box>
    </Box>
  );
}

export default App;
