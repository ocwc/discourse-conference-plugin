class AddMoreColsToConference < ActiveRecord::Migration[6.0]
  def change
    add_column :conference_entries, :sector, :string
    add_column :conference_entries, :track, :string
  end
end
