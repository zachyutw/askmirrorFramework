import axios from 'axios';
import cheerio from 'cheerio';
import boom from 'boom';
import { asyncErrorMiddleware } from '../handlers/error.handler';

const cheerioCrawler = async (URL, params) => {
    const result = await axios.get(URL, { params }).then((res) => res).catch((err) => {
        throw boom.failedDependency('cheerioCrawler Fail in' + URL, err);
    });
    return cheerio.load(result.data);
};

export const cheerioCrawlerNext = (URL, params) => async (req, res, next) => {
    try {
        const $ = await cheerioCrawler(req.query.URL ? req.query.URL : URL, params);
        req.$ = $;
        next();
    } catch (err) {
        next(err);
    }
};
export default cheerioCrawler;
