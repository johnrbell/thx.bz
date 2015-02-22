class UsersController < ApplicationController

	def index #landing page
		render :index
	end

	def new
		render :new
	end

	def create #post to create new user when user hits submit
		params[:name] = params[:name].downcase
		users = User.where(name: params[:name])
		if users == nil
			@error = true	
			render "users/new"
		else
			new_user = User.new({name: params[:name].downcase, password: params[:password]})
			new_user.save

			session[:user_id] = new_user.id #sets the session hash user_id to user.id
			session[:user_name] = new_user.name
			redirect_to '/links' #redirects to posts view all page

		end
 	end

end