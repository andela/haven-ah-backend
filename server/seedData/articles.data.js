import slug from 'slug';

const getSlug = title => slug(`${title} ${Date.now()}`);

const articles = [
  {
    slug: getSlug('The Boy And The Filberts'),
    title: 'The Boy And The Filberts',
    body: 'A Boy was given permission to put his hand into a pitcher to get some filberts. But he took such a great fistful that he could not draw his hand out again. There he stood, unwilling to give up a single filbert and yet unable to get them all out at once. Vexed and disappointed he began to cry. My boy, said his mother, "be satisfied with half the nuts you have taken and you will easily get your hand out. Then perhaps you may have some more filberts some other time.',
    userid: 1,
    description: 'Do not attempt too much at once.',
    readtime: 500,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: getSlug('The Story of An Hour'),
    title: 'The Story of An Hour',
    body: 'There stood, facing the open window, a comfortable, roomy armchair. Into this she sank, pressed down by a physical exhaustion that haunted her body and seemed to reach into her soul. She could see in the open square before her house the tops of trees that were all aquiver with the new spring life.The delicious breath of rain was in the air.In the street below a peddler was crying his wares.The notes of a distant song which someone was singing reached her faintly, and countless sparrows were twittering in the eaves. There were patches of blue sky showing here and there through the clouds that had met and piled one above the other in the west facing her window.',
    userid: 2,
    description: 'Story of a woman',
    images: ['https://unsplash.com/photos/S4QKXmEL9XQ'],
    readtime: 600,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: getSlug('Ali Baba and the Forty Thieves'),
    title: 'Ali Baba and the Forty Thieves',
    body: 'One day, when Ali Baba was in the forest and had just cut wood enough to load his asses, he saw at a distance a great cloud of dust, which seemed to approach him.He observed it with attention, and distinguished soon after a body of horsemen, whom he suspected might be robbers.He determined to leave his asses to save himself.He climbed up a large tree, planted on a high rock, whose branches were thick enough to conceal him, and yet enabled him to see all that passed without being discovered.',
    userid: 3,
    description: 'Ali Baba and the Forty Thieves',
    readtime: 400,
    images: ['https://unsplash.com/photos/pGtcHPw6aVk'],
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: getSlug('Witches\' Loaves'),
    title: 'Witches\' Loaves',
    body: 'Miss Martha Meacham kept the little bakery on the corner (the one where you go up three steps, and the bell tinkles when you open the door). Miss Martha was forty, her bank - book showed a credit of two thousand dollars, and she possessed two false teeth and a sympathetic heart.Many people have married whose chances to do so were much inferior to Miss Martha\'s.Two or three times a week a customer came in in whom she began to take an interest.He was a middle-aged man, wearing spectacles and a brown beard trimmed to a careful point. He spoke English with a strong German accent.His clothes were worn and darned in places, and wrinkled and baggy in others.But he looked neat, and had very good manners. He always bought two loaves of stale bread.Fresh bread was five cents a loaf.Stale ones were two for five.Never did he call for anything but stale bread.',
    userid: 1,
    description: 'Miss Martha Meacham\'s story',
    readtime: 1000,
    images: ['https://unsplash.com/photos/6Q-Rvj7wYCM'],
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: getSlug('The Romance of a Busy Broker'),
    title: 'The Romance of a Busy Broker',
    body: 'The young lady had been Maxwell\'s stenographer for a year. She was beautiful in a way that was decidedly unstenographic. She forewent the pomp of the alluring pompadour. She wore no chains, bracelets or lockets. She had not the air of being about to accept an invitation to luncheon. Her dress was grey and plain, but it fitted her figure with fidelity and discretion. In her neat black turban hat was the gold-green wing of a macaw. On this morning she was softly and shyly radiant. Her eyes were dreamily bright, her cheeks genuine peachblow, her expression a happy one, tinged with reminiscence. Pitcher, still mildly curious, noticed a difference in her ways this morning.Instead of going straight into the adjoining room, where her desk was, she lingered, slightly irresolute, in the outer office.Once she moved over by Maxwell\'s desk, near enough for him to be aware of her presence.',
    userid: 5,
    description: 'A tale about a Stenographer',
    readtime: 400,
    images: ['https://unsplash.com/photos/MCroQe9ykmM', 'https://unsplash.com/photos/S4QKXmEL9XQ'],
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: getSlug('How the Leopard Got His Spots'),
    title: 'How the Leopard Got His Spots',
    body: 'In the days when everybody started fair, Best Beloved, the Leopard lived in a place called the High Veldt. \'Member it wasn\'t the Low Veldt, or the Bush Veldt, or the Sour Veldt, but the \'sclusively bare, hot, shiny High Veldt, where there was sand and sandy - coloured rock and \'sclusively tufts of sandy-yellowish grass. The Giraffe and the Zebra and the Eland and the Koodoo and the Hartebeest lived there; and they were, \'sclusively sandy-yellow - brownish all over; but the Leopard, he was the \'sclusivist sandiest-yellowish-brownest of them all a greyish-yellowish catty-shaped kind of beast, and he matched the Veldt to one hair. This was very bad for the Giraffe and the Zebra and the rest of them; for he would lie down by a \'sclusively yellowish - greyish - brownish stone or clump of grass, and when the Giraffe or the Zebra or the Eland or the Koodoo or the Bush - Buck or the Bonte-Buck came by he would surprise them out of their jumpsome lives.He would indeed! And, also, there was an Ethiopian with bows and arrows(a \'sclusively greyish-brownish-yellowish man he was then), who lived on the High Veldt with the Leopard; and the two used to hunt together the Ethiopian with his bows and arrows, and the Leopard \'sclusively with his teeth and claws till the giraffe and the Eland and the Koodoo and the Quagga and all the rest of them didn\'t know which way to jump, Best Beloved. They didn\'t indeed!',
    userid: 8,
    description: 'In the days when everybody started fair, Best Beloved, the Leopard lived in a place called the High Veldt',
    readtime: 1000,
    images: ['https://unsplash.com/photos/1s5Z6_LsnNg', 'https://unsplash.com/photos/pTT3D4LdaVM'],
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: getSlug('Chickamauga'),
    title: 'Chickamauga',
    body: 'One sunny autumn afternoon a child strayed away from its rude home in a small field and entered a forest unobserved. It was happy in a new sense of freedom from control, happy in the opportunity of exploration and adventure; for this child\'s spirit, in bodies of its ancestors, had for thousands of years been trained to memorable feats of discovery and conquest--victories in battles whose critical moments were centuries, whose victors\' camps were cities of hewn stone. From the cradle of its race it had conquered its way through two continents and passing a great sea had penetrated a third, there to be born to war and dominion as a heritage.',
    userid: 4,
    description: 'He had slept through it all, grasping his little wooden sword with perhaps a tighter clutch in unconscious sympathy with his martial environment',
    readtime: 600,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export default articles;