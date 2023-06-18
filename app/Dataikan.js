import { Link } from "expo-router";
import React,{Component} from "react";
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  const styles = StyleSheet.create({
    input: {
      marginHorizontal:10,
      borderBottomWidth:1,
      borderBottomColor:'#000',
      width:300
    },
    button: {
      paddingHorizontal:10,
      paddingVertical:5,
      backgroundColor:'#87CEFA',
      marginHorizontal:10,
      marginTop:10,
      borderRadius:5,
    },
    gambarikan: {
        width: 200,
        height: 112,
    },

  });
class Dataikan extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        dataIkan:[],
        kode_ikan:'',nama_ikan:'',kategori:'',harga:''
     }

     getdataIkan=()=>{
        fetch('http://192.168.43.122/mobile_backend/public/ikan')
            .then((response)=>response.json())
            .then((json)=>this.setState({dataIkan:json}))
            .catch((err)=>console.log(err))
     }
     saveDataIkan=()=>{
        fetch('http://192.168.43.122/mobile_backend/public/ikan',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                kode_ikan:this.state.kode_ikan,
                nama_ikan:this.state.nama_ikan,
                kategori:this.state.kategori,
                harga:this.state.harga,
            })
        })
        .then((response)=>response.json())
        .then((json)=>{
            (json.status)==201 ? Alert.alert('Success','Data Ikan Berhasil Disimpan !!'):'';
        })
        .catch((err)=>console.log(err))
        .finally(()=>{
            this.getdataIkan();
            this.setState({kode_ikan:''});
            this.setState({nama_ikan:''});
            this.setState({kategori:''});
            this.setState({harga:''});
        })
     }
     componentDidMount = () => {
       this.getdataIkan();
     }
     
    render() { 
        return ( 
            <View style={{alignItems:'flex-start', backgroundColor:'#fff'}}>
                <Link
        href={"exp://192.168.43.122:19000/--/_layout"}
      >
        Go Choose Component
      </Link>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:20}}>Aplikasi (Ikan Hias Zans)</Text>
                </View>
                <Image
        style={styles.gambarikan}
        source={require('../assets/images/aquarium.png')}
      />
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <Text>| No |</Text>
                    <Text>| Kode Ikan |</Text>
                    <Text>| Nama Ikan |</Text>
                        </View>
                <FlatList 
                data={this.state.dataIkan}
                keyExtractor={(item)=>item.id_ikan}
                renderItem={({item,index})=>(
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <Text>{++index}        </Text>
                        <Text>{item.kode_ikan}            </Text>
                        <Text>{item.nama_ikan} </Text>
                    </View>
                )}
                />

                <TextInput 
                style={styles.input}
                value={this.state.kode_ikan}
                onChangeText={(value)=>this.setState({kode_ikan:value})}
                placeholder="Kode Ikan"
                />
                <TextInput 
                style={styles.input}
                value={this.state.nama_ikan}
                onChangeText={(value)=>this.setState({nama_ikan:value})}
                placeholder="Nama Ikan"
                />
                <TextInput 
                style={styles.input}
                value={this.state.kategori}
                onChangeText={(value)=>this.setState({kategori:value})}
                placeholder="Kategori"
                />
                <TextInput 
                style={styles.input}
                value={this.state.harga}
                onChangeText={(value)=>this.setState({harga:value})}
                placeholder="Harga"
                />

                <TouchableOpacity onPress={this.saveDataIkan} style={styles.button}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
         );
    }
}
 
export default Dataikan;