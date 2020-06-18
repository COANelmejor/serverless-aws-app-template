'use strict';

module.exports.lorita = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({
        message: 'Bienvenido dte.gt',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};