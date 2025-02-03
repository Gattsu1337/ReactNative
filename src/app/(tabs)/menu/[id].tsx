import products from "@/assets/data/products";
import { View, Text } from "@/src/components/Themed"
import { Stack, useRouter } from "expo-router";
import { Image, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useState } from "react";
import { useCart } from "@/src/providers/CartProvider";
import Button from "@/src/components/Button";
import { PizzaSize } from "@/src/types";

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const { addItem } = useCart();

    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
 
    const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

    const product = products.find((p) => p.id.toString() === id);

    const addToCart = () => {
      if(!product){
        console.warn("Please select product!");
        return;
      };

      addItem(product, selectedSize);
      router.push("/cart");
    };

    if(!product){
        return(
            <Text>Product not found!</Text>
        );
    }

    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: `${product?.name}`}}></Stack.Screen>
            <Image style={styles.image} source={{uri: product.image || defaultPizzaImage}}></Image>
            <Text>Please selec size:</Text>
            <View style={styles.sizes}>
                {sizes.map((size) => 
                    <Pressable onPress={() => {setSelectedSize(size)}} style={[styles.size, {backgroundColor: selectedSize === size ? 'gainsboro' : 'white'}]} key={size}>
                        <Text style={[styles.sizeText, {color: selectedSize === size ? 'black' : 'gray'}]}>
                            {size}
                        </Text>
                    </Pressable>
                )}
            </View>
            <Text style={styles.price}>${product.price}</Text>
            <Button text={"Add to cart"} onPress={addToCart}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      flex: 1,
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      alignSelf: 'center',
    },
    subtitle: {
      marginVertical: 10,
      fontWeight: '600',
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 'auto',
    },
  
    sizes: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    size: {
      width: 50,
      aspectRatio: 1,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sizeText: {
      fontSize: 20,
      fontWeight: '500',
      color: 'black',
    },
  });

export default ProductDetailsScreen;