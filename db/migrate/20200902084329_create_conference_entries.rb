class CreateConferenceEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :conference_entries do |t|
      t.string :title
      t.text :description
      t.string :start
      t.string :end
      t.string :url
      t.string :topic
      t.string :format
      t.string :author
      t.boolean :sync

      t.timestamps
    end
  end
end
