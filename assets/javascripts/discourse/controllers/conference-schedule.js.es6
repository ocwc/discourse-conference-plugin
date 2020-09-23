import Controller from "@ember/controller";
import computed from "discourse-common/utils/decorators";

export default Controller.extend({
  actions: {},
  queryParams: ["date"],
  date: null,

  @computed("model")
  sessions() {
    function sortAndFilter(events, date) {
      let filteredEvents = events.filter(
        (e) => moment(e.start).format("YYYY-MM-DD") === date
      );
      filteredEvents.sort((a, b) => {
        let dateA = moment(a.start).format("YYYY-MM-DD HH:mm");
        let dateB = moment(b.start).format("YYYY-MM-DD HH:mm");
        if (dateA < dateB) {
          return -1;
        }
        if (dateB > dateA) {
          return 1;
        }

        return 0;
      });

      return {
        asia: filteredEvents.filter((e) => e.timezone === "asia"),
        europe: filteredEvents.filter((e) => e.timezone === "europe"),
        canada: filteredEvents.filter((e) => e.timezone === "canada"),
      };
    }

    let model = this.get("model.conference_plugin");
    if (model) {
      let events = model.filter((e) => e.sync);
      let anytime = model.filter((e) => e.sync !== true);

      let data = {
        "2020-11-16": sortAndFilter(events, "2020-11-16"),
        "2020-11-17": sortAndFilter(events, "2020-11-17"),
        "2020-11-18": sortAndFilter(events, "2020-11-18"),
        "2020-11-19": sortAndFilter(events, "2020-11-19"),
        "2020-11-20": sortAndFilter(events, "2020-11-20"),
        anytime,
      };
      return data;
    }
    return {};
  },

  @computed("sessions", "date")
  events() {
    let date = this.get("date") || "2020-11-16";
    let sessions = this.get("sessions");

    return sessions[date];
  },

  @computed("date")
  isAnytime() {
    return this.get("date") === "anytime";
  },
});
