const bingKey = "AjhB5DSqKwt7hdMeYtkehPviZ8izcW9xNgKzI18tfqBzGgt8t6UUlyVP-l5VYuD2";
Cesium.BingMapsApi.defaultKey = bingKey;
const viewer = new Cesium.Viewer('cesiumContainer', {

    animation: false, // related to the animation
    timeline: false,
    scene3DOnly: true,
    fullscreenButton: false,
    navigationHelpButton: false,
    // baseLayerPicker: false,
    // terrainProvider: new EllipsoidTerrainProvider()
});

// set home button default view instead of flying to the world
setHomeButtonView(Cesium);

function setHomeButtonView(Cesium) {

    // set home button default view
    const west = 114.173746;
    const south = 22.301674;
    const east = 114.185974;
    const north = 22.307335;

    const rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

    //Cesium.Camera.DEFAULT_OFFSET = new Cesium.HeadingPitchRange(Cesium.Math.toRadians(295.04946043173993), Cesium.Math.toRadians(-44.81296187020527));
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;
}