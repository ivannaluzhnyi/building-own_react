/* eslint-disable no-undef */
import {
    updateQueue,
    performWork,
    HOST_ROOT,
    CLASS_COMPONENT,
    FUNCTION_COMPONENT,
} from './fiber.js';

function render(elements, container) {
    updateQueue.push({
        from: HOST_ROOT,
        dom: container,
        newProps: { children: elements },
    });

    requestIdleCallback(performWork);
}

function scheduleClassUpdate(instance, partialState) {
    updateQueue.push({
        from: CLASS_COMPONENT,
        instance,
        partialState,
    });

    requestIdleCallback(performWork);
}

function scheduleHooksUpdate(fiber) {
    updateQueue.push({
        from: FUNCTION_COMPONENT,
        instance: { __fiber: fiber },
    });

    requestIdleCallback(performWork);
}

export { render, scheduleClassUpdate, scheduleHooksUpdate };
