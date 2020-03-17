import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Linking } from 'expo';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Main = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if(data.includes(route.params.prefix)){
      setScanned(false);
      Linking.openURL(data);
    }
    else{
      alert("QRCode não reconhecido. Tente novamente em 5 segundos...");
      setTimeout(() => setScanned(false), 5000);
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <Text style={styles.containerText}>Leia o QRCode de uma sala para responder!</Text>
      )}
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343a40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    color: "#70acec",
  }
});