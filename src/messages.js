export const Messages = {
  'description': 'Description',
  'sourceAccount': 'Source account',
  'targetAccount': 'Target account',
  'tranferAmount': 'Transfering amount',
  'shouldBeValidNumber': 'should be valid amount number or less then the available balance',
  'requiedAndNotEmpty': "is required and cannot be empty"
}

export const getMessage = (key) => {
  return Messages[key];
}