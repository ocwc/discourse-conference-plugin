import Controller from "@ember/controller";
import computed from "discourse-common/utils/decorators";
import { reads } from "@ember/object/computed";
import DropdownSelectBoxComponent from "select-kit/components/dropdown-select-box";

let sortDates = function (a, b) {
  let dateA = moment(a.start).format("YYYY-MM-DD HH:mm");
  let dateB = moment(b.start).format("YYYY-MM-DD HH:mm");
  if (dateA < dateB) {
    return -1;
  }
  if (dateB > dateA) {
    return 1;
  }

  return 0;
};

export default Controller.extend({
  actions: {},
  queryParams: ["date"],
  date: null,
  showMine: false,

  @computed
  currentTime() {
    return moment("2020-11-16 16:10:30");
  },

  @computed("model")
  upcomingEvents() {
    let model = this.get("model.conference_plugin");
    let currentTime = this.get("currentTime");
    let events = model
      .filter((e) => e.sync)
      .filter((e) => currentTime.diff(moment(e.start), "minutes") < 5);
    events.sort(sortDates);

    return events.slice(0, 3);
  },

  faves: reads("currentUser.custom_fields.oeg20_faves"),

  @computed("model", "faves", "showMine")
  sessions() {
    function sortAndFilter(events, date) {
      let filteredEvents = events.filter(
        (e) => moment(e.start).format("YYYY-MM-DD") === date
      );
      filteredEvents.sort(sortDates);

      return {
        asia: filteredEvents.filter((e) => e.timezone === "asia"),
        europe: filteredEvents.filter((e) => e.timezone === "europe"),
        canada: filteredEvents.filter((e) => e.timezone === "canada"),
      };
    }

    let model = this.get("model.conference_plugin");
    if (this.get("showMine")) {
      let faves = this.get("faves");
      model = model.filter((e) => faves.indexOf(e.easychair.toString()) !== -1);
    }

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
