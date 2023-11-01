import { SlackFunction } from "https://deno.land/x/deno_slack_sdk@2.4.0/mod.ts";
import CreateIncidentDefinition from "./definition.ts";

export default SlackFunction(
  CreateIncidentDefinition,
  async ({ inputs, env }) => {
    try {
      console.log(
        `Credentials = ${env.SERVICENOW_USERNAME}:${env.SERVICENOW_PASSWORD}`,
      );
      console.log(
        `Credentials = ${
          btoa(env.SERVICENOW_USERNAME + ":" + env.SERVICENOW_PASSWORD)
        }`,
      );

      // contruct request headers
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${
          btoa(env.SERVICENOW_USERNAME + ":" + env.SERVICENOW_PASSWORD)
        }`,
      };

      console.log("Request Headers...");
      console.log(headers);

      // parse inputs
      const { user, urgency, short_description } = inputs;

      let api_urgency;

      // parse urgency
      switch (urgency) {
        case "1 - High":
          api_urgency = "1";
          break;
        case "2 - Medium":
          api_urgency = "2";
          break;
        default:
          api_urgency = "3"; // Low
      }

      // request endpoint
      const incidentEndpoint = env.SERVICENOW_INCIDENT_TABLE_API_URL;

      // request body
      const body = JSON.stringify({
        caller_id: user,
        short_description: short_description,
        urgency: api_urgency,
      });

      const incident = await fetch(incidentEndpoint, {
        method: "POST",
        headers,
        body,
      }).then((res: Response) => {
        //const response = res;
        //console.log("COMPLETED Service Now Request...");
        //console.log(`Status = ${response.status}`);
        //console.log(response);
        //return response;
        if (res.status === 201) {
          return res.json();
        } else {
          //console.log("***ERROR CREATING INCIDENT***");
          //console.error(JSON.stringify(res.json()));
          throw new Error(`${res.status}: ${res.statusText}`);
        }
      });

      console.log("INCIDENT RESPONSE...");
      console.log(JSON.stringify(incident));

      return {
        outputs: {
          IncidentNumber: `${incident.result.number}`,
        },
      };
    } catch (err) {
      console.error(err);
      return {
        error:
          `An error was encountered during issue creation: \`${err.message}\``,
      };
    }
  },
);
