import React from 'react';
import store from "./store";
import {getAddItemAction, getDeleteItemAction, getInputChangeAction, initListAction} from './store/actionCreators'
import TodoListUI from './TodoListUI';
import axios from 'axios';
class TodoList extends React.Component{
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.storeChange = this.storeChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleItemDelete = this.handleItemDelete.bind(this)
        store.subscribe(this.storeChange)
    }
    render() {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                list={this.state.list}
                handleItemDelete={this.handleItemDelete}
            />
        )
    }
    componentDidMount() {
        axios.get('/list.json').then((res)=>{
            const data = res.data;
            const action = initListAction(data);
            store.dispatch(action);
        })
    }

    handleInputChange(e){
        const action = getInputChangeAction(e.target.value)
        store.dispatch(action);
    }
    handleSubmit(){
        const action = getAddItemAction()
        store.dispatch(action);
    }
    handleItemDelete(index){
        const action = getDeleteItemAction(index)
        store.dispatch(action)
    }
    storeChange(){
        this.setState(store.getState());
    }
}

export default TodoList;
