import { client, publicSDK } from '@devrev/typescript-sdk';
import axios from 'axios';

// This function will be called when the 'run' function is executed
export async function handleEvent(event: any) {
  const devrevPAT = event.context.secrets.service_account_token;
  const APIBase = event.execution_metadata.devrev_endpoint;
  const devrevSDK = client.setup({
    endpoint: APIBase,
    token: devrevPAT,
  });

  //Calling the API to update the stage of the issue to completed
  var url = 'https://api.devrev.ai/works.update';
  var headers = {
    'Content-Type': 'application/json',
    Authorization: devrevPAT,
  };
  var data = {
    type: 'issue',
    id: event.payload.source_id,
    stage: {
      name: 'completed',
    },
  };
  axios.post(url, data, { headers: headers }).then((response) => {
    console.log(response);
  });
  //Creating a timeline comment
  const workCreated = event.payload.source_id;
  const bodyComment = 'This command will close the issue.';
  const body = {
    object: workCreated,
    type: 'timeline_comment',
    body: bodyComment,
  };
  const response = await devrevSDK.timelineEntriesCreate(body as any);
  return response;
}
// This function will be called when the command is executed
export const run = async (events: any[]) => {
  console.info('events', JSON.stringify(events), '\n\n\n');
  for (let event of events) {
    const resp = await handleEvent(event);
    console.log(JSON.stringify(resp.data));
  }
};

export default run;
