const initialState = {
    currentPetOwner: null
}

export const petOwner = (state = initialState, action) = {
    return {
        ...state,
        currentPetOwner: action.currentPetOwner
    }
}