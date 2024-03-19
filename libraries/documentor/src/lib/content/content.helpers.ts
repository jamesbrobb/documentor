import {isParentNode} from "@jamesbenrobb/dynamic-routes";
import {DocsPageNode, DocsRouteNode} from "./content.types";
import {isPageNodeWithSections, isPageNodeWithInfo, isPageNode} from "./content.type-guards";


export function getChildNodes(node: DocsRouteNode): DocsRouteNode[] {
  let childNodes: DocsRouteNode[] = [];

  if(isPageNodeWithInfo(node)) {
    childNodes = childNodes.concat(node.content.info);
  }

  if(isPageNodeWithSections(node)) {
    childNodes = childNodes.concat(node.content.sections);
  }

  if(isParentNode(node)) {
    childNodes = childNodes.concat(node.children);
  }

  return childNodes;
}


export function getCurrentPageNode(routeNodes: DocsRouteNode[]): DocsPageNode | undefined {
  let node: DocsRouteNode | undefined;
  const rnLength = routeNodes.length;

  if(rnLength === 1 && isPageNode(routeNodes[0])) {
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

        if(isPageNode(child) && parent.children.indexOf(child) > -1) {
          node = child;
        }
      }
    }
  }

  return node ? isPageNode(node) ? node : undefined : undefined;
}
