export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'string',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoId',
      title: 'Video Id',
      type: 'string',
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
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{type: 'comment'}],
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'object',
      fields: [
        {
          name:"userId",
          title:"User Id",
          type:"string"
        },
        {
          name:"picture",
          title:"Picture",
          type:"string"
        },
        {
          name:"userName",
          title:"User Name",
          type:"string"
        },
      ]
    },
  ],
}