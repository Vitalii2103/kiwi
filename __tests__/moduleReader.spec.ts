import {ModuleFacadeDto} from "../modules/index.dto";
import {ReaderCommand} from "../modules/reader/reader.dto";
import {Readable} from "stream";

const Reader = require('../modules/reader/reader')

describe('Module Reader', () => {
  let reader: ModuleFacadeDto;
  let readable: Readable;

  beforeAll(async () => {
    reader = await Reader.initialize();
  });

  it('Successfully mounted', async () => {
    expect(reader).toBeDefined();
  });

  it('Get data from stream', async () => {
    const data = require('fs').readFileSync(`${__dirname}/../__mocks__/users.csv`).toString('utf-8');
    async function * generate() {
      yield data;
    }
    readable = Readable.from(generate());
    const result = await reader.execute(ReaderCommand.GET_STREAM_DATA, readable);
    expect(result).toHaveLength(data.length);
  });

  it('Create CSV from stream', async () => {
    const data = require('fs').readFileSync(`${__dirname}/../__mocks__/users.csv`).toString('utf-8');
    async function * generate() {
      yield `
---- metaDataBrowser
Header1: Content1
Header2: Content2
Header3: Content3

${data}

---- metaDataBrowser
`;
    }
    readable = Readable.from(generate());
    const result = await reader.execute(ReaderCommand.CSV_FROM_STREAM, readable);
    expect(result).toHaveLength(7);
    // @ts-ignore
    expect(result[0].email).toBe('abbey@example.com')
  })
});
