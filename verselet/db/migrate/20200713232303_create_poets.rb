class CreatePoets < ActiveRecord::Migration[6.0]
  def change
    create_table :poets do |t|
      t.string :name
      t.string :style

      t.timestamps
    end
  end
end
