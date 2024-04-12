//this code is used to create a new issue for a part named "Sample_Product" using the DevRev API
const axios = require("axios");
const partListUrl = "https://api.devrev.ai/parts.list";
const createWorkUrl = "https://api.devrev.ai/works.create";
const selfUrl = "https://api.devrev.ai/dev-users.self";

//replace <PAT> with your personal access token for authentication
const token = "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXZyZXYuYWkvIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiYXpwIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvLzFabEc1REZjZmY6ZGV2dS8xIiwiZXhwIjoxODA3MDk3NzQwLCJodHRwOi8vZGV2cmV2LmFpL2F1dGgwX3VpZCI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by9zdXBlcjphdXRoMF91c2VyL2dvb2dsZS1vYXV0aDJ8MTExMzkyNTc5NTI4MDkwNjQ0NjA3IiwiaHR0cDovL2RldnJldi5haS9hdXRoMF91c2VyX2lkIjoiZ29vZ2xlLW9hdXRoMnwxMTEzOTI1Nzk1MjgwOTA2NDQ2MDciLCJodHRwOi8vZGV2cmV2LmFpL2Rldm9fZG9uIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvLzFabEc1REZjZmYiLCJodHRwOi8vZGV2cmV2LmFpL2Rldm9pZCI6IkRFVi0xWmxHNURGY2ZmIiwiaHR0cDovL2RldnJldi5haS9kZXZ1aWQiOiJERVZVLTEiLCJodHRwOi8vZGV2cmV2LmFpL2Rpc3BsYXluYW1lIjoiNG5tMjBjczIxMiIsImh0dHA6Ly9kZXZyZXYuYWkvZW1haWwiOiI0bm0yMGNzMjEyQG5tYW1pdC5pbiIsImh0dHA6Ly9kZXZyZXYuYWkvZnVsbG5hbWUiOiJWSUtBUyBIIFBBSSBUIiwiaHR0cDovL2RldnJldi5haS9pc192ZXJpZmllZCI6dHJ1ZSwiaHR0cDovL2RldnJldi5haS90b2tlbnR5cGUiOiJ1cm46ZGV2cmV2OnBhcmFtczpvYXV0aDp0b2tlbi10eXBlOnBhdCIsImlhdCI6MTcxMjQ4OTc0MCwiaXNzIjoiaHR0cHM6Ly9hdXRoLXRva2VuLmRldnJldi5haS8iLCJqdGkiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vMVpsRzVERmNmZjp0b2tlbi9Rb1RCNmZuSyIsIm9yZ19pZCI6Im9yZ185RUdER3FUeVd6enhTcWNsIiwic3ViIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvLzFabEc1REZjZmY6ZGV2dS8xIn0.0eqANszp16ry7QIDXovpdv7hT2iguWApgyaWHsgNoeyABGdebyLnNZ3lZPvuUVpZie8gBbps1Gq_ZEDtqkS_hTSeA_Q0uiITG8fzee2psJuZc4exies-4bD0GDTYJVPt8P5w952hNlv2EVhgW00OkLgqy6rytQg4XpKeO70Or0ozpwNf7whYu_De3iDKGQIZ-jQGx2rrYkm0uz7jUPc3hNyHdPZ6MHeS5fCnm4B0jfew6Ljdp0qmckkr4C2Gm1dwoVNFO8TmAb6FVmfJSJL3qUuOQWYnnL9JpgYe3HOLuCkmYYRYLjzlbB40REQBFwPrhfnoiv7z-FRQmmGXS8yRoA";

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
