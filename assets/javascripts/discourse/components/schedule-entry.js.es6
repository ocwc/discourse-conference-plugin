import computed from "discourse-common/utils/decorators";
import { htmlSafe } from "@ember/template";

const kindColors = {
  Keynote: "#FF0000",
  Presentation: "#48BB78",
  "Lightning Talk": "#4299E1",
  Workshop: "#FFE525",
  Poster: "#DB43DB",
  Panel: "#3b80f7",
};

const topicColors = {
  "Applications of Open Education Practices/Open Pedagogy/Open Education Research":
    "#FFCA99",
  "Open Pedagogy": "#CBD5E0",
  "Open Education Research": "#FBB6CE",
  "Connecting Open Education to Primary and Secondary (K-12) Education":
    "#A7C3FB",
  "Global Collaboration, Strategies, & Policies in Open Education": "#93F0D4",
  "Innovation through MOOCs practices": "#FF938A",
  "Technologies for Open Education": "#C5A0F8",
};

export default Ember.Component.extend({
  tagName: "",

  @computed("entry.kind")
  kindColor() {
    let kind = this.get("entry.kind");
    let color = kindColors[kind];

    return htmlSafe(`background-color: ${color}`);
  },

  @computed("entry.topic")
  topicColor() {
    let topic = this.get("entry.topic");
    let color = topicColors[topic];

    return htmlSafe(`background-color: ${color}`);
  },

  @computed("currentUser.groups.[]")
  isConferenceRegistered() {
    let groups = this.get("currentUser.groups");
    if (groups) {
      return groups.filter((g) => g.name === "oeg2020").length === 1;
    }
  },

  @computed("entry.startTime")
  startTime() {
    let start = this.get("entry.start");
    return moment(start).format("LT");
  },
});
