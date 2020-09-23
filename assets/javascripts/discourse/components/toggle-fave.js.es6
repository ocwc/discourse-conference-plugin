import computed from "discourse-common/utils/decorators";

export default Ember.Component.extend({
  active: false,
  tags: null,
  tagName: 'span',

  // @computed("tags")
  // sessionTag() {
  //   let tags = this.get("tags");
  //   if (tags) {
  //     tags = tags.filter((t) => t.startsWith("oeg20_"));
  //     if (tags) {
  //       return tags[0].replace("oeg20_", "");
  //     }
  //   }
  // },

  @computed("sessionTag")
  isActive() {
    return this.get("active");
  },
});
