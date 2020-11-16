import Controller from "@ember/controller";
import computed from "discourse-common/utils/decorators";
import { reads } from "@ember/object/computed";

let sortDates = function (a, b) {
  let dateA = parseInt(moment(a.start).format("X"));
  let dateB = parseInt(moment(b.start).format("X"));

  return dateA - dateB;
};

export default Controller.extend({
  actions: {},
  queryParams: ["date"],
  date: null,
  showMine: false,
  selectedDay: "All days",
  selectedTopic: "All topics",

  @computed("faves")
  pluralFaves() {
    let faves = this.get("faves");
    return faves > 1;
  },

  @computed("sessions")
  availableDays() {
    let sessions = this.get("sessions");
    if (sessions) {
      return [
        "All days",
        ...Object.keys(sessions).filter((item) => sessions[item].length > 0),
      ];
    }
  },

  @computed("model.conference_plugin")
  availableTopics() {
    let model = this.get("model.conference_plugin");
    let events = model.filter((e) => e.sync);

    let topics = [...new Set(events.map((item) => item.topic))]
      .filter((item) => item)
      .sort();
    if (events) {
      return ["All topics", ...topics];
    }
  },

  @computed("model")
  upcomingEvents() {
    let model = this.get("model.conference_plugin");
    let currentTime = moment();
    let events = model
      .filter((e) => e.sync)
      .filter((e) => currentTime.diff(moment(e.start), "minutes") < 5);
    events.sort(sortDates);

    return events.slice(0, 3);
  },

  faves: reads("currentUser.custom_fields.oeg20_faves"),

  @computed("model", "faves", "showMine", "selectedTopic")
  sessions() {
    function sortAndFilter(events, date) {
      let filteredEvents;

      if (date) {
        filteredEvents = events.filter(
          (e) => moment(e.start).format("YYYY-MM-DD") === date
        );
      } else {
        filteredEvents = events;
      }
      filteredEvents.sort(sortDates);
      return filteredEvents;
    }

    let model = this.get("model.conference_plugin");
    if (this.get("showMine")) {
      let faves = this.get("faves");
      model = model.filter((e) => faves.indexOf(e.easychair.toString()) !== -1);
    }

    let selectedTopic = this.get("selectedTopic");
    if (selectedTopic !== "All topics") {
      model = model.filter((e) => e.topic === selectedTopic);
    }

    if (model) {
      let events = model.filter((e) => e.sync);
      let anytime = model.filter((e) => e.sync !== true);

      return {
        "Sunday, 15 November": sortAndFilter(events, "2020-11-15"),
        "Monday, 16 November": sortAndFilter(events, "2020-11-16"),
        "Tuesday, 17 November": sortAndFilter(events, "2020-11-17"),
        "Wednesday, 18 November": sortAndFilter(events, "2020-11-18"),
        "Thursday, 19 November": sortAndFilter(events, "2020-11-19"),
        "Friday, 20 November": sortAndFilter(events, "2020-11-20"),
        Anytime: anytime,
      };
    }
    return {};
  },

  @computed("sessions", "selectedDay", "selectedTopic")
  filteredSessions() {
    let sessions = this.get("sessions");
    let selectedDay = this.get("selectedDay");

    if (selectedDay === "All days") {
      return sessions;
    }

    return { [selectedDay]: sessions[selectedDay] };
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

  @computed("currentUser.groups.[]")
  isConferenceRegistered() {
    let groups = this.get("currentUser.groups");
    if (groups) {
      return groups.filter((g) => g.name === "oeg2020").length === 1;
    }
  },
});
