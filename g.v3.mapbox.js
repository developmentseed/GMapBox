function mbLogo(map) {
    var logoDiv = document.createElement('DIV');
    logoDiv.innerHTML = '<a href="http://mapbox.com">'
        + '<img src="mapbox.png"></a>';
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT]
        .push(logoDiv);
};

function mbLayer(options) {
    return new google.maps.ImageMapType({
        getTileUrl: function(coord, z) {
        // Y coordinate is flipped in Mapbox, compared to Google
        // Simplistic predictable hashing
        return 'http://'
            + ['a', 'b', 'c', 'd'][(coord.x + coord.y) % 4]
            + '.tile.mapbox.com/1.0.0/' + options.tileset
            + '/' + z
            + '/' + coord.x
            + '/' + Math.abs(coord.y - (Math.pow(2, z) - 1)) + '.png';
        },
        name: options.name,
        alt: options.name,
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
        minZoom: 0,
        maxZoom: options.maxZoom || 17
    });
};
