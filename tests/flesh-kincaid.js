const fleshKincaid = require('../src/modules/analytics/algorithms/flesch-kincaid.js')
const words = require('../src/modules/utils/words')

fleshKincaid(`
None of these are any good.

Separate your source into features. Each feature should have every thing about that feature - the controller, the route, the model, the css the html etc.

I don’t know why the “divide everything up by it’s functional role” e.g. controllers/models/routes” model is so prevalent. Probably because it makes sense for trivial apps. When your app grows up and you have 100s of files in the controllers section and hundreds in the model section and you realize that to make one change to the app requires opening up four files in four directories every single time it’s only then that you realize it’s a horrible organizational pattern.

I would go so far as to say that style is an anti-pattern.

`)
