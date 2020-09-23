class ConferencePluginConstraint
  def matches?(request)
    SiteSetting.conference_plugin_enabled
  end
end
