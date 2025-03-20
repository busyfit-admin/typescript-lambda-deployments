import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { Handler } from 'aws-lambda';


// Create clients: 
const ddbClient = new AWS.DynamoDB.DocumentClient();


export const handler: APIGatewayProxyHandler = async (event, context) => {


    // Check if event has POST Function

    if (event.httpMethod != "POST") {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Update Complete',
            }, null, 2),
        };
    }

    // Get the CognitionID from the path parameter
    const cognitionID = context.identity?.cognitoIdentityId;

    // Perform the checks of the Cognito ID
    const confirmation = validateUser(cognitionID);

    // Perform Dynamodb Operations: 
    const DDBInput = {
        TableName: "ProductData",
        Item: {
            Id: "SKU345",
            productName: "TShirt"
        },
    };

    const output = await ddbClient.put(DDBInput).promise()

    if (output.$response.error != null) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Put Failed',
            }, null, 2),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Update Complete',
        }, null, 2),
    };

};


// Validation function 

async function validateUser(username: string | undefined): Promise<any> {

    if (username === undefined) {
        return "incorrect";
    }
    const output = await fetch("SOME URL", {
        method: "GET",
        headers: {
            'id': username,
        }
    })

    return new Promise(
        (resolve, reject) => {
            resolve: console.log("completed successfully");
            reject: console.log(" unsuccessful");
        }
    ).finally(
        () => {
            console.log("undo any changes");
        }
    )
}