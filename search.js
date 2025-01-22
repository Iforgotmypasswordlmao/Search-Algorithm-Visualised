export class searchALgorithm
{
    binarySearch(leftEndpoint, rightEndpoint, answer)
    {
        
        let lowerBound = leftEndpoint, 
            upperBound = rightEndpoint, 
            guess = Math.round((lowerBound + upperBound)/2), 
            range = upperBound - lowerBound,
            steps = 0,
            counterArray = []

        counterArray.push({'guess': guess, 'step': steps})
        while (guess != answer && range > 1)
        {
            if (guess > answer)
            {
                upperBound = guess
            }
            else
            {
                lowerBound = guess
            }
            steps += 1
            range = upperBound - lowerBound
            guess = Math.round((lowerBound+upperBound)/2)
            counterArray.push({'guess': guess, 'step': steps})

        }
        if (guess != answer)
        {
            counterArray.pop()

            guess = (lowerBound+upperBound)/2

            if (guess > answer)
            {
                upperBound = Math.floor(guess)
            }
            else
            {
                lowerBound = Math.ceil(guess)
            }

            guess = (lowerBound+upperBound)/2

            counterArray.push({'guess': guess, 'step': steps})
        }
        return counterArray
    }

    linearSearch(leftEndpoint, rightEndpoint, answer)
    {
        let counterArray = []
        for (let guess = leftEndpoint; guess <= rightEndpoint; guess++)
        {
            counterArray.push({'guess': guess, 'step': guess})
            if (guess == answer)
            {
                break
            }
        }
        return counterArray
    }
}
