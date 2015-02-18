class UsersController < ApplicationController

	def index #landing page
		render :index
	end

	def unmatched
		binding.pry
	end

	def new
		render :new
	end

	def create #post to create new user when user hits submit
		new_user = User.new({name: params[:name], password: params[:password]})
		new_user.save
		redirect_to '/'
 	end

end