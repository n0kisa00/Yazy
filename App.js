import { View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './styles/style';
import Gameboard from './components/Gameboard';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Gameboard />
      <Footer />
    </View>
  );
}