class AddAccessToUser < ActiveRecord::Migration
  def change
	add_column :users, :accesspw, :string
  end
end
