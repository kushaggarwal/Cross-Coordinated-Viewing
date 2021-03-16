var sampleImage = {
  Image: {
    xmlns: "http://schemas.microsoft.com/deepzoom/2008",
    Url: "//openseadragon.github.io/example-images/duomo/duomo_files/",
    Format: "jpg",
    Overlap: "2",
    TileSize: "256",
    Size: {
      Width: "13920",
      Height: "10200",
    },
  },
};

let synced = false;

function syncInstances() {
  synced = $("#syncCheckbox").is(":checked");
  console.log($("#syncCheckbox").is(":checked"));
}

currentRotationRight = 0;
currentRotationLeft = 0;

function rotateRight(v1, v2) {
  currentRotationRight += 90;
  console.log(viewer1.viewport);
  v1.viewport.setRotation(currentRotationRight);
  if (synced) {
    v2.viewport.setRotation(currentRotationRight);
  }
}

function rotateLeft(v1, v2) {
  currentRotationLeft += 90;
  console.log(v1.viewport);
  v1.viewport.setRotation(currentRotationLeft);
  if (synced) {
    v2.viewport.setRotation(currentRotationLeft);
  }
}

var viewer1 = OpenSeadragon({
  id: "viewer1",
  prefixUrl: "//openseadragon.github.io/openseadragon/images/",
  tileSources: sampleImage,
  toolbar: "navigation-pane",
  zoomInButton: "zoom-in",
  zoomOutButton: "zoom-out",
  homeButton: "home",
  fullPageButton: "full-screen",
});

//Example for a different image

// var viewer2 = OpenSeadragon({
//   id: "viewer2",
//   prefixUrl: "/openseadragon/images/",
//   toolbar: "navigation-pane-2",
//   zoomInButton: "zoomIn",
//   zoomOutButton: "zoomOut",
//   homeButton: "Home",
//   fullPageButton: "fullScreen",

//   tileSources:
//     "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi",
// });

var viewer2 = OpenSeadragon({
  id: "viewer2",
  prefixUrl: "//openseadragon.github.io/openseadragon/images/",
  tileSources: sampleImage,
  toolbar: "navigation-pane-2",
  zoomInButton: "zoomIn",
  zoomOutButton: "zoomOut",
  homeButton: "Home",
  fullPageButton: "fullScreen",
});

var viewer1Leading = false;
var viewer2Leading = false;

var viewer1Handler = function () {
  if (viewer2Leading) {
    return;
  }
  if (synced) {
    viewer1Leading = true;
    viewer2.viewport.zoomTo(viewer1.viewport.getZoom());
    viewer2.viewport.panTo(viewer1.viewport.getCenter());
    viewer1Leading = false;
  }
};

var viewer2Handler = function () {
  if (viewer1Leading) {
    return;
  }

  if (synced) {
    viewer2Leading = true;
    viewer1.viewport.zoomTo(viewer2.viewport.getZoom());
    viewer1.viewport.panTo(viewer2.viewport.getCenter());
    viewer2Leading = false;
  }
};

viewer1.addHandler("zoom", viewer1Handler);
viewer2.addHandler("zoom", viewer2Handler);
viewer1.addHandler("pan", viewer1Handler);
viewer2.addHandler("pan", viewer2Handler);
