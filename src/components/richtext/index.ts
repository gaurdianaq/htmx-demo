import {
  documentToHtmlString,
  Next,
} from "@contentful/rich-text-html-renderer";
import { Document, BLOCKS, Block, Inline } from "@contentful/rich-text-types";

export const renderRichText = (document: Document) => {
  return documentToHtmlString(document, {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Block | Inline, next: Next) => {
        return `<p class="block">${next(node.content)}</p>`;
      },
    },
  });
};
