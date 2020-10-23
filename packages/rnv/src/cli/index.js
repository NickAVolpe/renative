/* eslint-disable global-require */
import { configureRuntimeDefaults, parseRenativeConfigs } from '../core/configManager/configParser';
import { initializeTask, findSuitableTask, registerEngine, registerPlatformEngine, loadEngineConfigs } from '../core/engineManager';
import { checkAndMigrateProject } from '../core/projectManager/migrator';

import EngineCore from '../engine-core';

// const registerEngines = () => {
//     logTask('registerEngines');
//     registerEngine(EngineCore);
//     // registerEngine(require('@rnv/engine-rn-web')?.default);
//     // registerEngine(require('@rnv/engine-rn-electron')?.default);
//     // registerEngine(require('@rnv/engine-rn-next')?.default);
//     // registerEngine(require('@rnv/engine-rn')?.default);
// };


const run = async (c) => {
    await registerEngine(c, EngineCore);
    await configureRuntimeDefaults(c);
    await checkAndMigrateProject(c);
    await parseRenativeConfigs(c);
    const result = await loadEngineConfigs(c);
    if (!result) {
        await parseRenativeConfigs(c);
    }
    await registerPlatformEngine(c);
    const taskInstance = await findSuitableTask(c);

    await initializeTask(c, taskInstance.task);
};

export default run;
