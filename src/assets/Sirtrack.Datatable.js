
// Module Pattern
// http://weblogs.asp.net/dwahlin/archive/2011/08/02/techniques-strategies-and-patterns-for-structuring-javascript-code-revealing-module-pattern.aspx
Sirtrack.DataTable = function(){
  
  var initialed = false,
 
  //------------start date range filtering function

  dtOptions = {
//      "sDom": 'W<"clear">lfrtip',
      "sDom": '<lr>t<ip>',
      "bJQueryUI": true,
  // "sPaginationType": "full_numbers",
      "sAjaxSource": "/restlet/position.js",
  // "sAjaxDataProp": "",
      "bFilter": true,
      "bRetrieve": true,
      "bPaginate": false,
      "bProcessing": true,
      "bServerSide": false,
      "bScrollInfinite": false,
      "bScrollCollapse": true, 
      "sScrollX": "100%",
      "sScrollXInner": "110%",         
      "sScrollY": "650px",
    "iDisplayLength": 50, // must match the number of rows returned by the
                          // server
    "aaSorting": [
      [ 0, "asc" ],
      [ 1, "desc" ]
    ],
    "aoColumns": [ 
        { "sWidth": "120px" },
        { "sWidth": "165px", "sType": "date", "fnRender": function(oObj){ 
          return new Date(oObj.aData[1]*1000).toUTCString();
          } },
        { "sWidth": "30px", "bSortable": false },
        { "sWidth": "30px", "bSortable": false },
        { "sWidth": "30px", "bSortable": false },
        { "sWidth": "30px", "bSortable": false },
        { "sWidth": "40px", "bSortable": false },
        { "sWidth": "40px", "bSortable": false },
        { "sWidth": "40px", "bSortable": false },
        { "sWidth": "40px", "bSortable": false },
        { "sWidth": "40px", "bSortable": false },
        { "sWidth": "40px", "bSortable": false },
        { "sWidth": "40px", "bSortable": false },
        { "sWidth": "40px", "bSortable": false },
        { "sWidth": "40px", "bSortable": false }        
      ],
      "fnServerData": function ( sSource, aoData, fnCallback ) {
        /* Add some extra data to the sender */
        //aoData.push( { "name": "more_data", "value": "my_value" } );
        //_fnServerParams( oSettings, aoData );
        console.log(sSource);
        
        jQuery.ajax({
          url: sSource,
          dataType: 'json',
          data: aoData,
          success: function (json) { 
            /* Do whatever additional processing you want on the callback, then tell DataTables */
            fnCallback(json);
            
//            oTable.columnFilter({
//                sPlaceHolder: "head:before",
//                aoColumns: [ { type: "text" },
//                             { type: "date-range" }
////                             null,
////                             null,
////                             null, // CNR
////                             { type: "number-range" } //Sats
//                        ]
//              });           
            
            initialized = true;
          },
          error: function(req){
            alert(req.responseText);
            $('#refreshButton').busy("hide");
          }
         });
      },
      "fnServerParams": function(aoData){
        aoData.push({
          "name": "project",
          "value": Sirtrack.Filters.project().id,
          "refresh": false
        });
        for(var i=0; i<Sirtrack.Filters.tags().length; i++){ 
            aoData.push({
                "name": "tag",
                "value": Sirtrack.Filters.tags()[i].id
              });
         }
      },
      oColumnFilterWidgets: {
          aiExclude: [ 1, 2, 3 ]
//      ,
//          sSeparator: ',  ',
//          bGroupTerms: true
      }
    },

    addFilters = function(){
      // Tag Id filter
      $.fn.dataTableExt.afnFiltering.push(
          function (oSettings, aData, iDataIndex) {
              
              var tags = Sirtrack.Filters.tags();
              var tagid = aData[0];
    
              for( var i = 0; i < tags.length; i++ ){
                if( tags[i].id == tagid || tags[i].name == '' + tagid )
                  return true;
              }
              
              return false;
          }
      );
      // date filter
      $.fn.dataTableExt.afnFiltering.push(
          function (oSettings, aData, iDataIndex) {
              var dCellDate = Date.parse(aData[1]);
    
              if (dCellDate == null)
                  return false;

              var first = Sirtrack.Filters.first();
              var current_date = Sirtrack.Filters.current_date();
              
              if( !first || first > dCellDate ) {
                first = dCellDate;
                Sirtrack.Filters.first( first );
                var lowerlimit = Sirtrack.Filters.first();
                Sirtrack.Filters.lowerlimit( new Date( lowerlimit ));
                Sirtrack.Filters.timevalues[0](0);
              }

              if (!current_date || dCellDate > current_date) {
                current_date = dCellDate;
                Sirtrack.Filters.current_date( current_date );
                var past_seconds = Sirtrack.Filters.current_date();
                Sirtrack.Filters.past_seconds( new Date( past_seconds ));
                Sirtrack.Filters.timevalues[1](100);
              }
              
              var dStartDate = Sirtrack.Filters.lowerlimit().getTime();
              var dEndDate = Sirtrack.Filters.past_seconds().getTime();

              if (dStartDate == null && dEndDate == null) {
                  return true;
              }
              else if (dStartDate == null && dCellDate <= dEndDate) {
                  return true;
              }
              else if (dStartDate <= dCellDate && dEndDate == null) {
                  return true;
              }
              else if (dStartDate <= dCellDate && dCellDate <= dEndDate) {
                  return true;
              }
              return false;
          }
      );
  },
    
  oTable = null,

  initialized = false,
  
  reload = function(){
    if ( typeof oTable == 'undefined' || oTable == null ){
      oTable = jQuery('#table_id').dataTable( dtOptions );
      addFilters();
    }
    else {
      oTable.fnReloadAjax( Sirtrack.Filters.getUrl('js')+'&refresh=false' );
    }
  },
  
  redraw = function(){
    Sirtrack.Filters.first(null);
    Sirtrack.Filters.current_date(null);

    if ( typeof oTable == 'undefined' || oTable == null ){
      this.reload();
    }
    else{ 
      oTable.fnDraw();
    }
  },
  
  getTable = function() {
    return oTable;
  },
  
  init = function(){

    jQuery('#tabs').bind('tabsshow', function(event, ui) {
      if (ui.panel.id == "datatablet" ) 
  // var oTable = jQuery('div.dataTables_scrollBody>table.display',
  // ui.panel).dataTable();
  // var oTable = jQuery('#table_id').dataTable();
  // if ( oTable.length > 0 ) {
  // oTable.fnAdjustColumnSizing();
  // }
//      if( !initialized )
        reload(); 
    });
    
  };
  
  return{
    init: init,
    reload: reload,
    redraw: redraw,
    oTable: getTable
  };
}();

