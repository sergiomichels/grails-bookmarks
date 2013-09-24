Ext.define('Bookmarks.Application', {
    name : 'Bookmarks',

    extend : 'Ext.app.Application',

    views : [],

    controllers : [
        'Main',
        'CategoryForm'            
    ],

    stores : ['CategoryTree', 'Category', 'Bookmark'],

    runAction : function(controllerName, actionName) {

        var controller = this.getController(controllerName);

        if (controller.inited == undefined) {
            controller.init(this);
        }

        var args = [];

        for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        controller['action' + actionName].apply(controller, args);
    }
});
