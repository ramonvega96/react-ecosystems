import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';



const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {

    useEffect(() => {
        startLoadingTodos();
    }, []);
    
    const loadingMessage = <div>Loading todos...</div>
    const content = (
        <div className='list-wrapper'>
            <NewTodoForm/>
            {todos.map(todo => <TodoListItem 
                key={todo.text} 
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletedPressed={onCompletedPressed}/>)}
        </div>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    todos: state.todos,
    isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);