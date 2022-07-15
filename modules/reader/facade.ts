import { ModuleFacadeDto } from "../index.dto";
import {ReaderCommand} from "./reader.dto";
import {Stream} from "stream";

function getStreamData(stream: Stream): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: string[] = []
    stream.on('error', reject);
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    })
    stream.on('end', () => {
      resolve(chunks.join(''))
    });
  })
}

async function createCsvFromStream(stream: Stream): Promise<{
  T: string, K: any
}[]> {
  const data = await getStreamData(stream);
  const rows = [];
  const lines = data.trim().split("\n").map((e: string) => e.trim());

  let started = false;
  for(let line of lines) {
    if (line === '') {
      if (rows.length === 0) {
        started = true;
        continue;
      } else {
        break;
      }
    }

    if (started) {
      rows.push(line.trim());
    }
  }

  const keys = rows[0].split(',').map((e: string) => e.trim().toLowerCase());
  const raw = rows.join("\n").trim();
  const csv = [];
  const items = (function parseRawCsv() {
    const chars = raw.split('');
    const res: any[] = [];
    let currentItem = '';
    let ignoreNewLine = false;

    chars.forEach((char, i) => {
      if (i === chars.length - 1) {
        res.push(currentItem);
      } else if (char === ',' || char === "\n") {
        if (!ignoreNewLine) {
          res.push(String(currentItem));
          currentItem = '';
        } else {
          currentItem += char;
        }
      } else if (char === '"') {
        ignoreNewLine = !ignoreNewLine;
      } else {
        currentItem += char;
      }
    })

    return res;
  })()

  let current = 0;
  let entry: any = {};
  for (let i = keys.length; i < items.length; i -=- 1) {
    const k = keys[current];

    entry[k] = items[i];

    if (
      (current === keys.length - 1) ||
      i === items.length - 1
    ) {
      const clone = JSON.parse(JSON.stringify(entry));
      csv.push(clone);
      current = 0;
      entry = {};
    } else {
      current++;
    }
  }

  return csv;
}

module.exports = () => {
  return {
    async send() {},
    async execute(command: ReaderCommand, args: unknown) {
      switch (command){
        case ReaderCommand.CSV_FROM_STREAM:
          return await createCsvFromStream(args as Stream);
        case ReaderCommand.GET_STREAM_DATA:
          return getStreamData(args as Stream)
        default: return null;
      }
    }
  } as ModuleFacadeDto;
}
