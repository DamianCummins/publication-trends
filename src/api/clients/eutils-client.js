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
   * @param {String} rettype
   * @param {String} retmode
   */
  queryESearch = async (db, term, reldate, datetype = 'pdat', retmax, rettype, retmode = 'json') => {
    const url = new URL(`https://${this.host}${this.basePath}/esearch.fcgi`);
    const queryParams = {
      db,
      term,
      reldate,
      datetype,
      retmode,
      rettype,
    };

    // Only pass retmax if rettype is not set
    if (!rettype) {
      queryParams.retmax = retmax;
    }

    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key]) {
        url.searchParams.append(key, queryParams[key]);
      }
    });

    const result = await fetch(url.toString());
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
