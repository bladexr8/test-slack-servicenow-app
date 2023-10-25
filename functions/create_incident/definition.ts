import {
  DefineFunction,
  Schema,
} from "https://deno.land/x/deno_slack_sdk@2.4.0/mod.ts";

const CreateIncidentDefinition = DefineFunction({
  callback_id: "create_incident",
  title: "Create ServiceNow Incident",
  description: "Create a New Incident in ServiceNow from Slack",
  source_file: "functions/create_incident/mod.ts",
  input_parameters: {
    properties: {
      user: {
        type: Schema.types.string,
        description: "User lodging Incident",
      },
      urgency: {
        type: Schema.types.string,
        description: "Urgency of Incident, 1=High, 2=Medium, 3=Low",
      },
      short_description: {
        type: Schema.types.string,
        description: "Short Description of Incident",
      },
    },
    required: ["user", "short_description"],
  },
  output_parameters: {
    properties: {
      IncidentNumber: {
        type: Schema.types.string,
        description: "Incident Number created in Service Now",
      },
    },
    required: ["IncidentNumber"],
  },
});

export default CreateIncidentDefinition;
