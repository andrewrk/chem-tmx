# chem-tmx

Loads a Tiled map editor TMX file ready for use with the
[chem game engine](https://github.com/superjoe30/chem).

## Usage

```js
var chem = require('chem');
var tmx = require('chem-tmx');

tmx.load(chem, "level1.tmx", function(err, map) {
  if (err) throw err;
  // this will be a chem.Animation instance of the tile
  console.log(map.tileSets[0].tiles[0].animation);
});
```

 * Put "level1.tmx" at `public/text/level1.tmx`.
 * Put any *.tsx files in the same folder.
 * Put any spritesheets in the `public/img/` folder.
 * See [node-tmx-parser](https://github.com/superjoe30/node-tmx-parser)
   for more information on what `map` will look like.
