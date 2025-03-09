export const POST_STATUS = [
  'draft',
  'published',
  'archived',
  'under_review',
] as const;

export type PostStatus = (typeof POST_STATUS)[number];

export const PostStatusEnum = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  UNDER_REVIEW: 'under_review',
} as const;
