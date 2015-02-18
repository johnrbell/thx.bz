class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string :local
      t.string :external
    end
  end
end
