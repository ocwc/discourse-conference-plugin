# frozen_string_literal: true

# name: ConferencePlugin
# about: OE Global 2020 Conference
# version: 0.1
# authors: ocwc
# url: https://github.com/ocwc

register_asset 'stylesheets/common/conference-plugin.scss'
register_asset 'stylesheets/desktop/conference-plugin.scss', :desktop
register_asset 'stylesheets/mobile/conference-plugin.scss', :mobile

enabled_site_setting :conference_plugin_enabled
DiscoursePluginRegistry.serialized_current_user_fields << 'oeg20_faves'

PLUGIN_NAME ||= 'ConferencePlugin'

load File.expand_path('lib/conference-plugin/engine.rb', __dir__)

after_initialize do
  # https://github.com/discourse/discourse/blob/master/lib/plugin/instance.rb

  User.register_custom_field_type 'oeg20_faves', :array
  register_editable_user_custom_field [ :oeg20_faves, oeg20_faves: [] ]

  # TODO Drop after Discourse 2.6.0 release
  if respond_to?(:allow_public_user_custom_field)
    allow_public_user_custom_field :oeg20_faves
  else
    whitelist_public_user_custom_field :oeg20_faves
  end

#   add_to_serializer(:user, :oeg20_faves) {
#     object.user.custom_fields['oeg20_faves'] if object.user
#   }


  # load File.expand_path('../app/controllers/conference_plugin/conference_plugin_controller.rb', __FILE__ )
  #
  # Discourse::Application.routes.append do
  #   get '/conference/schedule' => 'conference_plugin/conference_schedule#index'
  # end
end
