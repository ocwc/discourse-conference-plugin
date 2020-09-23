import { acceptance } from "helpers/qunit-helpers";

acceptance("ConferencePlugin", { loggedIn: true });

test("ConferencePlugin works", async assert => {
  await visit("/admin/plugins/conference-plugin");

  assert.ok(false, "it shows the ConferencePlugin button");
});
