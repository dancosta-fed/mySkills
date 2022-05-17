import React, { useState, useEffect } from "react"

import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  FlatList
} from "react-native"

import { Button } from "../components/Button"
import { SkillCard } from "../components/SkillCard"

interface SkillData {
  id: string,
  name: string
}

export function Home(){
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<SkillData[]>([])
  const [greetings, setGreetings] = useState('')

  // ADD NEW SKILL 
  function hadleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(oldState => [...oldState, data])
  }

  // REMOVE SKILL
  function hadleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id != id
    ))
  }


  useEffect(() => {
    const currentHour = new Date().getHours()

    if(currentHour < 12) {
      setGreetings('Good Morning...')
    } else if(currentHour >= 12 && currentHour < 18) {
      setGreetings('Good Afternoon...')
    } else (
      setGreetings('Good evening...')
    )

  }, [])

  return (
    <>
      <View style={styles.container}>

        <Text style={styles.greetings}>
          {greetings}
        </Text>

        <Text style={styles.title}>Welcome Dan</Text>

        <TextInput 
          style={styles.input}
          placeholder="New Skill"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
        />

        <Button 
          title="add"
          onPress={hadleAddNewSkill}
        />

        <Text style={[styles.title, { marginVertical: 30 }]}>
        My Skills
        </Text>



        <FlatList 
          showsVerticalScrollIndicator={false}
          data={mySkills}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SkillCard 
              skill={item.name}
              onPress={() => hadleRemoveSkill(item.id)}
            />
          )}
        />
      </View>
    </>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 40
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1e25',
    color: '#FFF',
    fontSize: 18,
    padding: 15, // Platform.OS === 'ios' ? 15 : 10
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: '#FFF',
  }
})