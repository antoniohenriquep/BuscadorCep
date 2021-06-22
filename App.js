import React, {useState,useRef} from 'react';
import { View,Text, TextInput, TouchableOpacity,StyleSheet,SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api';

export default function BuscadorCep() {

  const [cep,setCep] = useState('')
  const [cepUser, setCepUser] = useState(null)

  const inputRef = useRef(null)
  
  function limpar()
  {
    setCep('')
    inputRef.current.focus()
  }


  async function buscar()
  {
    if(cep =='')
    {
      alert('Digite um cep válido')
      setCep('')
      return
    }


    try
    {
      const response = await api.get(`./${cep}/json`)
      console.log(response.data)
      setCepUser(response.data)
      Keyboard.dismiss()
    }
    
    catch(error)
    {
      console.log('ERROR:  ' + error)
    }

  }


  return (
    <SafeAreaView style ={styles.container}>
      <View style ={{alignItems:'center'}}>
        <Text style ={styles.text}>Digite o Cep desejado:</Text>
      
        <TextInput
        placeholder ='Ex.:00000000'
        style ={styles.input}
        value={cep}
        onChangeText ={(text) => setCep(text)}
        keyboardType ='numeric'
        ref ={inputRef}/>

      </View>



      <View style ={styles.areaBtn}>
        <TouchableOpacity 
        style ={[styles.btn,{backgroundColor:'#1d75cd'}]}
        onPress ={buscar}>

          <Text style ={styles.textBtn}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style ={[styles.btn,{backgroundColor:'#cd3e1d'}]}
        onPress ={limpar}>

          <Text style ={styles.textBtn}>Limpar</Text>

        </TouchableOpacity>
      </View>

      {cepUser &&
        <View style={styles.resultado }>
          <Text style ={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style ={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style ={styles.itemText}>Bairro: {cepUser.localidade}</Text>
          <Text style ={styles.itemText}>Bairro: {cepUser.uf}</Text>
        </View>
    }
      

   </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1
  },
  text:{
    marginTop:25,
    marginBottom:15,
    fontSize:25,
    fontWeight:'bold'
  },
  input:{
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:5,
    width:'90%',
    padding:10,
    fontSize:18
  },
  areaBtn:{
    alignItems:'center',
    flexDirection:'row',
    marginTop:15,
    justifyContent:'space-around'
  },
  btn:{
    height:60,
    alignItems:'center',
    justifyContent:'center',
    padding:15,
    borderRadius:5
  },
  textBtn:{
    fontSize:22,
    color:'#fff'
  },
  resultado:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  itemText:{
    fontSize:22
  }
})