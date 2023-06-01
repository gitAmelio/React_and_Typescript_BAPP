import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../action';
import { ActionType } from '../action-types';

export const searchRepositories = (term: string) => {
    // the return function can be calles with this Action
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEARCH_REPOSITORIES
        });

        try {
            const { data } = await axios.get(
                'https://registry.npmjs.org/-/v1/search',
                { params: { text: term } }
            );

            const names = data.objects.map((result: any) => {
                return result.package.name;
            })

            // the payload much match each Action
            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
                payload: names
            })
        } catch (err: any) {
            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_ERROR,
                payload: err.message
            })
        }
    }
}