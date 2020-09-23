import computed from "discourse-common/utils/decorators";

export default Ember.Component.extend({
  tagName: "",

  @computed("entry.startTime")
  startTime() {
    let start = this.get("entry.start");
    return moment(start).format("LT");
  },
});
