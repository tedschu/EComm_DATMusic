const { client } = require("./index");
const { addProduct } = require("./products");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`
        DROP TABLE IF EXISTS order_items;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE users (
        user_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        first_name text NOT NULL,
        last_name text NOT NULL,
        address text NOT NULL,
        username text NOT NULL UNIQUE,
        password text NOT NULL
    );
  
    CREATE TABLE products (
        product_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        product_name text NOT NULL,
        product_description text NOT NULL,
        product_category text NOT NULL,
        price integer NOT NULL,
        image_url text,
        product_brand text NOT NULL
    );
  
    CREATE TABLE orders (
        order_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        total_order_revenue integer NOT NULL,
        is_purchased boolean DEFAULT false,
        user_id integer REFERENCES users(user_id)
    );
  
    CREATE TABLE order_items (
        order_items_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        order_items_quantity integer NOT NULL,
        order_id integer REFERENCES orders(order_id),
        product_id integer REFERENCES products(product_id)
    );
      `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

// async function createInitialUsers() {
//   try {
//     console.log("Starting to create users...");

//     await createUser({
//       name: "albert",
//       location: "Sidney, Australia",
//       username: "AlBert",
//       password: "password",
//     });
//     await createUser({
//       name: "sandra",
//       location: "Tokyo, Japan",
//       username: "SandyJ",
//       password: "password",
//     });

