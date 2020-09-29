import ComboBoxComponent from "select-kit/components/combo-box";
import { computed } from "@ember/object";

export default ComboBoxComponent.extend({
  classNames: ["auth-token-dropdown"],
  value: -1,

  selectKitOptions: {
    icon: "wrench",
    showFullTitle: true,
    showCaret: true,
  },

  content: computed(function () {
    let values = [
      "UNESCO Focus",
      "Building capacity",
      "Developing supportive policy",
      "Facilitating int cooperation",
      "Inclusive OER",
      "Sustainable OER",
    ];

    return values.map((v, idx) => {
      return {
        id: idx,
        name: v,
      };
    });
  }),

  actions: {
    onChange(id) {
      switch (id) {
        case "notYou":
          // this.showToken(this.token);
          break;
        case "logOut":
          // this.revokeAuthToken(this.token);
          break;
      }
    },
  },
});
