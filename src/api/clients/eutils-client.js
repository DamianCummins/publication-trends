import convert from 'xml-js';

/**
 * eutils api clients
 */
export default class EUtilsClient {
  constructor() {
    this.host = 'eutils.ncbi.nlm.nih.gov';
    this.basePath = '/entrez/eutils';
  }

  /**
   * Query the esearch service
   * @param {String} db
   * @param {String} term
   * @param {Number} reldate
   * @param {String} datetype
   * @param {Number} retmax
   * @param {String} retmode
   */
  queryESearch = async (db, term, reldate, datetype = 'pdat', retmax = 100000, retmode = 'json') => {
    const result = await fetch(`https://${this.host}${this.basePath}/esearch.fcgi`
      + `?db=${db}&term=${term}&reldate=${reldate}&datetype=${datetype}&retmax=${retmax}&retmode=${retmode}`);
    return result.json();
  }

  /**
   * Query the efetch service
   * @param {String} db
   * @param {Number} id
   */
  queryEFetch = async (db, id) => {
    const result = await fetch(`https://${this.host}${this.basePath}/efetch.fcgi`
      + `?db=${db}&id=${id}&retmode=xml`);

    const xml = await result.text();
    const json = convert.xml2json(xml, { compact: true, spaces: 4 });
    return JSON.parse(json);
  }
}
