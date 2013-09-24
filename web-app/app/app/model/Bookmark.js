Ext.define('Bookmarks.model.Bookmark', {
    
    extend : 'Ext.data.Model',
    
    fields : [{
        name : 'url',
        type : 'string'
    }, {
        name : 'title',
        type : 'string'
    }, {
        name : 'description',
        type : 'string'
    },{
        name : 'category.id',
        type : 'int'
    }],

    belongsTo : [
        {
            model: 'Category',
            associationKey: 'category.id'
        }
    ],
    
    proxy: {
        type: 'rest',
        url: '../rest/bookmark/',
        reader : {
            type: 'json',
            root: 'data'
        }
    }

});
