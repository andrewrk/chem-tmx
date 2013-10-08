var path = require('path');

exports.tmx = require('tmx-parser');
exports.load = load;

function load(chem, fileName, cb) {
  var v = chem.vec2d;
  var error = null;

  exports.tmx.readFile = chemReadFile;
  exports.tmx.parseFile(fileName, function(err, map) {
    if (err) {
      cb(err);
      return;
    }
    map.tileSets.forEach(resolveTileSet);
    if (error) {
      cb(error);
      return;
    }
    cb(null, map);
  });

  function chemReadFile(name, cb) {
    var text = chem.resources.text[name];
    if (text == null) {
      cb(new Error("File not found: public/text/" + name));
    } else {
      cb(null, text);
    }
  }

  function resolveTileSet(tileSet) {
    if (error) return;
    // resolve the image file name to something in chem.resources.images
    var imgName = path.relative("img", path.join("text/", tileSet.image.source));
    var img = chem.resources.images[imgName];
    if (!img) {
      error = new Error("Image not found: public/img/" + imgName);
      return;
    }
    var spacing = v(tileSet.spacing || 0, tileSet.spacing || 0);
    var margin = v(tileSet.margin || 0, tileSet.margin || 0);
    var offset = v(tileSet.tileOffset);
    var imgSize = v(img.width, img.height);
    var tileSize = v(tileSet.tileWidth, tileSet.tileHeight);
    var tileCount = imgSize.minus(margin).div(tileSize.plus(spacing)).floor();
    for (var i = 0; i < tileSet.tiles.length; i += 1) {
      var tile = tileSet.tiles[i];
      if (!tile) continue;
      // calculate x and y based on id
      var intPos = v(
          tile.id % tileCount.x,
          Math.floor(tile.id / tileCount.x));
      var pos = intPos.mult(tileSize.plus(spacing)).plus(margin).plus(offset);
      tile.animation = new chem.Animation();
      tile.animation.spritesheet = img;
      tile.animation.anchor = v();
      tile.animation.addFrame(pos, tileSize);
    }
  }
}
