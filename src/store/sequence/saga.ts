import {call, put, takeLeading} from "redux-saga/effects";
import {sequenceGetAudience, sequenceGetCampaigns, sequenceSetAudience, sequenceSetCampaigns} from "./actions";
import {Sequence} from "../../api/sequence";
import {handle} from "../../api";

export function *sequenceWatcher(){
    yield takeLeading(sequenceGetCampaigns, getCampaigns);
    yield takeLeading(sequenceGetAudience, getAudience);
}


function *getCampaigns():any{
    const [res, err] = yield call(handle, Sequence.getPostsCampaigns());
    if(res){
        yield put(sequenceSetCampaigns(res));
    }else{
        console.log(err);
    }
}

function * getAudience():any{
    const [res, err] = yield call(handle, Sequence.getAudience());
    if(res){
        yield put(sequenceSetAudience(res))
    }else{
        console.log(err);
    }
}
