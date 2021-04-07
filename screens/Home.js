import React, {useState, useRef, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {colors} from '../utils/theme';
import CustomButton from '../components/CustomButton';

import Todo from '../components/Todo';
import Nav from '../components/Nav';

const HomeScreen = props => {
  const {tags, todos} = props.todos;
  const [pickedTag, setpickedTag] = useState('My day');
  const [activeTodoList, setactiveTodoList] = useState(todos);
  const [finishedTodos, setfinishedTodos] = useState(
    todos.filter(todo => todo.completed),
  );
  const [pendingTodos, setPendingTodos] = useState(
    todos.filter(todo => !todo.completed),
  );

  useEffect(() => {
    if (pickedTag === 'My day') {
      setactiveTodoList(todos);
      setfinishedTodos(todos.filter(todo => todo.completed));
      setPendingTodos(todos.filter(todo => !todo.completed));
    } else {
      let data = todos.filter(todo => todo.tags.includes(pickedTag));
      setactiveTodoList(data);
      setfinishedTodos(data.filter(todo => todo.completed));
      setPendingTodos(data.filter(todo => !todo.completed));
    }
    console.log('todos changed', todos.length);
  }, [pickedTag, todos]);

  return (
    <View style={{flex: 1, padding: 30, backgroundColor: '#ffffff'}}>
      <View style={styles.header}>
        <View style={styles.welcome}>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.name}>Muheez Akanni</Text>
        </View>
        <Image
          style={{width: 50, height: 50, borderRadius: 12}}
          source={{
            uri: `https://randomuser.me/api/portraits/men/15.jpg`,
          }}
        />
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.scrollingWrapper}>
          {['My day', ...tags].map(tag => (
            <CustomButton
              key={tag}
              onPress={() => setpickedTag(tag)}
              type={pickedTag === tag ? 'primary' : 'grey'}
              style={styles.single}>
              <Text
                style={{
                  color: pickedTag === tag ? '#fff' : '#000000',
                  fontWeight: 'bold',
                }}>
                {tag}
              </Text>
            </CustomButton>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={{marginTop: 30, marginBottom: 40}}>
        <Text style={styles.heading}>Tasks</Text>

        {pendingTodos.length ? (
          pendingTodos.map(todo => <Todo key={todo.id} todo={todo} />)
        ) : (
          <Text style={{marginBottom: 30, marginTop: -12, color: colors.grey5}}>
            No pending {pickedTag !== 'My day' ? pickedTag : ''} tasks
          </Text>
        )}

        <Text style={{...styles.heading, marginTop: 20}}>Completed</Text>

        {finishedTodos.length ? (
          finishedTodos.map(todo => <Todo key={todo.id} todo={todo} />)
        ) : (
          <Text style={{marginBottom: 30, marginTop: -12, color: colors.grey5}}>
            No completed {pickedTag !== 'My day' ? pickedTag : ''} tasks
          </Text>
        )}
      </ScrollView>

      <Nav />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  welcome: {
    width: wp('65%'),
  },
  hello: {
    fontSize: 24,
    color: colors.grey6,
  },
  name: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  scrollingWrapper: {
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
  },
  single: {
    paddingHorizontal: 40,
    marginRight: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.grey6,
    marginBottom: 20,
  },

  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    paddingVertical: 12,
    position: 'absolute',
    bottom: hp('0%'),
    backgroundColor: '#fff',
    width: wp('100%'),
  },
});

const mapStateToProps = state => {
  return {...state};
};

export default connect(mapStateToProps)(HomeScreen);
