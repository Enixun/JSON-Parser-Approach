function JSONParser(string) {
  if (string === "null") return parseNull();
  if (string === "true" || string === "false") return parseBool(string);
  if (string[0] === '"') return parseString(string);
  if (string[0] === "{" || string[0] === "[") return partitionData(string);
  else return parseNum(string);
}

function parseNull() {
  return null;
}

function parseBool(string) {
  return string === "true";
}

function parseString(string) {
  return string.slice(1, -1).replace(/\\(\\[bfnrtu])?/g, '$1');
}

function parseNum(string) {
  return Number(string);
}

function partitionData(string) {
  const bracketDict = { "[": "]", "{": "}" };
  const bracketStack = [];
  const chunks = [];
  let currChunk = "";

  for (let i = 1; i < string.length - 1; i++) {
    if (string[i] === '"') {
      currChunk += string[i++];
      while (string[i] !== '"' && string[i - 1] !== "\\") {
        currChunk += string[i++];
      }
    }

    if (string[i] in bracketDict) {
      bracketStack.push(string[i]);
    }
    else if (string[i] === bracketDict[bracketStack[bracketStack.length - 1]]) {
      bracketStack.pop();
    }
    else if (string[i] === "," && bracketStack.length === 0) {
      chunks.push(currChunk);
      currChunk = "";
      continue;
    }

    currChunk += string[i];

    if (i === ( string.length - 1) - 1) {
      chunks.push(currChunk);
    }
  }

  return (string[0] === "[") ? parseArray(chunks) : parseObj(chunks);
}

function parseArray(chunks) {
  return chunks.map((chunk) => JSONParser(chunk));
}

function parseObj(chunks) {
  const outputObj = {};

  for (let chunk of chunks) {
    let key = '';
    let val = '';

    for (let i = 1; i < chunk.length; ++i) {
      if (chunk[i] !== '"' && chunk[i - 1] !== "\\") {
        key += chunk[i];
      } else {
        val = chunk.slice(i + 2);
        break;
      }
    }
    
    outputObj[key] = JSONParser(val);
  }
  return outputObj;
}

const ctri15 = {
  residents: [
    'Adam Vanek',
    'Akeem Smith',
    'Alastair Scheuermann',
    'Alejandro Florez',
    'Anne-lise Emig',
    'Carter Long',
    'Christina Walton',
    'Das Kang',
    'Dylan Hawkins',
    'Elena Attencio',
    'Eric Dunn',
    'Gary Balogh',
    'Giovana De La Cruz',
    'Iris Wong',
    'Jackie Yuan',
    'Jake Gillan',
    'Jasmine Noor',
    'John Donato',
    'Jon Cruz',
    // 'Jon Tan',
    'Joseph Tejeda',
    'Justin Dilts',
    'Kasey Wolff',
    'Luke Lauther',
    'Mark Teets',
    'Matteo Diterlizzi',
    'Minzo Kim',
    'Nicky Ly',
    'Rachel Kucharski',
    'Sam Lee',
    'Sophia Bui',
    'Stephen Havig',
    'Timmy Zhu',
    'Billy Murphy',
    'YC Chiu',
  ],
  currentWeek: 2,
  likes: ['"\nCostco\n"', 'Javascript', 'AJAX'],
  alreadyPros: true,
  weaknesses: null
};

// const ctri15String = JSON.stringify(ctri15).replace(/(\\[bfnrtu])/g, '\\' + '$1');
// console.log(ctri15String)
// console.log(JSONParser(ctri15String))

function callResident() {
  console.log('✨', ctri15.residents[Math.round(Math.random() * ctri15.residents.length)], '✨');
};

callResident();