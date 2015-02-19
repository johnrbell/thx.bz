class Link < ActiveRecord::Base
	self.belongs_to(:user)
end