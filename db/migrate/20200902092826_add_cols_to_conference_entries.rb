class AddColsToConferenceEntries < ActiveRecord::Migration[6.0]
  def change
    add_column :conference_entries, :easychair, :integer
    add_column :conference_entries, :timezone, :string
    add_column :conference_entries, :unesco, :string
    add_column :conference_entries, :duration, :string
  end
end
