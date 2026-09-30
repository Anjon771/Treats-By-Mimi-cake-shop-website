(function () {
  'use strict';

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  var BACKUP_CAKE_PHOTOS = [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=900&q=80'
  ];

  function createFallbackSvg(title) {
    var safeTitle = escapeHtml(title || 'Treats By Mimi');
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">' +
      '<defs>' +
      '<linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#FDFBF7"/>' +
      '<stop offset="100%" stop-color="#F3ECE6"/>' +
      '</linearGradient>' +
      '</defs>' +
      '<rect width="600" height="450" fill="url(#bgGrad)"/>' +
      '<ellipse cx="300" cy="310" rx="135" ry="20" fill="#E2D9D0"/>' +
      '<rect x="195" y="210" width="210" height="95" rx="14" fill="#FFFDF9" stroke="#D6C7B8" stroke-width="2"/>' +
      '<rect x="225" y="135" width="150" height="78" rx="12" fill="#FCE7F3" stroke="#F472B6" stroke-width="1.5"/>' +
      '<path d="M195 235 Q220 250 245 235 T295 235 T345 235 T405 235" fill="none" stroke="#9D174D" stroke-width="3"/>' +
      '<circle cx="265" cy="130" r="9" fill="#9D174D"/>' +
      '<circle cx="300" cy="126" r="11" fill="#BE185D"/>' +
      '<circle cx="335" cy="130" r="9" fill="#9D174D"/>' +
      '<text x="300" y="365" text-anchor="middle" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#18181B">' +
      safeTitle +
      '</text>' +
      '<text x="300" y="394" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#9D174D">Treats By Mimi · Handcrafted in Maitama, Abuja</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  function createPriceSheetSvg(sheetNum, title, subtitle, rows) {
    var rowHtml = rows.map(function (r, i) {
      var y = 210 + i * 74;
      return (
        '<rect x="48" y="' + (y - 34) + '" width="504" height="58" rx="8" fill="' + (i % 2 === 0 ? '#FFFFFF' : '#F8F6F2') + '" stroke="#E6E4DD" stroke-width="1"/>' +
        '<text x="70" y="' + (y - 6) + '" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#18181B">' + escapeHtml(r[0]) + '</text>' +
        '<text x="70" y="' + (y + 14) + '" font-family="sans-serif" font-size="12" fill="#71717A">' + escapeHtml(r[1]) + '</text>' +
        '<text x="530" y="' + (y + 2) + '" text-anchor="end" font-family="monospace" font-size="17" font-weight="bold" fill="#9D174D">' + escapeHtml(r[2]) + '</text>'
      );
    }).join('');

    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">' +
      '<rect width="600" height="750" fill="#FBFBF9"/>' +
      '<rect x="24" y="24" width="552" height="702" rx="14" fill="#F4F3EF" stroke="#D4D2C8" stroke-width="1.5"/>' +
      '<text x="300" y="78" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="2" fill="#9D174D">TREATS BY MIMI · MAITAMA, ABUJA</text>' +
      '<text x="300" y="116" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#18181B">' + escapeHtml(title) + '</text>' +
      '<text x="300" y="144" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#52525B">' + escapeHtml(subtitle) + '</text>' +
      '<line x1="60" y1="162" x2="540" y2="162" stroke="#D4D2C8" stroke-width="1"/>' +
      rowHtml +
      '<text x="300" y="696" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#52525B">28 Usuma Street, Maitama, Abuja · WhatsApp: +234 817 024 5555</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  window.MIMI_PRICE_SHEETS = {
    'm1.PNG': createPriceSheetSvg('I', 'Price Sheet I — Celebration Tiers', 'Single & Multi-Tier Buttercream Celebration Cakes', [
      ['4-Inch Compact Tier', 'Serves 6–8 Guests · 3 Sponge Layers', '₦18,000'],
      ['6-Inch Classic Tier', 'Serves 12–16 Guests · 4 Sponge Layers', '₦53,000'],
      ['8-Inch Grand Tier', 'Serves 22–30 Guests · 4 Tall Layers', '₦68,000'],
      ['10-Inch Couture Showstopper', 'Serves 40+ Guests · Sculpted Finish', '₦100,000'],
      ['2-Tier Milestone Cake (6" + 8")', 'Serves 45–60 Guests · Custom Florals', '₦135,000'],
      ['3-Tier Wedding Centerpiece', 'Bespoke Consultation & Delivery', '₦220,000+']
    ]),
    'm2.PNG': createPriceSheetSvg('II', 'Price Sheet II — Signature Flavors', 'Available Across All 4", 6", 8" & 10" Cake Tiers', [
      ['Madagascar Vanilla Bean', 'Silky Swiss meringue buttercream filling', '₦18k – ₦100k'],
      ['Classic Red Velvet', 'Tangy whipped cream cheese frosting', '₦18k – ₦100k'],
      ['Nigerian Nutmeg Spice', 'Caramelized buttercream & warm aromatics', '₦18k – ₦100k'],
      ['Zesty Lemon Curd', 'Bright citrus sponge & house lemon curd', '₦18k – ₦100k'],
      ['Oreo Cookies & Cream', 'Crushed Oreo biscuit & vanilla bean cream', '₦18k – ₦100k'],
      ['Espresso Coffee & Blueberry', 'Mocha ganache or wild berry compote', '₦18k – ₦100k']
    ]),
    'm3.PNG': createPriceSheetSvg('III', 'Price Sheet III — Pastries & Boxes', 'Freshly Baked Daily at 28 Usuma Street, Maitama', [
      ['Gourmet Cupcake Box (Box of 6)', 'Assorted vanilla, red velvet & Oreo', '₦6,000'],
      ['Celebration Cupcake Box (12)', 'Custom color palette & edible toppers', '₦12,000'],
      ['Fudge Brownie & Blondie Box', 'Rich Belgian cocoa & sea salt caramel', '₦8,500'],
      ['Artisanal Glazed Donuts (Box of 6)', 'Classic vanilla glaze, chocolate & berry', '₦5,500'],
      ['Flaky Butter Croissants (4 pcs)', 'Baked fresh every morning', '₦6,500'],
      ['Savory Quiche & Tart Platter', 'Ideal for brunch & office meetings', '₦15,000']
    ]),
    'm4.PNG': createPriceSheetSvg('IV', 'Price Sheet IV — Event Packages', 'Complete Dessert Tables & Celebration Bundles', [
      ['Intimate Birthday Bundle', '6" Classic Cake + 6 Gourmet Cupcakes', '₦58,000'],
      ['Grand Party Package', '8" Couture Cake + 12 Cupcakes + Brownies', '₦85,000'],
      ['Holiday Festive Table', 'Festive Wreath Cake + Assorted Pastry Box', '₦75,000'],
      ['Corporate Milestone Platter', 'Branded 8" Cake + 24 Mini Pastries', '₦92,000'],
      ['Bridal Shower Sweet Table', 'Tiered Cake + 24 Cupcakes + Dessert Cups', '₦145,000'],
      ['Abuja Doorstep Delivery', 'Air-conditioned dispatch across FCT', '₦3,500']
    ])
  };

  window.handleMimiImgError = function (imgEl, title) {
    if (!imgEl) return;
    var step = parseInt(imgEl.dataset.fallbackStep || '0', 10);
    if (step === 0) {
      imgEl.dataset.fallbackStep = '1';
      var hash = 0;
      var str = String(title || imgEl.alt || 'cake');
      for (var i = 0; i < str.length; i++) {
        hash = (hash + str.charCodeAt(i)) % BACKUP_CAKE_PHOTOS.length;
      }
      imgEl.src = BACKUP_CAKE_PHOTOS[hash];
      return;
    }
    if (step === 1) {
      imgEl.dataset.fallbackStep = '2';
      imgEl.src = createFallbackSvg(title || imgEl.alt || 'Artisanal Cake');
    }
  };

  var PRODUCTS = [
    {
      id: 'divergent',
      name: 'Divergent Couture',
      category: 'signature',
      categoryLabel: 'Signature Couture',
      meta: 'Signature Couture · 6–10" Tiers · Buttercream & Gold Leaf',
      basePrice: 53000,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
      description: 'Sculptural multi-layer celebration cake finished with silky Swiss meringue buttercream and delicate artisanal detailing.'
    },
    {
      id: 'colour-bomb',
      name: 'Colour Bomb',
      category: 'signature',
      categoryLabel: 'Signature Couture',
      meta: 'Signature Couture · Vibrant Palette · Custom Inscription',
      basePrice: 68000,
      image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=900&q=80',
      description: 'Playful high-contrast celebration centerpiece crafted with rich sponge layers and vibrant hand-piped buttercream.'
    },
    {
      id: 'royalty',
      name: 'Royalty Crown Tier',
      category: 'signature',
      categoryLabel: 'Signature Couture',
      meta: 'Signature Couture · Milestone Events · Maitama Favorite',
      basePrice: 68000,
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=900&q=80',
      description: 'Regal tiered couture creation designed for milestone birthdays, anniversaries, and grand Abuja receptions.'
    },
    {
      id: 'swiss-blue',
      name: 'Swiss Blue',
      category: 'signature',
      categoryLabel: 'Signature Couture',
      meta: 'Signature Couture · Silky Ganache · Custom Flavor',
      basePrice: 68000,
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80',
      description: 'Refined cerulean-toned cake layered with velvety fillings and smooth architectural frosting.'
    },
    {
      id: 'midnight-blue',
      name: 'Midnight Blue',
      category: 'events',
      categoryLabel: 'Events Special',
      meta: 'Events Special · Evening Celebrations · Deep Indigo Finish',
      basePrice: 53000,
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=900&q=80',
      description: 'Dramatic midnight-hued celebration cake balanced with light, aromatic sponge and whipped cream cheese filling.'
    },
    {
      id: 'golden-hour',
      name: 'Golden Hour',
      category: 'events',
      categoryLabel: 'Events Special',
      meta: 'Events Special · Warm Metallic Accents · 6–10" Tiers',
      basePrice: 53000,
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=900&q=80',
      description: 'Sunlit warm-toned couture cake adorned with golden confectioner accents for unforgettable gatherings.'
    },
    {
      id: 'nobel',
      name: 'Nobel Classic',
      category: 'events',
      categoryLabel: 'Events Special',
      meta: 'Events Special · Minimalist Finish · Custom Flavor',
      basePrice: 53000,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=900&q=80',
      description: 'Timeless contemporary cake design combining understated elegance with deeply indulgent sponge layers.'
    },
    {
      id: 'waves',
      name: 'Waves Textured Tier',
      category: 'events',
      categoryLabel: 'Events Special',
      meta: 'Events Special · Hand-Textured Buttercream · Abuja Delivery',
      basePrice: 60000,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
      description: 'Fluid wave-textured buttercream artistry over four generous layers of freshly baked sponge.'
    },
    {
      id: 'blues',
      name: 'Blues Harmony',
      category: 'events',
      categoryLabel: 'Events Special',
      meta: 'Events Special · Bespoke Palette · Handcrafted',
      basePrice: 57000,
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80',
      description: 'Soft tonal blue confection tailored for birthdays, bridal showers, and intimate family milestones.'
    },
    {
      id: 'white-walker',
      name: 'White Walker Petite',
      category: 'signature',
      categoryLabel: 'Signature Couture',
      meta: 'Signature Couture · Monochrome Ivory · Petite to Grand',
      basePrice: 18000,
      image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=900&q=80',
      description: 'Crisp ivory frosted cake with delicate texture, ideal for intimate celebrations and gift deliveries.'
    },
    {
      id: 'no-stain',
      name: 'No Stain Pure Blanc',
      category: 'signature',
      categoryLabel: 'Signature Couture',
      meta: 'Signature Couture · Porcelain Finish · Custom Flavor',
      basePrice: 18000,
      image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=900&q=80',
      description: 'Minimalist porcelain-white cake crafted with pure Madagascar vanilla bean and whipped buttercream.'
    },
    {
      id: 'alieratie',
      name: 'Alieratie',
      category: 'signature',
      categoryLabel: 'Signature Couture',
      meta: 'Signature Couture · Floral & Pastel · Made to Order',
      basePrice: 18000,
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=80',
      description: 'Graceful pastel creation with delicate piping, baked fresh to order in our Maitama kitchen.'
    },
    {
      id: 'sapphire',
      name: 'Sapphire Jewel',
      category: 'events',
      categoryLabel: 'Events Special',
      meta: 'Events Special · Jewel Tones · Custom Inscription',
      basePrice: 18000,
      image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=900&q=80',
      description: 'Jewel-inspired celebration cake with rich crumb structure and balanced sweetness.'
    },
    {
      id: 'angelic',
      name: 'Angelic Cloud',
      category: 'events',
      categoryLabel: 'Events Special',
      meta: 'Events Special · Light & Airy · Custom Tier',
      basePrice: 18000,
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=80',
      description: 'Feather-light sponge paired with cloud-soft frosting for baby showers, christenings, and birthdays.'
    },
    {
      id: 'christmas-wreath',
      name: 'Festive Wreath Cake',
      category: 'holiday',
      categoryLabel: 'Holiday Collection',
      meta: 'Holiday Collection · Spiced & Classic Flavors · Seasonal',
      basePrice: 67000,
      image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&w=900&q=80',
      description: 'Signature Christmas-themed flavored cake adorned with festive botanical piping and warm holiday aromatics.'
    },
    {
      id: 'christmas-noel',
      name: 'Noel Celebration Tier',
      category: 'holiday',
      categoryLabel: 'Holiday Collection',
      meta: 'Holiday Collection · Family Gathering · Maitama Bakery',
      basePrice: 80000,
      image: 'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?auto=format&fit=crop&w=900&q=80',
      description: 'Rich holiday centerpiece designed for end-of-year corporate galas and family Christmas tables.'
    },
    {
      id: 'christmas-grand',
      name: 'Holiday Showstopper',
      category: 'holiday',
      categoryLabel: 'Holiday Collection',
      meta: 'Holiday Collection · Bespoke Multi-Tier · Limited Run',
      basePrice: 73000,
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=900&q=80',
      description: 'Showstopping seasonal cake crafted with premium locally sourced ingredients and festive artistry.'
    },
    {
      id: 'cupcake-treat-box',
      name: 'Assorted Cupcake & Dessert Box',
      category: 'treats',
      categoryLabel: 'Everyday Treats',
      meta: 'Everyday Treats · Box of 6 or 12 · Same-Day Pickup',
      basePrice: 6000,
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80',
      description: 'Freshly baked gourmet cupcakes, glazed donuts, and fudge brownies ready for afternoon indulgence.'
    }
  ];

  var FLAVORS = [
    { name: 'Vanilla Bean', range: '₦18,000 – ₦100,000', notes: 'Madagascar vanilla sponge with silky Swiss meringue buttercream' },
    { name: 'Red Velvet', range: '₦18,000 – ₦100,000', notes: 'Velvety cocoa-kissed crumb layered with tangy cream cheese frosting' },
    { name: 'Nutmeg Spice', range: '₦18,000 – ₦100,000', notes: 'Warm freshly grated Nigerian nutmeg sponge with caramel buttercream' },
    { name: 'Zesty Lemon', range: '₦18,000 – ₦100,000', notes: 'Bright lemon zest sponge with house-made lemon curd filling' },
    { name: 'Oreo Cookies & Cream', range: '₦18,000 – ₦100,000', notes: 'Crushed Oreo biscuit sponge folded into whipped vanilla cream' },
    { name: 'Roasted Coffee', range: '₦18,000 – ₦100,000', notes: 'Rich espresso-infused layers finished with mocha ganache' },
    { name: 'Wild Blueberry', range: '₦18,000 – ₦100,000', notes: 'Berry compote swirls baked into tender buttermilk sponge' },
    { name: 'Toasted Coconut', range: '₦18,000 – ₦100,000', notes: 'Fragrant coconut milk sponge topped with toasted coconut flakes' }
  ];

  var TIER_OPTIONS = [
    { id: 'standard', label: 'Standard Displayed Size (6-inch Classic Tier)', priceDelta: 0 },
    { id: 'petite', label: '4-inch Compact Tier (Intimate — 6 to 8 Guests)', priceOverride: 18000 },
    { id: 'grand', label: '8-inch Grand Tier (Celebration — 20 to 30 Guests)', priceDelta: 15000 },
    { id: 'showstopper', label: '10-inch Tall Couture Showstopper (40+ Guests)', priceOverride: 100000 }
  ];

  var STORAGE_KEY = 'treats_by_mimi_bag_v2';

  function formatNaira(amount) {
    return '₦' + Number(amount || 0).toLocaleString('en-NG');
  }

  function loadBag() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return parsed.map(function (item) {
        var prod = PRODUCTS.find(function (p) {
          return p.id === item.productId;
        });
        if (prod) {
          item.image = prod.image;
        }
        return item;
      });
    } catch (e) {
      return [];
    }
  }

  function saveBag(bag) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bag));
    } catch (e) {}
    updateBagBadges();
    renderDrawerContents();
    renderCartPageOrderBuilder();
  }

  function getBagCount() {
    var bag = loadBag();
    return bag.reduce(function (sum, item) {
      return sum + (item.qty || 1);
    }, 0);
  }

  function getBagSubtotal() {
    var bag = loadBag();
    return bag.reduce(function (sum, item) {
      return sum + (item.unitPrice || 0) * (item.qty || 1);
    }, 0);
  }

  function showToast(message) {
    var toast = document.getElementById('mimiToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mimiToast';
      toast.className = 'mimi-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(window.__mimiToastTimer);
    window.__mimiToastTimer = setTimeout(function () {
      toast.classList.remove('visible');
    }, 2800);
  }

  function addItemToBag(config) {
    var product = PRODUCTS.find(function (p) {
      return p.id === config.productId;
    }) || PRODUCTS[0];

    var flavor = config.flavor || 'Vanilla Bean';
    var tierObj = TIER_OPTIONS.find(function (t) {
      return t.id === (config.tierId || 'standard');
    }) || TIER_OPTIONS[0];

    var unitPrice = product.basePrice;
    if (typeof tierObj.priceOverride === 'number' && product.category !== 'treats') {
      unitPrice = tierObj.priceOverride;
    } else if (typeof tierObj.priceDelta === 'number') {
      unitPrice = product.basePrice + tierObj.priceDelta;
    }

    var inscription = (config.inscription || '').trim();
    var qty = Math.max(1, parseInt(config.qty || 1, 10));
    var lineKey = [product.id, flavor, tierObj.id, inscription].join('::');

    var bag = loadBag();
    var existing = bag.find(function (item) {
      return item.lineKey === lineKey;
    });

    if (existing) {
      existing.qty += qty;
    } else {
      bag.push({
        lineKey: lineKey,
        productId: product.id,
        name: product.name,
        image: product.image,
        flavor: flavor,
        tierId: tierObj.id,
        tierLabel: tierObj.label,
        inscription: inscription,
        unitPrice: unitPrice,
        qty: qty
      });
    }

    saveBag(bag);
    showToast('Added ' + product.name + ' (' + flavor + ') to your bag');
  }

  window.mimiQuickAdd = function (productId) {
    addItemToBag({
      productId: productId,
      flavor: 'Vanilla Bean',
      tierId: 'standard',
      qty: 1
    });
    openCartDrawer();
  };

  window.mimiUpdateQtyByIdx = function (idx, delta) {
    var bag = loadBag();
    if (idx < 0 || idx >= bag.length) return;
    bag[idx].qty += delta;
    if (bag[idx].qty <= 0) {
      bag.splice(idx, 1);
    }
    saveBag(bag);
  };

  window.mimiRemoveItemByIdx = function (idx) {
    var bag = loadBag();
    if (idx < 0 || idx >= bag.length) return;
    bag.splice(idx, 1);
    saveBag(bag);
  };

  function updateBagBadges() {
    var count = getBagCount();
    var badges = document.querySelectorAll('.js-mimi-bag-count');
    badges.forEach(function (el) {
      el.textContent = count;
    });
  }

  // ==========================================================================
  // PRODUCT GRID & FILTERING
  // ==========================================================================
  var activeCategory = 'all';
  var searchQuery = '';

  function renderProductCardHTML(p) {
    return (
      '<article class="mimi-product-card" data-category="' + p.category + '">' +
        '<div class="mimi-card-media" onclick="window.mimiOpenConfigurator(\'' + p.id + '\')">' +
          '<img src="' + p.image + '" alt="' + escapeHtml(p.name) + '" loading="lazy" onerror="window.handleMimiImgError(this, \'' + escapeHtml(p.name) + '\')" />' +
        '</div>' +
        '<div class="mimi-card-body">' +
          '<div class="mimi-card-meta">' + escapeHtml(p.meta) + '</div>' +
          '<div class="mimi-card-header-row">' +
            '<h3 class="mimi-card-title">' + escapeHtml(p.name) + '</h3>' +
            '<span class="mimi-card-price tabular-nums">' + formatNaira(p.basePrice) + '</span>' +
          '</div>' +
          '<p class="mimi-card-desc">' + escapeHtml(p.description) + '</p>' +
          '<div class="mimi-card-actions">' +
            '<button type="button" class="mimi-card-btn-customize" onclick="window.mimiOpenConfigurator(\'' + p.id + '\')">Customize</button>' +
            '<button type="button" class="mimi-card-btn-add" onclick="window.mimiQuickAdd(\'' + p.id + '\')">Add to Bag</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderProductGrids() {
    var featuredContainer = document.getElementById('mimiFeaturedGrid');
    if (featuredContainer) {
      var limit = parseInt(featuredContainer.dataset.limit || '6', 10);
      var filtered = PRODUCTS.filter(function (p) {
        var matchesCat = activeCategory === 'all' || p.category === activeCategory;
        var matchesSearch = !searchQuery ||
          p.name.toLowerCase().indexOf(searchQuery) !== -1 ||
          p.description.toLowerCase().indexOf(searchQuery) !== -1 ||
          p.meta.toLowerCase().indexOf(searchQuery) !== -1;
        return matchesCat && matchesSearch;
      });

      var slice = filtered.slice(0, limit);
      if (slice.length === 0) {
        featuredContainer.innerHTML =
          '<div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: var(--bg-surface); border-radius: 12px; border: 1px solid var(--border-hairline);">' +
            '<p style="font-size: 1rem; font-weight: 600; margin-bottom: 8px;">No cakes match your current filter</p>' +
            '<p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 16px;">Try clearing your search or selecting All Collections.</p>' +
            '<button type="button" class="mimi-btn-secondary" onclick="window.mimiSetCategory(\'all\')">Reset Filters</button>' +
          '</div>';
      } else {
        featuredContainer.innerHTML = slice.map(renderProductCardHTML).join('');
      }
    }
  }

  window.mimiSetCategory = function (category) {
    activeCategory = category || 'all';
    var searchInput = document.getElementById('mimiCatalogSearch');
    if (category === 'all' && searchInput) {
      searchInput.value = '';
      searchQuery = '';
    }
    var tabs = document.querySelectorAll('.js-mimi-filter-tab');
    tabs.forEach(function (tab) {
      if (tab.dataset.category === activeCategory) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    renderProductGrids();
  };

  // ==========================================================================
  // FLAVOR ARCHITECTURE LIST
  // ==========================================================================
  function renderFlavorList() {
    var container = document.getElementById('mimiFlavorGrid');
    if (!container) return;
    container.innerHTML = FLAVORS.map(function (f, idx) {
      return (
        '<div class="mimi-flavor-row">' +
          '<div>' +
            '<h3 class="mimi-flavor-name">' + escapeHtml(f.name) + '</h3>' +
            '<p class="mimi-flavor-notes">' + escapeHtml(f.notes) + '</p>' +
            '<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">4-inch Compact · 6-inch Classic · 8-inch Grand · 10-inch Showstopper</div>' +
          '</div>' +
          '<div class="mimi-flavor-price-col">' +
            '<div class="mimi-flavor-price tabular-nums">' + escapeHtml(f.range) + '</div>' +
            '<button type="button" class="mimi-flavor-action" onclick="window.mimiOpenConfiguratorWithFlavorIdx(' + idx + ')">Configure Cake →</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  // ==========================================================================
  // HERO SHOWCASE SWITCHER
  // ==========================================================================
  window.mimiSelectHeroSlide = function (productId, btnEl) {
    var product = PRODUCTS.find(function (p) {
      return p.id === productId;
    });
    if (!product) return;
    var mainImg = document.getElementById('mimiHeroMainImg');
    var captionMeta = document.getElementById('mimiHeroCaptionMeta');
    var captionTitle = document.getElementById('mimiHeroCaptionTitle');
    var captionPrice = document.getElementById('mimiHeroCaptionPrice');
    var heroCustomizeBtn = document.getElementById('mimiHeroCustomizeBtn');

    if (mainImg) {
      mainImg.dataset.fallbackStep = '0';
      mainImg.src = product.image;
      mainImg.alt = product.name;
    }
    if (captionMeta) captionMeta.textContent = product.meta;
    if (captionTitle) captionTitle.textContent = product.name;
    if (captionPrice) captionPrice.textContent = formatNaira(product.basePrice);
    if (heroCustomizeBtn) {
      heroCustomizeBtn.setAttribute('onclick', "window.mimiOpenConfigurator('" + product.id + "')");
    }

    var buttons = document.querySelectorAll('.mimi-hero-thumb-btn');
    buttons.forEach(function (b) {
      b.classList.remove('active');
    });
    if (btnEl) btnEl.classList.add('active');
  };

  // ==========================================================================
  // CONTIGUOUS PURCHASE MODULE MODAL (CAKE CONFIGURATOR)
  // ==========================================================================
  var activeConfigProduct = PRODUCTS[0];

  function ensureConfiguratorModal() {
    if (document.getElementById('mimiConfiguratorBackdrop')) return;
    var backdrop = document.createElement('div');
    backdrop.id = 'mimiConfiguratorBackdrop';
    backdrop.className = 'mimi-modal-backdrop';
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeConfigurator();
    });

    var flavorOptionsHTML = FLAVORS.map(function (f) {
      return '<option value="' + escapeHtml(f.name) + '">' + escapeHtml(f.name + ' — ' + f.notes) + '</option>';
    }).join('');

    var tierOptionsHTML = TIER_OPTIONS.map(function (t) {
      return '<option value="' + escapeHtml(t.id) + '">' + escapeHtml(t.label) + '</option>';
    }).join('');

    backdrop.innerHTML =
      '<div class="mimi-pdp-modal" role="dialog" aria-modal="true" aria-labelledby="mimiPdpTitle">' +
        '<div class="mimi-pdp-gallery">' +
          '<div class="mimi-pdp-img-wrap">' +
            '<img id="mimiPdpImg" src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80" alt="Selected Cake" onerror="window.handleMimiImgError(this, \'Couture Cake\')" />' +
          '</div>' +
          '<div style="margin-top: 14px; font-size: 0.75rem; color: var(--text-muted); display: flex; justify-content: space-between;">' +
            '<span>Handcrafted in Maitama, Abuja</span>' +
            '<span>Freshly Baked to Order</span>' +
          '</div>' +
        '</div>' +
        '<div class="mimi-pdp-module">' +
          '<div class="mimi-pdp-top">' +
            '<div>' +
              '<div id="mimiPdpMeta" style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Signature Couture</div>' +
              '<h2 id="mimiPdpTitle" class="mimi-pdp-title">Divergent Couture</h2>' +
            '</div>' +
            '<button type="button" class="mimi-pdp-close" aria-label="Close modal" onclick="window.mimiCloseConfigurator()">×</button>' +
          '</div>' +
          '<div id="mimiPdpPrice" class="mimi-pdp-price tabular-nums">₦53,000</div>' +
          '<p id="mimiPdpDesc" style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.55;"></p>' +
          '<div class="mimi-field-group">' +
            '<label class="mimi-field-label" for="mimiPdpFlavor">1. Select Cake Sponge & Filling Flavor</label>' +
            '<select id="mimiPdpFlavor" class="mimi-select">' + flavorOptionsHTML + '</select>' +
          '</div>' +
          '<div class="mimi-field-group">' +
            '<label class="mimi-field-label" for="mimiPdpTier">2. Select Cake Height & Guest Tier</label>' +
            '<select id="mimiPdpTier" class="mimi-select">' + tierOptionsHTML + '</select>' +
          '</div>' +
          '<div class="mimi-field-group">' +
            '<label class="mimi-field-label" for="mimiPdpInscription">3. Custom Cake Inscription (Optional)</label>' +
            '<input id="mimiPdpInscription" type="text" class="mimi-input" placeholder="e.g. Happy Birthday Amaka! (Leave blank if none)" maxlength="60" />' +
          '</div>' +
          '<div style="display: grid; grid-template-columns: 110px 1fr; gap: 12px; align-items: end; margin-top: 6px;">' +
            '<div class="mimi-field-group">' +
              '<label class="mimi-field-label" for="mimiPdpQty">Quantity</label>' +
              '<input id="mimiPdpQty" type="number" min="1" max="20" value="1" class="mimi-input tabular-nums" />' +
            '</div>' +
            '<button type="button" id="mimiPdpAddBtn" class="mimi-btn-primary mimi-btn-lg" style="width: 100%;">Add Customized Cake to Bag</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(backdrop);

    var tierSelect = document.getElementById('mimiPdpTier');
    var qtyInput = document.getElementById('mimiPdpQty');
    tierSelect.addEventListener('change', updateConfiguratorPricePreview);
    qtyInput.addEventListener('input', updateConfiguratorPricePreview);

    document.getElementById('mimiPdpAddBtn').addEventListener('click', function () {
      addItemToBag({
        productId: activeConfigProduct.id,
        flavor: document.getElementById('mimiPdpFlavor').value,
        tierId: document.getElementById('mimiPdpTier').value,
        inscription: document.getElementById('mimiPdpInscription').value,
        qty: parseInt(document.getElementById('mimiPdpQty').value || '1', 10)
      });
      closeConfigurator();
      openCartDrawer();
    });
  }

  function updateConfiguratorPricePreview() {
    if (!activeConfigProduct) return;
    var tierId = document.getElementById('mimiPdpTier').value;
    var qty = Math.max(1, parseInt(document.getElementById('mimiPdpQty').value || '1', 10));
    var tierObj = TIER_OPTIONS.find(function (t) {
      return t.id === tierId;
    }) || TIER_OPTIONS[0];

    var unit = activeConfigProduct.basePrice;
    if (typeof tierObj.priceOverride === 'number' && activeConfigProduct.category !== 'treats') {
      unit = tierObj.priceOverride;
    } else if (typeof tierObj.priceDelta === 'number') {
      unit = activeConfigProduct.basePrice + tierObj.priceDelta;
    }
    var total = unit * qty;
    var priceEl = document.getElementById('mimiPdpPrice');
    if (priceEl) {
      priceEl.textContent = formatNaira(total) + (qty > 1 ? ' (' + formatNaira(unit) + ' each)' : '');
    }
  }

  window.mimiOpenConfigurator = function (productId, preselectedFlavor) {
    ensureConfiguratorModal();
    activeConfigProduct = PRODUCTS.find(function (p) {
      return p.id === productId;
    }) || PRODUCTS[0];

    var img = document.getElementById('mimiPdpImg');
    img.dataset.fallbackStep = '0';
    img.src = activeConfigProduct.image;
    img.alt = activeConfigProduct.name;

    document.getElementById('mimiPdpMeta').textContent = activeConfigProduct.meta;
    document.getElementById('mimiPdpTitle').textContent = activeConfigProduct.name;
    document.getElementById('mimiPdpDesc').textContent = activeConfigProduct.description;
    document.getElementById('mimiPdpTier').value = 'standard';
    document.getElementById('mimiPdpInscription').value = '';
    document.getElementById('mimiPdpQty').value = '1';

    if (preselectedFlavor) {
      document.getElementById('mimiPdpFlavor').value = preselectedFlavor;
    }

    updateConfiguratorPricePreview();
    document.getElementById('mimiConfiguratorBackdrop').classList.add('open');
  };

  window.mimiOpenConfiguratorWithFlavorIdx = function (idx) {
    var f = FLAVORS[idx] || FLAVORS[0];
    window.mimiOpenConfigurator('divergent', f.name);
  };

  function closeConfigurator() {
    var el = document.getElementById('mimiConfiguratorBackdrop');
    if (el) el.classList.remove('open');
  }
  window.mimiCloseConfigurator = closeConfigurator;

  // ==========================================================================
  // PRICE LIST LIGHTBOX MODAL (m1.PNG - m4.PNG)
  // ==========================================================================
  window.mimiOpenPriceSheet = function (imgSrc, title) {
    var existing = document.getElementById('mimiPriceSheetModal');
    if (!existing) {
      existing = document.createElement('div');
      existing.id = 'mimiPriceSheetModal';
      existing.className = 'mimi-modal-backdrop';
      existing.addEventListener('click', function (e) {
        if (e.target === existing) existing.classList.remove('open');
      });
      existing.innerHTML =
        '<div style="background: var(--bg-canvas); padding: 20px; border-radius: 12px; max-width: 680px; width: 100%; max-height: 92vh; overflow-y: auto; border: 1px solid var(--border-strong);">' +
          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">' +
            '<h3 id="mimiSheetModalTitle" style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 600;">Official Price Sheet</h3>' +
            '<button type="button" class="mimi-pdp-close" onclick="document.getElementById(\'mimiPriceSheetModal\').classList.remove(\'open\')">×</button>' +
          '</div>' +
          '<img id="mimiSheetModalImg" src="" alt="Price List Sheet" style="width: 100%; height: auto; border-radius: 8px;" referrerpolicy="no-referrer" />' +
        '</div>';
      document.body.appendChild(existing);
    }
    document.getElementById('mimiSheetModalTitle').textContent = title || 'Official Price Sheet';
    var resolvedSheet = (window.MIMI_PRICE_SHEETS && window.MIMI_PRICE_SHEETS[imgSrc]) || imgSrc;
    document.getElementById('mimiSheetModalImg').src = resolvedSheet;
    existing.classList.add('open');
  };

  // ==========================================================================
  // SLIDE-OVER CART & CHECKOUT DRAWER
  // ==========================================================================
  function ensureCartDrawer() {
    if (document.getElementById('mimiCartDrawerBackdrop')) return;
    var backdrop = document.createElement('div');
    backdrop.id = 'mimiCartDrawerBackdrop';
    backdrop.className = 'mimi-drawer-backdrop';
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeCartDrawer();
    });

    backdrop.innerHTML =
      '<aside class="mimi-cart-drawer" aria-label="Shopping Bag">' +
        '<div class="mimi-drawer-header">' +
          '<div>' +
            '<h2 class="mimi-drawer-title">Your Patisserie Bag</h2>' +
            '<div style="font-size: 0.75rem; color: var(--text-muted);">28 Usuma Street, Maitama, Abuja · +234 817 024 5555</div>' +
          '</div>' +
          '<button type="button" class="mimi-pdp-close" aria-label="Close bag" onclick="window.mimiCloseCartDrawer()">×</button>' +
        '</div>' +
        '<div id="mimiDrawerBody" class="mimi-drawer-body"></div>' +
        '<div id="mimiDrawerFooter" class="mimi-drawer-footer"></div>' +
      '</aside>';

    document.body.appendChild(backdrop);
  }

  function openCartDrawer() {
    ensureCartDrawer();
    renderDrawerContents();
    document.getElementById('mimiCartDrawerBackdrop').classList.add('open');
  }
  window.mimiOpenCartDrawer = openCartDrawer;

  function closeCartDrawer() {
    var el = document.getElementById('mimiCartDrawerBackdrop');
    if (el) el.classList.remove('open');
  }
  window.mimiCloseCartDrawer = closeCartDrawer;

  function buildWhatsAppOrderUrl(customerInfo) {
    var bag = loadBag();
    var subtotal = getBagSubtotal();
    var deliveryMethod = (customerInfo && customerInfo.deliveryMethod) || 'pickup';
    var deliveryFee = deliveryMethod === 'delivery' ? 3500 : 0;
    var total = subtotal + deliveryFee;

    var lines = [
      'Hello Treats By Mimi! I would like to place an order:',
      ''
    ];

    if (bag.length === 0) {
      lines.push('- Custom Cake / Dessert Inquiry');
    } else {
      bag.forEach(function (item, idx) {
        lines.push(
          (idx + 1) + '. ' + item.qty + 'x ' + item.name +
          ' | Flavor: ' + item.flavor +
          ' | Size: ' + item.tierLabel +
          (item.inscription ? ' | Note: "' + item.inscription + '"' : '') +
          ' — ' + formatNaira(item.unitPrice * item.qty)
        );
      });
    }

    lines.push('');
    lines.push('Subtotal: ' + formatNaira(subtotal));
    lines.push('Fulfillment: ' + (deliveryMethod === 'delivery' ? 'Abuja Doorstep Delivery (₦3,500)' : 'Bakery Pick-up (28 Usuma St, Maitama)'));
    lines.push('Total Estimate: ' + formatNaira(total));

    if (customerInfo) {
      lines.push('');
      if (customerInfo.customerName) lines.push('Name: ' + customerInfo.customerName);
      if (customerInfo.phone) lines.push('Phone: ' + customerInfo.phone);
      if (customerInfo.deliveryDate) lines.push('Preferred Date/Time: ' + customerInfo.deliveryDate);
      if (customerInfo.address) lines.push('Address/Details: ' + customerInfo.address);
    }

    return 'https://wa.me/2348170245555?text=' + encodeURIComponent(lines.join('\n'));
  }

  function renderDrawerContents() {
    var bodyEl = document.getElementById('mimiDrawerBody');
    var footerEl = document.getElementById('mimiDrawerFooter');
    if (!bodyEl || !footerEl) return;

    var bag = loadBag();
    if (bag.length === 0) {
      bodyEl.innerHTML =
        '<div style="text-align: center; padding: 48px 16px;">' +
          '<p style="font-family: var(--font-display); font-size: 1.45rem; margin-bottom: 8px;">Your bag is currently empty</p>' +
          '<p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 24px;">Explore our handcrafted couture cakes, event specials, and freshly baked Abuja treats.</p>' +
          '<a href="cake.html" class="mimi-btn-primary" onclick="window.mimiCloseCartDrawer()">Browse Cake Collection</a>' +
        '</div>';
      footerEl.innerHTML =
        '<a href="' + buildWhatsAppOrderUrl() + '" target="_blank" rel="noopener noreferrer" class="mimi-btn-secondary" style="width: 100%;">Chat on WhatsApp (+234 817 024 5555)</a>';
      return;
    }

    var itemsHTML = bag.map(function (item, idx) {
      return (
        '<div class="mimi-cart-item">' +
          '<img src="' + item.image + '" alt="' + escapeHtml(item.name) + '" referrerpolicy="no-referrer" onerror="window.handleMimiImgError(this, \'' + escapeHtml(item.name) + '\')" />' +
          '<div>' +
            '<div class="mimi-cart-item-title">' + escapeHtml(item.name) + '</div>' +
            '<div class="mimi-cart-item-meta">' + escapeHtml(item.flavor) + ' · ' + escapeHtml(item.tierLabel.split('(')[0].trim()) + '</div>' +
            (item.inscription ? '<div class="mimi-cart-item-meta" style="color: var(--accent-primary);">Inscription: ' + escapeHtml(item.inscription) + '</div>' : '') +
            '<div class="mimi-qty-stepper">' +
              '<button type="button" class="mimi-qty-btn" onclick="window.mimiUpdateQtyByIdx(' + idx + ', -1)">−</button>' +
              '<span class="mimi-qty-val">' + item.qty + '</span>' +
              '<button type="button" class="mimi-qty-btn" onclick="window.mimiUpdateQtyByIdx(' + idx + ', 1)">+</button>' +
            '</div>' +
          '</div>' +
          '<div style="text-align: right;">' +
            '<div style="font-family: var(--font-mono); font-size: 0.875rem; font-weight: 500;" class="tabular-nums">' + formatNaira(item.unitPrice * item.qty) + '</div>' +
            '<button type="button" style="margin-top: 8px; font-size: 0.75rem; color: var(--text-muted); background: none; border: none; cursor: pointer;" onclick="window.mimiRemoveItemByIdx(' + idx + ')">Remove</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    bodyEl.innerHTML = itemsHTML;

    var subtotal = getBagSubtotal();
    footerEl.innerHTML =
      '<div class="mimi-summary-row">' +
        '<span>Subtotal (' + getBagCount() + ' items)</span>' +
        '<span class="tabular-nums" style="font-family: var(--font-mono);">' + formatNaira(subtotal) + '</span>' +
      '</div>' +
      '<div class="mimi-summary-row">' +
        '<span>Maitama Bakery Pick-up</span>' +
        '<span>Complimentary</span>' +
      '</div>' +
      '<div class="mimi-summary-total">' +
        '<span>Estimated Total</span>' +
        '<span class="tabular-nums" style="font-family: var(--font-mono);">' + formatNaira(subtotal) + '</span>' +
      '</div>' +
      '<div style="display: grid; gap: 10px;">' +
        '<a href="cart.html" class="mimi-btn-primary mimi-btn-lg" style="width: 100%; text-align: center;">Proceed to Order & Checkout</a>' +
        '<a href="' + buildWhatsAppOrderUrl() + '" target="_blank" rel="noopener noreferrer" class="mimi-btn-secondary" style="width: 100%; text-align: center;">Instant Order via WhatsApp →</a>' +
      '</div>';
  }

  // ==========================================================================
  // DEDICATED CHECKOUT & ORDER BUILDER PAGE (cart.html)
  // ==========================================================================
  function renderCartPageOrderBuilder() {
    var container = document.getElementById('mimiCheckoutPageContainer');
    if (!container) return;

    var bag = loadBag();
    var subtotal = getBagSubtotal();
    var deliverySelect = document.getElementById('mimiCheckoutDeliveryMethod');
    var deliveryMethod = deliverySelect ? deliverySelect.value : 'pickup';
    var deliveryFee = deliveryMethod === 'delivery' ? 3500 : 0;
    var total = subtotal + deliveryFee;

    var itemsListEl = document.getElementById('mimiCheckoutItemsList');
    if (itemsListEl) {
      if (bag.length === 0) {
        itemsListEl.innerHTML =
          '<div style="padding: 32px; text-align: center; background: var(--bg-surface); border-radius: 8px; border: 1px solid var(--border-hairline);">' +
            '<p style="font-weight: 600; margin-bottom: 6px;">No items in your order yet</p>' +
            '<p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 16px;">Add a signature cake below or browse our full catalog.</p>' +
            '<button type="button" class="mimi-btn-secondary" onclick="window.mimiOpenConfigurator(\'divergent\')">+ Configure a Custom Cake</button>' +
          '</div>';
      } else {
        itemsListEl.innerHTML = bag.map(function (item, idx) {
          return (
            '<div class="mimi-cart-item">' +
              '<img src="' + item.image + '" alt="' + escapeHtml(item.name) + '" referrerpolicy="no-referrer" onerror="window.handleMimiImgError(this, \'' + escapeHtml(item.name) + '\')" />' +
              '<div>' +
                '<div class="mimi-cart-item-title">' + escapeHtml(item.name) + '</div>' +
                '<div class="mimi-cart-item-meta">Flavor: ' + escapeHtml(item.flavor) + ' · ' + escapeHtml(item.tierLabel) + '</div>' +
                (item.inscription ? '<div class="mimi-cart-item-meta" style="color: var(--accent-primary);">Inscription: ' + escapeHtml(item.inscription) + '</div>' : '') +
                '<div class="mimi-qty-stepper">' +
                  '<button type="button" class="mimi-qty-btn" onclick="window.mimiUpdateQtyByIdx(' + idx + ', -1)">−</button>' +
                  '<span class="mimi-qty-val">' + item.qty + '</span>' +
                  '<button type="button" class="mimi-qty-btn" onclick="window.mimiUpdateQtyByIdx(' + idx + ', 1)">+</button>' +
                '</div>' +
              '</div>' +
              '<div style="text-align: right;">' +
                '<div style="font-family: var(--font-mono); font-size: 0.9375rem; font-weight: 500;" class="tabular-nums">' + formatNaira(item.unitPrice * item.qty) + '</div>' +
                '<button type="button" style="margin-top: 8px; font-size: 0.75rem; color: var(--text-muted); background: none; border: none; cursor: pointer;" onclick="window.mimiRemoveItemByIdx(' + idx + ')">Remove</button>' +
              '</div>' +
            '</div>'
          );
        }).join('');
      }
    }

    var subEl = document.getElementById('mimiCheckoutSubtotal');
    var feeEl = document.getElementById('mimiCheckoutFee');
    var totEl = document.getElementById('mimiCheckoutTotal');
    if (subEl) subEl.textContent = formatNaira(subtotal);
    if (feeEl) feeEl.textContent = deliveryFee === 0 ? 'Complimentary (Maitama Pick-up)' : formatNaira(deliveryFee);
    if (totEl) totEl.textContent = formatNaira(total);
  }

  window.mimiHandleCheckoutSubmit = function (e) {
    if (e) e.preventDefault();
    var bag = loadBag();
    var name = (document.getElementById('mimiCustName') || {}).value || '';
    var phone = (document.getElementById('mimiCustPhone') || {}).value || '';
    var email = (document.getElementById('mimiCustEmail') || {}).value || '';
    var deliveryMethod = (document.getElementById('mimiCheckoutDeliveryMethod') || {}).value || 'pickup';
    var deliveryDate = (document.getElementById('mimiCustDate') || {}).value || '';
    var address = (document.getElementById('mimiCustAddress') || {}).value || '';
    var notes = (document.getElementById('mimiCustNotes') || {}).value || '';

    if (!name.trim() || !phone.trim()) {
      showToast('Please enter your name and phone number to confirm your order.');
      return;
    }

    var subtotal = getBagSubtotal();
    var deliveryFee = deliveryMethod === 'delivery' ? 3500 : 0;
    var total = subtotal + deliveryFee;

    var payload = {
      customerName: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      deliveryMethod: deliveryMethod,
      deliveryDate: deliveryDate,
      address: address.trim(),
      notes: notes.trim(),
      items: bag,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total
    };

    var waUrl = buildWhatsAppOrderUrl(payload);

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        var order = (data && data.order) || { orderId: 'MIMI-1042', status: 'Confirmed — Preparing in Maitama Kitchen' };
        var receiptBox = document.getElementById('mimiOrderConfirmationBox');
        if (receiptBox) {
          receiptBox.style.display = 'block';
          receiptBox.innerHTML =
            '<div style="padding: 28px; background: #FFFFFF; border: 1.5px solid var(--status-success); border-radius: 12px; margin-bottom: 28px;">' +
              '<div style="font-size: 0.75rem; font-weight: 600; color: var(--status-success); margin-bottom: 6px;">ORDER CONFIRMED · ' + escapeHtml(order.orderId) + '</div>' +
              '<h3 style="font-family: var(--font-display); font-size: 1.75rem; margin-bottom: 8px;">Thank you, ' + escapeHtml(payload.customerName) + '!</h3>' +
              '<p style="font-size: 0.9375rem; color: var(--text-secondary); margin-bottom: 16px;">Status: <strong>' + escapeHtml(order.status) + '</strong>. Our team at 28 Usuma Street, Maitama has logged your order details. You can also send your receipt directly to our WhatsApp line for instant payment & dispatch coordination.</p>' +
              '<div style="padding: 14px 16px; background: var(--bg-surface); border-radius: 8px; font-size: 0.85rem; margin-bottom: 18px;">' +
                '<div><strong>Order Reference:</strong> ' + escapeHtml(order.orderId) + '</div>' +
                '<div><strong>Customer Phone:</strong> ' + escapeHtml(payload.phone) + '</div>' +
                '<div><strong>Fulfillment:</strong> ' + escapeHtml(payload.deliveryMethod === 'delivery' ? 'Abuja Doorstep Delivery — ' + (payload.address || 'Abuja') : 'Pick-up at 28 Usuma Street, Maitama, Abuja') + '</div>' +
                '<div><strong>Total Amount:</strong> <span class="tabular-nums" style="font-family: var(--font-mono); font-weight: 600;">' + formatNaira(payload.total) + '</span></div>' +
              '</div>' +
              '<div style="display: flex; flex-wrap: wrap; gap: 12px;">' +
                '<a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" class="mimi-btn-primary">Send Order Receipt via WhatsApp (+234 817 024 5555)</a>' +
                '<button type="button" class="mimi-btn-secondary" onclick="window.print()">Print Receipt</button>' +
              '</div>' +
            '</div>';
          receiptBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        saveBag([]);
      })
      .catch(function () {
        showToast('Order prepared! Please use the WhatsApp button to send.');
      });
  };

  window.mimiOpenWhatsAppDirectFromForm = function () {
    var name = (document.getElementById('mimiCustName') || {}).value || '';
    var phone = (document.getElementById('mimiCustPhone') || {}).value || '';
    var deliveryMethod = (document.getElementById('mimiCheckoutDeliveryMethod') || {}).value || 'pickup';
    var deliveryDate = (document.getElementById('mimiCustDate') || {}).value || '';
    var address = (document.getElementById('mimiCustAddress') || {}).value || '';

    var url = buildWhatsAppOrderUrl({
      customerName: name.trim(),
      phone: phone.trim(),
      deliveryMethod: deliveryMethod,
      deliveryDate: deliveryDate,
      address: address.trim()
    });
    var link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================================================
  // CONTACT FORM SUBMISSION
  // ==========================================================================
  window.mimiSubmitContactForm = function (e) {
    if (e) e.preventDefault();
    var name = (document.getElementById('contactName') || {}).value || '';
    var email = (document.getElementById('contactEmail') || {}).value || '';
    var subject = (document.getElementById('contactSubject') || {}).value || '';
    var message = (document.getElementById('contactMessage') || {}).value || '';

    if (!name.trim() || !message.trim()) {
      showToast('Please enter your name and message.');
      return;
    }

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, subject: subject, message: message })
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        var statusEl = document.getElementById('mimiContactStatus');
        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.innerHTML =
            '<div style="padding: 16px 20px; background: #FFFFFF; border: 1px solid var(--status-success); border-radius: 8px; color: var(--text-primary); font-size: 0.875rem;">' +
              '<strong style="color: var(--status-success);">Inquiry Received (' + escapeHtml(res.inquiry ? res.inquiry.id : 'INQ-MIMI') + ')</strong> — Thank you, ' + escapeHtml(name) + '. Our Maitama bakery team will respond shortly, or you can message us directly on WhatsApp at +234 817 024 5555.' +
            '</div>';
        }
        document.getElementById('mimiContactForm').reset();
        showToast('Message sent to Treats By Mimi!');
      })
      .catch(function () {
        showToast('Message logged! We will be in touch soon.');
      });
  };

  // ==========================================================================
  // INITIALIZE ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    // Hydrate price sheet images so they never depend on binary files on GitHub
    var sheetImgs = document.querySelectorAll('img[data-price-sheet]');
    sheetImgs.forEach(function (img) {
      var key = img.getAttribute('data-price-sheet');
      if (window.MIMI_PRICE_SHEETS && window.MIMI_PRICE_SHEETS[key]) {
        img.src = window.MIMI_PRICE_SHEETS[key];
      }
    });

    updateBagBadges();
    renderProductGrids();
    renderFlavorList();
    ensureCartDrawer();
    renderCartPageOrderBuilder();

    var searchInput = document.getElementById('mimiCatalogSearch');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = (e.target.value || '').trim().toLowerCase();
        renderProductGrids();
      });
    }

    var deliverySelect = document.getElementById('mimiCheckoutDeliveryMethod');
    if (deliverySelect) {
      deliverySelect.addEventListener('change', renderCartPageOrderBuilder);
    }

    var mobileToggle = document.getElementById('mimiMobileMenuBtn');
    var mobileNav = document.getElementById('mimiMobileNav');
    if (mobileToggle && mobileNav) {
      mobileToggle.addEventListener('click', function () {
        mobileNav.classList.toggle('open');
      });
    }
  });
})();
