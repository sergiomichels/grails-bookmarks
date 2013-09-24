package br.com.app.domains

class Category {

	String name
	
	String description
	
	Category parent
	
	static hasMany = [subcategories : Category]
	
	static mappedBy = [children: 'parent']
	
	static constraints = {
		name blank: false, maxSize: 30
		description blank: false, maxSize: 100
		parent nullable: true
	}
	
	static mapping = {
		subcategories sort: "id"
	}
	
	static Category getRoot() {
		def cat = Category.executeQuery(" from Category where parent is null ")
		return cat ? cat[0] : null
	}
	
	boolean isLeaf() {
		return subcategories ? (subcategories.size() > 0 ? false : true) : true
	}
	
	@Override
	public String toString() {
		"[category: $name, description: $description, leaf: ${isLeaf()}]"
	}
	
}