//     console.log("Finished creating users!");
//   } catch (error) {
//     console.error("Error creating users!");
//     throw error;
//   }
// }

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");
    await addProduct({
      product_name:
        "Fender American Professional II GT11 Stratocaster Electric Guitar - Fiesta Red",
      product_description:
        "Previously limited to Fender’s Custom Shop offerings, the Sweetwater-designed GT11 (Grand Touring) platform makes its way into Fender’s standard roster with the American Professional II GT11. This superb series of 6-strings begins with a standard setup of a lightweight alder body, ’60s oval “C” maple neck, and a rosewood fingerboard, making for a fine foundation for any vintage-style Strat. That said, the rest of this guitar's Sweetwater-spec features are anything but traditional. From the upgraded 6-point tremolo with a cold-rolled steel block to the string-tree-less headstock and the titular 11-inch fingerboard radius, the Fender American Professional II GT11 Stratocaster retains the eminently modern feel and performance of Sweetwater’s Fender Custom Shop GT11 models. Finally, we opted to outfit the American Professional II GT11 Stratocaster with a trio of Fender Custom Shop Fat ’60s pickups to capture the warm lows, rich midrange, and mellow highs made famous by iconic blues and rock guitarists from the early 1960s. Available only at Sweetwater, the Fender American Professional II GT11 Stratocaster delivers slick Sweetwater specs and Custom Shop class in spades.",
      product_category: "guitars",
      price: 1999,
      image_url:
        "https://media.sweetwater.com/api/i/q-82__h-750__f-webp__ha-3bfa3fb3280c9dac__hmac-f982361cc6ae7ba962f6f6fabf5152efa2a64b7b/images/guitars/StratAP2GT11FR/US240011522/US240011522-front-large.jpg.auto.webp",
      product_brand: "fender",
    });

    await addProduct({
      product_name:
        "Fender American Professional II Telecaster - Roasted Pine with Maple Fingerboard",
      product_description:
        "Fender’s American Professional series produced some of the most popular instruments at Sweetwater among working musicians and discerning amateurs. Now, with the American Professional II series, Fender has upped the ante, outfitting the formidable line with a slew of player-centric upgrades. The Fender American Professional II Telecaster features Tim Shaw’s latest V-Mod Tele single-coils, which deliver familiar Tele twang with enhanced clarity and focus. To provide an exceptional playing experience, the American Professional II Telecaster boasts a Deep C profile neck with a satin finish and a contoured heel joint. A Tele is a must-have in any guitar collection, and they don’t get much finer than the Fender American Professional II Telecaster.",
      product_category: "guitars",
      price: 7000,
      image_url:
        "https://media.sweetwater.com/api/i/q-82__h-750__f-webp__ha-1d00016c02ff4c88__hmac-5b4cd71217dbc5a8b9aa705c08eca5a135af47e0/images/guitars/TeleAP2MRP/US23119685/US23119685-front-large.jpg.auto.webp",
      product_brand: "fender",
    });

    await addProduct({
      product_name:
        "Pearl Roadshow RS525SC/C 5-piece Complete Drum Set with Cymbals - Jet Black",
      product_description:
        "Get your show on the road in one complete package with Pearl's Roadshow 5-piece drum set. Formed from multiple plies of bonded hardwood, Roadshow drum shells feature 6-ply poplar shells for optimal tone, molded to fabricate a resonance chamber that projects powerfully when you strike the drumhead. A drum's bearing edge is where much of its tonal character begins, and Roadshow drums sport hand-cut 45-degree bearing edges that contact the head optimally for solid, punchy tone and easier tuning. This complete Pearl Roadshow kit includes drums, cymbals, hardware — and even sticks and a stick bag — so you can get up and drumming right away.",
      product_category: "drums",
      price: 659,
      image_url:
        "https://media.sweetwater.com/m/products/image/0e0eacd3car4tmdLmb752dm1WgutZvziElfhO3Bv.png?quality=82&width=750&ha=0e0eacd3cab053cb",
      product_brand: "pearl",
    });

    await addProduct({
      product_name: "Roland FP-30X Digital Piano with Speakers - Black",
      product_description:
        "The Roland FP-30X gives you entrée to the latest generation of the company’s award-winning FP series digital pianos, and it benefits from decades of cutting-edge technological development to bring you a refined acoustic grand piano playing experience at home, onstage, or in the studio. Roland’s acclaimed SuperNATURAL Piano sound engine and 256-voice polyphony deliver authentic sound and response. Your fingers will savor the sumptuous touch of Roland’s PHA-4 Standard keyboard with Progressive Hammer Action and Ivory Feel keys, as the FP-30X’s onboard speaker system fills the room with a rich, powerful sound that’s ideal for home playing and intimate live performances. Enhance your music with sounds curated from Roland’s flagship instruments, and shape them to perfection with the built-in effects engine. The FP-30X also features generous connectivity with audio and MIDI via Bluetooth and USB, for wireless streaming to and from your smart device and integration with your computer-based DAW setup.",
      product_category: "pianos",
      price: 699,
      image_url:
        "https://media.sweetwater.com/m/products/image/2c7182cc8c92ZtHqJwD36c7GO2UpDhL67XuUhLld.jpg?quality=82&width=750&ha=2c7182cc8cc0f57b",
      product_brand: "roland",
    });

    await addProduct({
      product_name:
        "Ludwig Element Evolution 5-piece Complete Drum Set with Zildjian Cymbals - Copper",
      product_description:
        "If you or the up-and-coming timekeeper in your life are ready to move on from beginning- to intermediate-level drumming material — and you want the perfect kit for the ride — then Sweetwater drummers highly recommend the Ludwig Element Evolution drum set. It’s got everything needed to advance your playing to the next level, including Remo Pinstripe drumheads, Zildjian I-series cymbals, and all of the necessary Ludwig double-braced hardware. Plus, Ludwig significantly upgraded the tom holder, brackets, and snare throw off, and also added memory locks. Finally, the Ludwig Element Evolution features multiple choices for configurations and drum sizes, in addition to a variety of stunning finishes.",
      product_category: "drums",
      price: 999,
      image_url:
        "https://media.sweetwater.com/m/products/image/de4ce11fd341HqBTYACXxhFnk6KpvNArG6vLEsN5.jpg?quality=82&width=750&ha=de4ce11fd3662836",
      product_brand: "ludwig",
    });

    await addProduct({
      product_name:
        "Taylor 324ce Builder's Edition Acoustic-electric Guitar - Shaded Edgeburst",
      product_description:
        "Delivering top-notch musical performance, and created with woods sourced from “today’s urban ecosystem,” the Taylor 324ce Builder’s Edition acoustic-electric guitar combines masterful craftsmanship with ecological awareness. The 324ce Builder’s Edition features Shamel ash back and sides, sourced from re-purposed trees that needed to be removed from municipal areas in Southern California. Combined with a premium solid mahogany top, and crafted with a super-comfortable beveled armrest, you’ve got an amazingly rich-sounding instrument that feels incredibly natural to play. If you’re an ecologically-minded guitarist in search of a stellar acoustic-electric guitar, look no further than the Taylor 324ce Builder’s Edition.",
      product_category: "guitars",
      price: 3199,
      image_url:
        "https://media.sweetwater.com/api/i/q-82__h-750__f-webp__ha-e6cb1e46c7103cbf__hmac-713da194b442dca72a9adb606eb26caf79634cc2/images/guitars/324ceBE/1203144099/1203144099-front-large.jpg.auto.webp",
      product_brand: "taylor",
    });

    await addProduct({
      product_name: "Nord Piano 5 88-key Stage Piano",
      product_description:
        "The Nord Piano 5 builds upon the excellence of its predecessor — a Sweetwater favorite — to bring you a superb studio and stage piano with across-the-board improvements. Boasting two powerful piano engines, dual independent sample synths, and twice the memory of its predecessor, Piano 5 is a total beast that can ace the most demanding live gigs and recording sessions. With Nord Piano 5, you can quickly execute seamless program-change transitions and assign split points with optional crossfades. The Piano section features 120-note polyphony and Nord’s acclaimed Virtual Hammer Action technology with three dynamic curves for amazing, customized playing feel. If you’ve been curious why Nord keyboardists are so fiercely loyal, five minutes alone with the Nord Piano 5 will open your ears to the sheer creative power on tap in this formidable digital piano/synth. Available in 88-key and 73-key models featuring Nord’s superb Triple Sensor keybed with grand weighted action, the Piano 5 offers the exceptional playing experience that will satisfy even the most serious pianists.",
      product_category: "pianos",
      price: 3499,
      image_url:
        "https://media.sweetwater.com/m/products/image/272e0104caYKxtiL9X82juXLLCYiC2ROdAUWNQVY.jpg?quality=82&width=750&ha=272e0104ca62c814",
      product_brand: "nord",
    });

    await addProduct({
      product_name: "Gretsch G5655TG Electromatic Centerblock Jr.- Amethyst",
      product_description:
        "The Gretsch Electromatic G5655TG Center Block Jr. electric guitar delivers a broad range of tone to fit a wide selection of musical styles. The G5655TG's Black Top Broad'Tron humbucking pickups provide all the bark and bite you need for blues, jazz, rockabilly, indie rock, and other styles. A chambered spruce center block provides you with tons of sustain, and a Bigsby-licensed B70 vibrato tailpiece lets you bend notes smoothly and evenly. Eye-catching gold hardware completes the package. Enhance your guitar collection with the Gretsch Electromatic G5655TG Center Block Jr. semi-hollowbody!",
      product_category: "guitars",
      price: 899,
      image_url:
        "https://media.sweetwater.com/api/i/q-82__h-750__f-webp__ha-8418f7a609c81773__hmac-e2caafc54c853f414b2fa1ea0f7fda205bbc8320/images/guitars/G5655TGAm/CYGC24011154/CYGC24011154-body-large.jpg.auto.webp",
      product_brand: "fender",
    });

    await addProduct({
      product_name:
        "Mapex Armory 6-piece Studioease Fast Tom Shell Pack - Ocean Sunset - Sweetwater Exclusive",
      product_description:
        "When you're battling multiple guitars for a place in the mix, not just any drum kit will do. The Mapex Armory shell pack cuts through today's music with a clean, focused attack and style to match. Acoustically, each shell's hand-selected maple core boasts a familiar bite and sensitivity — one that drummers of all backgrounds will enjoy. And come showtime, the Mapex Armory's birch inner and outer plies focus attack for a tight, modern, close-miked sound. Mapex's SONIClear bearing edges seat drumheads flat on the shell, providing a wide tuning range and pure, deep fundamentals.",
      product_category: "drums",
      price: 999,
      image_url:
        "https://media.sweetwater.com/m/products/image/58ce46e2b3XupsQH4ypwsRLZmUfF83D2KnOFz4r9.jpg?quality=82&width=750&ha=58ce46e2b3785260",
      product_brand: "mapex",
    });

    await addProduct({
      product_name:
        "Epiphone Dave Mustaine Prophecy Flying V Figured Electric Guitar - Aged Dark Red Burst",
      product_description:
        "The Dave Mustaine Prophecy Flying V Figured meets at the aggressive intersection of thrash metal fury and 6-string elegance. This highly limited-edition signature instrument starts with the classic late-period Flying V formula of a fast-playing mahogany neck and a matching mahogany body, but the top takes a different turn; the AAA flame maple veneer top and sleek ebony fingerboard pushes this Flying right over the aesthetic edge. To keep up with this guitar’s bold looks, Epiphone loaded the Dave Mustaine Prophecy Flying V Figured with a dual pairing of Active Fishman Fluence pickups that are specially voiced to capture the warmth and sonic might of a classic PAF-style humbucker. What’s more, you also get a convenient push-pull control to access singing single-coil tones when it comes time to dial down the heat. Simply put, the Dave Mustaine Prophecy Flying V Figured’s hard-hitting combination of take-no-prisoners tone and Epiphone elegance is a surefire way to set you apart from the metal pack.",
      product_category: "guitars",
      price: 1299,
      image_url:
        "https://media.sweetwater.com/api/i/q-82__h-750__f-webp__ha-586826f7528f3345__hmac-39f12fed7db39b2258020b7dcd39287dc1352ed7/images/guitars/FlyVPrDMADRB/22091531422/22091531422-front-large.jpg.auto.webp",
      product_brand: "epiphone",
    });

    await addProduct({
      product_name:
        "Arturia PolyBrute 12 Polyphonic 12-voice Morphing Analog Synthesizer",
      product_description:
        "Arturia’s original PolyBrute made waves for its voltaic combination of iconic analog character, versatile armature of sound design tools, and versatile expression capabilities. The PolyBrute 12 takes up the mantle of fusing hallmark analog sound with multidimensional articulation, expanding upon its predecessor’s foundation with a titanic 12-voice architecture and Arturia’s state-of-the-art Full Touch MPE technology — a staggeringly detailed gateway to unrivaled expressivity that has Sweetwater’s synthesists fascinated with the latent potential of this 61-note synth. Ladder and Steiner-Parker filters are supplemented by trios of LFOs, envelope generators, and digital effects slots that expand upon the aural offering of the original PolyBrute, with detailed sync, FM, noise, PWM options to bolster the dyad of diverse VCOs. An onboard modulation matrix supports up to 64 connections, while the iconic Morphée XYZ pad and onboard ribbon controller let you get hands-on with unrivaled nuance. With its robust arpeggiation and polyphonic-sequencing possibilities, the included PolyBrute companion plug-in, and a pedal-accommodating suite of connectivity options, the PolyBrute 12 is a portal to unprecedented sonic sculpting, empowering you with a synesthetic approach to synthesis that lets you seize your sound like never before.",
      product_category: "pianos",
      price: 3999,
      image_url:
        "https://media.sweetwater.com/m/products/image/a45b6babdekUwRNINtHMbC8sVyRk0VVmUxsL3N88.png?quality=82&width=750&ha=a45b6babde842b2d",
      product_brand: "arturia",
    });

    console.log("Finished creating posts!");
  } catch (error) {
    console.log("Error creating posts!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    // await createInitialUsers();
    await createInitialProducts();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

// async function testDB() {
//   try {
//     console.log("Starting to test database...");

//     console.log("Calling getAllUsers");
//     const users = await getAllUsers();
//     console.log("Result:", users);

//     console.log("Calling updateUser on users[0]");
//     const updateUserResult = await updateUser(users[0].id, {
//       name: "Newname Sogood",
//       location: "Lesterville, KY",
//     });
//     console.log("Result:", updateUserResult);

//     console.log("Calling getAllPosts");
//     const posts = await getAllPosts();
//     console.log("Result:", posts);

//     console.log("Calling updatePost on posts[0]");
//     const updatePostResult = await updatePost(posts[0].id, {
//       title: "New Title",
//       content: "Updated Content",
//     });
//     console.log("Result:", updatePostResult);

//     console.log("Calling updatePost on posts[1], only updating tags");
//     const updatePostTagsResult = await updatePost(posts[1].id, {
//       tags: ["#youcandoanything", "#redfish", "#bluefish"],
//     });
//     console.log("Result:", updatePostTagsResult);

//     console.log("Calling getUserById with 1");
//     const albert = await getUserById(1);
//     console.log("Result:", albert);

//     console.log("Calling getAllTags");
//     const allTags = await getAllTags();
//     console.log("Result:", allTags);

//     console.log("Calling getPostsByTagName with #happy");
//     const postsWithHappy = await getPostsByTagName("#happy");
//     console.log("Result:", postsWithHappy);

//     console.log("Finished database tests!");
//   } catch (error) {
//     console.log("Error during testDB");
//     throw error;
//   }
// }

rebuildDB()
  //.then(testDB)
  .catch(console.error)
  .finally(() => client.end());
