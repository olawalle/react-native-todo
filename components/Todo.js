import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {connect} from 'react-redux';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {editTodo} from '../store/actions/TodoActions';
import {colors} from '../utils/theme';

const Todo = props => {
  const {todo, dispatch} = props;

  const toggleTodo = () => {
    dispatch(editTodo(todo.id));
  };

  return (
    <TouchableOpacity onPress={todo.completed ? null : toggleTodo}>
      <View style={styles.todo}>
        <View style={styles.todoText}>
          <Text
            style={[
              styles.todoTitle,
              {
                textDecorationColor: todo.completed ? '#000' : 'transparent',
                textDecorationLine: todo.completed ? 'line-through' : 'none',
                textDecorationStyle: 'solid',
              },
            ]}>
            {todo.title}
          </Text>
          <Text style={styles.todoTime}>{todo.date}</Text>
        </View>
        <BouncyCheckbox
          size={25}
          fillColor={colors.accent}
          unfillColor="#FFFFFF"
          text={null}
          iconStyle={{borderColor: '#dedfe1'}}
          onPress={todo.completed ? null : toggleTodo}
          isChecked={todo.completed}
          disabled
        />
        {todo.desc ? <Text style={styles.desc}>{todo.desc}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafc',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#f5f5f6',
    marginBottom: 15,
  },
  todoText: {
    width: '80%',
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  todoTime: {
    fontSize: 14,
    color: colors.grey6,
  },
  desc: {
    width: '100%',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    color: colors.grey6,
  },
});

const mapStateToProps = state => {
  return {...state};
};

export default connect(mapStateToProps)(Todo);
