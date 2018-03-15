import { type } from '../../../../../shared/state/utils';
import { Example } from '../../../../../shared/models';

import { initialState as listInitialState, handleAction, ListState, Actions } from '../../../../../shared/state/list';

import { examples as namespace } from '../namespaces';

export const initialState = listInitialState;

export function reducer(state: ListState<Example>, action: Actions<Example>): ListState<Example> {

	return handleAction(namespace, state, action);

}