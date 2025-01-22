import { searchALgorithm } from "./search.js"

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const search = new searchALgorithm()

const stepsCounter = document.getElementById('stepsCounter')
const answerRange = document.getElementById('answerRange')
const searchButton = document.getElementById('searchButton')
const algorithmInput = document.getElementById('algorithmInput')
const answerCounter = document.getElementById('answerCounter')

// stolen from stack overflow <https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep>
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

context.font = '30px Arial'
context.textAlign = 'center'

function drawNumberLine(lowerBound, upperBound)
{
    const range = upperBound - lowerBound
    const increments = 1000/range
    context.moveTo(50, 150)
    context.lineTo(1050, 150)
    context.stroke()
    for (let interval = 0; interval <= range; interval += 25)
    {
        let scale = 5

        if (interval % 500 == 0)
        {
            scale = 20
        }
        else if (interval % 250 == 0)
        {
            scale = 10
        }
        context.moveTo(50 + increments*interval, 150 + scale)
        context.lineTo(50 + increments*interval, 150 - scale)
        context.stroke()
    }
}

function drawGuess(lowerBound, upperBound, guess, colour='#FF0000')
{
    // repetitive but idk a cleaner/easier way
    const range = upperBound - lowerBound
    const increments = 1000/range
    const distanceToGuess = guess - lowerBound
    const coords = {'x': 50 + increments*distanceToGuess, 'y': 125}

    let path = new Path2D()
    path.moveTo(coords['x'], coords['y'] )
    path.lineTo(coords['x'] + 10, coords['y'] - 10*Math.sqrt(3))
    path.lineTo(coords['x'] - 10, coords['y'] - 10*Math.sqrt(3))
    context.fillStyle = colour
    context.fill(path)
    context.fillText(`${guess}`, coords['x'], 100)
    
}

// exact copy of the drawGuess but for the answwer
function drawAnswer(lowerBound, upperBound, answer)
{
    // repetitive but idk a cleaner/easier way
    const range = upperBound - lowerBound
    const increments = 1000/range
    const distanceToAnswer = answer - lowerBound
    const coords = {'x': 50 + increments*distanceToAnswer, 'y': 175}

    let path = new Path2D()

    path.moveTo(coords['x'], coords['y'] )
    path.lineTo(coords['x'] + 10, coords['y'] + 10*Math.sqrt(3))
    path.lineTo(coords['x'] - 10, coords['y'] + 10*Math.sqrt(3))
    context.fillStyle = '#00FF00'
    context.fill(path)
    context.fillText(`${answer}`, coords['x'], 220)
    
}

function drawNumberText(lowerBound, upperBound)
{
    context.fillStyle = "#000000"
    context.fillText(`${lowerBound}`, 50, 100)
    context.fillText(`${upperBound}`, 1050, 100)
}

async function numberLineSearch(lowerBound, upperBound, answer, algo)
{
    let searchSteps = []

    if  (algo == 'binary')
    {
        searchSteps = search.binarySearch(lowerBound, upperBound, answer)
    }
    else
    {
        searchSteps = search.linearSearch(lowerBound, upperBound, answer)
    }

    stepsCounter.innerText = 0
    answerRange.disabled = true
    searchButton.disabled = true
    algorithmInput.disabled = true

    for (let guesses in searchSteps)
    {
        drawNumberLine(lowerBound, upperBound)
        drawNumberText(lowerBound, upperBound)
        drawGuess(
            lowerBound, 
            upperBound,
            searchSteps[guesses]['guess']
        )
        drawAnswer(0, 1000, answerRange.value)

        stepsCounter.innerText = searchSteps[guesses]['step']
            
        await sleep(500)
    
        context.clearRect(0, 0, canvas.width, canvas.height)
    
    }
    
    drawNumberLine(lowerBound, upperBound)
    drawNumberText(lowerBound, upperBound)
    
    drawGuess(
        lowerBound, 
        upperBound, 
        searchSteps[searchSteps.length-1]['guess'], 
        '#0000FF'
    )
    drawAnswer(0, 1000, answerRange.value)

    answerRange.disabled = false
    searchButton.disabled = false
    algorithmInput.disabled = false
}

function main()
{
    searchButton.addEventListener('click', (e)=>{
        context.clearRect(0, 0, canvas.width, canvas.height)
        drawNumberLine(0, 1000)
        drawNumberText(0, 1000)
        numberLineSearch(0, 1000, answerRange.value, algorithmInput.value)
    })

    answerRange.addEventListener('change', (e) => {
        context.clearRect(0, 0, canvas.width, canvas.height)
        drawNumberLine(0, 1000)
        drawNumberText(0, 1000)
        drawAnswer(0, 1000, answerRange.value)
        answerCounter.innerText = answerRange.value
    })
}

window.onload = () => {
    main()
    drawNumberLine(0, 1000)
    drawNumberText(0, 1000)
    drawAnswer(0, 1000, 500)
}

