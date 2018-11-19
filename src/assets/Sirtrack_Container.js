export var Sirtrack = (function() {

  var helpdialog = function(page, title){
    return $('<div></div>').dialog({
      modal: true,
      draggable: false,
      resizable: false,
      autoOpen: false,
      zIndex: 3000,
      open: function(){
          $(this).load(page);
      },
      height: 480,
      width: 350,
      title: title
    });
  };

  var 
  mapHelp = helpdialog('/d/h.map', 'Map Help'),
  dataHelp = helpdialog('/d/h.table', 'Data Help'),
  projectHelp = helpdialog('/d/h.project', 'Project Help'),
  tagHelp = helpdialog('/d/h.tag', 'Tag Help'),
  profileHelp = helpdialog('/d/h.profile', 'Profile Help'),

  projects = ko.observableArray(),
  users = ko.observableArray(),
  tags = ko.observableArray(),

  projectBy = function(key, value) {
    return ko.utils.arrayFirst(projects(), function(project) {
      return (project[key] == value);
    });
  };

  projectById = function(id) {
    return projectBy("id", id);
  },

  existElement = function(array, element) {
    return ko.utils.arrayFirst(array, function(el) {
      return element.id === el.id;
    });
  },

  addElementIfNotExist = function(array, element) {
    if (!existElement(array, element))
      array.push(element);
  },

  removeProperty = function(array, property) {
    $.each(array, function(i, element) {
      if (element[property]) {
        element[property].removeAll();
      }
    });
  },

  updateProperty = function(array, element, property) {
    var existing = existElement(array, element);
    if (existing) {
      existing[property] = element[property];
    } else {
      array.push(element);
    }
  },

  onLogout = function(){
    Vosao.jsonrpc.loginFrontService.logout(function(r, e){
        if (Vosao.serviceFailed(e)) {
            return;
        }
        if (r.result === 'success') {
            location.href = '/';
        }
        else {
            Vosao.showServiceMessages(r);
        }
    });
  }, 
  
  logindialog = $('<div></div>').dialog({
    modal: true,
    draggable: false,
    resizable: false,
    autoOpen: false,
    zIndex: 3000,
    open: function(){
        $(this).load('/login');
    },
    height: 300,
    width: 400,
    title: 'Sirtrack Data Login'
  }), //  forgotdialog = $('<div></div>').dialog({
  //    modal: true,
  //    draggable: false,
  //    resizable: false,
  //    autoOpen: false,
  //    zIndex: 3000,
  //    open: function(){
  //      $(this).load('/forgot');
  //    },
  //    height: 250,
  //    width: 350,
  //    title: 'Recover Password'
  //  }), 
  
  feedbackdialog = $('<div></div>').dialog({
      modal: true,
      draggable: false,
      resizable: false,
      autoOpen: false,
      zIndex: 3000,
      open: function(){
          $(this).load('/d/email');
      },
      height: 480,
      width: 640,
      title: 'Send Feedback to Sirtrack'
  }), 
  profiledialog = $('<div></div>').dialog({
      modal: true,
      draggable: false,
      resizable: false,
      autoOpen: false,
      zIndex: 3000,
      open: function(){
          $(this).load('/d/profile');
      },
      height: 480,
      width: 350,
      title: 'User Profile'
  }), 

  showProfile = function() {
    profiledialog.dialog('open'); 
    Sirtrack.Profile.init();
    return false;
  },

  showHelp = function() {
    switch(Sirtrack.selectedTab()){
      case 0:
        mapHelp.dialog('open'); 
        break;
      case 1:
        dataHelp.dialog('open'); 
        break;
      case 2:
        projectHelp.dialog('open'); 
        break;
      case 3:
        tagHelp.dialog('open'); 
        break;
      case 4:
        profileHelp.dialog('open'); 
        break;
      default:
    }
    return false;
  },

  showLogin = function(){
    logindialog.dialog('open');
    return false;
  },

  showLogout = function(){
    onLogout();
    return false;
  },

  showForgot = function(){
  //      forgotdialog.dialog('open');
  $('#forgot-dialog').dialog('open');
  return false;
 },

 showFeedback = function(){
  feedbackdialog.dialog('open');
  return false;
 },
  
  objs = [],
  
  register = function(obj){
    objs.push(obj);
  },
  
  initObjs = function(){
    for( i in objs){
      objs[i].init();
    }
  },
  
  init = function(loggedIn) {
    $.ajaxSetup ({ cache: false  }); 
    
    $("#forgot-dialog").dialog({
      width: 400,
      autoOpen: false
   });
   
    ko.bindingHandlers.validToolTip = {
        init : function(element, valueAccessor, allBindings, viewModel) {
          $(element).qtip({
            content : allBindings().msg,
            position : {
              my : 'bottom left',
              at : 'top center'
            },
            hide : true,
            show : {
              event: false,
              ready : false
            }
          });
        },

        update : function(element, valueAccessor, allBindings, viewModel) {
          var valid = ko.utils.unwrapObservable(valueAccessor());
          if( valid)
            $(element).qtip('hide');
          else
            $(element).qtip('show');
        }
    };

    initObjs();
    
    doAjax = function(){
    Sirtrack.Filters.reloadProjects( function(){ 
      Sirtrack.Tab.Project.reload( function() {
          Sirtrack.Tab.Tag.reload( 
              Sirtrack.Profile.load
          );
        });
      });
    };
    
    if (loggedIn) {
      ko.applyBindings(this);

      if(typeof gapi != 'undefined') { 
        var ROOT = '/_ah/api';
        gapi.client.load('projects', 'v1', doAjax, ROOT);
      }
      else {
        Sirtrack.Filters.reloadProjects( doAjax );
      }

    } else {
      logindialog.dialog('open');
    }

  };

  return {
    init : init,
    register : register,
    projects : projects,
    users : users,
    tags: tags,
    Tab: {},
    projectBy : projectBy,
    projectById: projectById,
    existElement : existElement,
    addElementIfNotExist : addElementIfNotExist,
    removeProperty : removeProperty,
    updateProperty : updateProperty,
    showProfile: showProfile,
    showHelp: showHelp,
    showLogin : showLogin,
    showLogout : showLogout,
    showForgot: showForgot,
    showFeeback: showFeedback,
    selectedTab: ko.observable(0),
    tabHelp: "Tab Help"
  };
}());
