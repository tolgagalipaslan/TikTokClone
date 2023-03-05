export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'userName',
        title: 'User Name',
        type: 'string',
      },
      {
        name: 'picture',
        title: 'picture',
        type: 'string',
      },
      {
        name: 'subId',
        title: 'ID',
        type: 'string',
      },
      {
        name: 'follows',
        title: 'Follows',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{type: 'user'}],
          },
        ],
      },
      {
        name: 'followers',
        title: 'Followers',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{type: 'user'}],
          },
        ],
      },
      {
        name: 'likes',
        title: 'Likes',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{type: 'user'}],
          },
        ],
      },
    ],
  }