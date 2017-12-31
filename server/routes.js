const CONST = require('./constants'),
    API_URLS = require('../src/shared/api-urls');
const ArticleUtils = require('./api_utils/ArticleUtils');
const Corser = require('corser');


module.exports = function (app) {

    // Adds Access-Control-Allow-Origin headers
    // https://github.com/agrueneberg/Corser
    app.use(Corser.create());

    // API ROUTES -----------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////
    app.get(API_URLS.article, function (req, res) {
        //res.setHeader('Access-Control-Allow-Origin', 'http://politicsinvogue.com');
        console.log('API:', API_URLS.article);
        const body = "What is it about wearing great underwear that makes you feel, so, well, great? I always believe in the link between looking good and feeling good, but it works both ways doesn’t it? If you feel good, surely you look good too, because you’re buzzing with confidence, and feeling your best. Feeling yourself! And for as long as I’ve preached look good feel good like a mini female Gok Wan, minus a penchant for waist belts, calling everyone girlfriend, and naming boobs 'breasticles' (this is especially relevant to this particular post, I’ve preached that comfort is the key behind feeling good.There’s long been that concept of wearing super sassy, achingly sexy lingerie just for yourself, just to know that you have that little secret and that you’re absolutely s.l.a.y.i.n.g. underneath your clothes. It turns your steps into struts. It turns your confidence in to Beyonce Confidence (Beyonfidence???) And everything looks as though you’re staring at it through a Snapchat pretty filter – especially your reflection. Without wanting to overuse this phrase, once again, in a totally marketing sense - this whole concept has been sold to us as empowering.But the truth is, it’s actually a little bit of a marketing lie. Because yes, you put on that lingerie set and you look in the mirror and think slay queen!, then you put on your jeans and T-shirt, or pencil skirt and shirt for work, and you go out and strut your stuff knowing you are a goddess. And then the lace starts to itch your boobs. And the straps kind of dig in. The underwire is suddenly trying to constrict your breathing. And it’s one of those thongs where you feel you might be spending your lunch break frantically whispering the words “Canesten” and “Duo” over the desk at your local Boots pharmacist. And actually, it turns out the illusion of this confidence-boosting underwear is just that, an illusion, and it makes you feel worse than if you wore, well, ‘comfortable pants’.Ah, yes, there’s the concept of comfortable underwear. When I say comfort, you say cotton briefs, okay? I’m going to argue yes, if you go to the right place. Simone Perele, the French lingerie label most certainly has it all - and more. What pulls me to this label so strongly is the desire it has to make women really feel beautiful – aesthetically, and in terms of physicality. Everything is created to bring out the best of a woman's curves, and make her feel 100. In the words of the Madame Simone Perele herself, self-confidence is a beauty that never fades, and I think that’s a little something we can all get on board with.When I went for my fitting to find the perfect style for me, the assistant couldn’t have been more helpful. I told her no padding – I only like unlined bras. Lacey, pretty, but not over the top! And she came back with a whole host of styles. They do plenty of designs in a 30 back too - thank god - as many lingerie shops proudly say that they offer these sizes, when in reality they only ever have plain nude, black and white T-shirt bras. Considering I said not too over the top, I settled with the beautiful half-cup Elles set in flame red, which you’ll notice in the main site imagery has an audaciously sexy lace panel across the chest that you can remove for a less vampish look.The best kind of lingerie should have two abilities, to make you feel invincible under your clothes, but to also feel invisible on your skin. Simone Perele nails both with ease.";
        return res.json({
            body: body,
            title: 'My Winter Uniform (That Isn\'t Jeans...)',
            datePublished: '12/22/2017hello world',
            mainImage: 'https://blog.hubspot.com/hubfs/00-Blog_Thinkstock_Images/How_to_Write_a_Blog_Post.jpg?t=1514169488746',
            // TODO: this will be an id probably? that we will retrive category name from
            categoryName: 'politics',
            timeToReadInMin: ArticleUtils.timeToReadInMin(body)
        });
    });
};
