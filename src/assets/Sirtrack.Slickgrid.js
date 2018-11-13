Sirtrack.SlickGrid = (function() {

  var S = Sirtrack,
  
  renderDate = function(row, cell, value, columnDef, dataContext) {
    return value? value.toJSON().replace('T', ' ').substr(0, 19) : null;
  }, 
  
  renderDryTime = function(row, cell, value, columnDef, dataContext) {
    return value? value / 10 : null;
  },
  
  renderLatLon = function(row, cell, value, columnDef, dataContext) {
	return value? value.toFixed(5) : null;
  },
  
  getItemColumnValue = function (item, column) {
    var values = item[column.field];
    if (column.fieldIdx !== undefined) {
      return values && values[column.fieldIdx];
    } else {
      return values;
    }
  },
  
  columns = [ {
    id : "tagid",
    name : "Tag ID",
    toolTip : "Tag Id, click here to toggle asc/desc sort, hold shift for multiple sorting criteria",
    field : "tagid",
    sortable : true,
    width : 115
  }, {
    id : "date",
    name : "Date & Time (UTC)",
    toolTip : "Date & Time, click here to toggle asc/desc sort, hold shift for multiple sorting criteria",
    field : "attributes",
    fieldIdx : "when",
    sortable : true,
    width : 195,
    formatter : renderDate
  }, {
    id : "lat",
    name : "Latitude",
    toolTip : "Latitude in decimal degrees",
    field : "lat",
    width : 95,
    formatter: renderLatLon
  }, {
    id : "lon",
    name : "Longitude",
    toolTip : "Longitude in decimal degrees",
    field : "lon",
    width : 95,
    formatter: renderLatLon
  }, {
    id : "aClass",
    name : "LQ",
    toolTip : "Argos Location Quality – 3 best to Z worst",
    field : "attributes",
    fieldIdx : "aClass",
    width : 58
  }, {
    id : "latErr",
    name : "latErr",
    toolTip : "Lat Err",
    field : "attributes",
    fieldIdx : "latErr",
    width : 58
  }, {
    id : "lonErr",
    name : "lonErr",
    toolTip : "Lon Err",
    field : "attributes",
    fieldIdx : "lonErr",
    width : 58
  }, {
    id : "minv",
    name : "MinV",
    toolTip : "Minimum Voltage",
    field : "attributes",
    fieldIdx : "minv",
    width : 45
  }, {
    id : "curr",
    name : "Curr",
    toolTip : "Current (mA)",
    field : "attributes",
    fieldIdx : "curr",
    width : 55
  }, {
    id : "temp",
    name : "Temp",
    toolTip : "On board temperature – range -50C to 75C, res. 0.25C, acc. 0.5C",
    field : "attributes",
    fieldIdx : "temp",
    width : 58
  }, {
    id : "sta",
    name : "Activity",
    toolTip : "Activity",
    field : "attributes",
    fieldIdx : "sta",
    width : 58
  }, {
    id : "evSource",
    name : "evSource",
    toolTip : "Event Source",
    field : "attributes",
    fieldIdx : "evSource",
    width : 58
  }, {
    id : "evActive",
    name : "evActive",
    toolTip : "Event Active",
    field : "attributes",
    fieldIdx : "evActive",
    width : 58
  }, {
    id : "evMode",
    name : "evMode",
    toolTip : "Event Mode",
    field : "attributes",
    fieldIdx : "evMode",
    width : 58
  }, {
    id : "evNum",
    name : "evNum",
    toolTip : "Event Num",
    field : "attributes",
    fieldIdx : "evNum",
    width : 58
  }, {
    id : "evVal",
    name : "evVal",
    toolTip : "Event Val",
    field : "attributes",
    fieldIdx : "evVal",
    width : 58
  }, {
    id : "sq",
    name : "SQ",
    toolTip : "Surface Quantity",
    field : "attributes",
    fieldIdx : "sq",
    width : 35
  }, {
    id : "st",
    name : "ST",
    toolTip : "Surface Time (s)",
    field : "attributes",
    fieldIdx : "st",
    width : 35
  }, {
    id : "bl",
    name : "BL",
    toolTip : "Bought Length (s)",
    field : "attributes",
    fieldIdx : "bl",
    width : 35
  }, {
    id : "dt",
    name : "DT",
    toolTip : "Dive Time (s)",
    field : "attributes",
    fieldIdx : "dt",
    width : 35
  }, {
    id : "dryt",
    name : "DryT",
    toolTip : "Total Dry Time %",
    field : "attributes",
    fieldIdx : "dryT",
    width : 40,
    formatter : renderDryTime
  }, {
    id : "surfEv",
    name : "SurfEv",
    toolTip : "Surface Event Number",
    field : "attributes",
    fieldIdx : "surfEv",
    width : 55
  }, {
    id : "d0",
    name : "D0",
    toolTip : "Divehist0 (121-240)",
    field : "attributes",
    fieldIdx : "d0",
    width : 20
  }, {
    id : "d1",
    name : "D1",
    toolTip : "divehist1 (241-360)",
    field : "attributes",
    fieldIdx : "d1",
    width : 20
  }, {
    id : "d2",
    name : "D2",
    toolTip : "divehist2 (361-480)",
    field : "attributes",
    fieldIdx : "d2",
    width : 20
  }, {
    id : "d3",
    name : "D3",
    toolTip : "divehist3 (481-600)",
    field : "attributes",
    fieldIdx : "d3",
    width : 20
  }, {
    id : "d4",
    name : "D4",
    toolTip : "divehist4 (601-900)",
    field : "attributes",
    fieldIdx : "d4",
    width : 20
  }, {
    id : "d5",
    name : "D5",
    toolTip : "divehist5 (901-)",
    field : "attributes",
    fieldIdx : "d5",
    width : 20
  }, {
    id : "b0",
    name : "B0",
    toolTip : "bouthist0 (1-60)",
    field : "attributes",
    fieldIdx : "b0",
    width : 20
  }, {
    id : "b1",
    name : "B1",
    toolTip : "bouthist1 (61-120)",
    field : "attributes",
    fieldIdx : "b1",
    width : 20
  }, {
   id : "b2",
    name : "B2",
    toolTip : "bouthist2 (121-240)",
    field : "attributes",
    fieldIdx : "b2",
    width : 20
   }, {
    id : "b3",
    name : "B3",
    toolTip : "bouthist3 (241-360)",
    field : "attributes",
    fieldIdx : "b3",
    width : 20
  }, {
    id : "b4",
    name : "B4",
    toolTip : "bouthist4 (361-600)",
    field : "attributes",
    fieldIdx : "b4",
    width : 20
  }, {
    id : "b5",
    name : "B5",
    toolTip : "bouthist0 (601-)",
    field : "attributes",
    fieldIdx : "b5",
    width : 20
  }, 

  {
    id : "a0",
    name : "IntTemp",
    toolTip : "Internal Temperature [C]",
    field : "attributes",
    fieldIdx : "a0",
    width : 70
  },
  {
    id : "a1",
    name : "ExtTemp",
    toolTip : "External Temperature [C]",
    field : "attributes",
    fieldIdx : "a1",
    width : 70
  },
  {
    id : "a2",
    name : "Light",
    toolTip : "Light [0 to 4095]",
    field : "attributes",
    fieldIdx : "a2",
    width : 60
  },
  {
    id : "a3",
    name : "Pressure",
    toolTip : "pressure [dBar]",
    field : "attributes",
    fieldIdx : "a3",
    width : 70
  },
  {
    id : "a4",
    name : "Voltage",
    toolTip : "Voltage [V]",
    field : "attributes",
    fieldIdx : "a4",
    width : 60
  },
  {
    id : "a5",
    name : "Salt",
    toolTip : "salt",
    field : "attributes",
    fieldIdx : "a5",
    width : 60
  },
  {
    id : "dl0",
    name : "SST",
    toolTip : "Sea Surface Temperature [C]",
    field : "attributes",
    fieldIdx : "dl0",
    width : 60
  },
  {
    id : "dl1",
    name : "SSTP",
    toolTip : "SST Pressure [dBar]",
    field : "attributes",
    fieldIdx : "dl1",
    width : 60
  },
  {
    id : "dl2",
    name : "MinExtTemp",
    toolTip : "Minimum External Temperature [C]",
    field : "attributes",
    fieldIdx : "dl2",
    width : 100
  },
  {
    id : "dl3",
    name : "MaxExtTemp",
    toolTip : "Maximum External Temperature [C]",
    field : "attributes",
    fieldIdx : "dl3",
    width : 100
  },
  {
    id : "dl4",
    name : "MaxPressure",
    toolTip : "Maximum Pressure [dBar]",
    field : "attributes",
    fieldIdx : "dl4",
    width : 100
  },
  {
    id : "dop",
    name : "HDOP",
    toolTip : "GPS Horizontal Dilution Of Precision",
    field : "attributes",
    fieldIdx : "dop",
    width : 58
  }, 
  {
    id : "cnr",
    name : "CNR",
    toolTip : "Max SNR",
    field : "attributes",
    fieldIdx : "cnr",
    width : 44
  }, {
    id : "sats",
    name : "Sats",
    toolTip : "Number of GPS satellites",
    field : "attributes",
    fieldIdx : "sats",
    width : 50
  }, 
  {
    id : "ton",
    name : "Ton",
    toolTip : "Time On (s)",
    field : "attributes",
    fieldIdx : "ton",
    width : 41
  }, {
    id : "maxdepth",
    name : "Depth",
    toolTip : "Dive max depth (m) – range 2000m/500m, res. 0.025% of F.S., acc. 1.0% of F.S.",
    field : "attributes",
    fieldIdx : "maxdepth",
    width : 60
  }, {
    id : "divelen",
    name : "Length",
    toolTip : "Dive length (s)",
    field : "attributes",
    fieldIdx : "divelen",
    width : 60
  }, {
    id : "TADindex",
    name : "TAD",
    toolTip : "Time At Depth index – 0 to 1, res. 0.032",
    field : "attributes",
    fieldIdx : "TADindex",
    width : 60
  }, {
    id : "delapsedtime",
    name : "TimeSince",
    toolTip : "Time elapsed since lat dive in minutes, max 120 min after then it will be 127 indicating as invalid",
    field : "attributes",
    fieldIdx : "delapsedtime",
    width : 90
  }, {
    id : "dbin0",
    name : "Bin1",
    toolTip : "Time at depth histogram – res. 6.7%",
    field : "attributes",
    fieldIdx : "dbin0",
    width : 60
  }, {
    id : "dbin1",
    name : "Bin2",
    toolTip : "Time at depth histogram – res. 6.7%",
    field : "attributes",
    fieldIdx : "dbin1",
    width : 60
  }, {
    id : "dbin2",
    name : "Bin3",
    toolTip : "Time at depth histogram – res. 6.7%",
    field : "attributes",
    fieldIdx : "dbin2",
    width : 60
  }, {
    id : "dbin3",
    name : "Bin4",
    toolTip : "Time at depth histogram – res. 6.7%",
    field : "attributes",
    fieldIdx : "dbin3",
    width : 60
  }, {
    id : "dbin4",
    name : "Bin5",
    toolTip : "Time at depth histogram – res. 6.7%",
    field : "attributes",
    fieldIdx : "dbin4",
    width : 60
  }, {
    id : "dbin5",
    name : "Bin6",
    toolTip : "Time at depth histogram – res. 6.7%",
    field : "attributes",
    fieldIdx : "dbin5",
    width : 60
  }, {
    id : "dbin6",
    name : "Bin7",
    toolTip : "Time at depth histogram – res. 6.7%",
    field : "attributes",
    fieldIdx : "dbin6",
    width : 60
  }, {
    id : "diveRatio",
    name : "Diving",
    toolTip : "Percentage of previous day actively diving – res. 0.1%",
    field : "attributes",
    fieldIdx : "diveRatio",
    width : 60
  }, {
    id : "maxDepthPrevDay",
    name : "DayMax",
    toolTip : "Max dive previous day (m) – res. 0.1m",
    field : "attributes",
    fieldIdx : "maxDepthPrevDay",
    width : 75
  }	    
  ], 
  
  dataview = new Slick.Data.DataView({
    inlineFilters : false
  }), 
  
  options = {
    enableCellNavigation : true,
    enableColumnReorder : true,
    multiColumnSort : true,
    dataItemColumnValueExtractor: getItemColumnValue,
    inlineFilters : false
  }, 
  
  myFilter = function(item, args) {
    if (!item || !item.tagid){
      return false;
    }

    var attrs = item.attributes;
    
    if( attrs.dop != null && item.lat && !args.gps_e){
    	Sirtrack.Filters.gps_e( true );
    	args.gps_e = true;
    }

    // TODO check argos class
    if( attrs.aClass != null && item.lat && !args.argos_e ){
    	Sirtrack.Filters.argos_e( true );
    	args.argos_e = true;
    }

    // TODO check H, N, S classes
    if( attrs.latErr != null && item.lat && !args.thr_e ){
      Sirtrack.Filters.thr_e( true );
      Sirtrack.Filters.tf_e( true );
      args.thr_e = true;
      args.tf_e = true;
    }

    if( attrs.evSource  != null && !args.event_e){
    	Sirtrack.Filters.event_e( true );
    	args.event_e = true;
    }

    if( attrs.minv != null  && !args.minv_e){
    	Sirtrack.Filters.minv_e( true );
    	args.minv_e = true;
    }

    if( attrs.temp != null  && !args.temp_e){
    	Sirtrack.Filters.temp_e( true );
    	args.temp_e = true;
    }

    if( attrs.sta != null  && !args.sta_e){
    	Sirtrack.Filters.sta_e( true );
    	args.sta_e = true;
    }

    if( attrs.sq != null  && !args.dives_e){
    	Sirtrack.Filters.dives_e( true );
    	args.dives_e = true;
    }
    
    if( attrs.dryT != null  && !args.summ_e){
    	Sirtrack.Filters.summ_e( true );
    	args.summ_e = true;
    }

    if( attrs.a1 != null && !args.activity_e ){
      Sirtrack.Filters.activity_e( true );
      args.activity_e = true;
    }

    if( attrs.dl0 != null && !args.daylog_e ){
      Sirtrack.Filters.daylog_e( true );
      args.daylog_e = true;
    }
   
    if( attrs.maxdepth != null && !args.depth_e ){
      Sirtrack.Filters.depth_e( true );
      args.depth_e = true;
    }

    if( attrs.TADindex != null && !args.TADindex_e ){
        Sirtrack.Filters.TADindex_e( true );
        args.TADindex_e = true;
    }

    if( attrs.dbin0 != null && !args.depthBin_e ){
        Sirtrack.Filters.depthBin_e( true );
        args.depthBin_e = true;
    }
    
    if( attrs.diveRatio != null && !args.diveRatio_e ){
        Sirtrack.Filters.diveRatio_e( true );
        args.diveRatio_e = true;
    }
    
    if (!(item.tagid in args.selectedTagIds)){
        return false;
    }
    
    if( !( (((args.gps_f && attrs.dop ) || 
             ((args.argos_f || args.thr_f || args.tfn_f || args.tfs_f ) && attrs.aClass != null)) && item.lat ) ||
       ( args.event_f && attrs.evSource != null ) || 
       ( args.minv_f && attrs.minv != null ) || 
       ( args.temp_f && attrs.temp != null ) || 
       ( args.sta_f && attrs.sta != null ) ||
       ( args.dives_f && attrs.sq != null ) ||
       ( args.summ_f && attrs.dryT != null ) ||
       ( args.activity_f && attrs.a1 != null ) ||
       ( args.daylog_f && attrs.dl0 != null ) ||
       ( args.depth_f && attrs.maxdepth != null ) ||
       ( args.TADindex_f && attrs.TADindex != null ) ||
       ( args.depthBin_f && attrs.dbin0 != null ) ||
       ( args.diveRatio_f && attrs.diveRatio != null )
    )){ 
      return false;
    }
    
    if (attrs.dop && attrs.dop > args.hdop){
      return false;
    }

    if ( (!args.argos_f) && attrs.aClass ){
//    if ( (!args.argos_f && !( (attrs.aClass in {'H':0,'N':1,'S':2}))) && attrs.a1 == null && attrs.dl0 == null ){
      return false;
    }
    
    if( attrs.aClass && Sirtrack.SlickGrid.aClassIdx[attrs.aClass] < Sirtrack.SlickGrid.aClassIdx[args.aClass] ){
      return false;
    }

    if( attrs.aClass == 'H' && !args.thr_f ){
      return false;
    }

    if( attrs.aClass == 'N'  && !args.tfn_f ){
      return false;
    }

    if( attrs.aClass == 'S' && !args.tfs_f ){
      return false;
    }
    
    if( attrs.aClass == 'N' || attrs.aClass == 'S' ){
      
      if( args.latErr_f && !attrs.latErr )
        return false;
      
      if( args.lonErr_f && !attrs.lonErr )
        return false;
    }

    if( attrs.latErr > args.latErr || attrs.lonErr > args.lonErr ){
      return false;
    }

    var dCellDate = attrs.when.getTime();

    if (dCellDate === undefined){
      return false;
    }
    var first = args.first;
    var current_date = args.current_date;

    if( first == null || dCellDate < first ){
    	first = dCellDate;
    	args.first = dCellDate;
    	Sirtrack.Filters.first(dCellDate);
    } 

    if( current_date == null || dCellDate > current_date ){
    	current_date = dCellDate;
    	args.current_date = dCellDate;
    	Sirtrack.Filters.current_date(dCellDate);
    } 

    var dStartDate = args.lowerlimit;
    var dEndDate = args.past_seconds;

    if (dStartDate === undefined && dEndDate === undefined) {
      return true;
    }
    if (dStartDate === undefined && dCellDate <= dEndDate) {
      return true;
    }
    if (dStartDate <= dCellDate && dEndDate === undefined) {
      return true;
    }
    if (dStartDate <= dCellDate && dCellDate <= dEndDate) {
      return true;
    }

    return false;
  }, 
  
  filterArgs = function(){
    return {
      selectedTagIds : selectedTagIds(),
      first : Sirtrack.Filters.first(),
      current_date : Sirtrack.Filters.current_date(),
      lowerlimit : ( Sirtrack.Filters.lowerlimit() !== undefined )? 
                 Sirtrack.Filters.lowerlimit().getTime() : Sirtrack.Filters.first(),
      past_seconds : (Sirtrack.Filters.past_seconds() !== undefined )? 
                  Sirtrack.Filters.past_seconds().getTime() : Sirtrack.Filters.current_date(),
      hdop : parseFloat(Sirtrack.Filters.hdop()),
      
      aClass: Sirtrack.Filters.aClass(),
      latErr: Sirtrack.Filters.latErr(),
      lonErr: Sirtrack.Filters.lonErr(),
      
      gps_f: Sirtrack.Filters.gps_f(),
      argos_f: Sirtrack.Filters.argos_f(),
      thr_f: Sirtrack.Filters.thr_f(),
      tfn_f: Sirtrack.Filters.tfn_f(),
      tfs_f: Sirtrack.Filters.tfs_f(),
      latErr_f: Sirtrack.Filters.latErr_f(),
      lonErr_f: Sirtrack.Filters.lonErr_f(),
      
      event_f: Sirtrack.Filters.event_f(),
      minv_f: Sirtrack.Filters.minv_f(),
      temp_f: Sirtrack.Filters.temp_f(),
      sta_f: Sirtrack.Filters.sta_f(),
      dives_f: Sirtrack.Filters.dives_f(),
      summ_f: Sirtrack.Filters.summ_f(),
      
      activity_f: Sirtrack.Filters.activity_f(),
      daylog_f: Sirtrack.Filters.daylog_f(),
      
      depth_f: Sirtrack.Filters.depth_f(),
      TADindex_f: Sirtrack.Filters.TADindex_f(),
      depthBin_f: Sirtrack.Filters.depthBin_f(),
      diveRatio_f: Sirtrack.Filters.diveRatio_f()
    }
  },
  
  comparer = function(a, b, field, fieldIdx) {
    var result = a[field][fieldIdx] > b[field][fieldIdx] ? 1 : a[field][fieldIdx] < b[field][fieldIdx] ? -1 : 0;
    return result;
  }, 
  
  sortfnc = function(e, args) {
    var cols = args.sortCols;

    // var sortdir = args.sortAsc ? 1 : -1;
    // var sortcol = args.sortCol.field;
    // var field = args.sortCol.field;

    // using native sort with comparer
    // preferred method but can be very slow in IE with huge datasets
    dataview.sort(function(a, b) {
      var i;
      for ( i = 0, l = cols.length; i < l; i+=1) {
        var field = cols[i].sortCol.field;
        var fieldIdx = cols[i].sortCol.fieldIdx;
        var sign = cols[i].sortAsc ? 1 : -1;

        var result = comparer(a, b, field, fieldIdx) * sign;
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    });
  }, 
  
  columnpicker, 
  
  eventSourceType = {
    0 : "Sta",
    1 : "Acc",
    3 : "Tem",
    4 : "Gps",
    5 : "Ird",
    7 : "Bat",
    8 : "Fen",
    10 : "Tlt",
    11 : "Rls",
    13 : "Cmd",
    14 : "Inv",
    254 : "Rtn"
  }, 
  
  eventConfigurationNumber = {
    0 : "Normal",
    1 : "Startup",
    2 : "Inactivity",
    3 : "LowBattery",
    4 : "GpsFail",
    5 : "Commanded"
  }, 
  
  grid, 
  internalProjection, 
  externalProjection, 
  
  hideh = function(b,f){
    console.log(f);
    f.hide(true);
    S.Slickgrid.redraw();
  },
  
  getFeature = function(row) {
    if (!row) {
      return null;
    }
    if (!internalProjection) {
      internalProjection = Sirtrack.Map.map().baseLayer.projection;
      externalProjection = new OpenLayers.Projection("EPSG:4326");
    }

    var f = {};

    // create an id for non GPS records
    if (row[2].length === 0) {
      f.id = row[0] + "." + row[1];
      f.attributes = {};
    }
    else {
      var geometry = new OpenLayers.Geometry.Point(row[2][1], row[2][0])
      					 .transform(externalProjection, internalProjection);

      var attributes = {};
      
      attributes.styleUrl = "";

      f = new OpenLayers.Feature.Vector(geometry, attributes);

      // var fid = node.getAttribute("id") || node.getAttribute("name");
      // if(fid !== null) {
      // f.fid = fid;
      // }
    }

    f.tagid = row[0];             
    f.hide = false;

    f.attributes.when = new Date(row[1] * 1000);
    f.attributes.name = f.attributes.when.toUTCString();

    if( !Sirtrack.Filters.first() || Sirtrack.Filters.first() > f.attributes.when )
  	  Sirtrack.Filters.first(f.attributes.when);
    if( !Sirtrack.Filters.current_date() || Sirtrack.Filters.current_date()< f.attributes.when )
  	  Sirtrack.Filters.current_date(f.attributes.when);
 
//     f.attributes.description = "<h5>" + f.attributes.name + "</h5>";
//     desc = desc + "<p>" + this.renderDate(point.attributes.when) + "</p>";
    
    if (row[2].length === 3 ) {
      f.lat = row[2][0];
      f.lon = row[2][1];
      f.attributes.aClass = row[2][2];
      f.attributes.description = "<p><b>" + f.lat + ", " + f.lon + ", Class " + f.attributes.aClass + "</b></p>";
      f.attributes.description += "<p>"+ f.attributes.when.toUTCString() + "</p>";
    }
    
    if( row[2].length === 5 ) {
      f.lat = row[2][0];
      f.lon = row[2][1];
      f.attributes.aClass = row[2][2];
      f.attributes.latErr = row[2][3];
      f.attributes.lonErr = row[2][4];
      f.attributes.description = "<p><b>" + f.lat + ", " + f.lon + ", Class " + f.attributes.aClass + "</b></p>";
      f.attributes.description += "<p>"+ f.attributes.when.toUTCString() + "</p>";
    }
    
    else if (row[2].length >= 6) {
        f.lat = row[2][0];
        f.lon = row[2][1];
        f.attributes.dop   = row[2][2];
        f.attributes.cnr   = row[2][3];
        f.attributes.sats  = row[2][4];
        f.attributes.ton   = row[2][5];
        f.attributes.satl  = row[2][6];
        f.attributes.eRes  = row[2][7];
        f.attributes.rtcts = row[2][8];
        f.attributes.description = "<p><b>" + f.lat + ", " + f.lon + "</b></p>";
        f.attributes.description += "<p>GPS Time: " + f.attributes.when.toUTCString() + "</p>";
        if( f.attributes.rtcts ){
            f.attributes.description += "<p>RTC Time: " + new Date(f.attributes.rtcts*1000).toUTCString() + "</p>";
        }
        f.attributes.description += "<p>hDop: " + f.attributes.dop + "</p>";
        if( f.attributes.eRes ){
            f.attributes.description += "<p>eRes: " + f.attributes.eRes + "</p>";
        }
        if( f.attributes.satl ){
            var tbl = "<table><tr align=right><th>satId</th><th>code</th><th>in use</th><th>el</th></tr>";
              
            for( var i=0; i< f.attributes.satl.length;i++ ){
              var os = f.attributes.satl[i];
              tbl += "<tr align=right>" + 
	                   "<td>" + os[0] + "</td>" 
	                 + "<td>" + os[1] + "</td>"
	                 + "<td>" + os[2] + "</td>";
              if( os[3] )
                tbl+="<td>" + os[3] + "</td>";
	            tbl +="</tr>";
            }
            tbl += "</table>";
            f.attributes.description += tbl;
        }
    }

    if (row[3].length >= 3) {
      f.attributes.minv = row[3][0];
      f.attributes.temp = row[3][1];
      f.attributes.sta = row[3][2];
      
      if( row[3].length>3 )
        f.attributes.curr = row[3][3];

      if (f.attributes.minV != null ) {
  	    f.attributes.description = f.attributes.description + "<p>MinV: " + f.attributes.minV + "</p>";
  	  }
      if (f.attributes.temp  != null ) {
        f.attributes.description = f.attributes.description + "<p>Temp(C): " + f.attributes.temp + "</p>";
      }
      if (f.attributes.sta  != null ) {
        f.attributes.description = f.attributes.description + "<p>Activity: " + f.attributes.sta + "</p>";
      }
      if (f.attributes.curr  != null ) {
        f.attributes.description = f.attributes.description + "<p>Current: " + f.attributes.curr + "</p>";
      }
    }
    
    if (row[4].length === 5) {
      f.attributes.evSource = eventSourceType[row[4][0]];
      f.attributes.evActive = row[4][1];
      f.attributes.evMode = row[4][2];
      f.attributes.evNum = eventConfigurationNumber[row[4][3]];
      f.attributes.evVal = row[4][4];
    }

    if (row[5].length === 4) {
      f.attributes.sq = row[5][0];
      f.attributes.st = row[5][1];
      f.attributes.bl = row[5][2];
      f.attributes.dt = row[5][3];
    }

    if (row[6].length >= 14) {
      f.attributes.dryT = row[6][0];
      f.attributes.surfEv = row[6][1];
      f.attributes.d0 = row[6][2];
      f.attributes.d1 = row[6][3];
      f.attributes.d2 = row[6][4];
      f.attributes.d3 = row[6][5];
      f.attributes.d4 = row[6][6];
      f.attributes.d5 = row[6][7];
      f.attributes.b0 = row[6][8];
      f.attributes.b1 = row[6][9];
      f.attributes.b2 = row[6][10];
      f.attributes.b3 = row[6][11];
    }

    if ( row[7] && row[7].length === 6) {
      f.attributes.a0 = row[7][0];
      f.attributes.a1 = row[7][1];
      f.attributes.a2 = row[7][2];
      f.attributes.a3 = row[7][3];
      f.attributes.a4 = row[7][4];
      f.attributes.a5 = row[7][5];
    }

    if ( row[8] && row[8].length > 0) {
      f.attributes.dl0 = row[8][0];
      f.attributes.dl1 = row[8][1];
      f.attributes.dl2 = row[8][2];
      f.attributes.dl3 = row[8][3];
      f.attributes.dl4 = row[8][4];
    }

    if ( row[9] && row[9].length > 0) {
      f.attributes.maxdepth = row[9][0];
      f.attributes.divelen  = row[9][1];
    }

    if ( row[10] && row[10].length > 0) {
        f.attributes.TADindex 		= row[10][0];
        f.attributes.delapsedtime	= row[10][1]; 
    }
    
    if ( row[11] && row[11].length > 0) {
        f.attributes.dbin0  = row[11][0];
        f.attributes.dbin1  = row[11][1];
        f.attributes.dbin2  = row[11][2];
        f.attributes.dbin3  = row[11][3];
        f.attributes.dbin4  = row[11][4];
        f.attributes.dbin5  = row[11][5];
        f.attributes.dbin6  = row[11][6];
    }
    
    if ( row[12] && row[12].length > 0) {
        f.attributes.diveRatio  = row[12][0];
        f.attributes.maxDepthPrevDay  = row[12][1];    	
    }
    
    return f;
  }, 
  
  getFeatures = function(aaData) {
    var prj = Sirtrack.Filters.project();
    prj.deployments.removeAll();
	  var tags = {};
    var features = [];
    var i;
    for ( i = 0; i < aaData.length; i+=1) {
    	try{
      var tagname = aaData[i][0];
      if(!tags[tagname]) {
    	 var tag = {"name": tagname};
         tags[tagname] = tag;
         prj.deployments.push( tag );
      }
      features.push(getFeature(aaData[i]));
    	}
    	catch(e){
    		console.log(e);
    	}
    }
    prj.deployments.sort(function(l, r) { return (l.name < r.name ? -1 : 1) });    
    return features;
  }, 
  
  fnServerData = function(sSource, fnCallback) {
    Sirtrack.Filters.size(0);

    var totalSize = S.Filters.project().jslength;
    jQuery.ajax({
      url : sSource,
      dataType : 'json',
      xhr : function() {
        var xhr = jQuery.ajaxSettings.xhr();
        if( 'onprogress' in xhr ) {
          xhr.onprogress = function(e) {
            if (!totalSize) {
              totalSize = e.target.getResponseHeader('jslength');
              Sirtrack.Filters.total(totalSize);
            }
            Sirtrack.Filters.size(e.loaded);
          };
        }
        else {
          Sirtrack.Filters.size(0);
          Sirtrack.Filters.total(100);
          // $('.ui-progressbar-value').css('background-image',
          // 'url(/file/images/pbar-ani.gif)');
          xhr.onreadystatechange = function() {
            Sirtrack.Filters.size(Sirtrack.Filters.size() + 33);
          };
        }
        return xhr;
      },
      complete : function(jqXHR, textStatus) {
        Sirtrack.Filters.total(jqXHR.getResponseHeader('jslength'));
        Sirtrack.Filters.size(Sirtrack.Filters.total());
      },
      success : function(json) {

        data = getFeatures(json.aaData);
        
      	Sirtrack.Filters.lowerlimit(null);
      	Sirtrack.Filters.past_seconds(null);
        
        dataview.setFilterArgs(filterArgs());

        dataview.setItems(data);
        
        sortfnc( null, {
          sortAsc: true,
          sortCols: [ { sortAsc: columns[1].sortAsc?columns[1].sortAsc:false, sortCol: columns[1]}]
        });
        
        if (fnCallback) {
          return fnCallback(data);
        }
      },
      error : function(jqXHR) {
        Vosao.error(jqXHR.responseText);
        $('#refreshButton').busy("hide");
      }
    });
  }, 
  
  data = [], 
  
  initGrid = function() {
    
    try {
      grid = new Slick.Grid("#myGrid", dataview, columns, options);
    }
    catch(e){
      console.log( "reset cacheStylesheet" )
      window.setTimeout( initGrid, 50 );
      return;
    }
    
    $("#inlineFilterPanel").appendTo(grid.getTopPanel()).show();

    grid.onCellChange.subscribe(function(e, args) {
      dataview.updateItem(args.item.id, args.item);
    });

    columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);

    grid.onSort.subscribe(sortfnc);

    // wire up model events to drive the grid
    dataview.onRowCountChanged.subscribe(function(e, args) {
      grid.updateRowCount();
      grid.render();
    });

    dataview.onRowsChanged.subscribe(function(e, args) {
      grid.invalidateRows(args.rows);
      grid.render();
    });

    // initialize the model after all the events have been hooked up
    dataview.beginUpdate();
    dataview.setItems(data);

    Sirtrack.Filters.first(null);
    Sirtrack.Filters.current_date(null);

    dataview.setFilterArgs(filterArgs());
    dataview.setFilter(myFilter);
    dataview.endUpdate();
    updateColumn();
  }, 
  
  selectedTagIds = function() {
    var selectedTagIds = {};
    var tags = Sirtrack.Filters.deployments();
    var i;
    for ( i = 0; i < tags.length; i+=1) {
      // if( tags[i].id === tagid || tags[i].name === '' + tagid )
      // return true;

      // selectedTagIds[tags[i].id] = 1;
      selectedTagIds[tags[i].name] = 1;
    }
    return selectedTagIds;
  }, 
  
  getData = function(fnCallback) {
    Sirtrack.Filters.first(null);
    Sirtrack.Filters.current_date(null);

    Sirtrack.Filters.gps_e(false);
    Sirtrack.Filters.argos_e(false);
    Sirtrack.Filters.event_e(false);
    Sirtrack.Filters.minv_e(false);
    Sirtrack.Filters.temp_e(false);
    Sirtrack.Filters.sta_e(false);
    Sirtrack.Filters.dives_e(false);
    Sirtrack.Filters.summ_e(false);

    Sirtrack.Filters.activity_e(false);
    Sirtrack.Filters.daylog_e(false);
    Sirtrack.Filters.depth_e(false);
    Sirtrack.Filters.TADindex_e(false);
    Sirtrack.Filters.depthBin_e(false);
    Sirtrack.Filters.diveRatio_e(false);

    return fnServerData(Sirtrack.Filters.getUrl('js'), fnCallback);
  }, 
  
  redraw = function(fnCallback) {
    if (!grid) {
      console.log('grid not initialized');
      return;
//      getData( function() {
//        initGrid();
//        if (fnCallback) {
//          fnCallback();
//        }
//      });
    }
    else {
      if (!data) {
        reload(function() {
          redraw(fnCallBack);
        });
      }
      else {
        dataview.setFilterArgs( filterArgs() );
        dataview.refresh();
        if (typeof fnCallback === 'function') {
          fnCallback();
        }
      }
    }
  }, 
  
  reload = function(fnCallback) {
    if (!grid) {
      getData(function() {
        initGrid();
        if (fnCallback) {
          fnCallback();
        }
      });
    }
    else {
      getData(fnCallback);
    }
  }, 
  
  updateColumn = function(fnCallback) {
    var visibleColumns = [];
    var i = 0;
    
    visibleColumns.push(columns[i++]); // Tag Id
    visibleColumns.push(columns[i++]); // when
    
    if (Sirtrack.Filters.gps_e() && Sirtrack.Filters.gps_f() || 
        Sirtrack.Filters.argos_e() && Sirtrack.Filters.argos_f()
        || Sirtrack.Filters.thr_e() && Sirtrack.Filters.thr_f()
        || Sirtrack.Filters.tf_e() && ( Sirtrack.Filters.tfn_f() || Sirtrack.Filters.tfs_f() ) 
    ) {
      visibleColumns.push(columns[i++]); // lat
      visibleColumns.push(columns[i++]); // lon
    } 
    else
      i += 2;
    
    if( Sirtrack.Filters.argos_e() && Sirtrack.Filters.argos_f()
        || Sirtrack.Filters.thr_e() && Sirtrack.Filters.thr_f()
        || Sirtrack.Filters.tf_e() && ( Sirtrack.Filters.tfn_f() || Sirtrack.Filters.tfs_f() ) 
       ) {
         visibleColumns.push(columns[i++]); // aClass 
       }
       else
         i += 1;

    if( Sirtrack.Filters.thr_e() && Sirtrack.Filters.thr_f()
     || Sirtrack.Filters.tf_e() && ( Sirtrack.Filters.tfn_f() || Sirtrack.Filters.tfs_f() ) 
    ) {
      // TODO H, N, S classes
      visibleColumns.push(columns[i++]); // latErr
      visibleColumns.push(columns[i++]); // lonErr
    }
    else
      i += 2;

    if (Sirtrack.Filters.minv_f()) {
      visibleColumns.push(columns[i++]); // minV
      visibleColumns.push(columns[i++]); // curr
    }
    else
      i += 2;

    if (Sirtrack.Filters.temp_f() && Sirtrack.Filters.temp_e()) {
      visibleColumns.push(columns[i++]); 
    }
    else
      i += 1;
    
    if (Sirtrack.Filters.sta_f()) {
      visibleColumns.push(columns[i++]);
    }
    else
      i += 1;

    if (Sirtrack.Filters.event_f()) {
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
    }
    else
      i += 5;
    
    if (Sirtrack.Filters.dives_f()) {
      visibleColumns.push(columns[i++]); //sq
      visibleColumns.push(columns[i++]); //st
      visibleColumns.push(columns[i++]); //bl
      visibleColumns.push(columns[i++]); //dt
    }
    else
      i += 4;
    
    if (Sirtrack.Filters.summ_f()) {
      visibleColumns.push(columns[i++]); //dryt 
      visibleColumns.push(columns[i++]); //surfEv
      visibleColumns.push(columns[i++]); //d0
      visibleColumns.push(columns[i++]); //d1
      visibleColumns.push(columns[i++]); //d2
      visibleColumns.push(columns[i++]); //d3
      visibleColumns.push(columns[i++]); //d4
      visibleColumns.push(columns[i++]); //d5
      visibleColumns.push(columns[i++]); //b0
      visibleColumns.push(columns[i++]); //b1
      visibleColumns.push(columns[i++]); //b2
      visibleColumns.push(columns[i++]); //b3
      visibleColumns.push(columns[i++]); //b4
      visibleColumns.push(columns[i++]); //b5
    }
    else
      i += 14;

    
    if (Sirtrack.Filters.activity_f()) {
      visibleColumns.push(columns[i++]); //a0: IntTemp
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
    }
    else
      i += 6;

    if (Sirtrack.Filters.daylog_f()) {  
      visibleColumns.push(columns[i++]); //dl0: SST
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
      visibleColumns.push(columns[i++]);
    }
    else
      i += 5;
    
    if (Sirtrack.Filters.gps_e() && Sirtrack.Filters.gps_f()) {
      visibleColumns.push(columns[i++]); // dop
      visibleColumns.push(columns[i++]); // cnr
      visibleColumns.push(columns[i++]); // sats
      visibleColumns.push(columns[i++]); // ton
    }
    else
      i += 4;

    if (Sirtrack.Filters.depth_e() && Sirtrack.Filters.depth_f()) {
      visibleColumns.push(columns[i++]); //maxdepth
      visibleColumns.push(columns[i++]); //divelen
    }
    else
      i += 2;


    if (Sirtrack.Filters.TADindex_e() && Sirtrack.Filters.TADindex_f()) {
        visibleColumns.push(columns[i++]); //TADindex
        visibleColumns.push(columns[i++]); //Elapsed Time        
      }
      else
        i += 1;

    if (Sirtrack.Filters.depthBin_e() && Sirtrack.Filters.depthBin_f()) {
        visibleColumns.push(columns[i++]); //dbin0
        visibleColumns.push(columns[i++]); //dbin1
        visibleColumns.push(columns[i++]); //dbin2
        visibleColumns.push(columns[i++]); //dbin3
        visibleColumns.push(columns[i++]); //dbin4
        visibleColumns.push(columns[i++]); //dbin5
        visibleColumns.push(columns[i++]); //dbin6        
      }
      else
        i += 7;
    
    if (Sirtrack.Filters.diveRatio_e() && Sirtrack.Filters.diveRatio_f()) {
        visibleColumns.push(columns[i++]); //dratio
        visibleColumns.push(columns[i++]); //dmaxp        
      }
      else
        i += 2;    
    
    grid.setColumns(visibleColumns);
    redraw(fnCallback);
  }, 
  
  init = function() {

    initGrid();

    $('#tabs').bind('tabsshow', function(event, ui) {
      S.selectedTab(ui.index);
      
      if (ui.index === 0) {
        Sirtrack.Map.redraw();
      }
      else if (ui.index === 1) {
        updateColumn();
      }
    });
  };

  var obj = {
    init : init,
    reload : reload,
    redraw : redraw,
    getData : getData,
    dataview : function() {
      return dataview;
    },
    grid : function() {
      return grid;
    },
    updateColumn : updateColumn,
    aClassIdx: {
        "Z" : 0,
        "B" : 1,
        "A" : 2,
        "0" : 3,
        "1" : 4,
        "2" : 5,
        "3" : 6
      },
      hideh: hideh
  };
  
  S.register( obj );
  
  return obj;
}());
