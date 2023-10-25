import { Trigger } from "https://deno.land/x/deno_slack_api@2.1.2/types.ts";
import CreateNewIncidentWorkflow from "../workflows/create_new_incident.ts";

const createNewIncidentShortcut: Trigger<
  typeof CreateNewIncidentWorkflow.definition
> = {
  type: "shortcut",
  name: "Create Service Now Incident",
  description: "Create a New Service Now Incident",
  workflow: "#/workflows/create_new_incident_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default createNewIncidentShortcut;
