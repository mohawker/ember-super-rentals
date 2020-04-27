'use strict';

define("super-rentals/tests/acceptance/super-rentals-test", ["qunit", "@ember/test-helpers", "ember-qunit"], function (_qunit, _testHelpers, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Acceptance | super rentals', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal((0, _testHelpers.currentURL)(), '/');
      assert.dom('nav').exists();
      assert.dom('h1').hasText('SuperRentals');
      assert.dom('h2').hasText('Welcome to Super Rentals!');
      assert.dom('.jumbo a.button').hasText('About Us');
      await (0, _testHelpers.click)('.jumbo a.button');
      assert.equal((0, _testHelpers.currentURL)(), '/about');
    });
    (0, _qunit.test)('visiting /about', async function (assert) {
      await (0, _testHelpers.visit)('/about');
      assert.equal((0, _testHelpers.currentURL)(), '/about');
      assert.dom('nav').exists();
      assert.dom('h1').hasText('SuperRentals');
      assert.dom('h2').hasText('About Super Rentals');
      assert.dom('.jumbo a.button').hasText('Contact Us');
      await (0, _testHelpers.click)('.jumbo a.button');
      assert.equal((0, _testHelpers.currentURL)(), '/getting-in-touch');
    });
    (0, _qunit.test)('visiting /getting-in-touch', async function (assert) {
      await (0, _testHelpers.visit)('/getting-in-touch');
      assert.equal((0, _testHelpers.currentURL)(), '/getting-in-touch');
      assert.dom('nav').exists();
      assert.dom('h1').hasText('SuperRentals');
      assert.dom('h2').hasText('Contact Us');
      assert.dom('.jumbo a.button').hasText('Back Home');
      await (0, _testHelpers.click)('.jumbo a.button');
      assert.equal((0, _testHelpers.currentURL)(), '/');
    });
    (0, _qunit.test)('viewing the details of a rental property', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.dom('.rental').exists({
        count: 3
      });
      await (0, _testHelpers.click)('.rental:first-of-type a');
      assert.equal((0, _testHelpers.currentURL)(), '/rentals/grand-old-mansion');
    });
    (0, _qunit.test)('visiting /rentals/grand-old-mansion', async function (assert) {
      await (0, _testHelpers.visit)('/rentals/grand-old-mansion');
      assert.equal((0, _testHelpers.currentURL)(), '/rentals/grand-old-mansion');
      assert.dom('nav').exists();
      assert.dom('h1').containsText('SuperRentals');
      assert.dom('h2').containsText('Grand Old Mansion');
      assert.dom('.rental.detailed').exists();
      assert.dom('.share.button').hasText('Share on Twitter');
      let button = (0, _testHelpers.find)('.share.button');
      let tweetURL = new URL(button.href);
      assert.equal(tweetURL.host, 'twitter.com');
      assert.equal(tweetURL.searchParams.get('url'), `${window.location.origin}/rentals/grand-old-mansion`);
    });
    (0, _qunit.test)('navigating using the nav-bar', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.dom('nav').exists();
      assert.dom('nav a.menu-index').hasText('SuperRentals');
      assert.dom('nav a.menu-about').hasText('About');
      assert.dom('nav a.menu-contact').hasText('Contact');
      await (0, _testHelpers.click)('nav a.menu-about');
      assert.equal((0, _testHelpers.currentURL)(), '/about');
      await (0, _testHelpers.click)('nav a.menu-contact');
      assert.equal((0, _testHelpers.currentURL)(), '/getting-in-touch');
      await (0, _testHelpers.click)('nav a.menu-index');
      assert.equal((0, _testHelpers.currentURL)(), '/');
    });
  });
});
define("super-rentals/tests/integration/components/jumbo-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | jumbo', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders the content inside a jumbo header with a tomster', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Jumbo>Hello World</Jumbo>
      */
      {
        id: "YfYp0FPz",
        block: "{\"symbols\":[],\"statements\":[[7,\"jumbo\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Hello World\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('.jumbo').exists();
      assert.dom('.jumbo').hasText('Hello World');
      assert.dom('.jumbo .tomster').exists();
    });
  });
});
define("super-rentals/tests/integration/components/map-test", ["qunit", "ember-qunit", "@ember/test-helpers", "super-rentals/config/environment"], function (_qunit, _emberQunit, _testHelpers, _environment) {
  "use strict";

  (0, _qunit.module)('Integration | Component | map', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders a map for the specified parameters', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Map
          @lat="37.7797"
          @lng="-122.4184"
          @zoom="10"
          @width="150"
          @height="120"
        />
      */
      {
        id: "hl/snceS",
        block: "{\"symbols\":[],\"statements\":[[7,\"map\",[],[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[\"37.7797\",\"-122.4184\",\"10\",\"150\",\"120\"]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('.map').exists();
      assert.dom('.map img').hasAttribute('alt', 'Map image at coordinates 37.7797,-122.4184');
      assert.dom('.map img').hasAttribute('src', /^https:\/\/api\.mapbox\.com/, 'the src starts with "https://api.mapbox.com"');
      assert.dom('.map img').hasAttribute('width', '150');
      assert.dom('.map img').hasAttribute('height', '120');
      let {
        src
      } = (0, _testHelpers.find)('.map img');
      let token = encodeURIComponent(_environment.default.MAPBOX_ACCESS_TOKEN);
      assert.ok(src.includes('-122.4184,37.7797,10'), 'the src should include the lng,lat,zoom parameter');
      assert.ok(src.includes('150x120@2x'), 'the src should include the width,height and @2x parameter');
      assert.ok(src.includes(`access_token=${token}`), 'the src should include the escaped access token');
    });
    (0, _qunit.test)('the default alt attribute can be overridden', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Map
            @lat="37.7797"
            @lng="-122.4184"
            @zoom="10"
            @width="150"
            @height="120"
            alt="A map of San Francisco"
          />
      */
      {
        id: "U35cuiTL",
        block: "{\"symbols\":[],\"statements\":[[7,\"map\",[[23,\"alt\",\"A map of San Francisco\",null]],[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[\"37.7797\",\"-122.4184\",\"10\",\"150\",\"120\"]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('.map img').hasAttribute('alt', 'A map of San Francisco');
    });
    (0, _qunit.test)('the src, width and height attributes cannot be overridden', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Map
            @lat="37.7797"
            @lng="-122.4184"
            @zoom="10"
            @width="150"
            @height="120"
            src="/assets/images/teaching-tomster.png"
            width="200"
            height="300"
          />
      */
      {
        id: "4CB4PVXH",
        block: "{\"symbols\":[],\"statements\":[[7,\"map\",[[23,\"src\",\"/assets/images/teaching-tomster.png\",null],[23,\"width\",\"200\",null],[23,\"height\",\"300\",null]],[[\"@lat\",\"@lng\",\"@zoom\",\"@width\",\"@height\"],[\"37.7797\",\"-122.4184\",\"10\",\"150\",\"120\"]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('.map img').hasAttribute('src', /^https:\/\/api\.mapbox\.com/, 'the src starts with "https://api.mapbox.com"');
      assert.dom('.map img').hasAttribute('width', '150');
      assert.dom('.map img').hasAttribute('height', '120');
    });
  });
});
define("super-rentals/tests/integration/components/rental-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rental', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.setupRouter();
    });
    (0, _qunit.test)('it renders information about a rental property', async function (assert) {
      this.setProperties({
        rental: {
          id: 'grand-old-mansion',
          title: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          location: {
            lat: 37.7749,
            lng: -122.4194
          },
          category: 'Estate',
          type: 'Standalone',
          bedrooms: 15,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.'
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Rental @rental={{this.rental}} />
      */
      {
        id: "56rmR8vx",
        block: "{\"symbols\":[],\"statements\":[[7,\"rental\",[],[[\"@rental\"],[[27,[24,0],[\"rental\"]]]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('article').hasClass('rental');
      assert.dom('article h3').hasText('Grand Old Mansion');
      assert.dom('article h3 a').hasAttribute('href', '/rentals/grand-old-mansion');
      assert.dom('article .detail.owner').includesText('Veruca Salt');
      assert.dom('article .detail.type').includesText('Standalone');
      assert.dom('article .detail.location').includesText('San Francisco');
      assert.dom('article .detail.bedrooms').includesText('15');
      assert.dom('article .image').exists();
      assert.dom('article .map').exists();
    });
  });
});
define("super-rentals/tests/integration/components/rental/detailed-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rental/detailed', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.setProperties({
        rental: {
          id: 'grand-old-mansion',
          title: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          location: {
            lat: 37.7749,
            lng: -122.4194
          },
          category: 'Estate',
          type: 'Standalone',
          bedrooms: 15,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.'
        }
      });
    });
    (0, _qunit.test)('it renders a header with a share button', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Rental::Detailed @rental={{this.rental}} />
      */
      {
        id: "T8Kq9Z++",
        block: "{\"symbols\":[],\"statements\":[[7,\"rental/detailed\",[],[[\"@rental\"],[[27,[24,0],[\"rental\"]]]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('.jumbo').exists();
      assert.dom('.jumbo h2').containsText('Grand Old Mansion');
      assert.dom('.jumbo p').containsText('a nice place to stay near San Francisco');
      assert.dom('.jumbo a.button').containsText('Share on Twitter');
    });
    (0, _qunit.test)('it renders detailed information about a rental property', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Rental::Detailed @rental={{this.rental}} />
      */
      {
        id: "T8Kq9Z++",
        block: "{\"symbols\":[],\"statements\":[[7,\"rental/detailed\",[],[[\"@rental\"],[[27,[24,0],[\"rental\"]]]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('article').hasClass('rental');
      assert.dom('article h3').containsText('About Grand Old Mansion');
      assert.dom('article .detail.owner').containsText('Veruca Salt');
      assert.dom('article .detail.type').containsText('Standalone – Estate');
      assert.dom('article .detail.location').containsText('San Francisco');
      assert.dom('article .detail.bedrooms').containsText('15');
      assert.dom('article .image').exists();
      assert.dom('article .map').exists();
    });
  });
});
define("super-rentals/tests/integration/components/rental/image-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rental/image', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders given image', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Rental::Image
          src="/assets/images/teaching-tomster.png"
          alt="Teaching Tomster"
        />
      */
      {
        id: "l1oB9FkC",
        block: "{\"symbols\":[],\"statements\":[[7,\"rental/image\",[[23,\"src\",\"/assets/images/teaching-tomster.png\",null],[23,\"alt\",\"Teaching Tomster\",null]],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('.image').exists();
      assert.dom('.image img').hasAttribute('src', '/assets/images/teaching-tomster.png');
      assert.dom('.image img').hasAttribute('alt', 'Teaching Tomster');
    });
    (0, _qunit.test)('clicking on the component toggles its size', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Rental::Image
              src="/assets/teaching-tomster.png"
              alt="Teaching Tomster"
            />
          
      */
      {
        id: "lMWAJ8NU",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"rental/image\",[[23,\"src\",\"/assets/teaching-tomster.png\",null],[23,\"alt\",\"Teaching Tomster\",null]],[[],[]],null],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('button.image').exists();
      assert.dom('.image').doesNotHaveClass('large');
      assert.dom('.image small').hasText('View Larger');
      await (0, _testHelpers.click)('button.image');
      assert.dom('.image').hasClass('large');
      assert.dom('.image small').hasText('View Smaller');
      await (0, _testHelpers.click)('button.image');
      assert.dom('.image').doesNotHaveClass('large');
      assert.dom('.image small').hasText('View Larger');
    });
  });
});
define("super-rentals/tests/integration/components/rentals-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rentals', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.setProperties({
        rentals: [{
          id: 'grand-old-mansion',
          title: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          location: {
            lat: 37.7749,
            lng: -122.4194
          },
          category: 'Estate',
          type: 'Standalone',
          bedrooms: 15,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.'
        }, {
          id: 'urban-living',
          title: 'Urban Living',
          owner: 'Mike Teavee',
          city: 'Seattle',
          location: {
            lat: 47.6062,
            lng: -122.3321
          },
          category: 'Condo',
          type: 'Community',
          bedrooms: 1,
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
          description: 'A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.'
        }, {
          id: 'downtown-charm',
          title: 'Downtown Charm',
          owner: 'Violet Beauregarde',
          city: 'Portland',
          location: {
            lat: 45.5175,
            lng: -122.6801
          },
          category: 'Apartment',
          type: 'Community',
          bedrooms: 3,
          image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
          description: 'Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.'
        }]
      });
    });
    (0, _qunit.test)('it renders all given rental properties by default', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Rentals @rentals={{this.rentals}} />
      */
      {
        id: "ioWuF1QI",
        block: "{\"symbols\":[],\"statements\":[[7,\"rentals\",[],[[\"@rentals\"],[[27,[24,0],[\"rentals\"]]]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('.rentals').exists();
      assert.dom('.rentals input').exists();
      assert.dom('.rentals .results').exists();
      assert.dom('.rentals .results li').exists({
        count: 3
      });
      assert.dom('.rentals .results li:nth-of-type(1)').containsText('Grand Old Mansion');
      assert.dom('.rentals .results li:nth-of-type(2)').containsText('Urban Living');
      assert.dom('.rentals .results li:nth-of-type(3)').containsText('Downtown Charm');
    });
    (0, _qunit.test)('it updates the results according to the search query', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Rentals @rentals={{this.rentals}} />
      */
      {
        id: "ioWuF1QI",
        block: "{\"symbols\":[],\"statements\":[[7,\"rentals\",[],[[\"@rentals\"],[[27,[24,0],[\"rentals\"]]]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('.rentals').exists();
      assert.dom('.rentals input').exists();
      await (0, _testHelpers.fillIn)('.rentals input', 'Downtown');
      assert.dom('.rentals .results').exists();
      assert.dom('.rentals .results li').exists({
        count: 1
      });
      assert.dom('.rentals .results li').containsText('Downtown Charm');
      await (0, _testHelpers.fillIn)('.rentals input', 'Mansion');
      assert.dom('.rentals .results').exists();
      assert.dom('.rentals .results li').exists({
        count: 1
      });
      assert.dom('.rentals .results li').containsText('Grand Old Mansion');
    });
  });
});
define("super-rentals/tests/integration/components/rentals/filter-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rentals/filter', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <Rentals::Filter />
      */
      {
        id: "ayUjRgPd",
        block: "{\"symbols\":[],\"statements\":[[7,\"rentals/filter\",[],[[],[]],null]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <Rentals::Filter>
              template block text
            </Rentals::Filter>
          
      */
      {
        id: "pad96Qd4",
        block: "{\"symbols\":[],\"statements\":[[1,1,0,0,\"\\n      \"],[7,\"rentals/filter\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"\\n        template block text\\n      \"]],\"parameters\":[]}]]],[1,1,0,0,\"\\n    \"]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("super-rentals/tests/integration/components/share-button-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  class MockRouterService extends Ember.Service {
    get currentURL() {
      return '/foo/bar?baz=true#some-section';
    }

  }

  (0, _qunit.module)('Integration | Component | share-button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:router', MockRouterService);

      this.tweetParam = param => {
        let link = (0, _testHelpers.find)('a');
        let url = new URL(link.href);
        return url.searchParams.get(param);
      };
    });
    (0, _qunit.test)('basic usage', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ShareButton>Tweet this!</ShareButton>
      */
      {
        id: "1eTSReZB",
        block: "{\"symbols\":[],\"statements\":[[7,\"share-button\",[],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Tweet this!\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('a').exists();
      assert.dom('a').hasAttribute('target', '_blank');
      assert.dom('a').hasAttribute('rel', 'external nofollow noopener noreferrer');
      assert.dom('a').hasAttribute('href', /^https:\/\/twitter\.com\/intent\/tweet/);
      assert.dom('a').hasClass('share');
      assert.dom('a').hasClass('button');
      assert.dom('a').containsText('Tweet this!');
      assert.equal(this.tweetParam('url'), new URL('/foo/bar?baz=true#some-section', window.location.origin));
    });
    (0, _qunit.test)('it supports passing @text', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ShareButton @text="Hello Twitter!">Tweet this!</ShareButton>
      */
      {
        id: "2Qhdh+tH",
        block: "{\"symbols\":[],\"statements\":[[7,\"share-button\",[],[[\"@text\"],[\"Hello Twitter!\"]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Tweet this!\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.tweetParam('text'), 'Hello Twitter!');
    });
    (0, _qunit.test)('it supports passing @hashtags', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ShareButton @hashtags="foo,bar,baz">Tweet this!</ShareButton>
      */
      {
        id: "IT6Ll3GJ",
        block: "{\"symbols\":[],\"statements\":[[7,\"share-button\",[],[[\"@hashtags\"],[\"foo,bar,baz\"]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Tweet this!\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.tweetParam('hashtags'), 'foo,bar,baz');
    });
    (0, _qunit.test)('it supports passing @via', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ShareButton @via="emberjs">Tweet this!</ShareButton>
      */
      {
        id: "nUjT4w48",
        block: "{\"symbols\":[],\"statements\":[[7,\"share-button\",[],[[\"@via\"],[\"emberjs\"]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Tweet this!\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.equal(this.tweetParam('via'), 'emberjs');
    });
    (0, _qunit.test)('it supports adding extra classes', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ShareButton class="extra things">Tweet this!</ShareButton>
      */
      {
        id: "ocQh9uSh",
        block: "{\"symbols\":[],\"statements\":[[7,\"share-button\",[[23,\"class\",\"extra things\",null]],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Tweet this!\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('a').hasClass('share');
      assert.dom('a').hasClass('button');
      assert.dom('a').hasClass('extra');
      assert.dom('a').hasClass('things');
    });
    (0, _qunit.test)('the target, rel and href attributes cannot be overridden', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <ShareButton target="_self" rel="" href="/">Not a Tweet!</ShareButton>
      */
      {
        id: "K3U4+IpV",
        block: "{\"symbols\":[],\"statements\":[[7,\"share-button\",[[23,\"target\",\"_self\",null],[23,\"rel\",\"\",null],[23,\"href\",\"/\",null]],[[],[]],[[\"default\"],[{\"statements\":[[1,1,0,0,\"Not a Tweet!\"]],\"parameters\":[]}]]]],\"hasEval\":false,\"upvars\":[]}",
        meta: {}
      }));
      assert.dom('a').hasAttribute('target', '_blank');
      assert.dom('a').hasAttribute('rel', 'external nofollow noopener noreferrer');
      assert.dom('a').hasAttribute('href', /^https:\/\/twitter\.com\/intent\/tweet/);
    });
  });
});
define("super-rentals/tests/test-helper", ["super-rentals/app", "super-rentals/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("super-rentals/tests/unit/models/rental-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | rental', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it has the right type', function (assert) {
      let store = this.owner.lookup('service:store');
      let rental = store.createRecord('rental', {
        id: 'grand-old-mansion',
        title: 'Grand Old Mansion',
        owner: 'Veruca Salt',
        city: 'San Francisco',
        location: {
          lat: 37.7749,
          lng: -122.4194
        },
        category: 'Estate',
        bedrooms: 15,
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.'
      });
      assert.equal(rental.type, 'Standalone');
      rental.category = 'Condo';
      assert.equal(rental.type, 'Community');
      rental.category = 'Townhouse';
      assert.equal(rental.type, 'Community');
      rental.category = 'Apartment';
      assert.equal(rental.type, 'Community');
      rental.category = 'Estate';
      assert.equal(rental.type, 'Standalone');
    });
  });
});
define('super-rentals/config/environment', [], function() {
  var prefix = 'super-rentals';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('super-rentals/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
