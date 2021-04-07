import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import CustomButton from './CustomButton';
import {colors} from '../utils/theme';
import SvgCalendarIcon from '../assets/icons/Calendar';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import {addTodo} from '../store/actions/TodoActions';

const CreateTask = props => {
  const {dispatch, onClose} = props;
  const {tags} = props.todos;

  const [selectedTag, setSelectedTag] = useState(tags[0]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [newTodo, setNewTodo] = useState({
    title: '',
    date: '',
    desc: '',
    completed: false,
    tags: [],
  });

  const makeid = length => {
    var result = [];
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength)),
      );
    }
    return result.join('');
  };

  const setTags = tag => {
    console.log({tag});
    let data;
    let prevTags = newTodo.tags;
    if (prevTags.includes(tag)) {
      data = {
        ...newTodo,
        tags: prevTags.filter(t => t !== tag),
      };
    } else {
      data = {
        ...newTodo,
        tags: [...prevTags, tag],
      };
    }
    setNewTodo(data);
  };

  const createTodo = () => {
    dispatch(addTodo({...newTodo, id: makeid(5)}));
    onClose();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setNewTodo({
      ...newTodo,
      date: dayjs(currentDate).format('DD MMM YYYY. hh:mm a'),
    });
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{backgroundColor: '#ffffff'}}>
      <Text style={styles.heading}>Create a task</Text>

      <Text style={styles.label}>Task Title</Text>
      <TextInput
        onChangeText={e => setNewTodo({...newTodo, title: e})}
        style={styles.input}
        placeholder="Task Title"
      />

      <Text style={styles.label}>Task Type</Text>
      <View style={styles.row}>
        {tags.map(tag => (
          <CustomButton
            key={tag}
            type={newTodo.tags.find(t => t === tag) ? 'primary' : 'grey'}
            onPress={() => setTags(tag)}
            style={{width: 120, marginRight: 10}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: newTodo.tags.find(t => t === tag) ? '#fff' : '#000',
              }}>
              {tag}
            </Text>
          </CustomButton>
        ))}
      </View>

      <Text style={styles.label}>Choose date and time</Text>
      <View style={{...styles.row, justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={showDatepicker} style={styles.trigger}>
          <SvgCalendarIcon width={15} height={15} style={{marginRight: 5}} />
          <Text style={styles.triggerText}>Select a date</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showTimepicker} style={styles.trigger}>
          <SvgCalendarIcon width={15} height={15} style={{marginRight: 5}} />
          <Text style={styles.triggerText}>Select time</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          marginTop: -15,
        }}>
        <Text style={{...styles.triggerText, fontSize: 18}}>
          Get alert for this task
        </Text>
        <Switch
          value={showAlert}
          onTouchEnd={() => setShowAlert(!showAlert)}
          thumbColor={colors.accent}
          trackColor="#fafafa"
        />
      </View>

      <CustomButton onPress={createTodo} type="pink" style={styles.btn}>
        <Text style={{fontSize: 18, color: '#fff'}}>Done</Text>
      </CustomButton>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: colors.grey5,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#f9fafc',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#f5f5f6',
    marginBottom: 30,
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    // justifyContent: 'space-between',
  },
  trigger: {
    width: '48%',
    borderRadius: 10,
    height: 40,
    backgroundColor: '#f7f8fa',
    paddingHorizontal: 30,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  triggerText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },

  btn: {
    width: '100%',
    height: 60,
    shadowColor: '#d0516f',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 8,
  },
});

const mapStateToProps = state => {
  return {...state};
};

export default connect(mapStateToProps)(CreateTask);
