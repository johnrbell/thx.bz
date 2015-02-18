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
		binding.pry
		if users == nil
			@error = true	
			render "users/new"
		else
			new_user = User.new({name: params[:name].downcase, password: params[:password]})
			new_user.save
			redirect_to '/'
		end
 	end

end