
module.exports.validateMobileNumber = function(number){
  const regexExp = /^[6-9]\d{9}$/gi;
  return regexExp.test(String(number));
}
module.exports.validateEmail = function(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };
  module.exports.validateName = function(name) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(String(name));
  };