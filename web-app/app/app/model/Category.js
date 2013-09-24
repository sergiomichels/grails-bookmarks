Ext.define('Bookmarks.model.Category', {

    extend : 'Ext.data.Model',

    fields : [{
        name : 'name',
        type : 'string'
    }, {
        name : 'description',
        type : 'string'
    }, {
        name : 'parent.id',
        type : 'int'
    },{
        name : 'qtip',
        type : 'string',
        convert : function(value, model) {
            return model.get('description');            
        }
    }],

    validations: [
        {type: 'length', field: 'name', max: 30},
        {type: 'length', field: 'description', max: 100}
    ],

    belongsTo : [
        {
            model: 'Category',
            name: 'parent',
            associationKey: 'parent',
            foreignKey: 'parent.id'
        }
    ],

    hasMany : [{
        model : 'Category',
        name : 'subcategories',
        associationKey : 'subcategories',
        foreignKey : 'category_id'
    }],

    proxy : {
        type : 'rest',
        url : '../rest/category',
        reader : {
            type : 'json',
            root : 'data'
        }
    }

}); 