/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    posts: Post;
    pages: Page;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    header: Header;
    footer: Footer;
    'not-found': NotFound;
  };
  locale: 'en' | 'hr' | 'it';
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  title: string;
  content: {
    content: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
  };
  meta?: {
    title?: string | null;
    image?: (number | null) | Media;
    description?: string | null;
  };
  slug: string;
  slugLock?: boolean | null;
  featuredImage: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title?: string | null;
  content?: {
    content?: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
  };
  layout?: {
    layout?:
      | (
          | {
              title: string;
              animationWords: string;
              description: string;
              caseStudy?:
                | {
                    image?: (number | null) | Media;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'hero';
            }
          | {
              title: string;
              subtitle: string;
              qAndABox?:
                | {
                    question?: string | null;
                    answer?: string | null;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'q-and-a';
            }
          | {
              title: string;
              description: string;
              industry?:
                | {
                    name?: string | null;
                    image?: (number | null) | Media;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'solutions';
            }
          | {
              counterBox?:
                | {
                    number?: number | null;
                    description?: string | null;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'counter';
            }
          | {
              title: string;
              subtitle: string;
              firstLineFeatures: string;
              secondLineFeatures: string;
              id?: string | null;
              blockName?: string | null;
              blockType: 'features';
            }
          | {
              title: string;
              description: string;
              image: number | Media;
              logo?: boolean | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'image-hero';
            }
          | {
              title: string;
              IPTVBox?:
                | {
                    title?: string | null;
                    description?: string | null;
                    image?: (number | null) | Media;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'iptv-solutions';
            }
          | {
              title: string;
              description: string;
              platform?:
                | {
                    image?: (number | null) | Media;
                    id?: string | null;
                  }[]
                | null;
              ctaHook: string;
              ctaLabel: string;
              ctaUrl: string;
              id?: string | null;
              blockName?: string | null;
              blockType: 'compatibility';
            }
          | {
              title: string;
              description: string;
              brands?:
                | {
                    image?: (number | null) | Media;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'brands';
            }
          | {
              title: string;
              referals?:
                | {
                    image?: (number | null) | Media;
                    message?: string | null;
                    name?: string | null;
                    role?: string | null;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'referals';
            }
          | {
              limit?: number | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'archive';
            }
        )[]
      | null;
  };
  meta?: {
    title?: string | null;
    image?: (number | null) | Media;
    description?: string | null;
  };
  slug: string;
  slugLock?: boolean | null;
  titleVisibleInFooter?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'posts';
        value: number | Post;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: number;
  logotype: number | Media;
  navItems?:
    | {
        label: string;
        url: string;
        id?: string | null;
      }[]
    | null;
  cta: {
    label: string;
    url: string;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: number;
  title: string;
  contactTitle: string;
  email: string;
  phone: string;
  address: string;
  infoTitle: string;
  newsletterTitle: string;
  newsletterButton: string;
  newsletterDisclaimer: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "not-found".
 */
export interface NotFound {
  id: number;
  title: string;
  description: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}