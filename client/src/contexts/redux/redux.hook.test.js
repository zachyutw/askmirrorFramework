import { itemReducer, initItemState } from './redux.hook';
import _ from 'lodash';

describe('Auth Model Testing', () => {
    test('test itemReducer', () => {
        const item = { title: 'test', name: 'abc', id: 2 };
        const ajaxActions = [
            { type: 'setItem', id: 1, item },
            { type: 'postItem', item },
            { type: 'getItem', id: 1, item },
            { type: 'putItem', id: 1, item },
            { type: 'deleteItem', id: 1 }
        ];

        const statusActions = [
            {
                type: 'start',
                isLoading: true,
                success: null,
                errorMessage: null
            },
            {
                type: 'fail',
                isLoading: false,
                success: false,
                errorMessage: 'error message'
            }
        ];

        ajaxActions.map((action) => {
            const itemState = itemReducer(initItemState, action);
            if (action.type === 'postItem') {
                expect(itemState.id).toEqual(2);
            } else {
                expect(itemState.id).toEqual(1);
            }
            if (action.type === 'deleteItem') {
                expect(itemState.item).toEqual({});
            } else {
                expect(itemState.item).toEqual({ title: 'test', name: 'abc', id: 2 });
            }
            expect(itemState.success).toEqual(action.type);
            expect(itemState.isLoading).toEqual(false);
        });
        statusActions.map((action) => {
            const itemState = itemReducer(initItemState, action);
            if (action.type === 'start') {
                expect(itemState.success).toEqual(null);
                expect(itemState.isLoading).toEqual(true);
                expect(itemState.errorMessage).toEqual(null);
            } else if (action.type === 'fail') {
                expect(itemState.success).toEqual(false);
                expect(itemState.isLoading).toEqual(false);
                expect(typeof itemState.errorMessage).toEqual('string');
            }
        });
    });
});
