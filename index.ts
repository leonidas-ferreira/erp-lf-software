import { registerRootComponent } from 'expo';
import App from './App';
import { AppRegistry, LogBox } from 'react-native';

// Ignora os logs de erro que travam o emulador
LogBox.ignoreAllLogs();

// TEMA 6: Força o registro manual para evitar Invariant Violation no Android 15
AppRegistry.registerComponent('main', () => App);

registerRootComponent(App);