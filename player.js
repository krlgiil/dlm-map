var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: randos[0].videoId,
    width: '100%',
    playerVars: {'autoplay': 0, 'controls': 1},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
function onPlayerReady(event) {
}

var done = false;
function onPlayerStateChange(event) {
  switch(event.data) {
    case YT.PlayerState.PLAYING:
      map.setZoom(ZOOM_IN);
      map.setMapTypeId(ZOOMED_MAP_TYPE);
      break;
    case YT.PlayerState.ENDED:
      map.setZoom(DEFAULT_ZOOM);
      map.setMapTypeId(DEFAULT_MAP_TYPE);
      break;
  }
}

function stopVideo() {
  player.stopVideo();
  map.setZoom(DEFAULT_ZOOM);
  map.setMapTypeId(DEFAULT_MAP_TYPE);
}
