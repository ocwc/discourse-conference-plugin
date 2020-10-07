import computed from "discourse-common/utils/decorators";

export default Ember.Component.extend({
  active: false,
  tags: null,
  tagName: "",
  isError: false,

  @computed("sessionTag")
  isActive() {
    return this.get("active");
  },
});
