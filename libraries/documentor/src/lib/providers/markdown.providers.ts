import {ModuleWithProviders} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MarkdownModule, MARKED_OPTIONS} from "ngx-markdown";


type PrismHookEnv = {
  element: HTMLElement,
  language: string,
  grammar?: any,
  code: string,
  highlightedCode: string
}

declare let Prism: {
  hooks: {
    all: {
      [key: string]: (env: PrismHookEnv) => void;
    },
    add: (name: string, callback: (env: PrismHookEnv) => void) => void;
  }
}


export function getMarkdownProviders(): ModuleWithProviders<MarkdownModule> {
  return MarkdownModule.forRoot({
      loader: HttpClient,
      //sanitize: SecurityContext.NONE,
      /*
      prevents a tags being removed from code blocks
       */
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: () => {
          if (typeof Prism !== 'undefined' && typeof Prism.hooks !== 'undefined') {
            Prism.hooks.add('before-insert', (env: PrismHookEnv) => {
              for (let i = 0; i < env.element.children.length; i++) {
                if(env.element.children[i].nodeName === 'A') {
                  const a = env.element.children[i] as HTMLAnchorElement;
                  env.highlightedCode = env.highlightedCode.replace(a.innerHTML, a.outerHTML);
                }
              }
            });
          }

          return {
            gfm: true
          }
        }
      }
    });
}
