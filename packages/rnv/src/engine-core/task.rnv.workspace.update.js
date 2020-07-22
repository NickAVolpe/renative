/* eslint-disable import/no-cycle */
import { logTask } from '../core/systemManager/logger';
import { executeTask } from '../core/engineManager';
import { TASK_WORKSPACE_UPDATE, TASK_PROJECT_CONFIGURE } from '../core/constants';

export const taskRnvWorkspaceUpdate = async (c, parentTask, originTask) => {
    // TODO: taskRnvWorkspaceUpdate
    logTask('taskRnvWorkspaceUpdate', `parent:${parentTask} origin:${originTask}`);

    await executeTask(c, TASK_PROJECT_CONFIGURE, TASK_WORKSPACE_UPDATE, originTask);

    return true;
};

export default {
    description: '',
    fn: taskRnvWorkspaceUpdate,
    task: TASK_WORKSPACE_UPDATE,
    params: [],
    platforms: [],
    skipPlatforms: true,
};