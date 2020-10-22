import computed from "discourse-common/utils/decorators";
import { ajax } from "discourse/lib/ajax";

export default Ember.Component.extend({
  easychairId: null,
  tags: null,
  entry: null,

  didReceiveAttrs() {
    let sessionTag = this.get("sessionTag");
    if (sessionTag) {
      let promise = ajax(`/conference/show.json?easychair=${sessionTag}`).then(
        (data) => {
          this.set("entry", data["conference_plugin"][0]);
        }
      );
    }
  },

  @computed("entry.start")
  startDate() {
    let start = this.get("entry.start");
    return moment(start).format("dddd, D MMM, HH:mm A");
  },

  @computed("entry.start")
  isFuture() {
    let start = moment(this.get("entry.start"));
    if (start) {
      return start > moment();
    }
  },

  @computed("entry.endTime")
  endTime() {
    let end = this.get("entry.end");
    return moment(end).format("LT");
  },

  @computed("tags")
  sessionTag() {
    let tags = this.get("tags");
    if (tags) {
      tags = tags.filter((t) => t.startsWith("oeg20_"));
      if (tags.length > 0) {
        return tags[0].replace("oeg20_", "");
      }
    }
  },

  @computed("currentUser.groups.[]")
  isConferenceRegistered() {
    let groups = this.get("currentUser.groups");
    if (groups) {
      return groups.filter((g) => g.name === "oeg2020").length === 1;
    }
  },
});
