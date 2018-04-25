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