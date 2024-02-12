import {isParentNode, isContentNode} from "@jamesbenrobb/dynamic-route-app";
import {DocsContentNode, DocsRouteNode} from "./content.types";
import {isContentNodeWithInfo, isContentNodeWithSections} from "./content.type-guards";


export function getChildNodes(node: DocsRouteNode): DocsRouteNode[] {
  let childNodes: DocsRouteNode[] = [];

  if(isContentNodeWithInfo(node)) {
    childNodes = childNodes.concat(node.content.info);
  }

  if(isContentNodeWithSections(node)) {
    childNodes = childNodes.concat(node.content.sections);
  }

  if(isParentNode(node)) {
    childNodes = childNodes.concat(node.children);
  }

  return childNodes;
}


export function getCurrentContentNode(routeNodes: DocsRouteNode[]): DocsContentNode | undefined {
  let node: DocsRouteNode | undefined;
  const rnLength = routeNodes.length;

  if(rnLength === 1 && isContentNode(routeNodes[0])) {
    node = routeNodes[0]
  }

  if(rnLength > 1) {
    const ancestors = routeNodes.filter(isParentNode),
      ancLength = ancestors.length;

    if(ancLength === rnLength) {

      node = routeNodes[rnLength - 1];

    } else {

      if(ancLength > 0) {

        const parent = ancestors[ancLength - 1],
          index = routeNodes.indexOf(parent),
          child =  routeNodes[index + 1];

        node = parent;

        if(isContentNode(child) && parent.children.indexOf(child) > -1) {
          node = child;
        }
      }
    }
  }

  return node ? isContentNode(node) ? node : undefined : undefined;
}
