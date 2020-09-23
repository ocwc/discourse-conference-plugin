module ConferencePlugin
  class Engine < ::Rails::Engine
    engine_name "ConferencePlugin".freeze
    isolate_namespace ConferencePlugin

    config.after_initialize do
      Discourse::Application.routes.append do
        mount ::ConferencePlugin::Engine, at: "/conference"
      end
    end
  end
end
