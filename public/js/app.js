/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */



/* hard-coded data! */
var sampleAlbums = [];
var $albumList;

$(document).ready(function() {
  console.log('app.js loaded!');
  // renderAlbums(sampleAlbums);

$.ajax({
  method: 'GET',
  url: '/api/albums',
  success: function(json) {
    sampleAlbums = json;
    console.log(json);
    console.log(sampleAlbums);
    renderAlbums(sampleAlbums);
  }

});


  function renderAlbums(albumArray) {
    albumArray.forEach(
      function(album, index){
        renderAlbum(album);
      });
  };


// this function takes a single album and renders it to the page
function renderAlbum(album) {
  this.album = album;
  console.log('rendering album:', album);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + (album.id || 1) + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" + album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  // render to the page with jQuery
  $('#albums').append(albumHtml);

};

  $('#singlebutton').on('click', function(e) {
    e.preventDefault();
    var newAlbum = $('.form-horizontal').serialize();
    // console.log(newAlbum);
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: newAlbum,
      success: newAlbumSuccess
    });



    $('.form-horizontal').trigger('reset');
  });

  function newAlbumSuccess(json) {
        sampleAlbums.push(json);
        render(json);
  };

  function render() {
    $albumList.empty();
    $albumList.append(json);
  };

});
