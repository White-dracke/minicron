# Running the solution:

- run `npm run build` to build the source code and then use `node . <arguments>`
- for example: `cat input.txt | node . 16:10 >> result.txt` will read from input.txt file and write to result.txt file
- alternativelly you can run the program with `npm run start` which automatically does the build for you but writes extra lines on the stdout (might be problematic if used with automated tools)

# If I had more time I would:

- use regular expressions for parsing data
- deal with unexpected data inputs
- add help, deal with unexpected arguments
- write integreation tests - testing the application fully with defined outcomes
