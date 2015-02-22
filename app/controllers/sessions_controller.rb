class SessionsController < ApplicationController

	def create #creates new 'session' when existing user wants to login
		user = User.find_by(name: params["name"].downcase) #checks the database for user email

		if user && user.authenticate(params["password"]) #if user email exists, and password is legit
			session[:user_id] = user.id #sets the session hash user_id to user.id
			session[:user_name] = user.name
			redirect_to '/links' #redirects to posts view all page
		else
			@error = true
			render "users/index"
		end
	end

	def destroy #logout, destroys session and redirects user to login page
		reset_session
		redirect_to '/'
	end

end