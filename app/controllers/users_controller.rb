class UsersController < ApplicationController

	def index #landing page
		render :index
	end

	def unmatched
		binding.pry
	end

end