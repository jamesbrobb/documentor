import {RouteNode, RouteNodeBase, ContentNode} from "@jamesbenrobb/dynamic-route-app";
import {Control, ControlGroup} from "../config";


export type DocsRouteNode = RouteNode<DocsPageContent>
export type DocsContentNode = ContentNode<DocsPageContent>


export type DocsPageContentUsage = {
  pages: string[]
  contents?: string
}

export type DocsPageContent = {
  description: string
  githubLink: string
  type: string
  isModule: boolean
  demonstrates?: string
  usage?: DocsPageContentUsage
  controls?: ControlGroup[]
}

export type DocsPageContentWithInfo = {
  info: InfoNode[]
} & DocsPageContent;

export type DocsPageContentWithSections = {
  sections: DocsContentNode[]
} & DocsPageContent

export type InfoNode = {
  name: string
  uri: string
  isUIExample: boolean
} & RouteNodeBase
