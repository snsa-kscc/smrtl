/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    posts: Post;
    pages: Page;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    posts: PostsSelect<false> | PostsSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    header: Header;
    footer: Footer;
    'not-found': NotFound;
  };
  globalsSelect: {
    header: HeaderSelect<false> | HeaderSelect<true>;
    footer: FooterSelect<false> | FooterSelect<true>;
    'not-found': NotFoundSelect<false> | NotFoundSelect<true>;
  };
  locale: 'en' | 'hr' | 'it';
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
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
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
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
                    image: number | Media;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'hero';
            }
          | {
              qAndABox?:
                | {
                    question: string;
                    answer: string;
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
                    name: string;
                    image: number | Media;
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
                    number: number;
                    description: string;
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
              firstSubtitle: string;
              secondSubtitle: string;
              IPTVBox?:
                | {
                    title: string;
                    description: string;
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
                    image: number | Media;
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
                    image: number | Media;
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
                    image: number | Media;
                    message: string;
                    name: string;
                    role: string;
                    id?: string | null;
                  }[]
                | null;
              id?: string | null;
              blockName?: string | null;
              blockType: 'referals';
            }
          | {
              limit: number;
              id?: string | null;
              blockName?: string | null;
              blockType: 'archive';
            }
          | {
              title: string;
              firstSubtitle: string;
              secondSubtitle: string;
              id?: string | null;
              blockName?: string | null;
              blockType: 'question';
            }
          | {
              title: string;
              subtitle: string;
              images?:
                | {
                    image: number | Media;
                    id?: string | null;
                  }[]
                | null;
              benefitsBox?:
                | {
                    image: number | Media;
                    title: string;
                    description: string;
                    id?: string | null;
                  }[]
                | null;
              ctaLabel: string;
              ctaUrl: string;
              id?: string | null;
              blockName?: string | null;
              blockType: 'benefits';
            }
        )[]
      | null;
  };
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
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
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  title?: T;
  content?:
    | T
    | {
        content?: T;
      };
  meta?:
    | T
    | {
        title?: T;
        image?: T;
        description?: T;
      };
  slug?: T;
  slugLock?: T;
  featuredImage?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  content?:
    | T
    | {
        content?: T;
      };
  layout?:
    | T
    | {
        layout?:
          | T
          | {
              hero?:
                | T
                | {
                    title?: T;
                    animationWords?: T;
                    description?: T;
                    caseStudy?:
                      | T
                      | {
                          image?: T;
                          id?: T;
                        };
                    id?: T;
                    blockName?: T;
                  };
              'q-and-a'?:
                | T
                | {
                    qAndABox?:
                      | T
                      | {
                          question?: T;
                          answer?: T;
                          id?: T;
                        };
                    id?: T;
                    blockName?: T;
                  };
              solutions?:
                | T
                | {
                    title?: T;
                    description?: T;
                    industry?:
                      | T
                      | {
                          name?: T;
                          image?: T;
                          id?: T;
                        };
                    id?: T;
                    blockName?: T;
                  };
              counter?:
                | T
                | {
                    counterBox?:
                      | T
                      | {
                          number?: T;
                          description?: T;
                          id?: T;
                        };
                    id?: T;
                    blockName?: T;
                  };
              features?:
                | T
                | {
                    title?: T;
                    subtitle?: T;
                    firstLineFeatures?: T;
                    secondLineFeatures?: T;
                    id?: T;
                    blockName?: T;
                  };
              'image-hero'?:
                | T
                | {
                    title?: T;
                    description?: T;
                    image?: T;
                    logo?: T;
                    id?: T;
                    blockName?: T;
                  };
              'iptv-solutions'?:
                | T
                | {
                    title?: T;
                    firstSubtitle?: T;
                    secondSubtitle?: T;
                    IPTVBox?:
                      | T
                      | {
                          title?: T;
                          description?: T;
                          id?: T;
                        };
                    id?: T;
                    blockName?: T;
                  };
              compatibility?:
                | T
                | {
                    title?: T;
                    description?: T;
                    platform?:
                      | T
                      | {
                          image?: T;
                          id?: T;
                        };
                    ctaHook?: T;
                    ctaLabel?: T;
                    ctaUrl?: T;
                    id?: T;
                    blockName?: T;
                  };
              brands?:
                | T
                | {
                    title?: T;
                    description?: T;
                    brands?:
                      | T
                      | {
                          image?: T;
                          id?: T;
                        };
                    id?: T;
                    blockName?: T;
                  };
              referals?:
                | T
                | {
                    title?: T;
                    referals?:
                      | T
                      | {
                          image?: T;
                          message?: T;
                          name?: T;
                          role?: T;
                          id?: T;
                        };
                    id?: T;
                    blockName?: T;
                  };
              archive?:
                | T
                | {
                    limit?: T;
                    id?: T;
                    blockName?: T;
                  };
              question?:
                | T
                | {
                    title?: T;
                    firstSubtitle?: T;
                    secondSubtitle?: T;
                    id?: T;
                    blockName?: T;
                  };
              benefits?:
                | T
                | {
                    title?: T;
                    subtitle?: T;
                    images?:
                      | T
                      | {
                          image?: T;
                          id?: T;
                        };
                    benefitsBox?:
                      | T
                      | {
                          image?: T;
                          title?: T;
                          description?: T;
                          id?: T;
                        };
                    ctaLabel?: T;
                    ctaUrl?: T;
                    id?: T;
                    blockName?: T;
                  };
            };
      };
  meta?:
    | T
    | {
        title?: T;
        image?: T;
        description?: T;
      };
  slug?: T;
  slugLock?: T;
  titleVisibleInFooter?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
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
  successMessage: string;
  errorMessage: string;
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
 * via the `definition` "header_select".
 */
export interface HeaderSelect<T extends boolean = true> {
  logotype?: T;
  navItems?:
    | T
    | {
        label?: T;
        url?: T;
        id?: T;
      };
  cta?:
    | T
    | {
        label?: T;
        url?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  title?: T;
  contactTitle?: T;
  email?: T;
  phone?: T;
  address?: T;
  infoTitle?: T;
  newsletterTitle?: T;
  newsletterButton?: T;
  newsletterDisclaimer?: T;
  successMessage?: T;
  errorMessage?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "not-found_select".
 */
export interface NotFoundSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
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