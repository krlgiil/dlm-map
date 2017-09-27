var hikingList = new Vue({
  el: '#app-list',
  data: {
    hikings: randos,
    active: 'list-' + randos[0].videoId
  },
  methods: {
    toggleMarkerClick: function(event) {
      var id = event.currentTarget['id'];
      this.$data.active = id;
      var videoId = id.replace('list-', '');
      player.loadVideoById(videoId);

      var position = randos.filter(function(r) {
          return r.videoId == videoId;
        })[0].position;

      map.setCenter(position);
    }
  }
});
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: DEFAULT_ZOOM,
    center: {lat: 14.641528, lng: -61.024174}
  });

  google.maps.Marker.prototype.setVideoId = function(videoId) {
    this.videoId = videoId;
  };

  randos.forEach(function(hiking) {
    let marker = new google.maps.Marker({
      position: hiking.position,
      map: map,
      title: hiking.name,
      videoId: hiking.videoId
    });
    marker.addListener('click', function() {
      var player = YT.get('player');
      player.loadVideoById(marker.videoId);
      hikingList.$data.active = 'list-' + marker.videoId;
      map.setCenter(marker.position.toJSON());
    });
  });
}
