//this code is used to create a new issue for a part named "Sample_Product" using the DevRev API
const axios = require("axios");
const partListUrl = "https://api.devrev.ai/parts.list";
const createWorkUrl = "https://api.devrev.ai/works.create";
const selfUrl = "https://api.devrev.ai/dev-users.self";

//replace <PAT> with your personal access token for authentication
const token = "<PAT>";
//replace "Sample_Product" with the name of the part for which you want to create an issue
const partName = "Sample_Product";

//get the self ID of the user
axios
  .get(selfUrl, {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
    var selfId = response.data.dev_user.id;
    console.log(`Self ID:${selfId}`);

    //get the list of parts
    axios
      .get(partListUrl, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        //find the part ID of the part with the name "Sample_Product"
        let i = 0;
        for (i = 0; i < response.data.parts.length; i++) {
          if (response.data.parts[i].name === partName) {
            break;
          }
        }
        let partId = response.data.parts[i].id;
        console.log(`Part ID:${response.data.parts[i].id}`);
        const data = {
          title: "Title12345", //replace with the title of the issue
          type: "issue", //or ticket
          applies_to_part: partId,
          owned_by: [selfId],
        };

        //create a new issue for the part
        axios
          .post(createWorkUrl, data, {
            headers: {
              Authorization: token,
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  })
  .catch((error) => {
    console.error(error);
  });
