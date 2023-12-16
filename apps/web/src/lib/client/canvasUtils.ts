import type { BindingParams, FolderApi, Pane } from 'tweakpane';

export type Params = {
  [key: string]: number | string | boolean;
};

// todo: move to own lib
function slugify(string: string) {
  return String(string)
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
    .trim() // trim leading or trailing whitespace
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
}

const canvasDimensions: [number, number] = [400, 400];

export const BASE_PARAMS = {
  debug: false,
  fullScreen: false,
}

export function getDimensions(fullScreen: boolean) {
  if (fullScreen) {
    return [window.innerWidth, window.innerHeight];
  }
  return canvasDimensions;
}

let pane: Pane;
let folders: FolderConfigs = {};

export async function initPane() {
  const { Pane } = await import('tweakpane');

  pane = new Pane();
  folders = {};

  return true;
}

type FolderBinding = {
  [key: string]: BindingParams | null
}

type FolderConfigs = {
  [key: string]: FolderApi;
}

export function initPaneFolder(folderName: string, params: Params, bindings: FolderBinding) {
  const folderSlug = slugify(folderName);
  let folder = folders[folderSlug];

  if (!folder) {
    folder = pane.addFolder({
      title: folderName
    });
    folders[folderSlug] = folder;
  }

  for (const [key, binding] of Object.entries(bindings)) {
    // @ts-expect-error: child.key exists even though not specified in typings
    if (!folder.children.map(child => child.key).includes(key)) {
      if (binding) {
        folder.addBinding(params, key, binding);
      } else {
        folder.addBinding(params, key);
      }

    }
  }

  return folder;
}
