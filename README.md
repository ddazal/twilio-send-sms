# twilio-send-sms

Send SMS to multiple phones. The function uses `Promise.allSettled` to reject only the promises that fail but still resolving the ones that are completing succesfully. This is the opposite to `Promise.all` where the execution throws an error and stop the execution on any Promise rejecting.