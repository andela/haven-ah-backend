const comments = [
  {
    body: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur',
    userId: 2,
    articleId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    userId: 3,
    articleId: 1,
    isHighlighted: true,
    highlightedText: 'be satisfied with half the nuts you have taken and you will easily get your hand out. Then perhaps you may have some more filberts some other time',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante."',
    userId: 4,
    articleId: 1,
    isHighlighted: true,
    highlightedText: 'be satisfied with half the nuts you have taken and you will easily get your hand out. Then perhaps you may have some more filberts some other time',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.',
    userId: 5,
    articleId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    userId: 6,
    articleId: 1,
    isHighlighted: true,
    highlightedText: 'There he stood, unwilling to give up a single filbert and yet unable to get them all out at once',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    userId: 7,
    articleId: 2,
    parentId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    userId: 8,
    articleId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.',
    userId: 9,
    parentId: 2,
    articleId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Nulla suscipit ligula in lacus.',
    userId: 2,
    parentId: 2,
    articleId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    userId: 3,
    isHighlighted: true,
    articleId: 4,
    highlightedText: 'Miss Martha was forty, her bank - book showed a credit of two thousand dollars, and she possessed two false teeth and a sympathetic heart',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    userId: 4,
    articleId: 5,
    isHighlighted: true,
    highlightedText: 'She wore no chains, bracelets or lockets. She had not the air of being about to accept an invitation to luncheon.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.',
    userId: 5,
    articleId: 5,
    isHighlighted: true,
    highlightedText: 'She wore no chains, bracelets or lockets.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Praesent blandit lacinia erat.',
    userId: 6,
    articleId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.',
    userId: 7,
    articleId: 3,
    isHighlighted: true,
    highlightedText: 'He determined to leave his asses to save himself',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.',
    userId: 8,
    parentId: 4,
    articleId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.',
    userId: 9,
    articleId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.',
    userId: 2,
    articleId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.',
    userId: 3,
    articleId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.',
    userId: 4,
    parentId: 7,
    articleId: 3,
    highlightedText: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    body: 'Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    userId: 5,
    articleId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default comments;
