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


//toolbox
$('#btnRemoveAll').click(() => {
    viewer.entities.removeAll();
})

$('#btnShowCamera').click(() => {
    const cameraPosition = getCurrentCameraPostion();
    const strPostion = "viewer.camera.flyTo({\n\tdestination : Cesium.Cartesian3.fromDegrees(" + cameraPosition.longitude + "," + cameraPosition.latitude + "," + cameraPosition.height + "),\n\t" +
        "orientation : {\n\t\theading : Cesium.Math.toRadians(" + cameraPosition.heading + "),\n\t\tpitch : Cesium.Math.toRadians(" + cameraPosition.pitch + "),\n\t\troll:0.0\n}});";
    console.log(strPostion);
    alert(strPostion);
})

function getCurrentCameraPostion() {
    const cesiumCamera = viewer.scene.camera;
    const position = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cesiumCamera.position);
    const latitude = Cesium.Math.toDegrees(position.latitude);
    const longitude = Cesium.Math.toDegrees(position.longitude);
    const height = position.height;
    const heading = Cesium.Math.toDegrees(cesiumCamera.heading);
    const pitch = Cesium.Math.toDegrees(cesiumCamera.pitch);
    const roll = Cesium.Math.toDegrees(cesiumCamera.roll);
    return {
        latitude: latitude,
        longitude: longitude,
        height: height,
        heading: heading,
        pitch: pitch,
        roll: roll
    }
}


//upload obj model
$('#btnUploadObj').click(() => {

    const files = $('#inputFileObjModel').get(0).files;

    if (files.length > 0) {
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        const formData = new FormData();

        // loop through all the selected files and add them to the formData object
        let file = null;
        for (let i = 0; i < files.length; i++) {
            file = files[i];
            // add the files to formData object for the data payload
            formData.append('OBJ', file, file.name);
        }

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log('upload successful!\n' + data);
            },
            xhr: function () {
                // create an XMLHttpRequest
                var xhr = new XMLHttpRequest();
                return xhr;
            }
        }).done(function (msg) {
            console.log('Nice! finish uploading obj and converting obj file.')
            $("#divDownloadGltf").removeClass('hidden');
        }).fail(function (jqXHR, textStatus) {
            $("#divDownloadGltf").addClass('hidden');
            alert("Upload Obj failed: " + textStatus);
        });
    }
});