import React, { useState, useContext, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { db } from '../../config'
import PostsList from '../../components/PostsList'
import { TextInput } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../contexts/auth'
import { ScrollView } from 'react-native-gesture-handler';

export default function SolicitacaoAdm({ route }) {
    const { item } = route.params;
    const [loading, setLoading] = useState(false);

    const [motivo, setMotivo] = useState(item != null ? item.motivo : "");


    const [dayS, setDayS] = useState(item != null ? item.diaSaida : "");
    const [monthS, setMonthS] = useState(item != null ? item.mesSaida : "");
    const [yearS, setYearS] = useState(item != null ? item.anoSaida : "");

    const [dayC, setDayC] = useState(item != null ? item.diaChegada : "");
    const [monthC, setMonthC] = useState(item != null ? item.mesChegada : "");
    const [yearC, setYearC] = useState(item != null ? item.anoChegada : "");

    const [horaS, setHoraS] = useState(item != null ? item.horaSaida : "");
    const [minutoS, setMinutoS] = useState(item != null ? item.minutoSaida : "");

    const [horaC, setHoraC] = useState(item != null ? item.horaChegada : "");
    const [minutoC, setMinutoC] = useState(item != null ? item.minutoChegada : "");

    const [status, setStatus] = useState(item != null ? item.status : "");
    const [nome, setNome] = useState(item != null ? item.nomeSolicitante : "");
    const { user } = useContext(AuthContext);
    const [marcas, setMarcas] = useState([]);
    const [veiculo, setVeiculo] = useState(item != null ? item.veiculo : "");
    const [usuario, setUsuario] = useState(item != null ? item.userSolicitacao : "");




    const navigation = useNavigation();

    const statusList = [
        { label: "Pendente", value: "Pendente" },
        { label: "Aprovado", value: "Aprovado" },
        { label: "Reprovado", value: "Reprovado" },
    ];




    const handleChangeMarca = (value) => {
        setMarca(value);
    }

    // useEffect(() => {
    //     console.log(user.uid)
    //     db.collection("users")
    //         .doc(user.uid)
    //         .get()
    //         .then((value) => {
    //             setNome(value.data().nome);
    //         });
    // }, []);


    async function handleSave() {
        const dataS = new Date(yearS, monthS - 1, dayS, horaS, minutoS);
        console.log('Data e hora saída = ' + dataS)
        const data = new Date(yearC, monthC - 1, dayC, horaC, minutoC);
        console.log('Data e hora chegada = ' + data)
        if (item != null) {
            if (veiculo != '') {
                try {

                    const veiculoSaidaSnapshot = await db.collection('solicitacoes')
                        .where('veiculo', '==', veiculo)
                        .where('dataSaida', '>=', dataS)
                        .get();

                    const veiculoChegadaSnapshot = await db.collection('solicitacoes')
                        .where('veiculo', '==', veiculo)
                        .where('dataChegada', '<=', data)
                        .get();

                    if (veiculoSaidaSnapshot.empty && veiculoChegadaSnapshot.empty) {
                        setLoading(true)
                        await db.collection('solicitacoes').doc(item.id).set({
                            created: new Date(),
                            motivo: motivo,
                            diaSaida: dayS,
                            mesSaida: monthS,
                            anoSaida: yearS,
                            horaSaida: horaS,
                            minutoSaida: minutoS,
                            diaChegada: dayC,
                            mesChegada: monthC,
                            anoChegada: yearC,
                            horaChegada: horaC,
                            minutoChegada: minutoC,
                            dataSaida: dataS,
                            dataChegada: data,
                            userSolicitacao: usuario,
                            status: status,
                            nomeSolicitante: nome,
                            veiculo: veiculo

                        })
                            .then(() => {
                                console.log('Adicionado solicitacoes')
                            })
                            .catch((error) => {
                                console.log(error);
                            }).finally(() => {
                                setLoading(false)
                                navigation.goBack();
                            })
                    } else {
                        // Há veículos iguais entre as datas de saída e chegada
                        Alert.alert('O veiculo já está aprovado em outra solicitação para esse horário')
                        return;
                    }
                } catch (error) {
                    console.error('Erro ao verificar veículo disponível:', error);
                    return false;
                }

            } else {
                setLoading(true)
                await db.collection('solicitacoes').doc(item.id).set({
                    created: new Date(),
                    motivo: motivo,
                    diaSaida: dayS,
                    mesSaida: monthS,
                    anoSaida: yearS,
                    horaSaida: horaS,
                    minutoSaida: minutoS,
                    diaChegada: dayC,
                    mesChegada: monthC,
                    anoChegada: yearC,
                    horaChegada: horaC,
                    minutoChegada: minutoC,
                    dataSaida: dataS,
                    dataChegada: data,
                    userSolicitacao: usuario,
                    status: status,
                    nomeSolicitante: nome,
                    veiculo: veiculo

                })
                    .then(() => {
                        console.log('Adicionado solicitacoes')
                    })
                    .catch((error) => {
                        console.log(error);
                    }).finally(() => {
                        setLoading(false)
                        navigation.goBack();
                    })
            }




        } else {
            console.log(user)
            setLoading(true)
            await db.collection('solicitacoes').add({
                created: new Date(),
                motivo: motivo,
                diaSaida: dayS,
                mesSaida: monthS,
                anoSaida: yearS,
                horaSaida: horaS,
                minutoSaida: minutoS,
                diaChegada: dayC,
                mesChegada: monthC,
                anoChegada: yearC,
                horaChegada: horaC,
                minutoChegada: minutoC,
                dataSaida: dataS,
                dataChegada: data,
                userSolicitacao: user.uid,
                status: 'Pendente',
                nomeSolicitante: nome,
                veiculo: ''
            })
                .then(() => {
                    console.log('Adicionado solicitacoes')
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setLoading(false)
                    navigation.goBack();
                })
        }
    }


    useFocusEffect(
        useCallback(() => {
            async function fetchPosts() {
                setLoading(true);
                await db.collection('veiculos')
                    .get()
                    .then((snapshoot) => {
                        setMarcas([]);
                        const formList = [];
                        snapshoot.docs.map(u => {
                            formList.push({
                                ...u.data(),
                                id: u.id,
                            })
                        })

                        setMarcas(formList);
                        setLoading(false);


                    })

            }
            fetchPosts();


        }, [])
    );

    const handleStatus = (value) => {
        setStatus(value);
        if(value == 'Reprovado'){
            setVeiculo('')
        }
    }



    return (
        <ScrollView style={styles.container}>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator SIZE={50} color="black"></ActivityIndicator>
                </View>
            ) : (
                <View>
                    <TextInput
                        //theme={theme}
                        disabled
                        label="Solicitante"
                        mode="flat"
                        //textColor="#000"
                        style={styles.imput}
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />

                    <TextInput
                        //theme={theme}
                        disabled
                        label="Motivo"
                        mode="flat"
                        //textColor="#000"
                        style={styles.imput}
                        value={motivo}
                        onChangeText={(text) => setMotivo(text)}
                    />

                    <Text style={{ color: 'black', width: '80%', marginVertical: 12 }}>Data de Saída</Text>
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'space-between',
                        width: '100%', alignItems: 'center'
                    }}>
                        <TextInput
                            disabled
                            mode='flat'
                            style={{ ...styles.imputD, marginRight: 5 }}
                            placeholder="Dia"
                            value={dayS}
                            onChangeText={(setDayS)}
                            keyboardType="number-pad"
                            maxLength={2}
                        />
                        <Text style={{ color: 'black', fontSize: 30, marginRight: 5 }}>/</Text>
                        <TextInput
                            disabled
                            style={{ ...styles.imputD, marginRight: 5 }}
                            placeholder="Mês"
                            value={monthS}
                            onChangeText={setMonthS}
                            keyboardType="number-pad"
                            maxLength={2}
                        />
                        <Text style={{ color: 'black', fontSize: 30, marginRight: 5 }}>/</Text>
                        <TextInput
                            disabled
                            style={styles.imputD}
                            placeholder="Ano"
                            value={yearS}
                            onChangeText={setYearS}
                            keyboardType="number-pad"
                            maxLength={4}
                        />
                    </View>

                    <Text style={{ color: 'black', width: '80%', marginVertical: 12 }}>Hora saida</Text>
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'space-between',
                        width: '80%', alignItems: 'center'
                    }}>
                        <TextInput
                            disabled
                            mode='flat'
                            style={{ ...styles.imputD, marginRight: 5 }}
                            placeholder="Hora"
                            value={horaS}
                            onChangeText={(setHoraS)}
                            keyboardType="number-pad"
                            maxLength={2}
                        />
                        <Text style={{ color: 'black', fontSize: 30, marginRight: 5 }}>:</Text>
                        <TextInput
                            disabled
                            style={{ ...styles.imputD }}
                            placeholder="Minuto"
                            value={minutoS}
                            onChangeText={setMinutoS}
                            keyboardType="number-pad"
                            maxLength={2}
                        />
                    </View>

                    <Text style={{ color: 'black', width: '80%', marginVertical: 12, }}>Data de Chegada</Text>
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'space-between',
                        width: '100%', alignItems: 'center'
                    }}>
                        <TextInput
                            disabled
                            mode='flat'
                            style={{ ...styles.imputD, marginRight: 5 }}
                            placeholder="Dia"
                            value={dayC}
                            onChangeText={(setDayC)}
                            keyboardType="number-pad"
                            maxLength={2}
                        />
                        <Text style={{ color: 'black', fontSize: 30, marginRight: 5 }}>/</Text>
                        <TextInput
                            disabled
                            style={{ ...styles.imputD, marginRight: 5 }}
                            placeholder="Mês"
                            value={monthC}
                            onChangeText={setMonthC}
                            keyboardType="number-pad"
                            maxLength={2}
                        />
                        <Text style={{ color: 'black', fontSize: 30, marginRight: 5 }}>/</Text>
                        <TextInput
                            disabled
                            style={styles.imputD}
                            placeholder="Ano"
                            value={yearC}
                            onChangeText={setYearC}
                            keyboardType="number-pad"
                            maxLength={4}
                        />
                    </View>

                    <Text style={{ color: 'black', width: '80%', marginVertical: 12 }}>Hora chegada</Text>
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'space-between',
                        width: '80%', alignItems: 'center'
                    }}>
                        <TextInput
                            disabled
                            mode='flat'
                            style={{ ...styles.imputD, marginRight: 5 }}
                            placeholder="Hora"
                            value={horaC}
                            onChangeText={(setHoraC)}
                            keyboardType="number-pad"
                            maxLength={2}
                        />
                        <Text style={{ color: 'black', fontSize: 30, marginRight: 5 }}>:</Text>
                        <TextInput
                            disabled
                            style={{ ...styles.imputD }}
                            placeholder="Minuto"
                            value={minutoC}
                            onChangeText={setMinutoC}
                            keyboardType="number-pad"
                            maxLength={2}
                        />
                    </View>

                    <View style={styles.picker}>
                        <Picker
                            style={{ color: "black" }}
                            dropdownIconColor={"black"}
                            selectedValue={status}
                            onValueChange={(value) => handleStatus(value)}
                        >
                            <Picker.Item label="Selecione seu sexo" value="" />
                            {statusList.map((state) => (
                                <Picker.Item
                                    key={state.value}
                                    label={state.label}
                                    value={state.value}
                                />
                            ))}
                        </Picker>
                    </View>

                    {
                        status != 'Reprovado' ?
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={veiculo}
                                    onValueChange={(value) => setVeiculo(value)}>
                                    <Picker.Item label="Selecione o veículo" value="" />
                                    {marcas.map((state) => (
                                        <Picker.Item
                                            key={state.id}
                                            label={state.placa}
                                            value={state.id}
                                        />
                                    ))}
                                </Picker>
                            </View>
                            :
                            <View></View>
                    }



                    <TouchableOpacity style={styles.btn} onPress={handleSave}>
                        <Text style={styles.btnSairTxt}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            )}


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 15
    },
    btn: {
        marginTop: 16,
        backgroundColor: '#428cfd',
        //width: '80%',
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40
    },
    imputD: {
        flex: 1,
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 1
    },
    btnSairTxt: {
        fontSize: 16,
        color: '#FFF'
    },
    imput: {
        marginTop: 12,
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: 'transparent'

    },
    picker: {
        borderWidth: 1,
        // borderColor: 'white',
        borderRadius: 2,
        marginTop: 12,
    },
});