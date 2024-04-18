import React, { Component } from "react"
import { 
    View, 
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput
} from "react-native"
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import Topic from "../../../components/topic"
import Colors from "../../../utils/colors"
import CustomBtn1 from "../../../components/customButton"
import { RadioButton, Checkbox } from "react-native-paper"


export default class PaymentGateway extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            amount: 0,
            donateAnonymous: false,
            selectedOption: '01'
        }
    }


    render() {

        const { selectedOption } = this.state

        return(
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Topic title={'Add Fundraising'} />

                    <Text style={styles.lbl}>Enter Amount</Text>
                    <View style={[styles.inputContainer2]}>
                        <Icon name="currency-usd" size={30} />
                        <TextInput 
                            style={styles.inputStyle}
                            keyboardType={'numeric'}
                            ></TextInput>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Checkbox
                            status={this.state.donateAnonymous ? 'checked' : 'unchecked'}
                            onPress={() => {this.setState({donateAnonymous: !(this.state.donateAnonymous)})}}
                        />
                        <Text style={{color: Colors.light}}>Donate as Anonymous</Text>
                    </View>


                    {/* OPTIONS*/}
                    <View>
                        <Text style={[styles.lbl, {marginVertical: 30}]}>Choose Payment</Text>

                        <View style={[styles.options, styles.selected]}>
                            <View style={styles.grouped}>
                                <Icon name="cash-multiple" size={30} />
                                <Text style={styles.txt}>Lobo Cash</Text>
                            </View>
                            <RadioButton
                                value="01"
                                status={ this.state.selectedOption === '01' ? 'checked' : 'unchecked' }
                                onPress={() => this.setState({selectedOption: '01'})}
                                style={{backgroundColor: Colors.primary}}
                            />
                        </View>
                        <View style={styles.options}>
                            <View style={styles.grouped}>
                                <Icon name="credit-card-outline" style={{color: Colors.light}} size={30} />
                                <Text style={styles.txt}>PayPal</Text>
                            </View>
                            <RadioButton
                                value="02"
                                status={ this.state.selectedOption === '02' ? 'checked' : 'unchecked' }
                                onPress={() => {
                                    this.setState({selectedOption: '02'})
                                }}
                            />
                        </View>
                        <View style={styles.options}>
                            <View style={styles.grouped}>
                                <Icon name="credit-card-outline" style={{color: Colors.light}} size={30} />
                                <Text style={styles.txt}>Credit Card</Text>
                            </View>
                            <RadioButton
                                value="03"
                                status={ this.state.selectedOption === '03' ? 'checked' : 'unchecked' }
                                onPress={() => this.setState({selectedOption: '03'})}
                            />
                        </View>
                        <View style={styles.options}>
                            <View style={styles.grouped}>
                                <Icon name="credit-card-outline" style={{color: Colors.light}} size={30} />
                                <Text style={styles.txt}>Google Pay</Text>
                            </View>
                            <RadioButton
                                value="04"
                                status={ this.state.selectedOption === '04' ? 'checked' : 'unchecked' }
                                onPress={() => this.setState({selectedOption: '04'})}
                                style={styles.radioBtn}
                            />
                        </View>
                    </View>

                    <CustomBtn1 title='Continue' onPress={() => alert("Under Construction")} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 30
    },
    inputStyle: {
        flex: 1,
        paddingHorizontal: 15,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '800',
        height: 110
    },
    inputContainer2: {
        borderColor: Colors.primary, 
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    lbl: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.dark,
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    options: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
        borderColor: 'rgba(0,0,0,.06)',
        borderWidth: 2,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    selected: {
        borderColor: Colors.primary,
    },
    radioBtn: {
        alignSelf: 'flex-end',
        backgroundColor: 'Blue'
        
    },
    grouped: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt: {
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 10
    }
})