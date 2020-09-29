module ConferencePlugin
  class ConferencePluginController < ::ApplicationController
    requires_plugin ConferencePlugin

    before_action :ensure_logged_in

    def index
    end

    def schedule
      @conference_entries = ConferenceEntry.all
      render json: @conference_entries
    end

    def clear
      @conference_entries = ConferenceEntry.all
      @conference_entries.delete_all

      render json: {'status': 'ok', 'msg': 'removed all entries'}
    end

    def show
      @conference_entry = ConferenceEntry.find_by easychair: params[:easychair]
      render json: [@conference_entry]
    end

    def create
      entry = ConferenceEntry.new do |e|
        e.title = params[:title]
        e.description = params[:description]
        e.start = params[:start]
        e.end = params[:end]
        e.url = params[:url]
        e.topic = params[:topic]
        e.kind = params[:format]
        e.author = params[:author]
        e.sync = params[:sync]
        e.easychair = params[:easychair]
        e.timezone = params[:timezone]
        e.unesco = params[:unesco]
        e.sector = params[:sector]
        e.track = params[:track]
      end
      entry.save

      render json: [entry]
    end
  end
end
