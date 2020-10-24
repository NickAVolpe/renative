import open from 'better-opn';
import { EngineManager, Constants, Logger, PlatformManager, SDKNext, SDKWebpack } from 'rnv';

const { logErrorPlatform } = PlatformManager;
const { logTask, logError } = Logger;
const {
    WEB,
    CHROMECAST,
    TASK_START,
    TASK_CONFIGURE,
    PARAMS
} = Constants;
const { waitForWebpack } = SDKWebpack;
const { runWebNext } = SDKNext;
const { executeTask } = EngineManager;

export const taskRnvStart = async (c, parentTask, originTask) => {
    const { platform } = c;
    const { port } = c.runtime;
    const { hosted } = c.program;

    logTask('taskRnvStart', `parent:${parentTask} port:${c.runtime.port} hosted:${!!hosted}`);

    if (hosted) {
        waitForWebpack(c)
            .then(() => open(`http://${c.runtime.localhost}:${port}/`))
            .catch(logError);
    }

    if (!parentTask) {
        await executeTask(c, TASK_CONFIGURE, TASK_START, originTask);
    }

    if (hosted) {
        return logError(
            'This platform does not support hosted mode',
            true
        );
    }
    switch (platform) {
        case WEB:
        case CHROMECAST:
            c.runtime.shouldOpenBrowser = false;
            return runWebNext(c, port, true);
        default:
            return logErrorPlatform(c);
    }
};

export default {
    description: 'Starts bundler / server',
    fn: taskRnvStart,
    task: 'start',
    params: PARAMS.withBase(PARAMS.withConfigure()),
    platforms: [
        WEB,
        CHROMECAST,
    ],
};