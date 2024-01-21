//Pulled type definitions from contentful SDK v9, they seem to make more sense/cause less issues
export interface Asset {
    sys: Sys;
    fields: {
      title: string;
      description: string;
      file: {
        url: string;
        details: {
          size: number;
          image?: {
            width: number;
            height: number;
          };
        };
        fileName: string;
        contentType: string;
      };
    };
    metadata: Metadata;
  }
  
  export interface ContentfulCollection<T> {
    total: number;
    skip: number;
    limit: number;
    items: Array<T>;
  }
  
  export type AssetCollection = ContentfulCollection<Asset>;
  
  export interface Entry<T> {
    sys: Sys;
    fields: T;
    metadata: Metadata;
  }
  
  export interface EntryCollection<T> extends ContentfulCollection<Entry<T>> {
    errors?: Array<any>;
    includes?: any;
  }
  
  export interface ContentType {
    sys: Sys;
    name: string;
    description: string;
    displayField: string;
    fields: Array<Field>;
  }
  
  export type ContentTypeCollection = ContentfulCollection<ContentType>;
  
  export interface Space {
    sys: Sys;
    name: string;
    locales: Array<string>;
  }
  
  export interface Locale {
    code: string;
    name: string;
    default: boolean;
    fallbackCode: string | null;
    sys: {
      id: string;
      type: "Locale";
      version: number;
    };
  }
  
  export type LocaleCollection = ContentfulCollection<Locale>;
  
  export interface Tag {
    name: string;
    sys: {
      id: string;
      type: "Tag";
      version: number;
      visibility: "public";
    };
  }
  
  export type TagCollection = ContentfulCollection<Tag>;
  
  export interface SyncCollection {
    entries: Array<Entry<any>>;
    assets: Array<Asset>;
    deletedEntries: Array<Entry<any>>;
    deletedAssets: Array<Asset>;
    nextSyncToken: string;
  }
  
  export interface Sys {
    type: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    revision?: number;
    space?: {
      sys: SpaceLink;
    };
    environment?: {
      sys: EnvironmentLink;
    };
    contentType: {
      sys: ContentTypeLink;
    };
  }
  
  export type LinkType = "Space" | "ContentType" | "Environment";
  
  export interface Link<T extends LinkType> {
    type: "Link";
    linkType: T;
    id: string;
  }
  
  export type SpaceLink = Link<"Space">;
  export type EnvironmentLink = Link<"Environment">;
  export type ContentTypeLink = Link<"ContentType">;
  
  export interface Field {
    disabled: boolean;
    id: string;
    linkType?: string;
    localized: boolean;
    name: string;
    omitted: boolean;
    required: boolean;
    type: FieldType;
    validations: FieldValidation[];
    items?: FieldItem;
    allowedFields?: ContentTypeAllowedResources;
  }
  
  interface ContentTypeAllowedResources {
    type: string;
    source: string;
    contentTypes: string[];
  }
  
  export type FieldType =
    | "Symbol"
    | "Text"
    | "Integer"
    | "Number"
    | "Date"
    | "Boolean"
    | "Location"
    | "Link"
    | "Array"
    | "Object"
    | "RichText"
    | "ResourceLink";
  
  export interface FieldValidation {
    unique?: boolean;
    size?: {
      min?: number;
      max?: number;
    };
    regexp?: {
      pattern: string;
    };
    linkMimetypeGroup?: string[];
    in?: string[];
    linkContentType?: string[];
    message?: string;
    nodes?: {
      "entry-hyperlink"?: FieldValidation[];
      "embedded-entry-block"?: FieldValidation[];
      "embedded-entry-inline"?: FieldValidation[];
    };
    enabledNodeTypes?: string[];
  }
  
  export interface FieldItem {
    type: "Link" | "Symbol";
    validations: FieldValidation[];
    linkType?: "Entry" | "Asset";
  }
  
  /**
   * Types of fields found in an Entry
   */
  export namespace EntryFields {
    export type Symbol = string;
    export type Text = string;
    export type Integer = number;
    export type Number = number;
    export type Date = string;
    export type Boolean = boolean;
    export interface Location {
      lat: number;
      lon: number;
    }
    export type Link<T> = Asset | Entry<T>;
    export type Array<T = any> = Symbol[] | Entry<T>[] | Asset[];
    export type Object<T = any> = T;
  }
  
  interface RichTextDataTarget {
    sys: {
      id: string;
      type: "Link";
      linkType: "Entry" | "Asset";
    };
  }
  
  interface RichTextData {
    uri?: string;
    target?: RichTextDataTarget;
  }
  
  interface TagLink {
    sys: {
      type: "Link";
      linkType: "Tag";
      id: string;
    };
  }
  
  interface Metadata {
    tags: TagLink[];
  }
  //contentful tyoe definitions end here
  