Sirtrack.Map = (function() {
  var S = Sirtrack,
  
  initialized = false, 
  map, 
  url, 
  lastpos, 
  proj, 
  panToPar, 
  kml, 
  kmlformat, 
  
  getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results === null) {
      return "";
    }

    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }, 
  
  updateLatestFix = function(l) {
    $('#refreshButton').busy("hide");

    kml = l;

    if ( !l || l.features === null || l.features.length === 0 || l.features[0].geometry === null) {
      return;
    }
    lastMarker = l.features[0];
    lastpos = new OpenLayers.LonLat(lastMarker.geometry.x, lastMarker.geometry.y);

    // $("#lastMarkerName")[0].innerHTML = lastMarker.data.name;
    // l.redraw();

    // if ($('#tabs').tabs('option', 'selected') === 0) {
    // panTo();
    // }
    // else
    // if (panToPar.length > 0) {
    // Sirtrack.Filters.switchToMapt();
    // }
  }, 
  
  panTo = function() {
    if (panToPar.length > 0) {
      var lat = parseFloat(panToPar.split(',')[0]);
      var lon = parseFloat(panToPar.split(',')[1]);
      panToPar = '';

      if (!isNaN(lat) && !isNaN(lon)) {
        var panToParPos = new OpenLayers.LonLat(lon, lat);
        map.panTo(panToParPos.transform(proj, map.getProjectionObject()));
        return;
      }
    }
    map.panTo(lastpos);
  }, 
  
  redraw = function(fnCallback) {
    Sirtrack.SlickGrid.redraw(function() { // always redraw table
      Sirtrack.Filters.timeline().update();

      if (fnCallback) {
        fnCallback();
      }
    });
  }, 
  
  reload = function(fnCallback) {
    if (!initialized) {
      return;
    }
    
    $('#refreshButton').busy();

    Sirtrack.SlickGrid.getData(function(data) {
      Sirtrack.Filters.timeline().init(function() {
        return Sirtrack.SlickGrid.dataview().getItems();
      });

      if (fnCallback) {
        fnCallback();
      }
    });

  }, 
  
  grid,
  gsat, gpy, ghyb,  

  init = function() {
    if (!OpenLayers || !OpenLayers.Projection) {
      throw 'OpenLayers not loaded';
    }

    url = '';
    // Sirtrack.Filters.getUrl('kml');
    lastpos = new OpenLayers.LonLat(174.785, -41.322);
    proj = new OpenLayers.Projection("EPSG:4326");
    panToPar = getParameterByName('panTo');

    var options = {
      projection : new OpenLayers.Projection("EPSG:900913"),
      displayProjection : proj,
      maxResolution : 156543.0339,
      numZoomLevels : 20,
      maxExtent : new OpenLayers.Bounds(-20037509, -20037508.34, 20037508.34, 20037508.34),
      allOverlays : true,
      controls : [
          new OpenLayers.Control.Navigation({
            documentDrag : true
          }),
          new OpenLayers.Control.ZoomBox(),
          new OpenLayers.Control.PanZoomBar(),
          new OpenLayers.Control.ScaleLine()
      ]
    };

    map = new OpenLayers.Map('mapdiv', options);
    // map.events.register('zoomend',this, function(){
    // var zoom = map.getZoom();
    // var basemap = map.baseLayer;
    // console.log('zoomend ' + zoom );
    // console.log( 'numZoomLevels: ' + map.getNumZoomLevels() );
    // console.log( 'basemap === gphy: ' + (basemap === gphy) );
    // console.log( 'gphy.isBaseLayer? ' + (gphy.isBaseLayer) );
    // console.log( 'map.isValidZoomLevel()? ' + map.isValidZoomLevel() );
    // });

    gsat = new OpenLayers.Layer.Google("Google Satellite", {
      type : google.maps.MapTypeId.SATELLITE
    });
    gphy = new OpenLayers.Layer.Google("Google Physical", {
      type : google.maps.MapTypeId.TERRAIN,
      numZoomLevels : 16,
      MAX_ZOOM_LEVEL : 16
    });
    ghyb = new OpenLayers.Layer.Google("Google Hybrid", {
      type : google.maps.MapTypeId.HYBRID
    });

    map.addLayers([ gsat, gphy, ghyb ]);
    gphy.setVisibility(false);
    ghyb.setVisibility(false);
    gsat.isBaseLayer = true;

    map.setCenter(lastpos.transform(proj, map.getProjectionObject()), 5);

    grid = new OpenLayers.Control.Graticule({
      numPoints : 5,
      labelled : true,
      displayInLayerSwitcher : false,
      autoActivate : false,
      visible : true,
      layerName : "Grid"
    });

    map.addControl(grid);
    var layerSwitcher = new OpenLayers.Control.LayerSwitcher();
    map.addControl(layerSwitcher);
//    layerSwitcher.maximizeControl();

    var trackstyle = new OpenLayers.Control({
      type : OpenLayers.Control.TYPE_TOGGLE,
      title : "Select Display"
    });
    map.addControl(trackstyle);

    // initializeWXTiles();
    Sirtrack.Map.display.subscribe(function(prj) {
      this.redraw();
    }, Sirtrack.Map);

    initialized = true;
  };

  var obj = {
      init : init,
      panTo : panTo,
      redraw : redraw,
      reload : reload,
      updateLatestFix : updateLatestFix,
      display : ko.observable("tracks"),
      setGrid: function(enabled){
        if( enabled ){
          grid.activate();
        }
        else {
          grid.deactivate();
        }
      },
      map : function() {
        return map;
      },
      layers : function() {
        return [ gsat, gpy, ghyb ];
      }
    };
  
  S.register(obj)
  
  return obj;
}());
