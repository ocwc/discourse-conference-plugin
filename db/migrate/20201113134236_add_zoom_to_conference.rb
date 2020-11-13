class AddZoomToConference < ActiveRecord::Migration[6.0]
  def change
    add_column :conference_entries, :zlink, :string
    add_column :conference_entries, :zid, :string
  end
end
