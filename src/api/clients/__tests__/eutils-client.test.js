import EUtilsClient from '../eutils-client';

let eUtilsClient;
describe('eutils-client', () => {

  beforeAll(() => {
    eUtilsClient = new EUtilsClient();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should exist and be a function', () => {
    expect(EUtilsClient).toBeDefined();
    expect(typeof EUtilsClient).toEqual('function');
  });

  it('should support instantiation', () => {
    expect(eUtilsClient.host).toEqual('eutils.ncbi.nlm.nih.gov');
    expect(eUtilsClient.basePath).toEqual('/entrez/eutils');
  });

  it('should support querying eSearch', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    const queryResults = await eUtilsClient.queryESearch('pubmed', 'sars', 365, 'pdat', 100000);
    expect(fetchSpy).toHaveBeenCalledWith('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=sars&reldate=365&datetype=pdat&retmax=100000&retmode=json');
    expect(queryResults).toBeDefined();
    expect(typeof queryResults).toEqual('object');
    expect(queryResults.esearchresult).toBeDefined();
    expect(queryResults.esearchresult.count).toBeDefined();
  });

  it('should support querying eFetch', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    const queryResults = await eUtilsClient.queryEFetch('pubmed', 1);
    expect(fetchSpy).toHaveBeenCalledWith('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=1&retmode=xml');
    expect(queryResults).toBeDefined();
    expect(typeof queryResults).toEqual('object');
    expect(queryResults.PubmedArticleSet).toBeDefined();
  });
});
