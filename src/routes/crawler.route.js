import express from 'express';
// import controller from '../mongoose/controllers/tpl.controller';
import withRoute from './Route/withRoute';
import { asyncErrorMiddleware } from '../handlers/error.handler';
import cheerioCrawler, { cheerioCrawlerNext } from '../crawler/cheerio.crawler';
import cheerio from 'cheerio';
let router = express.Router();
import axios from 'axios';
/**! New router path put over here **/

/**! New router path put over here **/
const controller = {};
router.get(
    '/test',
    cheerioCrawlerNext('https://playhearthstone.com/en-us/expansions-adventures/rise-of-shadows/cards'),
    asyncErrorMiddleware((req, res, next) => {
        const $ = req.$;
        let imageUrls = [];
        $('#RevealedCards a').each(function (i, elem){
            imageUrls.push($(this).children('img').attr('data-src'));
        });
        // console.log(cardImages);
        return res.send({ message: 'success', imageUrls });
    })
);
router = withRoute(router, controller);
export default router;
