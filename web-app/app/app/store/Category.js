Ext.define('Bookmarks.store.Category', {

    extend : 'Ext.data.Store',

    model : 'Bookmarks.model.Category',
    //need to load all to getById works...
    pageSize : 99999
    

}); 