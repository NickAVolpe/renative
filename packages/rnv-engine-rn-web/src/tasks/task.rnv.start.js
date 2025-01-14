import open from 'better-opn';
import { TaskManager, Constants, Logger, PlatformManager, Common } from 'rnv';
import { runWebpackServer } from '@rnv/sdk-webpack';

const { getConfigProp, waitForHost } = Common;
const { logErrorPlatform } = PlatformManager;
const { logTask, logError } = Logger;
const {
    WEB,
    WEBTV,
    TIZEN,
    WEBOS,
    TIZEN_MOBILE,
    TIZEN_WATCH,
    KAIOS,
    FIREFOX_OS,
    FIREFOX_TV,
    CHROMECAST,
    TASK_START,
    TASK_CONFIGURE,
    REMOTE_DEBUGGER_ENABLED_PLATFORMS,
    PARAMS
} = Constants;

const { executeTask, shouldSkipTask } = TaskManager;

export const taskRnvStart = async (c, parentTask, originTask) => {
    const { platform } = c;
    const { port } = c.runtime;
    const { hosted } = c.program;

    logTask('taskRnvStart', `parent:${parentTask} port:${port} hosted:${!!hosted}`);

    if (!parentTask) {
        await executeTask(c, TASK_CONFIGURE, TASK_START, originTask);
    }

    if (shouldSkipTask(c, TASK_START, originTask)) return true;

    if (hosted) {
        waitForHost(c)
            .then(() => open(`http://${c.runtime.localhost}:${port}/`))
            .catch(logError);
    }
    const bundleAssets = getConfigProp(c, c.platform, 'bundleAssets');
    const isWeinreEnabled = REMOTE_DEBUGGER_ENABLED_PLATFORMS.includes(platform) && !bundleAssets && !hosted;

    switch (platform) {
        case WEB:
        case WEBTV:
        case TIZEN:
        case WEBOS:
        case TIZEN_MOBILE:
        case TIZEN_WATCH:
            // c.runtime.keepSessionActive = true;
            return runWebpackServer(c, isWeinreEnabled);
        default:
            if (hosted) {
                return logError(
                    'This platform does not support hosted mode',
                    true
                );
            }
            return logErrorPlatform(c);
    }
};

export default {
    description: 'Starts bundler / server',
    fn: taskRnvStart,
    task: TASK_START,
    params: PARAMS.withBase(PARAMS.withConfigure()),
    platforms: [
        WEB,
        WEBTV,
        TIZEN,
        WEBOS,
        TIZEN_MOBILE,
        TIZEN_WATCH,
        KAIOS,
        FIREFOX_OS,
        FIREFOX_TV,
        CHROMECAST,
    ],
};
