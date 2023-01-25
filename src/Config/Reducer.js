export const REDUX_REGISTER = 'REDUX_REGISTER';

export const Reducer = (state, action) => {
    switch (action.type) {
        case REDUX_REGISTER:
            return {
                ...state,
                userData: state.userData.length > 0 ? [...state.userData, action.data] : [action.data]
            };
    }
    return state
}