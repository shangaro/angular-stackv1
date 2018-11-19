
  export var Sirtrack_Filters = (function(){

    var S = Sirtrack,

    filteredProjects = ko.computed( function() {
      return ko.utils.arrayFilter( S.projects(), function(prj) {
      	return( prj.deploymentCount() > 0 ) 
      });
    }, this ),

    deployments = ko.observableArray(),
   
    project = ko.observable(),
    
    exportData = function(ext){
        window.open(getUrl(ext));
    },
    
    getUrl = function(ext){
        return project()?'/serve/project/' + project().id + '/' + project().name() + '.' + ext + '?key=' + project().geoJsonKey:"";
    }, 
    
    getGeoUrl = function(ext){
      return project()?'/restlet/geo/' + project().id + '/' + project().name() + '.' + ext + '?key=' + project().geoJsonKey:"";
    }, 
    
    switchToMapt = function(){
        if( S.selectedTab()=== 0) {
            S.Map.panTo();
        }
        else {
            $("#tabs").tabs('select', 0);
        }
    }, 
    
    redraw = function(fnCallback){
        switch (S.selectedTab()) {
            case 0:
                S.Map.redraw(fnCallback);
                break;
            case 1:
                S.SlickGrid.updateColumn(fnCallback);
                break;
        }
    }, 
    
    reload = function(fnCallback){
        switch (S.selectedTab()) {
            case 0:
                S.Map.reload(fnCallback);
                break;
            default:
                S.SlickGrid.reload(fnCallback);
                break;
        }
    }, 

    mapTags = function(jstags) {
        var tags = ko.observableArray();
        $.each(jstags, function(i, jstag) {
          tags.push(jstag);
        });
        return tags;
    },
    
    mapProjects = function(jsprojects) {
        $.each(jsprojects, function(i, project) {
        	var existing = S.existElement( S.projects(), project );
					if( existing ){
						existing.name( project.name );
						existing.perm( project.perm );
						
		        if (project.deployments) {
		          existing.deploymentCount(project.deployments);
		        }
					}
					else {
  	       S.projects.push( S.Project( project ))
					}
        });
    }, 
    
    reloadProjects = function(cb) {
    	Vosao.info('Loading Projects');
        $.getJSON("/restlet/projects", function(r) {
        	S.Filters.mapProjects(r);
        	if(cb)
        	  cb();
        });
    }, 

    toggleCumulative = function toggleCumulative(){
        if ($("#cumulative").attr("checked")) {
            timeline.cumulative = true;
        }
        else {
            timeline.cumulative = false;
        }
        timeline.update();
    }, 
    
    ts_funct = function(d){
        return ((new Date(d)).getTime() / 1000);
    }, 
    
    getUTC_Date = function(d){
        // 2012-06-24
        return d.getUTCFullYear() + '-' + (d.getUTCMonth()+1) + '-' + d.getUTCDate();
    }, 
    
    getUTC_Time = function(d){
        // 03:00:11
        return d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
    }, 
    
    toCsv = function(){
      var array = S.SlickGrid.dataview();
      var str = 'Tag_ID,UTC_Date,UTC_Time,';

      var lat = false, aClass = false, dop = false, 
          temp = false, minv = false, curr = false, sta = false,
          evts = false, 
          dive = false, tadindex = false, dhist = false, dratio =false;
      
      for( var i = 0; i < array.getLength(); i+=1) {
        var f = array.getItem(i);
        
        if( f.lat != null ) 
          lat = true;
        if( f.attributes.dop != null ) 
          dop = true;
        if( f.attributes.aClass != null ) 
          aClass = true;
        if( f.attributes.temp != null ) 
          temp = true;
        if( f.attributes.minv != null ) 
          minv = true;
        if( f.attributes.curr != null ) 
          curr = true;
        if( f.attributes.sta != null ) 
          sta = true;
        if( f.attributes.evVal != null ) 
          evts = true;
        if( f.attributes.maxdepth != null ) 
          dive = true;
        if( f.attributes.TADindex != null ) 
          tadindex = true;
        if( f.attributes.dbin0 != null ) 
          dhist = true;
        if( f.attributes.diveRatio != null ) 
          dratio = true;
        
      }
      
      if( lat ) 
        str += 'Latitude,Longitude,';
      if( aClass ) 
        str += 'LQ,';
      if( dop ) 
        str += 'HDOP,CNR,Sats,TimeOn(s),';
      if( temp )
        str += 'TempDeg,';
      if( minv )
        str += 'MinVolt,';
      if( curr )
        str += 'Curr(mA),';
      if( sta )
        str += 'Activity,';
      if( evts )
        str += 'EvActive,EvSourceType,EvCurrentMode,EvConfigurationNum,EvValue,';
      if( dive )
      	str += 'Maxdepth,divelen,';
      if( tadindex )
      	str += 'TADindex, TimeElapsed,';
      if( dhist )
      	str += 'DepthBin0,DepthBin1,DepthBin2,DepthBin3,DepthBin4,DepthBin5,DepthBin6,';
      if( dratio )
      	str += 'Day Dive Ratio,Day Max Dive Depth,';
      str += '\r\n';
      
      for( var i = 0; i < array.getLength(); i+=1) {
      
          var line = '';
          
          var f = array.getItem(i);
          
          if( f.lat == null && f.attributes.temp  == null && f.attributes.minv  == null && f.attributes.curr == null
              && f.attributes.sta == null && f.attributes.evVal == null 
              && f.attributes.maxdepth == null && f.attributes.TADindex == null && f.attributes.dbin0 == null && f.attributes.diveRatio == null )
            continue;
          
          line += /*"3002340" +*/ f.tagid + ',';
            line += S.Filters.getUTC_Date(f.attributes.when) + ',';
            line += S.Filters.getUTC_Time(f.attributes.when) + ',';
          
          if( lat ) {
            line += (f.lat? f.lat.toFixed(5) : '') + ',';
            line += (f.lon? f.lon.toFixed(5) : '') + ',';

            if( aClass ) 
              if( f.lat ) 
                line += (f.attributes.aClass != null? f.attributes.aClass : 'G') + ',';
              else
                line += ',';

            if( dop )
              if( f.lat && f.attributes.dop )
                line += f.attributes.dop + ',' + f.attributes.cnr + ',' + f.attributes.sats + ',' + f.attributes.ton + ',';
              else
                line += ',,,,';
          }
          if( temp )
            line += (f.attributes.temp != null? f.attributes.temp : '') + ',';
          if( minv )
            line += (f.attributes.minv != null? f.attributes.minv : '') + ',';
          if( curr )
            line += (f.attributes.curr != null? f.attributes.curr : '') + ',';
          if( sta )
            line +=  (f.attributes.sta != null?  f.attributes.sta : '') + ',';
          if( evts )
            line +=  f.attributes.evVal != null?  f.attributes.evActive + ',' + f.attributes.evSource + ',' + f.attributes.evMode + ',' + f.attributes.evNum + ',' + f.attributes.evVal + ',': ',,,,,';
          if( dive )
            line +=  f.attributes.maxdepth != null?  f.attributes.maxdepth + ',' + f.attributes.divelen + ',': ',,';
          if( tadindex )
            line +=  f.attributes.TADindex != null?  f.attributes.TADindex + ',' + f.attributes.delapsedtime + ',' : ',,';
          if( dhist )
          	line +=  f.attributes.dbin0 != null? f.attributes.dbin0 + ',' + f.attributes.dbin1 + ',' + f.attributes.dbin2 + ',' + f.attributes.dbin3 + ',' + f.attributes.dbin4 + ',' + f.attributes.dbin5 + ',' + f.attributes.dbin6 + ',': ',,,,,,,';   
          if( dratio )
          	line += f.attributes.diveRatio != null?  f.attributes.diveRatio + ',' + f.attributes.maxDepthPrevDay + ',': ',,';
          line.slice(0, line.Length - 1);
          
          str += line + '\r\n';
      }
      
      return str;
    },

    toKml = function(){
    	var schema = [];
        
        if( S.Filters.minv_e() && S.Filters.minv_f() ){
        	schema.push( { type: "float", 
        		           name: "minv", 
        		           displayName: "Minimum Voltage" });
        }
        
        if( S.Filters.temp_e() && S.Filters.temp_f() ){
        	schema.push( { type: "float", 
		           name: "temp", 
		           displayName: "Temperature (C)" });
        }		
        
        if( S.Filters.sta_e() && S.Filters.sta_f() ){
        	schema.push( { type: "float", 
		           name: "sta", 
		           displayName: "Activity" });
        }		
    	
    	var format = new OpenLayers.Format.KML({
            'internalProjection': S.Map.map().baseLayer.projection,
            'externalProjection': new OpenLayers.Projection("EPSG:4326"),
            extractAttributes: true,
            extractStyles: true,
            extractTracks: true,
            trackAttributes: true,
            schema: schema,
            extendedData: S.SlickGrid.dataview()
    	});

        var layers = S.Filters.timeline().display_layers();
        
        format.foldersName = S.Filters.project().name;
        format.foldersDesc = "";
        var kml = format.write(layers);
        
        return kml;
    },
    
    exportFiltered = function(format){
      var filename = S.Filters.project().name() + '.' + format;
      var data = { "csv" :  this.toCsv, "kml" :  this.toKml}[format]();

      if (!showSave) {
        alert("Your browser does not support any method of saving JavaScript gnerated data to files.");
        return;
      }

      showSave(
        data,
        filename,
        {csv:'application/vnd.ms-excel',kml:'application/vnd.google-earth.kml+xml'}[format]
      );

    }, 
    
    timeline, 
    
    init = function(){
    
        var in_options = {
            'internalProjection': S.Map.map().baseLayer.projection,
            'externalProjection': new OpenLayers.Projection("EPSG:4326")
        };
        
        var kml_options_in = OpenLayers.Util.extend({
            extractAttributes: true,
            extractStyles: true,
            extractTracks: true,
            trackAttributes: true,
            maxDepth: 2
        }, in_options);
        
        timeline =  Sirtrack.Timeline({ 
            map: S.Map.map(),
            date_key: "when",
            date_funct: ts_funct,
            format: OpenLayers.Format.KML,
            format_options: kml_options_in,
            timedelta: 60 * 60 * 24,
            onFeatureInsert: S.Map.updateLatestFix
        });
        
        timeline.cumulative = true;
        $("#cumulative").attr("checked", "checked");
        
        //  if (projects.length === 0) {
        //    logindialog.dialog('open');
        //    throw "Please login";
        //    }
        project.subscribe( function(prj){
        	if(!prj || !prj.id)
        		return;
        	
        	S.Tab.Project.project(prj);
        	
        	var model = this;
        	
          deployments.removeAll();
            reload(function(){
               ko.utils.arrayPushAll( model.deployments, prj.deployments() );
            });
          
        }, this);

        S.Tab.Project.project.subscribe( function(prj){
        	if(!prj || !prj.id)
        		return;

        	if( prj === project() )
        		return;
        	
        	if( prj.deploymentCount() > 0 ){
        		project(prj);
        	}
        }, this);
        
        deployments.subscribe(function(prj){
            if (prj.length === 0) {
              return;
            }
            if( deployments().length > 0) {
              S.Filters.first(null);
              S.Filters.current_date(null);
            	
            	S.SlickGrid.updateColumn();

            	var past_seconds = this.past_seconds();
            	var lowerlimit = this.lowerlimit();
            	
            	this.past_seconds(past_seconds);
            	this.lowerlimit(lowerlimit);

            	S.Map.redraw();
            }
        }, this);
        
        this.hdop.subscribe(function(prj){
            this.redraw();
        }, this);

        this.aClass.subscribe(function(prj){
          this.redraw();
        }, this);

        this.thr_f.subscribe(function(prj){
          this.redraw();
        }, this);

        this.tfn_f.subscribe(function(prj){
          this.redraw();
        }, this);

        this.tfs_f.subscribe(function(prj){
          this.redraw();
        }, this);

        this.gps_f.subscribe(function(prj){
          this.redraw();
        }, this);
        
        this.argos_f.subscribe(function(prj){
          this.redraw();
        }, this);
        
        this.latErr_f.subscribe(function(prj){
          this.redraw();
        }, this);

        this.lonErr_f.subscribe(function(prj){
          this.redraw();
        }, this);

        this.latErr.subscribe(function(prj){
          this.redraw();
        }, this);

        this.lonErr.subscribe(function(prj){
          this.redraw();
        }, this);
        
        this.event_f.subscribe(S.SlickGrid.updateColumn, this);
        this.minv_f.subscribe(S.SlickGrid.updateColumn, this);
        this.temp_f.subscribe(S.SlickGrid.updateColumn, this);
        this.sta_f.subscribe(S.SlickGrid.updateColumn, this);
        this.dives_f.subscribe(S.SlickGrid.updateColumn, this);
        this.summ_f.subscribe(S.SlickGrid.updateColumn, this);

        this.activity_f.subscribe(S.SlickGrid.updateColumn, this);
        this.daylog_f.subscribe(S.SlickGrid.updateColumn, this);
        
        this.depth_f.subscribe(S.SlickGrid.updateColumn, this);
        this.TADindex_f.subscribe(S.SlickGrid.updateColumn, this);
        this.depthBin_f.subscribe(S.SlickGrid.updateColumn, this);
        this.diveRatio_f.subscribe(S.SlickGrid.updateColumn, this);
         
        this.progress_str = ko.computed(function(){
            return this.size() + "/" + this.total();
        }, this);
        
        this.progress = ko.computed(function(){
            return this.size() / this.total() * 100;
        }, this);
        
        ko.bindingHandlers.jqProgress = {
            init: function(element, valueAccessor, allBindingsAccessor, viewModel){
                var options = {
                    value: 0
                };
                var bar = $(element);
                bar.progressbar(options);
            },
            
            update: function(element, valueAccessor, viewModel){
                var bar = $(element);
                
                var oldvalue = bar.progressbar("value");
                var newvalue = ko.utils.unwrapObservable(valueAccessor());
                
                if (oldvalue !== newvalue) {
                    bar.progressbar("value", newvalue);
                }
            }
        };

        this.lowerlimit.subscribe(function(newdate){
            if( !newdate ) {
            	var lowerlimit = S.Filters.current_date() - 7*24*60*60*1000; // one week

            	newdate = new Date( lowerlimit > S.Filters.first()? 
            			            lowerlimit : S.Filters.first() );
            	S.Filters.lowerlimit(newdate);
            	
            	return;
            } 

            if( !newdate instanceof Date ){
            	console.log('invalid lowerlimit ' + newdate );
            	return;
            }
            
        	if( S.Filters.first() && newdate.getTime()<S.Filters.first()){
        		S.Filters.lowerlimit(new Date(S.Filters.first()));
        		return;
        	}

        	if( S.Filters.current_date() && newdate.getTime()>S.Filters.current_date()){
        		S.Filters.lowerlimit(null);
        		return;
        	}
        	
        	var t0 =  Math.floor(100*((newdate.getTime() - S.Filters.first())/(S.Filters.current_date() - S.Filters.first())));
        	
//        	if( t0 != S.Filters.timevalues[0]()){
        		S.Filters.timevalues[0]( t0 );
//            } 
        });

        this.past_seconds.subscribe(function(newdate){
        	
            if( !newdate ) {
            	var past_seconds = new Date( S.Filters.current_date() );
            	S.Filters.past_seconds(past_seconds);
            	return;
            }

            if( !newdate instanceof Date ){
            	console.log('invalid past_seconds ' + newdate );
            	return;
            }
            
        	if( (S.Filters.first() && newdate.getTime()<S.Filters.first()) || 
        	    (S.Filters.current_date() && newdate>S.Filters.current_date() )){
        		S.Filters.past_seconds(null);
        		return;
        	}

        	var t1 =  Math.floor(100*((newdate.getTime() - S.Filters.first())/(S.Filters.current_date() - S.Filters.first())));
        	
        	if( t1 != S.Filters.timevalues[1]()){
        		S.Filters.timevalues[1]( t1 );
            } 
        });
        
        project( S.Project({
          id : null,
          name : null,
          perm : null
        }));
        
    };
    
    var obj = {
        init: init,
        project: project,
        
    		filteredProjects: filteredProjects,
        deployments: deployments,
        
        hdop: ko.observable(5.0),
        aClass: ko.observable(1),
        latErr: ko.observable(4.9),
        lonErr: ko.observable(4.9),
        
        getUrl: getUrl,
        getGeoUrl: getGeoUrl,
        switchToMapt: switchToMapt,
        exportData: exportData,
        
        redraw: redraw,
        reload: reload,
        reloadProjects: reloadProjects,
        mapProjects: mapProjects,
        
        getUTC_Date: getUTC_Date,
        getUTC_Time: getUTC_Time,

        timevalues: [ko.observable(0), ko.observable(100)], // the values of timeline handles from 0 to 100
        first: ko.observable(), // the date that corresponds to the value 0 on the timeline (in ms)
        current_date: ko.observable(new Date().getTime()), // the date that corresponds to the value 100 on the timeline (in ms)
        lowerlimit: ko.observable(), // the date that is represented by the first handle (a long value, ms)
        past_seconds: ko.observable(), // the date that is represented by the second handle (a long value, ms)
        timeline: function(){
            return timeline;
        },
        
        toggleCumulative: toggleCumulative,
        
        /* export functions */
        toCsv: toCsv,
        toKml: toKml,
        exportFiltered: exportFiltered,
        
        /* column filters */
        gps_e: ko.observable(false),
        gps_f: ko.observable(true),

        argos_e: ko.observable(false),
        argos_f: ko.observable(true),
        

        thr_e: ko.observable(false),
        thr_f: ko.observable(false),

        tf_e: ko.observable(false),
        tfn_f: ko.observable(true),
        tfs_f: ko.observable(false),

        latErr_f: ko.observable(true),
        lonErr_f: ko.observable(true),
        
        event_e: ko.observable(false),
        event_f: ko.observable(false),

        minv_e: ko.observable(false),
        minv_f: ko.observable(false),

        temp_e: ko.observable(false),
        temp_f: ko.observable(true),
        
        sta_e: ko.observable(false),
        sta_f: ko.observable(false),

        summ_e: ko.observable(false),
        summ_f: ko.observable(false),

        dives_e: ko.observable(false),
        dives_f: ko.observable(false),

        activity_e: ko.observable(false),
        activity_f: ko.observable(false),

        daylog_e: ko.observable(false),
        daylog_f: ko.observable(false),
        
		depth_e: ko.observable(false),
        depth_f: ko.observable(true),
		
		TADindex_e: ko.observable(false),
        TADindex_f: ko.observable(true),

		depthBin_e: ko.observable(false),
        depthBin_f: ko.observable(false),

		diveRatio_e: ko.observable(false),
        diveRatio_f: ko.observable(true),
        
        size: ko.observable(0),
        total: ko.observable(1)
    };
    
    S.register(obj);
    
    return obj;
}());


