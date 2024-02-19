import {isContentNode, ContentNode} from '@jamesbenrobb/dynamic-route-app';
import {
  DocsInfoNode,
  DocsPageContent,
  DocsPageContentWithInfo,
  DocsPageContentWithSections,
  DocsPageNode
} from "./content.types";


export function isPageContent(content: any): content is DocsPageContent {
  return content.githubLink !== undefined &&
    content.type !== undefined &&
    content.description !== undefined;
}

export function isPageNode(node: any): node is DocsPageNode {
  return isContentNode(node) && isPageContent(node.content);
}


export function isPageContentWithInfo(content: any): content is DocsPageContentWithInfo {
  return isPageContent(content) && 'info' in content && Array.isArray(content.info);
}

export function isPageNodeWithInfo(node: any): node is ContentNode<DocsPageContentWithInfo> {
  return isPageNode(node) && isPageContentWithInfo(node.content);
}


export function isPageContentWithSections(content: any): content is DocsPageContentWithSections {
  return isPageContent(content) && 'sections' in content && Array.isArray(content.sections);
}
export function isPageNodeWithSections(node: any): node is ContentNode<DocsPageContentWithSections> {
  return isPageNode(node) && isPageContentWithSections(node.content);
}


export function isInfoNode(node: any): node is DocsInfoNode {
  return isContentNode(node) &&
    node.content.uri !== undefined &&
    node.content.isUIExample !== undefined;
}
