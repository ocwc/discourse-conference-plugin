import DiscourseRoute from "discourse/routes/discourse";

export default DiscourseRoute.extend({
  controllerName: "conference-index",

  beforeModel() {
    this.transitionTo("conference.schedule");
  },
});
