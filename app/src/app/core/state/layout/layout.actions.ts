import { BaseAction } from '../../../shared/state/base';

import { layout as namespace } from '../namespaces';

export enum ActionTypes {
	TOGGLE_MENU = 'TOGGLE_MENU',
	SET_MENU_VISIBLE = 'SET_MENU_VISIBLE'
}

abstract class LayoutAction<T extends string> extends BaseAction<T> {
	namespace: string = namespace;
}

export class ToggleMenu extends LayoutAction<'TOGGLE_MENU'> {
	readonly key = ActionTypes.TOGGLE_MENU;
}

export class SetMenuVisible extends LayoutAction<'SET_MENU_VISIBLE'> {
	readonly key = ActionTypes.SET_MENU_VISIBLE;
	constructor(public visible: boolean) { super(); }
}

export type Actions =
	ToggleMenu | SetMenuVisible;