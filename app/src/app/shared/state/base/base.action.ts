import { Action } from '@ngrx/store';

/**
 * Base for all application actions. Contains a key which
 * is used to determine type of action and a namespace which makes
 * it possible to reuse actions in different parts of the state.
 * 
 * The namespace and the key is combined into the unique action type.
 */
export abstract class BaseAction<T extends string> implements Action {

	public abstract namespace: string;

	public abstract key: T;

	get type(): T {
		return <T>`[${this.namespace}] ${this.key}`;
	}

}