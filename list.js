import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userID = :userID': only return items with matching 'userID'
    //   partition key
    KeyConditionExpression: "userID = :userID",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userID': defines 'userID' to be the id of the author
    ExpressionAttributeValues: {
      ":userID": "123",
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});