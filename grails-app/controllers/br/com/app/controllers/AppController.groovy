package br.com.app.controllers

class AppController {

	def redir() {
		println "redir..."
		redirect action: 'index'
	}
	
	def index() {
		println "index..."
		render view: '/index'
	}
	
}
