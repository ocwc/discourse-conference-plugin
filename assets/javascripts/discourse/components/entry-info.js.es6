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
    return moment(start).format("LLLL");
  },

  @computed("entry.start")
  isFuture() {
    let start = moment(this.get("entry.start"));
    return start > moment();
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
});
