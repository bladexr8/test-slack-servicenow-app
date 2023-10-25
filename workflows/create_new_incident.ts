import {
  DefineWorkflow,
  Schema,
} from "https://deno.land/x/deno_slack_sdk@2.4.0/mod.ts";

import CreateIncidentDefinition from "../functions/create_incident/definition.ts";

const CreateNewIncidentWorkflow = DefineWorkflow({
  callback_id: "create_new_incident_workflow",
  title: "Create New Incident",
  description: "Create a New Service Now Incident",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channel", "interactivity"],
  },
});

/* Step 1 - Open a form */
const issueFormData = CreateNewIncidentWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Create an Incident",
    interactivity: CreateNewIncidentWorkflow.inputs.interactivity,
    submit_label: "Create",
    description: "Create a New Incident in Service Now",
    fields: {
      elements: [{
        name: "user",
        title: "Who is lodging the Issue?",
        type: Schema.types.string,
        enum: [
          "abel.tuter",
          "abraham.lincoln",
          "andrew.jackson",
          "byron.fortuna",
          "chuck.farley",
        ],
      }, {
        name: "urgency",
        title: "What is the Priority of the Issue?",
        description: "The Incident Priority",
        type: Schema.types.string,
        enum: [
          "1 - High",
          "2 - Medium",
          "3 - Low",
        ],
      }, {
        name: "short_description",
        title: "Please Provide a Short Description",
        description: "Short Description of the Incident",
      }],
      required: ["user", "urgency", "short_description"],
    },
  },
);

/* Step 2 - Create a new issue */
const incident = CreateNewIncidentWorkflow.addStep(CreateIncidentDefinition, {
  user: issueFormData.outputs.fields.user,
  urgency: issueFormData.outputs.fields.urgency,
  short_description: issueFormData.outputs.fields.short_description,
});

/* Step 3 - Post the new issue to channel */
CreateNewIncidentWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: CreateNewIncidentWorkflow.inputs.channel,
  message: `Thank you for your support request.\n` +
    `Issue #${incident.outputs.IncidentNumber} has been successfully created`,
});

export default CreateNewIncidentWorkflow;
