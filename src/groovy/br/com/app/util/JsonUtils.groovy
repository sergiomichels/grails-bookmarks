package br.com.app.util

import grails.util.Holders

import org.springframework.validation.Errors
import org.springframework.validation.FieldError

class JsonUtils {

	static List<String> errorsToResponse(Errors errors, Locale locale) {
		
		def error = []
		
		for(def err : errors.allErrors) {
			if(err instanceof FieldError) {
				error << Holders.grailsApplication.mainContext.getMessage(err, locale)
			}
		}
		
		return error
	}
	
	static String toJson(Map model) {
		def gsonBuilder = Holders.grailsApplication.mainContext.getBean("gsonBuilder")
		def gson = gsonBuilder.create()
		return gson.toJson(model)
	}
	
}
