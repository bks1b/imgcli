## About
`imgcli` is a command line interface for image manipulation tools. I wrote it as an experiment with [Jimp](https://www.npmjs.com/package/jimp) and canvas outside of the browser, and image manipulation in general.

## Installation
- [Install Node.js](https://nodejs.org/) >=10 if you haven't already.
- Clone or download the repository
- `npm i`
- `npm ls -g typescript || npm i typescript -g`
- `tsc && npm i . -g`
- The `img` command should now be available.

## Commands    
|     Name     |     Aliases     |                                                   Description                                                    |                                     Usage                                      |
|--------------|-----------------|------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| puzzle       | mix             | Put an image together from other specified images.                                                               | `img puzzle <input> <outputPath> <width> <height> ...<subPaths>`               |
| help         | commands        | Get a list of available commands, or information about the given command.                                        | `img help <input> <outputPath> [commandName]`                                  |
| averagecolor | avgcolor        | Get the overall average color of an image.                                                                       | `img averagecolor <input> `                                                    |
| asciiart     | ascii           | Convert an image into ASCII art.                                                                                 | `img asciiart <input> ...[chars]`                                              |
| pixelate     | pixel, censor   | Pixelate every n*n area of an image.                                                                             | `img pixelate <input> <outputPath> [n]`                                        |
| diff         | difference      | Redraw each pixel of the image with the color being the difference between the color and the color to the right. | `img diff <input> <outputPath> `                                               |
| filter       | -               | Apply a red, green, or blue filter to an image.                                                                  | `img filter <input> <outputPath> [color=green]`                                |
| invert       | -               | Invert colors of an image.                                                                                       | `img invert <input> <outputPath> `                                             |
| asciicolor   | -               | Display an image in command line with colored characters.                                                        | `img asciicolor <input> [char]`                                                |
| asciidiff    | asciidifference | The diff command except ASCII art.                                                                               | `img asciidiff <input> [char]`                                                 |
| mirror       | -               | Mirror an image horizontally and/or vertically.                                                                  | `img mirror <input> <outputPath> [horizontal] [vertical]`                      |
| randomcolor  | random          | Modify each pixel of an image by a random color offset.                                                          | `img randomcolor <input> <outputPath> [max]`                                   |
| round        | closestcolor    | Change each pixel of an image to the closest given color.                                                        | `img round <input> <outputPath> ...<colors>`                                   |
| split        | -               | Split an image into n*n tiles.                                                                                   | `img split <input> <outDir> [n] [prefix]`                                      |
| sketch       | -               | Apply a pencil drawn-like effect to an image.                                                                    | `img sketch <input> <outputPath> [lineRarity] [lineWidth] [xOffMax] [xOffMin]` |
|              |                 |                                                                                                                  | <> - required, [] - optional                                                   |