package br.com.app.domains

class Bookmark {

	String url
	
	String title
	
	String description
	
	static belongsTo = [category : Category]
	
	static constraints = {
		url blank: false, url: true
		title blank: false, maxSize: 30
		description maxSize: 100
	}
	
}
