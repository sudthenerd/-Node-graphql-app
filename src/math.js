// Example of 'name' and 'default' export of function.
var add = (arg1, arg2) => arg1 + arg2;
var subtracts = (arg1, arg2) => arg1 - arg2;

export { subtracts, add as default };