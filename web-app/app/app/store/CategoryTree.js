Ext.define('Bookmarks.store.CategoryTree', {
    
    extend : 'Ext.data.TreeStore',

    model : 'Bookmarks.model.Category',

    proxy : {
        type : 'ajax',
        url : '../category/tree',
        reader : {
            type: 'json'
        }
    },

    autoLoad : true
    
});
