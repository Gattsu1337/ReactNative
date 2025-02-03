import {View, Text, Platform, Modal, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';

const CartScreen = () => {
    const {items} = useCart();

    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList data={items} renderItem={({item}) => <CartListItem cartItem={item}/>}
        contentContainerStyle={{gap: 10, padding: 10}}/>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
    );
}
export default CartScreen;