import { withPluginApi } from "discourse/lib/plugin-api";
import { observes } from "discourse-common/utils/decorators";
import computed from "discourse-common/utils/decorators";

// https://github.com/discourse/discourse/blob/master/app/assets/javascripts/discourse/app/lib/plugin-api.js
function initializeConferencePlugin(api) {
  // const container = Discourse.__container__;
  // const topicController = container.lookup("controller:topic");
  // let tags = topicController.get("target.currentRoute.parent.attributes.tags");
  // console.log(topicController);
  // console.log(this.get(model));
}

export default {
  name: "conference-plugin",

  initialize(container) {
    const currentUser = container.lookup("current-user:main");
    if (!currentUser) return;

    const store = container.lookup("store:main");

    withPluginApi("0.10.1", function (api, container) {
      let currentUser = api.getCurrentUser();
      let store = api.container.lookup("store:main");

      api.modifyClass("component:toggle-fave", {
        actions: {
          toggleFave(faveId) {
            return store.find("user", currentUser.username).then((user) => {
              let faves = user.custom_fields.oeg20_faves;

              if (!faves) {
                faves = [];
              } else if (typeof faves !== "object") {
                faves = [faves];
              }

              if (typeof faveId === "number") {
                faveId = faveId.toString();
              }

              if (faves.includes(faveId)) {
                faves = _.without(faves, faveId);
              } else {
                faves.push(faveId);
              }

              user.set("custom_fields.oeg20_faves", faves);
              user.save();
            });
          },
        },

        @computed("currentUser.custom_fields.oeg20_faves.[]")
        userFaves() {
          return this.get("currentUser.custom_fields.oeg20_faves");
          // return store.find("user", currentUser.username).then((user) => {
          //   return user.custom_fields.oeg20_faves;
          // });
        },

        @computed("tags", "userFaves")
        isFaved() {
          let faves = currentUser.custom_fields.oeg20_faves;
          let sessionTag = this.get("sessionTag");
          if (typeof sessionTag === "number") {
            sessionTag = sessionTag.toString();
          }

          if (faves) {
            return faves.indexOf(sessionTag) !== -1;
          }
        },
      });
    });
  },
};
