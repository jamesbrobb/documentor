import {isContentNode, ContentNode} from '@jamesbenrobb/dynamic-route-app';
import {DocsPageContentWithInfo, DocsPageContentWithSections, InfoNode} from "./content.types";


export function isContentNodeWithInfo(node: any): node is ContentNode<DocsPageContentWithInfo> {
  return isContentNode(node) && node.content.info !== undefined;
}

export function isContentNodeWithSections(node: any): node is ContentNode<DocsPageContentWithSections> {
  return isContentNode(node) && node.content.sections !== undefined;
}

export function isInfoNode(node: any): node is InfoNode {
  return node && node.name !== undefined && node.uri !== undefined && node.isUIExample !== undefined;
}
