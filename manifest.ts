import { Manifest } from "deno-slack-sdk/mod.ts";
import CreateIncidentDefinition from "./functions/create_incident/definition.ts";
import CreateNewIncidentWorkflow from "./workflows/create_new_incident.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "Workflows for Service Now",
  description: "Bringing Service Now functionality into Slack",
  icon: "assets/default_new_app_icon.png",
  functions: [CreateIncidentDefinition],
  workflows: [CreateNewIncidentWorkflow],
  outgoingDomains: ["servicenow.com"],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
