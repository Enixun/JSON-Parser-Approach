function JSONParserWithSwitch(string) {
  // Don't do this please 😭
  switch (string) {
    case 'true': 
    case 'false':
      return parseBool(string);
    // this will never be true since the condition being checked
    // is the whole string, you cannot isolate the first character
    // in this method
    case string[0] === '"':
      return parseString(string);
    default: 
      return 'default';
  };
}

function JSONParser(string) {
  if (string === 'true' || string === 'false') return parseBool(string);
  if (string[0] === '"') return parseString(string);
  if (string === 'null') return parseNull();
  if (string[0] === '{' || string[0] === '[') return partitionData(string);
}

function parseBool(b) {
  return b === 'true';
}

function parseString(s) {
  // ???
  return s.slice(1, -1).replace(/\\/g, "");
}

function parseNull() {
  return null;
}

function partitionData(s) {
  const chunkArr = [];
  let curChunk = '';
  const brackStack = [];
  const brackDict = { '{': '}', '[': ']'  };

  // 0 and s.length-1 will be {}/[]
  let count = 0;
  for (let i = 1; i < s.length - 1; ++i) {
    if (s[i] === '"') {
      while(s[++i] !== '"') {
        console.log(s[i])
        curChunk += s[i];
      }
      console.log(++count, curChunk);
      chunkArr.push()
      curChunk = '';
    }
    console.log(s[i])
  }
}

// console.log(JSONParser("null") === null)
console.log(JSONParser(JSON.stringify({0: 'some string'})));
console.log(JSONParser('"\ntest"'));
// console.log('2');
// console.log('{ "test": "value" }');