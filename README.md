# chem-tmx

Loads a Tiled map editor TMX file ready for use with the
[chem game engine](https://github.com/superjoe30/chem).

## Usage

```js
var chem = require('chem');
var tmx = require('chem-tmx');

tmx.load(chem, "level1.tmx", function(err, map) {
  if (err) throw err;
  // this will be an Image instance of the tile
  console.log(map.tileSets[0].tiles[0].image);
});
```
