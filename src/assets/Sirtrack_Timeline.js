import { Sirtrack } from "./Sirtrack.Container";

/**
 * Copyright (C) 2008, 2009 FBK Foundation, (http://www.fbk.eu)
 * Author: Federico Scrinzi @ SoNet Group
 *
 * Copyright (C) 2012 Sirtrack Ltd.
 * Author: Emanuele Ziglioli
 *
 * OpenLayers-Timeline is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation version 3 of the License.
 *
 * Class: OpenLayers.Timeline This class represents a timeline based on
 * jQuery-UI Slider
 */

 
Sirtrack.renderDate =(function(datesec) {
    if (datesec)
      return datesec.toUTCString();
    else
      return "";
  });
  
  ko.bindingHandlers.tooltip = {
    init : function(element, valueAccessor, allBindingsAccessor, viewModel) {
    },
  
    update : function(element, valueAccessor, viewModel) {
      var handle = $(element);
      var value = ko.utils.unwrapObservable(valueAccessor());
      if( value )
        handle.qtip('option', 'content.text', Sirtrack.renderDate(value));
    }
  };
  
  ko.bindingHandlers.jqSlider = {
      init : function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var options = {
          range : true,
          min : 0,
          max : 100,
          values : [ 0, 100 ]
        };
    
        var slider = $(element);
    
        slider.slider(options);
    
        var firsthandle = slider.slider().find(".ui-slider-handle").first();
    
        firsthandle.qtip({
              content : '01/01/2000',
              position : {
                my : 'bottom left',
                at : 'top center',
                container : firsthandle
              },
              hide : false,
              show : {
                ready : true
              },
              style : {
                classes : 'ui-tooltip-slider ui-tooltip-light ui-tooltip-shadow ui-tooltip-rounded',
                widget : true,
                width : 320
              }
            });
    
        $(firsthandle).attr("data-bind", "tooltip: Sirtrack.Filters.lowerlimit");
    
        var handle = slider.slider().find(".ui-slider-handle").last();
    
        handle.qtip({
              content : '12/12/2012',
              position : {
                my : 'top right',
                at : 'bottom center',
                container : handle
              },
              hide : false,
              show : {
                ready : true
              },
              style : {
                classes : 'ui-tooltip-slider ui-tooltip-light ui-tooltip-shadow ui-tooltip-rounded',
                widget : true,
                width : 320
              }
          });
  
          $(handle).attr("data-bind", "tooltip: Sirtrack.Filters.past_seconds");
    
          ko.utils.registerEventHandler(element, "slide", function() {
            var slider = $(element);
        
            var observable = valueAccessor();
            var values = slider.slider("values");
        
            if (observable[0]() != values[0]) {
              observable[0](values[0]);
            }
        
            if (observable[1]() != values[1]) {
              observable[1](values[1]);
            }
        
          });
    
          ko.utils.registerEventHandler(element, "slidestop", function() {
            var slider = $(element);
            var observable = valueAccessor();
            var values = slider.slider("values");
    
            if (observable[0]() == values[0] && observable[1]() == values[1])
              return;
    
            if (observable[0]() != values[0]) {
              observable[0](values[0]);
              var lowerlimit = Math.ceil(Sirtrack.Filters.first() + 
                                    (Sirtrack.Filters.current_date() - 
                                     Sirtrack.Filters.first()) * (values[0] / 100.0));
              
              if( !isNaN(lowerlimit) )
                Sirtrack.Filters.lowerlimit(new Date(lowerlimit));
            }
            
            if (observable[1]() != values[1]) {
              observable[1](values[1]);
              var past_seconds = Math.ceil(Sirtrack.Filters.first() + 
                                      (Sirtrack.Filters.current_date() - 
                                       Sirtrack.Filters.first()) * (values[1] / 100.0));
              if( !isNaN(past_seconds) )
                Sirtrack.Filters.past_seconds(new Date(past_seconds));
            }
            Sirtrack.Filters.redraw();
          });
      },
      
      update : function(element, valueAccessor, viewModel) {
          var slider = $(element);
  
          var oldvalues = slider.slider("values");
          var newvalues = ko.utils.unwrapObservable(valueAccessor());
  
          if (!isNaN(newvalues[0]()) && oldvalues[0] != newvalues[0]()) {
            if(typeof(newvalues[0]()) != 'number')
              return;
            slider.slider("values", 0, newvalues[0]());
            var lowerlimit = Math.ceil(Sirtrack.Filters.first() + 
                                  (Sirtrack.Filters.current_date() - 
                                   Sirtrack.Filters.first()) * (newvalues[0]() / 100.0));
            if( !isNaN(lowerlimit) )
            Sirtrack.Filters.lowerlimit(new Date(lowerlimit));
          }
  
          if (!isNaN(newvalues[1]()) && oldvalues[1] != newvalues[1]()) {
            if(typeof(newvalues[1]()) != 'number')
              return;
  
            slider.slider("values", 1, newvalues[1]());
            var past_seconds = Math.ceil(Sirtrack.Filters.first() + 
                                    (Sirtrack.Filters.current_date() - 
                                     Sirtrack.Filters.first()) * (newvalues[1]() / 100.0));
            if( !isNaN(past_seconds) )
              Sirtrack.Filters.past_seconds(new Date(past_seconds));
  
            // drag handler 0 by the same amount
            if( oldvalues[0] >= 0 ) {
              
            var d = oldvalues[1] - newvalues[1]();
              var t0 = oldvalues[0] - d;
  
            if( t0<0 ){
                Sirtrack.Filters.timevalues[0](0);
                    slider.slider("values", 0, 0);
              } else if( t0 < 100 ){
                Sirtrack.Filters.timevalues[0](t0);
                if(typeof(t0) != 'number')
                  return;
                slider.slider("values", 0, t0);
              }
            }
          }
        }
  };
   
  Sirtrack_Timeline = function( options ){
      var map = options.map,
      display_layers = [],
      current_data = undefined,
      timerId = undefined,
      selectControl = undefined,
      selectedFeature = undefined,
      interval = 5,
      speeds = [ "Really slow", "Slow", "Normal", "Fast", "Really fast"
      ],
      data_format = {}, //new options.format(options.format_options);
      cumulative = true,
      timedelta = 15552000, // 6 months
      onFeatureInsert = options.onFeatureInsert,
      name_key = options.name_key,
      parsedDataVector = undefined,
      self = this;
      
      // createSelectControl();
  
      var curr_speed = parseInt(speeds.length / 2);
  
      var colors = [
                "yellow",
                "red",
                "chartreuse",
                "fuchsia",
                "white",
                "maroon",
                "olive",
                "purple",
                "aqua",
                "pink",
                "blue",
                "lime",
                "navy"
       ];
  
        if (options.date_key) {
          data_format.date_key = options.date_key;
        }
        if (options.timedelta) {
          timedelta = options.timedelta;
        }
        data_format.timestamp_funct = options.date_funct;
  
        OpenLayers.Renderer.symbol.arrow = [0,2, 1,0, 2,2, 1,0, 0,2];
          
        var onPopupClose = function(evt) {
          if (selectControl && selectedFeature)
            selectControl.unselect(selectedFeature);
        };
  
        var onFeatureSelect = function(feature) {
          
          if (feature.popup)
            return;
  
          if (feature.attributes.count == 0)
            return;
  
          selectedFeature = feature;
          var desc = "";
  
          if (!feature.cluster || feature.cluster.length < 2) {
            desc = feature.attributes.description;
            /*if( desc ){
              desc += "<br/><button onclick='Sirtrack.SlickGrid.hideh(" + feature + ")'>hide</button>";
            }*/
          }
          else
            if (feature.attributes.count > 1) {
              desc += "<strong>" + feature.cluster.length + " features in this area</strong><br/>";
              desc += "<br/><em>tip: increase the zoom level</em>";
              desc += "</div>";
            }
          
          var popup = new OpenLayers.Popup.FramedCloud("chicken", feature.geometry
              .getBounds().getCenterLonLat(), new OpenLayers.Size(1000, 500), desc, null, true, onPopupClose);
          
          popup.selectControl = selectControl;
          popup.selectedFeature = selectedFeature;
          feature.popup = popup;
          
          map.addPopup(popup);
        };
  
        var onFeatureUnselect = function(feature) {
          if (feature.popup) {
            map.removePopup(feature.popup);
            feature.popup.destroy();
            feature.popup = null;
          }
        };
  
        var animateBar = function() {
          if (!timerId && current_data) {
            if (100 - $(slider).slider("value") <= 3) {
              $(slider).slider("value", 0);
            }
            var self = this;
            timerId = setInterval(function() {
            // TODO change this code to use model observables
              var past_seconds = self.data_format.past_seconds;
              if (past_seconds < Sirtrack.Filters.current_date()) {
                var curr_val = $(self.slider).slider("value");
                $(self.slider).slider("value", (curr_val + self.interval));
              }
              else {
                clearInterval(self.timerId);
                self.timerId = undefined;
              }
            }, 1000);
          }
        };
  
        var getBarValue = function() {
          return $(slider).slider("value");
        };
  
        var setBarValue = function(value) {
          $(slider).slider("value", value);
        }
  
        var getCurrentSpeed = function(value) {
          return speeds[curr_speed];
        };
  
        var getCurrentSpeedValue = function(value) {
          return curr_speed;
        };
  
        var stopBar = function() {
          if (timerId) {
            clearInterval(timerId);
            timerId = undefined;
          }
        };
  
        var togglePlay = function() {
          if (timerId) {
            stopBar();
          }
          else {
            animateBar();
          }
        };
  
        var fasterAnimation = function() {
          if (interval < 15) {
            interval += 2;
            if (curr_speed < speeds.length - 1) {
              curr_speed++;
            }
            if (timerId) {
              stopBar();
              animateBar();
            }
          }
        };
  
        var slowerAnimation = function() {
          if (interval >= 3) {
            interval -= 2;
            curr_speed--;
          }
          if (timerId) {
            stopBar();
            animateBar();
          }
        };
  
        var getStyle = function(color) {
          return new OpenLayers.Style({
            graphicName : "circle",
            strokeColor : color,
            fillColor : color,
            pointRadius : "${radius}",
            fillOpacity : 0.5,
            //strokeOpacity : 0,
            strokeWidth : "${width}"
          }, {
            context : {
              radius : function(feature) {
                if (feature.attributes.count == 1)
                  return 3;
                return Math.min(Math.ceil(feature.attributes.count / 12), 25) + 5;
              },
              width : function(feature) {
                return (feature.attributes.count > 1) ? 2 : 0.5;
              }
            }
          });
        };
  
        var getTrackStyle = function(color) {
          return new OpenLayers.Style({
            graphicName : "track",
            strokeColor : color,
            fillColor : color,
            pointRadius : 2,
            fillOpacity : 0.5,
            strokeWidth : 2,
            graphicName:"arrow",
            rotation : "${angle}"
          });
        };
  
        var createSelectControl = function() {
          var ls = display_layers;
          
          selectControl = new OpenLayers.Control.SelectFeature(ls, {
            clickout : true,
            toggle : false,
            multiple : false,
            hover : false
          });
          
          map.addControl(selectControl);
          selectControl.activate();
          
          for ( var i = 0; i < ls.length; i++) {
            var l = ls[i];
            if (l.events && l.events.on)
              l.events.on({
                "featureselected" : function(e) {
                  onFeatureSelect(e.feature);
                },
                "featureunselected" : function(e) {
                  onFeatureUnselect(e.feature);
                }
              });
            else
              console.log(l);
          }
        };
  
        var removeSelectControl = function() {
          if (selectControl) {
            for ( var i in map.popups) {
              var popup = map.popups[i];
              map.removePopup(popup);
              var point = popup.selectedFeature.geometry;
              popup.selectedFeature.popup.destroy();
            }
            selectControl.deactivate();
            map.removeControl(selectControl);
          }
          ;
        };
  
        var createClusterLayer = function(tagid, color) {
          if (!map) {
            return false;
          }
          var l = new OpenLayers.Layer.Vector(tagid, {
            strategies : [ new OpenLayers.Strategy.Cluster()
            ],
            styleMap : getStyle(color)
          });
          l.tagid = tagid;
          display_layers.push(l);
          map.addLayer(l);
          return l;
        };
  
        var createTrackLayer = function(tagid, color) {
          if (!map) {
            return false;
          }
          var l = new OpenLayers.Layer.PointTrack(tagid, {
            styleMap : getTrackStyle(color)
          });
          l.tagid = tagid;
          display_layers.push(l);
          map.addLayer(l);
          return l;
        };
  
        var createVectorLayer = function(tagid, color) {
          if (!map) {
            return false;
          }
          var layer_style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
          layer_style.fillOpacity = 0.2;
          layer_style.graphicOpacity = 1;
          layer_style.strokeColor = color;
          layer_style.fillColor = color;
          layer_style.graphicName = "circle";
          layer_style.pointRadius = 3;
          layer_style.strokeWidth = 1;
          layer_style.strokeLinecap = "butt";
  
          var l = new OpenLayers.Layer.Vector(tagid, {
            style : layer_style
          });
  
          l.tagid = tagid;
          display_layers.push(l);
          map.addLayer(l);
          return l;
        };
  
        var updateDisplayLayer = function() {
          var display = Sirtrack.Map.display();
  
          var ls = display_layers;
  
          try {
            removeSelectControl();
          }
          catch (e) {
            console.log(e);
          }
  
          var dict = {};
          for ( var i = 0; i < ls.length; i++) {
            var l = ls[i];
            l.destroy();
          }
          ls = display_layers = [];
  
          var dv = Sirtrack.SlickGrid.dataview();
          if (dv.getLength() <= 0) {
            return l;
          }
  
          for ( var i = 0; i < dv.getLength(); i++) {
  
            var f = dv.getItem(i);
            if (!f.geometry) {
              continue;
            }
            if (!dict[f.tagid]) {
              
            if (display == "clusters")
                l = createClusterLayer(f.tagid, colors[display_layers.length]);
              else if (display == "tracks")
                l = createTrackLayer(f.tagid, colors[display_layers.length]);
              else if (display == "markers")
                l = createVectorLayer(f.tagid, colors[display_layers.length]);
  
              dict[f.tagid] = [];
            }
            if (display == "markers") {
              var g = f.clone();
  //            g.lat = f.lat;
  //            g.lon = f.lon;
              dict[f.tagid].push(g);
            }
            else
              dict[f.tagid].push(f);
          }
  
          bounds = new OpenLayers.Bounds();
  
          for ( var i = 0; i < ls.length; i++) {
            var features = dict[ls[i].tagid];
            if (features && features.length > 0) {
              try {
                if (display == "clusters" || display == "markers") {
                  ls[i].addFeatures(features);
  
                  // var point = new OpenLayers.Geometry.Point(19454750.805778332,
                  // -5050915.661616707);
                  // var pointFeature = new OpenLayers.Feature.Vector(point,null);
                  // vectorLayer.addFeatures([pointFeature]);
                }
                else {
                  ls[i].addNodes(features);
                }
                bounds.extend(ls[i].getDataExtent());
              }
              catch (e) {
                console.log(e);
              }
            }
          }
  
          if (onFeatureInsert) {
            onFeatureInsert(l);
          }
  
          createSelectControl();
  
          if (bounds /* && self.cumulative */) {
            map.zoomToExtent(bounds, false);
          }
  
          if (onFeatureInsert) {
            onFeatureInsert(l);
          }
  
          return l;
        };
  
        var init = function(fnCallback) {
          removeSelectControl();
  
          var ls = display_layers;
          for ( var i = 0; i < ls.length; i++) {
            var l = ls[i];
            l.destroy();
          }
          ls = display_layers = [];
  
          update();
        };
        
        var update = function() {
          updateDisplayLayer();
  //        Sirtrack.Filters.timevalues[0](0);
  //        Sirtrack.Filters.timevalues[1](100);
        };
  
        
        return{
          init: init,
          update : update,
          display_layers: function(){
            return display_layers;
          }
        };
  };



