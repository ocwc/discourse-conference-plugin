import Route from "@ember/routing/route";
import { ajax } from "discourse/lib/ajax";

export default Route.extend({
  // controllerName: "conference-plugin-schedule",
  model(params) {
    return ajax("/conference/schedule.json");
  },
});
