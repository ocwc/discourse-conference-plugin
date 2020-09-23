require_dependency "conference_plugin_constraint"

ConferencePlugin::Engine.routes.draw do
  get "/" => "conference_plugin#index", constraints: ConferencePluginConstraint.new
  get "/schedule" => "conference_plugin#schedule", constraints: ConferencePluginConstraint.new
  get "/show" => "conference_plugin#show", constraints: ConferencePluginConstraint.new
  post "/schedule" => "conference_plugin#create", constraints: ConferencePluginConstraint.new
  delete "/clear" => "conference_plugin#clear", constraints: ConferencePluginConstraint.new
  get "/actions" => "actions#index", constraints: ConferencePluginConstraint.new
  get "/actions/:id" => "actions#show", constraints: ConferencePluginConstraint.new
end
