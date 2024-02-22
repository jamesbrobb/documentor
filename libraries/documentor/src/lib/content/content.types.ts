import {RouteNode, ContentNode} from "@jamesbenrobb/dynamic-route-app";
import {ControlGroup} from "../config";


export type DocsRouteNode = RouteNode<DocsPageContent | DocInfoContent>
export type DocsPageNode = ContentNode<DocsPageContent>
export type DocsInfoNode = ContentNode<DocInfoContent>


export type DocsPageContentUsage = {
  pages: string[]
  contents?: string
}

export type DocsPageContent = {
  description: string
  githubLink?: string
  type: string
  isModule: boolean
  demonstrates?: string
  usage?: DocsPageContentUsage
  controls?: ControlGroup[]
}

export type DocsPageContentWithInfo = {
  info: DocsInfoNode[]
} & DocsPageContent;

export type DocsPageContentWithSections = {
  sections: DocsPageNode[]
} & DocsPageContent

export type DocInfoContent = {
  uri: string
  isUIExample: boolean
}
