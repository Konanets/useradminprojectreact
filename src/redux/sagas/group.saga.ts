import * as Effects from "redux-saga/effects";
import {AxiosError, isAxiosError} from "axios";

import {ICreateGroup, IGroup, IGroupRes} from "../../types";
import {AxiosRes, groupService} from "../../services";
import {groupActions} from "../slices";


const takeLatest: any = Effects.takeLatest;

function* loadGroupByChoice({data: {page}}: { data: { page: number } }) {
    try {
        const {data}: { data: IGroupRes } = yield Effects.call((): AxiosRes<IGroupRes> => groupService.getGroups(page));
        yield Effects.put(groupActions.loadGroupsSuccess(data));
    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ detail: string }>;
            if (serverError && serverError.response) {
                yield Effects.put(groupActions.loadGroupsFailure())
            }
        }
    }
}

function* loadGroup() {
    yield takeLatest(groupActions.loadGroups.type, loadGroupByChoice)
}

function* createNewGroupByName({data: group}: { data: ICreateGroup }) {
    try {
        const {data: newGroup}: { data: IGroup } = yield Effects.call((): AxiosRes<IGroup> => groupService.createGroup(group.name));
        yield Effects.put(groupActions.createNewGroupSuccess(newGroup));
    } catch (error) {
        if (isAxiosError(error)) {
            const serverError = error as AxiosError<{ detail: string }>;
            if (serverError && serverError.response) {
            }
        }
    }
}

function* createNewGroup() {
    yield takeLatest(groupActions.createNewGroup.type, createNewGroupByName)
}


export {loadGroup, createNewGroup}