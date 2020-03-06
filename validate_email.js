/**
 * Using regular expression to validate email address.
 * Exactly email address format refer to http://en.wikipedia.org/wiki/Email_address.
 * @author zhongchiyu@gmail.com
 */
var validateEmail = (function() {
  // ATTENSION: escape is really mess because you have to escape in string and
  // in regular expression.
  var normal = "0-9a-zA-Z\\!#\\$%&'\\*\\+\\-\\/\\=\\?\\^_`\\{\\|\\}~";
  // mix contain normal character and special character
  // special character \ " need to be escaped
  var mix = '\\(\\),:;<>@\\[\\](\\\\\\\\)(\\\\")0-9a-zA-Z\\!#\\$%&\'\\*\\+-\\/\\=\\?\\^_`\\{\\|\\}~\\.\\s';

  // local part
  var mixPattern = '"['+mix+']*"';
  var normalPattern = '[' + normal + '("")]+?';
  var localPattern = ['^((', normalPattern, '\\.)*', normalPattern, ')'].join('');
  // domain part
  var hostnamePattern = '(:?[0-9a-zA-Z\\-]+\\.)*[0-9a-zA-Z\\-]+';
  var ipPattern = '\\[.+?\\]'; // TODO: handle IPv4 and IPv6
  var domainPattern = ['(?:(?:', hostnamePattern, ')|(?:', ipPattern, '))$'].join('');

  var commentPattern = "(?:\\(.*?\\))?";
  var pattern = localPattern + '@' + domainPattern;

  var mixreg = new RegExp(mixPattern, 'g');
  var reg = new RegExp(pattern, 'g');

  return function(email) {
    var valid = true;
    // reset regular expression
    reg.lastIndex = 0;
    // TODO: I want to combine special pattern into normal pattern.
    // Which means just one regular expression can handle everything.
    // Anybody have any good idea please contact with me(zhongchiyu@gmail.com)
    email = email.replace(mixreg, '""');
    return reg.test(email);
  };
}());

(function() {
var validEmails = [
  'niceandsimple@example.com',
  'very.common@example.com',
  'a.little.lengthy.but.fine@dept.example.com',
  'disposable.style.email.with+symbol@example.com',
  'user@[IPv6:2001:db8:1ff::a0b:dbd0]',
  '"much.more unusual"@example.com',
  '"very.unusual.@.unusual.com"@example.com',
  '"very.(),:;<>[]\\".VERY.\\"very@\\\\ \\"very\\".unusual"@strange.example.com',
  '0@a',
  'postbox@com',
  '!#$%&\'*+-/=?^_`{}|~@example.org',
  '"()<>[]:,;@\\\\\\"!#$%&\'*+-/=?^_{}| ~ ? ^_{}|~.a"@example.org',
  '""@example.org'
];
var invalidEmails = [
  'Abc.example.com',
  'Abc.@example.com',
  'Abc..123@example.com',
  'A@b@c@example.com',
  'a"b(c)d,e:f;g<h>i[j\\k]l@example.com',
//  'just"not"right@example.com',
  'this is"not\\allowed@example.com',
  'this\\ still\\"not\\\\allowed@example.com'
];
  var i, len;
  console.log('===valid email===');
  for (i=0, len=validEmails.length;i<len;i++) {
    console.log(validateEmail(validEmails[i]));
  }
  console.log('===invalid email===');
  for (i=0, len=invalidEmails.length;i<len;i++) {
    console.log(validateEmail(invalidEmails[i]));
  }
  // Output:
  // ===valid email===
  // true
  // true
  // true
  // true
  // true
  // true
  // true
  // true
  // true
  // true
  // true
  // true
  // true
  // ===invalid email===
  // false
  // false
  // false
  // false
  // false
  // false
  // false
}());
