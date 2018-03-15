import { createNamespace } from '../../shared/state/utils';

const moduleName = 'Core';

export const authentication = createNamespace(moduleName, 'Authentication');
export const layout = createNamespace(moduleName, 'Layout');
export const session = createNamespace(moduleName, 'Session');