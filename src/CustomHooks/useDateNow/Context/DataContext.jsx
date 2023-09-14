import { createContext, useReducer } from "react";

const DataContext = createContext();

const initialState = {
    status:null,
    category:null,
    sortBy:null,
    page:1,
    type:null
};

const Reducer = (state,action)=>{
   switch(action.type){
    case 'SET_STATUS':
        return {...state,status:action.payload};
    case 'SET_CATEGORY':
    return {...state,category:action.payload};
    case 'SORT_BY':
    return {...state,sortBy:action.payload};
    case 'SET_PAGE':
    return {...state,page:action.payload};
    case 'SET_TYPE':
    return {...state,type:action.payload};
    default:
        return state;
}
}

const DataProvider = ({children})=>{
    const [state,dispatch] = useReducer(Reducer,initialState);
    return(
        <DataContext.Provider value={{state,dispatch}}>
            {children}
        </DataContext.Provider>
    )
}

export {DataProvider,DataContext};